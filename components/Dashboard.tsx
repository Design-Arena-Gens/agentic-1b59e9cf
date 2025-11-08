"use client";

import { useState } from "react";
import StockHeader from "./StockHeader";
import MultibaggerGauge from "./MultibaggerGauge";
import CandlestickChart from "./CandlestickChart";
import FinancialCharts from "./FinancialCharts";
import NewsFeed from "./NewsFeed";
import RiskAssessment from "./RiskAssessment";
import DataTable from "./DataTable";
import AlertManager from "./AlertManager";

interface DashboardProps {
  selectedStock: string;
}

export default function Dashboard({ selectedStock }: DashboardProps) {
  const [timeframe, setTimeframe] = useState("1Y");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Stock Header */}
        <StockHeader symbol={selectedStock} />

        {/* Multibagger Score & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <MultibaggerGauge symbol={selectedStock} />
          </div>
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Key Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Market Cap</div>
                  <div className="font-semibold text-lg">₹15.2T</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">P/E Ratio</div>
                  <div className="font-semibold text-lg">24.5</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">ROE</div>
                  <div className="font-semibold text-lg text-green-600">18.4%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Debt/Equity</div>
                  <div className="font-semibold text-lg">0.65</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">EPS (TTM)</div>
                  <div className="font-semibold text-lg">₹102.5</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Div Yield</div>
                  <div className="font-semibold text-lg">0.52%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">52W High</div>
                  <div className="font-semibold text-lg">₹2,856</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">52W Low</div>
                  <div className="font-semibold text-lg">₹2,220</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Chart */}
        <CandlestickChart
          symbol={selectedStock}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
        />

        {/* Financial Charts */}
        <FinancialCharts symbol={selectedStock} />

        {/* News & Risk Assessment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <NewsFeed symbol={selectedStock} />
          <RiskAssessment symbol={selectedStock} />
        </div>

        {/* Alert Manager */}
        <AlertManager symbol={selectedStock} />

        {/* Financial Data Table */}
        <DataTable symbol={selectedStock} />
      </div>
    </div>
  );
}
