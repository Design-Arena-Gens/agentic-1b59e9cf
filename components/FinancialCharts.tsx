"use client";

import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";

interface FinancialChartsProps {
  symbol: string;
}

export default function FinancialCharts({ symbol }: FinancialChartsProps) {
  // Revenue Growth YoY
  const revenueData = {
    labels: ["FY20", "FY21", "FY22", "FY23", "FY24"],
    datasets: [
      {
        label: "Revenue (₹ Cr)",
        data: [584000, 542000, 721000, 872000, 965000],
        borderColor: "#008080",
        backgroundColor: "rgba(0, 128, 128, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Profit Margins
  const marginData = {
    labels: ["FY20", "FY21", "FY22", "FY23", "FY24"],
    datasets: [
      {
        label: "Gross Margin %",
        data: [38.5, 36.2, 42.1, 44.8, 46.2],
        backgroundColor: "#10b981",
      },
      {
        label: "Operating Margin %",
        data: [22.3, 20.1, 25.6, 28.4, 30.1],
        backgroundColor: "#008080",
      },
      {
        label: "Net Margin %",
        data: [12.5, 11.2, 14.8, 16.5, 17.8],
        backgroundColor: "#06b6d4",
      },
    ],
  };

  // Debt to Equity & ROE
  const financialMetrics = {
    labels: ["FY20", "FY21", "FY22", "FY23", "FY24"],
    datasets: [
      {
        label: "ROE %",
        data: [15.2, 13.8, 16.5, 17.8, 18.4],
        backgroundColor: "#10b981",
        yAxisID: "y",
      },
      {
        label: "Debt/Equity Ratio",
        data: [1.15, 1.08, 0.95, 0.78, 0.65],
        backgroundColor: "#f59e0b",
        yAxisID: "y1",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ₹${context.parsed.y.toLocaleString("en-IN")} Cr`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `₹${(value / 1000).toFixed(0)}K Cr`,
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `${value}%`,
        },
      },
    },
  };

  const metricsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "ROE %",
        },
        ticks: {
          callback: (value: any) => `${value}%`,
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "D/E Ratio",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Growth */}
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Revenue Growth (YoY)</h3>
          <div className="h-80">
            <Line data={revenueData} options={lineOptions} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600">CAGR (5Y)</div>
              <div className="font-semibold text-green-600">+10.8%</div>
            </div>
            <div>
              <div className="text-gray-600">Latest Growth</div>
              <div className="font-semibold text-green-600">+10.7%</div>
            </div>
          </div>
        </div>

        {/* Profit Margins */}
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Profit Margins Trend</h3>
          <div className="h-80">
            <Bar data={marginData} options={barOptions} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Gross</div>
              <div className="font-semibold text-green-600">46.2%</div>
            </div>
            <div>
              <div className="text-gray-600">Operating</div>
              <div className="font-semibold text-teal-600">30.1%</div>
            </div>
            <div>
              <div className="text-gray-600">Net</div>
              <div className="font-semibold text-cyan-600">17.8%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="card p-6">
        <h3 className="font-semibold mb-4">Key Financial Metrics</h3>
        <div className="h-80">
          <Bar data={financialMetrics} options={metricsOptions} />
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-gray-600">Current ROE</div>
            <div className="font-semibold text-lg text-green-600">18.4%</div>
            <div className="text-xs text-green-600 mt-1">↑ Improving</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="text-sm text-gray-600">Debt/Equity</div>
            <div className="font-semibold text-lg text-yellow-600">0.65</div>
            <div className="text-xs text-green-600 mt-1">↓ Decreasing</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600">ROCE</div>
            <div className="font-semibold text-lg text-blue-600">14.2%</div>
            <div className="text-xs text-green-600 mt-1">↑ Improving</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-gray-600">Interest Cover</div>
            <div className="font-semibold text-lg text-purple-600">5.8x</div>
            <div className="text-xs text-green-600 mt-1">↑ Strong</div>
          </div>
        </div>
      </div>
    </div>
  );
}
