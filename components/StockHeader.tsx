"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

interface StockHeaderProps {
  symbol: string;
}

const stockData: Record<string, any> = {
  RELIANCE: {
    name: "Reliance Industries Ltd",
    price: 2456.75,
    change: 28.5,
    changePercent: 1.17,
    sector: "Oil & Gas",
  },
  TCS: {
    name: "Tata Consultancy Services Ltd",
    price: 3825.60,
    change: -12.3,
    changePercent: -0.32,
    sector: "IT Services",
  },
  HDFCBANK: {
    name: "HDFC Bank Ltd",
    price: 1642.30,
    change: 18.2,
    changePercent: 1.12,
    sector: "Banking",
  },
  INFY: {
    name: "Infosys Ltd",
    price: 1456.85,
    change: 9.4,
    changePercent: 0.65,
    sector: "IT Services",
  },
};

export default function StockHeader({ symbol }: StockHeaderProps) {
  const stock = stockData[symbol] || stockData.RELIANCE;
  const isPositive = stock.change >= 0;

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-bold text-2xl">{symbol}</h2>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
              {stock.sector}
            </span>
          </div>
          <p className="text-gray-600">{stock.name}</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-3xl font-bold">₹{stock.price.toLocaleString("en-IN")}</div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>
                {isPositive ? "+" : ""}
                {stock.change.toFixed(2)} ({isPositive ? "+" : ""}
                {stock.changePercent.toFixed(2)}%)
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">As of {new Date().toLocaleString("en-IN")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
