"use client";

import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps {
  symbol: string;
}

interface FinancialData {
  year: string;
  revenue: number;
  ebitda: number;
  netProfit: number;
  eps: number;
  roe: number;
  debtEquity: number;
}

const financialData: FinancialData[] = [
  { year: "FY24", revenue: 965000, ebitda: 145000, netProfit: 85000, eps: 102.5, roe: 18.4, debtEquity: 0.65 },
  { year: "FY23", revenue: 872000, ebitda: 135000, netProfit: 78000, eps: 95.2, roe: 17.8, debtEquity: 0.78 },
  { year: "FY22", revenue: 721000, ebitda: 118000, netProfit: 68000, eps: 85.6, roe: 16.5, debtEquity: 0.95 },
  { year: "FY21", revenue: 542000, ebitda: 92000, netProfit: 53000, eps: 68.4, roe: 13.8, debtEquity: 1.08 },
  { year: "FY20", revenue: 584000, ebitda: 98000, netProfit: 58000, eps: 72.1, roe: 15.2, debtEquity: 1.15 },
  { year: "FY19", revenue: 659000, ebitda: 105000, netProfit: 62000, eps: 78.5, roe: 14.8, debtEquity: 1.22 },
  { year: "FY18", revenue: 540000, ebitda: 88000, netProfit: 48000, eps: 62.3, roe: 13.2, debtEquity: 1.35 },
  { year: "FY17", revenue: 489000, ebitda: 76000, netProfit: 42000, eps: 55.8, roe: 12.5, debtEquity: 1.48 },
];

type SortKey = keyof FinancialData;
type SortOrder = "asc" | "desc" | null;

export default function DataTable({ symbol }: DataTableProps) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
        setSortKey(null);
        setSortOrder(null);
      } else {
        setSortOrder("asc");
      }
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="w-4 h-4 text-teal-500" />
    ) : (
      <ArrowDown className="w-4 h-4 text-teal-500" />
    );
  };

  let sortedData = [...financialData];

  // Filter by search term
  if (searchTerm) {
    sortedData = sortedData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  // Sort data
  if (sortKey && sortOrder) {
    sortedData.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      const aStr = String(aValue);
      const bStr = String(bValue);
      return sortOrder === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <div className="card p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h3 className="font-semibold">Financial Data Table</h3>
        <input
          type="text"
          placeholder="Search financial data..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          aria-label="Search financial data"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort("year")}
                  className="flex items-center gap-2 hover:text-teal-500 transition-colors"
                  aria-label="Sort by year"
                >
                  Year
                  {getSortIcon("year")}
                </button>
              </th>
              <th className="text-right py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort("revenue")}
                  className="flex items-center justify-end gap-2 hover:text-teal-500 transition-colors w-full"
                  aria-label="Sort by revenue"
                >
                  Revenue (₹Cr)
                  {getSortIcon("revenue")}
                </button>
              </th>
              <th className="text-right py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort("ebitda")}
                  className="flex items-center justify-end gap-2 hover:text-teal-500 transition-colors w-full"
                  aria-label="Sort by EBITDA"
                >
                  EBITDA (₹Cr)
                  {getSortIcon("ebitda")}
                </button>
              </th>
              <th className="text-right py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort("netProfit")}
                  className="flex items-center justify-end gap-2 hover:text-teal-500 transition-colors w-full"
                  aria-label="Sort by net profit"
                >
                  Net Profit (₹Cr)
                  {getSortIcon("netProfit")}
                </button>
              </th>
              <th className="text-right py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort("eps")}
                  className="flex items-center justify-end gap-2 hover:text-teal-500 transition-colors w-full"
                  aria-label="Sort by EPS"
                >
                  EPS (₹)
                  {getSortIcon("eps")}
                </button>
              </th>
              <th className="text-right py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort("roe")}
                  className="flex items-center justify-end gap-2 hover:text-teal-500 transition-colors w-full"
                  aria-label="Sort by ROE"
                >
                  ROE (%)
                  {getSortIcon("roe")}
                </button>
              </th>
              <th className="text-right py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort("debtEquity")}
                  className="flex items-center justify-end gap-2 hover:text-teal-500 transition-colors w-full"
                  aria-label="Sort by debt to equity"
                >
                  D/E
                  {getSortIcon("debtEquity")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={row.year}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="py-3 px-4 font-medium">{row.year}</td>
                <td className="py-3 px-4 text-right">{row.revenue.toLocaleString("en-IN")}</td>
                <td className="py-3 px-4 text-right">{row.ebitda.toLocaleString("en-IN")}</td>
                <td className="py-3 px-4 text-right">{row.netProfit.toLocaleString("en-IN")}</td>
                <td className="py-3 px-4 text-right">{row.eps.toFixed(1)}</td>
                <td className="py-3 px-4 text-right">{row.roe.toFixed(1)}%</td>
                <td className="py-3 px-4 text-right">{row.debtEquity.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} entries
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-teal-500 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
