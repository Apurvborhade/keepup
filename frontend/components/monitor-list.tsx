import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MoreHorizontal, ExternalLink, Settings, Trash2, TrendingUp, TrendingDown, Activity } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useEffect, useState } from "react"
import AxiosInstance from "@/lib/axios"
import { useMonitorStore } from "@/store/useMonitorStore"
import { useMonitors } from "@/store/useMonitors"
import { Skeleton } from "./ui/skeleton"

const monitorsDummy = [
  {
    id: "1",
    name: "Production Website",
    url: "https://myapp.com",
    status: "up",
    uptime: "99.98%",
    responseTime: "187ms",
    lastCheck: "30 seconds ago",
    trend: "stable",
    location: "Global",
    ssl: "Valid",
  },
  {
    id: "2",
    name: "API Gateway v2",
    url: "https://api.myapp.com/v2",
    status: "up",
    uptime: "100%",
    responseTime: "89ms",
    lastCheck: "45 seconds ago",
    trend: "improving",
    location: "US-East",
    ssl: "Valid",
  },
  {
    id: "3",
    name: "Database Cluster",
    url: "db-cluster.internal:5432",
    status: "up",
    uptime: "99.95%",
    responseTime: "12ms",
    lastCheck: "1 minute ago",
    trend: "stable",
    location: "EU-West",
    ssl: "N/A",
  },
  {
    id: "4",
    name: "CDN Distribution",
    url: "https://cdn.myapp.com",
    status: "warning",
    uptime: "98.7%",
    responseTime: "1.2s",
    lastCheck: "2 minutes ago",
    trend: "degrading",
    location: "Multi-region",
    ssl: "Expires in 30d",
  },
  {
    id: "5",
    name: "Payment Service",
    url: "https://payments.myapp.com",
    status: "down",
    uptime: "95.2%",
    responseTime: "timeout",
    lastCheck: "5 minutes ago",
    trend: "critical",
    location: "US-West",
    ssl: "Valid",
  },
]
export interface Monitor {
  id: string;
  userId: string;
  user: {
    id: string;
    username: string;
    email: string;
    monitors: Monitor;
  };
  name: string;
  url: string;
  intervalSec: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  histories: Array<{
    id: string;
    monitorId: string;
    monitor: Monitor;
    statusCode: number;
    success: boolean;
    latencyMs: number;
    checkedAt: Date;
    error: string
  }>;
}

export function MonitorList() {
  const monitors = useMonitorStore((state) => state.monitors)
  const { isLoading, error } = useMonitors()



  return (
    <div className="space-y-3">
      {isLoading ? (
        <>
          <MonitorCardSkeleton />
          <MonitorCardSkeleton />
        </>
      ) : monitors.length !== 0 ? monitors.map((monitor) => (
        <Card
          key={monitor.id}
          className="group border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-900/80 hover:shadow-lg hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-0.5"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Status dot */}
                <div className="relative">
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-lg ${monitor.histories[0]?.success
                        ? "bg-emerald-500 shadow-emerald-500/50"
                        : "bg-red-500 shadow-red-500/50"
                      }`}
                  />
                  {monitor.histories[0]?.success && (
                    <div className="absolute inset-0 w-4 h-4 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {monitor.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs">
                      {monitor.url}
                    </span>
                    <span className="text-xs">⏱ {monitor.intervalSec}s interval</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                {/* Uptime */}
                <div className="text-center space-y-1">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {(() => {
                      if (!monitor.histories.length) return "N/A";
                      const successCount = monitor.histories.filter(h => h.success).length;
                      const uptimePercent = ((successCount / monitor.histories.length) * 100).toFixed(1);
                      return `${uptimePercent}%`;
                    })()}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Uptime</p>
                </div>

                {/* Response time */}
                <div className="text-center space-y-1">
                  <p
                    className={`text-lg font-bold font-mono ${monitor.histories[0]?.latencyMs > 1000
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-emerald-600 dark:text-emerald-400"
                      }`}
                  >
                    {monitor.histories[0]?.latencyMs
                      ? `${monitor.histories[0].latencyMs}ms`
                      : "N/A"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Response</p>
                </div>

                {/* Status Badge */}
                <div className="text-center space-y-1">
                  <Badge
                    variant={
                      monitor.histories[0]?.success ? "default" : "destructive"
                    }
                    className={`font-medium px-3 py-1 ${monitor.histories[0]?.success
                        ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                        : "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                      }`}
                  >
                    {monitor.histories[0]?.success ? "Operational" : "Down"}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/monitors/${monitor.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" /> Configure
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Activity className="h-4 w-4 mr-2" /> View Logs
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div>
                Last checked{" "}
                {monitor.histories[0]?.checkedAt
                  ? new Date(monitor.histories[0].checkedAt).toLocaleString()
                  : "N/A"}
              </div>
              <div>
                Created {new Date(monitor.createdAt).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

      )) : (
        <>
          No Monitors
        </>
      )}

    </div>
  )
}


function MonitorCardSkeleton() {
  return (
    <Card className="group border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Left side: status + info */}
          <div className="flex items-center space-x-4">
            {/* Status dot */}
            <Skeleton className="w-4 h-4 rounded-full" />

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-32" /> {/* Name */}
                <Skeleton className="h-3 w-3 rounded" /> {/* Trend icon */}
              </div>

              <div className="flex items-center gap-4 text-sm">
                <Skeleton className="h-4 w-28 rounded" /> {/* URL */}
                <Skeleton className="h-4 w-20 rounded" /> {/* Location */}
                <Skeleton className="h-4 w-24 rounded" /> {/* SSL */}
              </div>
            </div>
          </div>

          {/* Right side: metrics + actions */}
          <div className="flex items-center space-x-8">
            {/* Uptime */}
            <div className="text-center space-y-1">
              <Skeleton className="h-5 w-14 mx-auto" /> {/* Uptime value */}
              <Skeleton className="h-3 w-12 mx-auto" /> {/* Label */}
            </div>

            {/* Response Time */}
            <div className="text-center space-y-1">
              <Skeleton className="h-5 w-14 mx-auto" />
              <Skeleton className="h-3 w-14 mx-auto" />
            </div>

            {/* Status Badge */}
            <Skeleton className="h-6 w-20 rounded-full" />

            {/* Action buttons */}
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-3 w-32" /> {/* Last checked */}
          <div className="flex items-center gap-4 text-xs">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}