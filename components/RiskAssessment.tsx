"use client";

import { useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RiskAssessmentProps {
  symbol: string;
}

const risks = [
  {
    id: 1,
    category: "Industry Disruption",
    severity: "medium",
    title: "Renewable Energy Transition",
    description:
      "Traditional oil & gas business faces long-term pressure from global shift to renewable energy. Company is investing heavily in green energy to mitigate this risk.",
    impact: "Medium",
    likelihood: "High",
    mitigation:
      "₹75,000 crore committed to green hydrogen and renewable energy. Target to be net-zero carbon by 2035.",
  },
  {
    id: 2,
    category: "Regulatory Risk",
    severity: "low",
    title: "Telecom Tariff Regulations",
    description:
      "Potential government intervention in telecom pricing could impact Jio's revenue growth and margins.",
    impact: "Low",
    likelihood: "Medium",
    mitigation:
      "Diversified business model reduces dependence on any single segment. Strong market position provides pricing power.",
  },
  {
    id: 3,
    category: "Market Risk",
    severity: "high",
    title: "Crude Oil Price Volatility",
    description:
      "Refining and petrochemical margins are highly sensitive to crude oil price fluctuations and global demand-supply dynamics.",
    impact: "High",
    likelihood: "High",
    mitigation:
      "Integrated business model provides natural hedges. Inventory management and hedging strategies in place.",
  },
  {
    id: 4,
    category: "Management Risk",
    severity: "low",
    title: "Succession Planning",
    description:
      "Dependence on promoter leadership for strategic direction. Succession transition needs to be managed carefully.",
    impact: "Medium",
    likelihood: "Low",
    mitigation:
      "Professional management team in place. Next generation already involved in key business decisions.",
  },
  {
    id: 5,
    category: "Competitive Risk",
    severity: "medium",
    title: "Retail Competition Intensifying",
    description:
      "E-commerce and quick commerce players are increasing competition in retail segment. Need to adapt to changing consumer behavior.",
    impact: "Medium",
    likelihood: "High",
    mitigation:
      "Strong omnichannel presence. Integration with JioMart and tech platforms. Extensive physical store network.",
  },
  {
    id: 6,
    category: "Financial Risk",
    severity: "low",
    title: "High Capital Intensity",
    description:
      "Business requires continuous large capital investments. Any cash flow disruption could impact growth plans.",
    impact: "Medium",
    likelihood: "Low",
    mitigation:
      "Strong cash generation ability. Proven track record of raising capital. Reducing debt consistently.",
  },
];

export default function RiskAssessment({ symbol }: RiskAssessmentProps) {
  const [expandedRisk, setExpandedRisk] = useState<number | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          icon: "bg-red-100",
          iconColor: "text-red-600",
        };
      case "medium":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
          icon: "bg-yellow-100",
          iconColor: "text-yellow-600",
        };
      default:
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          icon: "bg-green-100",
          iconColor: "text-green-600",
        };
    }
  };

  const toggleRisk = (id: number) => {
    setExpandedRisk(expandedRisk === id ? null : id);
  };

  const overallRisk = "Medium";
  const overallColor = getSeverityColor("medium");

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Risk Assessment</h3>
        <div className={`px-3 py-1 rounded-lg text-sm font-medium ${overallColor.bg} ${overallColor.text}`}>
          Overall Risk: {overallRisk}
        </div>
      </div>

      <div className="space-y-3">
        {risks.map((risk) => {
          const colors = getSeverityColor(risk.severity);
          const isExpanded = expandedRisk === risk.id;

          return (
            <div key={risk.id} className={`border ${colors.border} rounded-lg overflow-hidden transition-all`}>
              <button
                onClick={() => toggleRisk(risk.id)}
                className={`w-full p-4 ${colors.bg} hover:opacity-90 transition-opacity text-left`}
                aria-expanded={isExpanded}
                aria-controls={`risk-detail-${risk.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 ${colors.icon} rounded-lg flex-shrink-0`}>
                    <AlertTriangle className={`w-4 h-4 ${colors.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-medium text-sm">{risk.title}</h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs px-2 py-1 rounded ${colors.text} bg-white`}>
                          {risk.category}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{risk.description}</p>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    id={`risk-detail-${risk.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border-t border-gray-200"
                  >
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Impact Level</div>
                          <div className={`text-sm font-semibold ${colors.text}`}>{risk.impact}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Likelihood</div>
                          <div className={`text-sm font-semibold ${colors.text}`}>{risk.likelihood}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-600 mb-1 font-semibold">Mitigation Strategy</div>
                        <p className="text-sm text-gray-700">{risk.mitigation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="text-red-600 font-semibold text-lg">1</div>
            <div className="text-gray-600">High Risk</div>
          </div>
          <div>
            <div className="text-yellow-600 font-semibold text-lg">2</div>
            <div className="text-gray-600">Medium Risk</div>
          </div>
          <div>
            <div className="text-green-600 font-semibold text-lg">3</div>
            <div className="text-gray-600">Low Risk</div>
          </div>
        </div>
      </div>
    </div>
  );
}
