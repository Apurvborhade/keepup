"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts"

const data = [
  { time: "00:00", responseTime: 245, uptime: 100, incidents: 0 },
  { time: "02:00", responseTime: 189, uptime: 100, incidents: 0 },
  { time: "04:00", responseTime: 267, uptime: 99.8, incidents: 1 },
  { time: "06:00", responseTime: 298, uptime: 99.9, incidents: 0 },
  { time: "08:00", responseTime: 234, uptime: 100, incidents: 0 },
  { time: "10:00", responseTime: 189, uptime: 100, incidents: 0 },
  { time: "12:00", responseTime: 312, uptime: 99.7, incidents: 1 },
  { time: "14:00", responseTime: 187, uptime: 100, incidents: 0 },
  { time: "16:00", responseTime: 156, uptime: 100, incidents: 0 },
  { time: "18:00", responseTime: 203, uptime: 100, incidents: 0 },
  { time: "20:00", responseTime: 178, uptime: 100, incidents: 0 },
  { time: "22:00", responseTime: 245, uptime: 100, incidents: 0 },
]

export function DashboardChart() {
  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorResponseTime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.3} />
              <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity={0.1} />
              <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgb(148, 163, 184)"
            strokeOpacity={0.2}
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="time"
            tick={{ fill: "rgb(100, 116, 139)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            className="text-xs"
          />
          <YAxis
            tick={{ fill: "rgb(100, 116, 139)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Response Time (ms)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "rgb(100, 116, 139)", fontSize: "12px" },
            }}
            className="text-xs"
          />
          <ReferenceLine
            y={200}
            stroke="rgb(239, 68, 68)"
            strokeDasharray="2 2"
            strokeOpacity={0.5}
            label={{ value: "SLA Threshold", position: "topRight", fill: "rgb(239, 68, 68)", fontSize: 10 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid rgb(226, 232, 240)",
              borderRadius: "8px",
              color: "rgb(15, 23, 42)",
              fontSize: "12px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(8px)",
            }}
            labelStyle={{ color: "rgb(51, 65, 85)", fontWeight: "500" }}
            formatter={(value: any, name: string) => [
              `${value}${name === "responseTime" ? "ms" : "%"}`,
              name === "responseTime" ? "Response Time" : "Uptime",
            ]}
          />
          <Area
            type="monotone"
            dataKey="responseTime"
            stroke="rgb(59, 130, 246)"
            fillOpacity={1}
            fill="url(#colorResponseTime)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 4,
              fill: "rgb(59, 130, 246)",
              stroke: "white",
              strokeWidth: 2,
              filter: "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">187ms</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Avg Response</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">99.97%</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Uptime (24h)</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">2</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Incidents</div>
        </div>
      </div>
    </div>
  )
}
