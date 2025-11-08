"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onStockSelect: (symbol: string) => void;
}

const indianStocks = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd", sector: "Oil & Gas" },
  { symbol: "TCS", name: "Tata Consultancy Services Ltd", sector: "IT Services" },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd", sector: "Banking" },
  { symbol: "INFY", name: "Infosys Ltd", sector: "IT Services" },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd", sector: "Banking" },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", sector: "FMCG" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", sector: "Telecom" },
  { symbol: "ITC", name: "ITC Ltd", sector: "FMCG" },
  { symbol: "SBIN", name: "State Bank of India", sector: "Banking" },
  { symbol: "LT", name: "Larsen & Toubro Ltd", sector: "Construction" },
  { symbol: "AXISBANK", name: "Axis Bank Ltd", sector: "Banking" },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd", sector: "Financial Services" },
  { symbol: "ASIANPAINT", name: "Asian Paints Ltd", sector: "Paints" },
  { symbol: "MARUTI", name: "Maruti Suzuki India Ltd", sector: "Automobile" },
  { symbol: "TITAN", name: "Titan Company Ltd", sector: "Jewellery" },
];

export default function SearchBar({ onStockSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof indianStocks>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = indianStocks.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
          stock.name.toLowerCase().includes(query.toLowerCase()) ||
          stock.sector.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectStock(suggestions[selectedIndex].symbol);
        } else if (suggestions.length > 0) {
          selectStock(suggestions[0].symbol);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
    }
  };

  const selectStock = (symbol: string) => {
    onStockSelect(symbol);
    setQuery("");
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowSuggestions(true)}
          placeholder="Search for Indian stocks by symbol, name, or sector..."
          className="w-full pl-12 pr-4 py-3 input-search border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
          aria-label="Search for stocks"
          aria-autocomplete="list"
          aria-controls="stock-suggestions"
          aria-expanded={showSuggestions}
          role="combobox"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          id="stock-suggestions"
          role="listbox"
          className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto animate-fade-in"
        >
          {suggestions.map((stock, index) => (
            <button
              key={stock.symbol}
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => selectStock(stock.symbol)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex ? "bg-teal-50" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{stock.symbol}</div>
                  <div className="text-sm text-gray-600">{stock.name}</div>
                </div>
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {stock.sector}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && query && suggestions.length === 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center text-gray-600 animate-fade-in">
          No stocks found matching &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
