import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MoreHorizontal, ExternalLink, Settings, Trash2, TrendingUp, TrendingDown, Activity } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const monitors = [
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

export function MonitorList() {
  return (
    <div className="space-y-3">
      {monitors.map((monitor) => (
        <Card
          key={monitor.id}
          className="group border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-900/80 hover:shadow-lg hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-0.5"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-lg ${
                      monitor.status === "up"
                        ? "bg-emerald-500 shadow-emerald-500/50"
                        : monitor.status === "warning"
                          ? "bg-amber-500 shadow-amber-500/50"
                          : "bg-red-500 shadow-red-500/50"
                    }`}
                  />
                  {monitor.status === "up" && (
                    <div className="absolute inset-0 w-4 h-4 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {monitor.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {monitor.trend === "improving" && <TrendingUp className="h-3 w-3 text-emerald-500" />}
                      {monitor.trend === "degrading" && <TrendingDown className="h-3 w-3 text-amber-500" />}
                      {monitor.trend === "critical" && <Activity className="h-3 w-3 text-red-500" />}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs">
                      {monitor.url}
                    </span>
                    <span className="text-xs">📍 {monitor.location}</span>
                    {monitor.ssl !== "N/A" && (
                      <span
                        className={`text-xs ${monitor.ssl.includes("Expires") ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}
                      >
                        🔒 {monitor.ssl}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center space-y-1">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{monitor.uptime}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Uptime</p>
                </div>
                <div className="text-center space-y-1">
                  <p
                    className={`text-lg font-bold font-mono ${
                      monitor.responseTime === "timeout"
                        ? "text-red-600 dark:text-red-400"
                        : Number.parseInt(monitor.responseTime) > 1000
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {monitor.responseTime}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Response</p>
                </div>
                <div className="text-center space-y-1">
                  <Badge
                    variant={
                      monitor.status === "up" ? "default" : monitor.status === "warning" ? "secondary" : "destructive"
                    }
                    className={`font-medium px-3 py-1 ${
                      monitor.status === "up"
                        ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 border-emerald-200 dark:border-emerald-800"
                        : monitor.status === "warning"
                          ? "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                          : "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                    }`}
                  >
                    {monitor.status === "up" ? "Operational" : monitor.status === "warning" ? "Degraded" : "Down"}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 bg-transparent"
                    asChild
                  >
                    <Link href={`/dashboard/monitors/${monitor.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-transparent"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-slate-200 dark:border-slate-800"
                    >
                      <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-slate-800">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-slate-800">
                        <Activity className="h-4 w-4 mr-2" />
                        View Logs
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-500 dark:text-slate-400">Last checked {monitor.lastCheck}</div>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span>Next check in 2 minutes</span>
                <span>•</span>
                <span>Check interval: 5 minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
