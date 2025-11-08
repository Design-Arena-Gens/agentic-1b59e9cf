"use client";

import { useState } from "react";
import { Info, X, TrendingUp, Users, Shield, Target, Zap, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MultibaggerGaugeProps {
  symbol: string;
}

const scoreData: Record<string, any> = {
  RELIANCE: {
    score: 82,
    factors: [
      {
        name: "Market Size & Growth",
        score: 85,
        description: "Operating in large, growing markets with significant runway for expansion",
        icon: Target,
      },
      {
        name: "Competitive Advantages",
        score: 88,
        description: "Strong moats including brand value, scale advantages, and vertical integration",
        icon: Shield,
      },
      {
        name: "Management Quality",
        score: 90,
        description: "Experienced leadership with proven track record of execution and capital allocation",
        icon: Users,
      },
      {
        name: "Financial Strength",
        score: 75,
        description: "Solid balance sheet with improving cash flows and manageable debt levels",
        icon: TrendingUp,
      },
      {
        name: "Innovation & Adaptability",
        score: 80,
        description: "Demonstrated ability to pivot and invest in emerging growth areas",
        icon: Zap,
      },
      {
        name: "ESG & Governance",
        score: 72,
        description: "Improving environmental practices and strong corporate governance standards",
        icon: Award,
      },
    ],
  },
  TCS: {
    score: 78,
    factors: [
      { name: "Market Size & Growth", score: 80, description: "Large addressable market in IT services", icon: Target },
      { name: "Competitive Advantages", score: 85, description: "Strong client relationships and delivery capabilities", icon: Shield },
      { name: "Management Quality", score: 82, description: "Stable leadership with strategic vision", icon: Users },
      { name: "Financial Strength", score: 90, description: "Excellent cash generation and zero debt", icon: TrendingUp },
      { name: "Innovation & Adaptability", score: 70, description: "Investing in digital transformation services", icon: Zap },
      { name: "ESG & Governance", score: 75, description: "Good ESG practices and transparency", icon: Award },
    ],
  },
};

export default function MultibaggerGauge({ symbol }: MultibaggerGaugeProps) {
  const [showModal, setShowModal] = useState(false);
  const data = scoreData[symbol] || scoreData.RELIANCE;
  const score = data.score;

  const getColor = (value: number) => {
    if (value >= 80) return "#10b981";
    if (value >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 100) * circumference;

  return (
    <>
      <div className="card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          Multibagger Potential Score
          <button
            onClick={() => setShowModal(true)}
            className="text-gray-400 hover:text-teal-500 transition-colors"
            aria-label="View score breakdown"
          >
            <Info className="w-4 h-4" />
          </button>
        </h3>

        <button
          onClick={() => setShowModal(true)}
          className="w-full flex flex-col items-center py-4 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label={`Multibagger score ${score} out of 100. Click for details.`}
        >
          <div className="relative w-48 h-48">
            <svg className="transform -rotate-90 w-48 h-48">
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r="70"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="96"
                cy="96"
                r="70"
                stroke={getColor(score)}
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold" style={{ color: getColor(score) }}>
                {score}
              </div>
              <div className="text-sm text-gray-600">out of 100</div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className={`text-lg font-semibold ${
              score >= 80 ? "text-green-600" : score >= 60 ? "text-yellow-600" : "text-red-600"
            }`}>
              {score >= 80 ? "High Potential" : score >= 60 ? "Moderate Potential" : "Low Potential"}
            </div>
            <div className="text-sm text-gray-600 mt-1">Click for detailed breakdown</div>
          </div>
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black bg-opacity-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="font-bold text-xl">Multibagger Score Breakdown</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="text-center pb-6 border-b border-gray-200">
                  <div className="text-5xl font-bold mb-2" style={{ color: getColor(score) }}>
                    {score}/100
                  </div>
                  <p className="text-gray-600">
                    This score is calculated based on multiple factors that contribute to a company&apos;s
                    potential to become a multibagger investment.
                  </p>
                </div>

                <div className="space-y-4">
                  {data.factors.map((factor: any, index: number) => {
                    const Icon = factor.icon;
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-teal-50 rounded-lg">
                            <Icon className="w-5 h-5 text-teal-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{factor.name}</h4>
                              <span
                                className="text-lg font-bold"
                                style={{ color: getColor(factor.score) }}
                              >
                                {factor.score}/100
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{factor.description}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${factor.score}%`,
                                  backgroundColor: getColor(factor.score),
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Disclaimer:</strong> This score is generated using AI analysis and historical data.
                    It should not be the sole basis for investment decisions. Always conduct thorough research
                    and consult with financial advisors before investing.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
