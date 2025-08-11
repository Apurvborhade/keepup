"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { time: "00:00", responseTime: 245, uptime: 100 },
  { time: "02:00", responseTime: 189, uptime: 100 },
  { time: "04:00", responseTime: 267, uptime: 100 },
  { time: "06:00", responseTime: 298, uptime: 100 },
  { time: "08:00", responseTime: 234, uptime: 100 },
  { time: "10:00", responseTime: 189, uptime: 100 },
  { time: "12:00", responseTime: 245, uptime: 100 },
  { time: "14:00", responseTime: 312, uptime: 100 },
  { time: "16:00", responseTime: 278, uptime: 100 },
  { time: "18:00", responseTime: 198, uptime: 100 },
  { time: "20:00", responseTime: 234, uptime: 100 },
  { time: "22:00", responseTime: 267, uptime: 100 },
  { time: "24:00", responseTime: 245, uptime: 100 },
]

export function MonitorChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
        <XAxis
          dataKey="time"
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          axisLine={{ stroke: "hsl(var(--border))" }}
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
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "6px",
            color: "hsl(var(--popover-foreground))",
          }}
        />
        <Line
          type="monotone"
          dataKey="responseTime"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
