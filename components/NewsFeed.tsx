"use client";

import { useState } from "react";
import { ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface NewsFeedProps {
  symbol: string;
}

const newsItems = [
  {
    id: 1,
    title: "Reliance Industries announces major capex for green energy projects",
    source: "Economic Times",
    time: "2 hours ago",
    sentiment: "positive",
    summary: "RIL commits ₹75,000 crore investment in renewable energy and hydrogen projects over next 3 years",
    url: "#",
  },
  {
    id: 2,
    title: "Q4 results exceed analyst expectations with 12% YoY growth",
    source: "Reuters",
    time: "5 hours ago",
    sentiment: "positive",
    summary: "Strong performance in retail and telecom segments drives growth",
    url: "#",
  },
  {
    id: 3,
    title: "Regulatory filing: Promoter stake remains unchanged at 50.3%",
    source: "BSE Filing",
    time: "1 day ago",
    sentiment: "neutral",
    summary: "Mandatory quarterly shareholding pattern disclosure",
    url: "#",
  },
  {
    id: 4,
    title: "Oil & Gas segment faces margin pressure amid global volatility",
    source: "Business Standard",
    time: "1 day ago",
    sentiment: "negative",
    summary: "Refining margins compress due to crude price fluctuations",
    url: "#",
  },
  {
    id: 5,
    title: "Jio Platforms secures strategic partnership with global tech major",
    source: "MoneyControl",
    time: "2 days ago",
    sentiment: "positive",
    summary: "Deal expected to enhance 5G infrastructure and cloud services",
    url: "#",
  },
  {
    id: 6,
    title: "Board approves final dividend of ₹9 per share",
    source: "NSE Announcement",
    time: "2 days ago",
    sentiment: "positive",
    summary: "Annual dividend payout ratio maintained at industry-leading levels",
    url: "#",
  },
];

export default function NewsFeed({ symbol }: NewsFeedProps) {
  const [filter, setFilter] = useState<"all" | "positive" | "neutral" | "negative">("all");

  const filteredNews = filter === "all" ? newsItems : newsItems.filter((item) => item.sentiment === filter);

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "negative":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800";
      case "negative":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSentimentBorder = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "border-l-green-500";
      case "negative":
        return "border-l-red-500";
      default:
        return "border-l-gray-400";
    }
  };

  const sentimentCounts = {
    positive: newsItems.filter((item) => item.sentiment === "positive").length,
    neutral: newsItems.filter((item) => item.sentiment === "neutral").length,
    negative: newsItems.filter((item) => item.sentiment === "negative").length,
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">News & Market Sentiment</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              filter === "all" ? "bg-teal-500 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("positive")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1 ${
              filter === "positive" ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
            aria-label={`Filter positive news, ${sentimentCounts.positive} items`}
          >
            <TrendingUp className="w-3 h-3" />
            <span className="hidden sm:inline">{sentimentCounts.positive}</span>
          </button>
          <button
            onClick={() => setFilter("neutral")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1 ${
              filter === "neutral" ? "bg-gray-500 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
            aria-label={`Filter neutral news, ${sentimentCounts.neutral} items`}
          >
            <Minus className="w-3 h-3" />
            <span className="hidden sm:inline">{sentimentCounts.neutral}</span>
          </button>
          <button
            onClick={() => setFilter("negative")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1 ${
              filter === "negative" ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
            aria-label={`Filter negative news, ${sentimentCounts.negative} items`}
          >
            <TrendingDown className="w-3 h-3" />
            <span className="hidden sm:inline">{sentimentCounts.negative}</span>
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className={`p-4 border-l-4 ${getSentimentBorder(
              item.sentiment
            )} bg-white rounded-lg hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {getSentimentIcon(item.sentiment)}
                  <h4 className="font-medium text-sm leading-snug">{item.title}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.summary}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="font-medium">{item.source}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                  <a
                    href={item.url}
                    className="ml-auto flex items-center gap-1 text-teal-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-600">
          <strong>Sentiment Analysis:</strong> {sentimentCounts.positive} Positive, {sentimentCounts.neutral} Neutral,{" "}
          {sentimentCounts.negative} Negative
        </div>
      </div>
    </div>
  );
}
