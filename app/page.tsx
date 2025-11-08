"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import { Menu } from "lucide-react";

export default function Home() {
  const [selectedStock, setSelectedStock] = useState("RELIANCE");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-teal-500 font-bold">Multibagger Stock Analyzer</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#dashboard" className="hover:text-teal-500 transition-colors">
                Dashboard
              </a>
              <a href="#watchlist" className="hover:text-teal-500 transition-colors">
                Watchlist
              </a>
              <a href="#alerts" className="hover:text-teal-500 transition-colors">
                Alerts
              </a>
              <a href="#help" className="hover:text-teal-500 transition-colors">
                Help
              </a>
              <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                Sign In
              </button>
            </nav>
          </div>
          <SearchBar onStockSelect={setSelectedStock} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          selectedStock={selectedStock}
          onStockSelect={setSelectedStock}
        />

        {/* Dashboard */}
        <main className="flex-1 overflow-auto">
          <Dashboard selectedStock={selectedStock} />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs text-gray-600 space-y-2">
            <p>
              <strong>Data Sources:</strong> BSE/NSE (delayed 15 minutes), Financial statements from company filings,
              News aggregated from Reuters, Economic Times, Business Standard, MoneyControl.
            </p>
            <p>
              <strong>Disclaimer:</strong> This platform is for informational purposes only and does not constitute
              financial advice. Investment in securities market are subject to market risks. Read all the related
              documents carefully before investing. Past performance is not indicative of future results. Please consult
              with a qualified financial advisor before making investment decisions.
            </p>
            <p className="text-center pt-2 border-t border-gray-200">
              © 2024 Multibagger Stock Analyzer. All rights reserved. |
              <a href="#privacy" className="text-teal-500 hover:underline ml-1">Privacy Policy</a> |
              <a href="#terms" className="text-teal-500 hover:underline ml-1">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
