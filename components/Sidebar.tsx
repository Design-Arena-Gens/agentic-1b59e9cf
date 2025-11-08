"use client";

import { X, Home, BarChart3, Bell, HelpCircle, User, Settings, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStock: string;
  onStockSelect: (symbol: string) => void;
}

const watchlistStocks = [
  { symbol: "RELIANCE", change: "+2.3%" },
  { symbol: "TCS", change: "-0.8%" },
  { symbol: "HDFCBANK", change: "+1.5%" },
  { symbol: "INFY", change: "+0.9%" },
  { symbol: "ICICIBANK", change: "+1.2%" },
];

export default function Sidebar({ isOpen, onClose, selectedStock, onStockSelect }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: isOpen ? 0 : -280 }}
          exit={{ x: -280 }}
          transition={{ type: "spring", damping: 20 }}
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col ${
            isOpen || "hidden lg:flex"
          }`}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between lg:hidden">
            <h2 className="font-semibold text-lg">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4" aria-label="Main navigation">
            <div className="space-y-1">
              <a
                href="#dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
              <a
                href="#analysis"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Analysis</span>
              </a>
              <a
                href="#alerts"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span>Alerts</span>
              </a>
              <a
                href="#help"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Help & FAQ</span>
              </a>
            </div>

            <div className="mt-8">
              <h3 className="px-3 mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Watchlist
              </h3>
              <div className="space-y-1">
                {watchlistStocks.map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => {
                      onStockSelect(stock.symbol);
                      if (typeof window !== 'undefined' && window.innerWidth < 1024) onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      selectedStock === stock.symbol
                        ? "bg-teal-50 text-teal-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-medium">{stock.symbol}</span>
                    <span
                      className={`text-sm ${
                        stock.change.startsWith("+") ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stock.change}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200 space-y-1">
            <a
              href="#profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </a>
            <a
              href="#settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </div>
        </motion.aside>
      </AnimatePresence>
    </>
  );
}
