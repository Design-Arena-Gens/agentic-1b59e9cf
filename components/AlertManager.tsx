"use client";

import { useState } from "react";
import { Bell, Plus, X, Mail, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AlertManagerProps {
  symbol: string;
}

interface Alert {
  id: number;
  type: "price" | "news";
  condition: string;
  value: string;
  channel: "email" | "push" | "both";
  enabled: boolean;
}

export default function AlertManager({ symbol }: AlertManagerProps) {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: "price",
      condition: "above",
      value: "2500",
      channel: "both",
      enabled: true,
    },
    {
      id: 2,
      type: "price",
      condition: "below",
      value: "2300",
      channel: "email",
      enabled: true,
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAlert, setNewAlert] = useState<Partial<Alert>>({
    type: "price",
    condition: "above",
    value: "",
    channel: "both",
    enabled: true,
  });

  const handleAddAlert = () => {
    if (newAlert.value) {
      const alert: Alert = {
        id: Date.now(),
        type: newAlert.type as "price" | "news",
        condition: newAlert.condition || "above",
        value: newAlert.value,
        channel: newAlert.channel as "email" | "push" | "both",
        enabled: true,
      };
      setAlerts([...alerts, alert]);
      setNewAlert({
        type: "price",
        condition: "above",
        value: "",
        channel: "both",
        enabled: true,
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const toggleAlert = (id: number) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
      )
    );
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Price & News Alerts
        </h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Alert
        </button>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No alerts configured. Add your first alert to get started.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 border rounded-lg transition-all ${
                alert.enabled
                  ? "border-gray-200 bg-white"
                  : "border-gray-100 bg-gray-50 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={alert.enabled}
                      onChange={() => toggleAlert(alert.id)}
                      className="w-4 h-4 text-teal-500 rounded focus:ring-2 focus:ring-teal-500"
                      aria-label={`Toggle alert ${alert.id}`}
                    />
                    <span className="font-medium">
                      {alert.type === "price" ? "Price Alert" : "News Alert"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">
                    {alert.type === "price" ? (
                      <>
                        Notify when price goes{" "}
                        <span className="font-semibold">{alert.condition}</span>{" "}
                        <span className="font-semibold">₹{alert.value}</span>
                      </>
                    ) : (
                      <>
                        Notify on <span className="font-semibold">{alert.value}</span> news
                      </>
                    )}
                  </p>
                  <div className="flex items-center gap-2 mt-2 ml-6">
                    {(alert.channel === "email" || alert.channel === "both") && (
                      <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        <Mail className="w-3 h-3" />
                        Email
                      </span>
                    )}
                    {(alert.channel === "push" || alert.channel === "both") && (
                      <span className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        <Smartphone className="w-3 h-3" />
                        Push
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteAlert(alert.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Delete alert"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Alert Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black bg-opacity-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-lg shadow-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="font-bold text-lg">Add New Alert</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alert Type
                  </label>
                  <select
                    value={newAlert.type}
                    onChange={(e) =>
                      setNewAlert({ ...newAlert, type: e.target.value as "price" | "news" })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="price">Price Alert</option>
                    <option value="news">News Alert</option>
                  </select>
                </div>

                {newAlert.type === "price" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Condition
                      </label>
                      <select
                        value={newAlert.condition}
                        onChange={(e) =>
                          setNewAlert({ ...newAlert, condition: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="above">Goes Above</option>
                        <option value="below">Goes Below</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        value={newAlert.value}
                        onChange={(e) =>
                          setNewAlert({ ...newAlert, value: e.target.value })
                        }
                        placeholder="Enter price"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </>
                )}

                {newAlert.type === "news" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keywords
                    </label>
                    <input
                      type="text"
                      value={newAlert.value}
                      onChange={(e) =>
                        setNewAlert({ ...newAlert, value: e.target.value })
                      }
                      placeholder="e.g., acquisition, merger, earnings"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Channel
                  </label>
                  <select
                    value={newAlert.channel}
                    onChange={(e) =>
                      setNewAlert({
                        ...newAlert,
                        channel: e.target.value as "email" | "push" | "both",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="both">Email & Push</option>
                    <option value="email">Email Only</option>
                    <option value="push">Push Only</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddAlert}
                    disabled={!newAlert.value}
                    className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Alert
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
