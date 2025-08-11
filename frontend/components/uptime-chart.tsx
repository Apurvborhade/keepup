"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { day: "Mon", uptime: 99.9 },
  { day: "Tue", uptime: 100 },
  { day: "Wed", uptime: 98.5 },
  { day: "Thu", uptime: 100 },
  { day: "Fri", uptime: 99.8 },
  { day: "Sat", uptime: 100 },
  { day: "Sun", uptime: 99.9 },
]

export function UptimeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
        <XAxis
          dataKey="day"
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          axisLine={{ stroke: "hsl(var(--border))" }}
        />
        <YAxis
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          domain={[95, 100]}
          label={{
            value: "Uptime (%)",
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
          formatter={(value) => [`${value}%`, "Uptime"]}
        />
        <Bar dataKey="uptime" fill="hsl(142.1 76.2% 36.3%)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
