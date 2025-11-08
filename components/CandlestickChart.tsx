"use client";

import { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

ChartJS.register(...registerables);

interface CandlestickChartProps {
  symbol: string;
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const timeframes = ["1M", "3M", "6M", "1Y", "3Y", "5Y", "Max"];

const generateOHLCData = (days: number) => {
  const data = [];
  let basePrice = 2400;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const open = basePrice + (Math.random() - 0.5) * 50;
    const close = open + (Math.random() - 0.5) * 100;
    const high = Math.max(open, close) + Math.random() * 50;
    const low = Math.min(open, close) - Math.random() * 50;

    data.push({
      x: date.getTime(),
      o: open,
      h: high,
      l: low,
      c: close,
    });

    basePrice = close;
  }

  return data;
};

export default function CandlestickChart({ symbol, timeframe, onTimeframeChange }: CandlestickChartProps) {
  const chartRef = useRef<any>(null);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const daysMap: Record<string, number> = {
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "1Y": 365,
      "3Y": 1095,
      "5Y": 1825,
      "Max": 3650,
    };

    const days = daysMap[timeframe] || 365;
    const data = generateOHLCData(days);

    const lineData = data.map(d => ({
      x: d.x,
      y: d.c
    }));

    setChartData({
      datasets: [
        {
          label: symbol,
          data: lineData,
          borderColor: "#008080",
          backgroundColor: "rgba(0, 128, 128, 0.1)",
          tension: 0.1,
          fill: true,
        },
      ],
    });
  }, [symbol, timeframe]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `Price: ₹${context.parsed.y.toFixed(2)}`;
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x" as const,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x" as const,
        },
      },
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: timeframe === "1M" ? "day" : timeframe === "3M" || timeframe === "6M" ? "week" : "month",
        },
        grid: {
          display: false,
        },
      },
      y: {
        position: "right" as const,
        ticks: {
          callback: (value: any) => `₹${value.toFixed(0)}`,
        },
      },
    },
  };

  const handleZoomIn = () => {
    if (chartRef.current) {
      chartRef.current.zoom(1.1);
    }
  };

  const handleZoomOut = () => {
    if (chartRef.current) {
      chartRef.current.zoom(0.9);
    }
  };

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <div className="card p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h3 className="font-semibold">Price Chart (OHLC)</h3>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Reset zoom"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          <select
            value={timeframe}
            onChange={(e) => onTimeframeChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            aria-label="Select timeframe"
          >
            {timeframes.map((tf) => (
              <option key={tf} value={tf}>
                {tf}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-96">
        {chartData && (
          <Chart ref={chartRef} type="line" data={chartData} options={options as any} />
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-teal-500 rounded"></div>
          <span>Price Trend</span>
        </div>
        <div className="text-xs">
          Pan: Click & drag | Zoom: Scroll wheel or pinch
        </div>
      </div>
    </div>
  );
}
