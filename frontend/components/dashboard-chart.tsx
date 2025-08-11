"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { time: "00:00", responseTime: 245 },
  { time: "04:00", responseTime: 189 },
  { time: "08:00", responseTime: 267 },
  { time: "12:00", responseTime: 298 },
  { time: "16:00", responseTime: 234 },
  { time: "20:00", responseTime: 189 },
  { time: "24:00", responseTime: 245 },
]

export function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorResponseTime" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
        <XAxis
          dataKey="time"
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          className="text-xs fill-muted-foreground"
        />
        <YAxis
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          label={{
            value: "Response Time (ms)",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fill: "hsl(var(--muted-foreground))" },
          }}
          className="text-xs fill-muted-foreground"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "6px",
            color: "hsl(var(--popover-foreground))",
          }}
        />
        <Area
          type="monotone"
          dataKey="responseTime"
          stroke="hsl(var(--primary))"
          fillOpacity={1}
          fill="url(#colorResponseTime)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
