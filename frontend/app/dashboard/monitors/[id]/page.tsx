import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  ArrowLeft,
  Settings,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { MonitorChart } from "@/components/monitor-chart"
import { UptimeChart } from "@/components/uptime-chart"
import { ThemeToggle } from "@/components/theme-toggle"

export default function MonitorDetails({ params }: { params: { id: string } }) {
  const monitor = {
    id: params.id,
    name: "Main Website",
    url: "https://example.com",
    status: "up",
    uptime: "99.9%",
    avgResponse: "245ms",
    lastCheck: "2 minutes ago",
  }

  const incidents = [
    {
      id: 1,
      type: "downtime",
      message: "Connection timeout",
      duration: "5 minutes",
      time: "2 hours ago",
      resolved: true,
    },
    {
      id: 2,
      type: "slow",
      message: "High response time (>2s)",
      duration: "15 minutes",
      time: "1 day ago",
      resolved: true,
    },
    {
      id: 3,
      type: "downtime",
      message: "Server error (500)",
      duration: "2 minutes",
      time: "3 days ago",
      resolved: true,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
        <Link className="flex items-center justify-center group" href="/">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-200">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <span className="ml-3 text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Pinger
          </span>
        </Link>
        <nav className="ml-auto flex gap-3 items-center">
          <ThemeToggle />
          <Button
            variant="outline"
            asChild
            className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent"
          >
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </nav>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
                      {monitor.name}
                    </h1>
                    <Badge
                      variant={monitor.status === "up" ? "default" : "destructive"}
                      className={`${
                        monitor.status === "up"
                          ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 border-emerald-200 dark:border-emerald-800"
                          : "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400"
                      } px-3 py-1`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          monitor.status === "up" ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                        }`}
                      />
                      {monitor.status === "up" ? "Operational" : "Down"}
                    </Badge>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mt-2 font-mono">{monitor.url}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Last checked {monitor.lastCheck}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">SSL expires in 89 days</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent"
              >
                <Shield className="h-4 w-4 mr-2" />
                SSL Details
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25">
                <Zap className="h-4 w-4 mr-2" />
                Run Check
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                title: "Status",
                value: "Operational",
                subtitle: `Last checked ${monitor.lastCheck}`,
                icon: CheckCircle,
                color: "text-emerald-600 dark:text-emerald-400",
                bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
                valueColor: "text-emerald-600 dark:text-emerald-400",
              },
              {
                title: "Uptime (30d)",
                value: monitor.uptime,
                subtitle: "+0.1% from last month",
                icon: TrendingUp,
                color: "text-blue-600 dark:text-blue-400",
                bgColor: "bg-blue-50 dark:bg-blue-950/20",
                valueColor: "text-slate-900 dark:text-white",
              },
              {
                title: "Avg Response",
                value: monitor.avgResponse,
                subtitle: "-12ms from last month",
                icon: Clock,
                color: "text-amber-600 dark:text-amber-400",
                bgColor: "bg-amber-50 dark:bg-amber-950/20",
                valueColor: "text-slate-900 dark:text-white",
              },
              {
                title: "Incidents",
                value: "3",
                subtitle: "-2 from last month",
                icon: AlertTriangle,
                color: "text-red-600 dark:text-red-400",
                bgColor: "bg-red-50 dark:bg-red-950/20",
                valueColor: "text-slate-900 dark:text-white",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</CardTitle>
                  <div
                    className={`p-2 rounded-lg ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform duration-200`}
                  >
                    <stat.icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className={`text-3xl font-bold mb-1 ${stat.valueColor}`}>{stat.value}</div>
                  <div className="flex items-center gap-1">
                    <div className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {stat.subtitle}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-slate-100/50 dark:bg-slate-800/50 p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="response-time"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
              >
                Response Time
              </TabsTrigger>
              <TabsTrigger
                value="uptime"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
              >
                Uptime
              </TabsTrigger>
              <TabsTrigger
                value="incidents"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
              >
                Incidents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-slate-900 dark:text-white">Response Time (24h)</CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          Response time trends over the last 24 hours
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-slate-600 dark:text-slate-400">Response Time</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <MonitorChart />
                  </CardContent>
                </Card>
                <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-slate-900 dark:text-white">Uptime Status</CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          Availability status for the last 30 days
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span className="text-slate-600 dark:text-slate-400">Uptime</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <UptimeChart />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="response-time" className="space-y-6">
              <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Response Time Analysis</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Detailed response time metrics and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MonitorChart />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="uptime" className="space-y-6">
              <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Uptime History</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Historical uptime data and availability metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UptimeChart />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="incidents" className="space-y-6">
              <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Incident History</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Recent incidents and their resolution details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {incidents.map((incident) => (
                      <div
                        key={incident.id}
                        className="group flex items-start space-x-4 p-4 rounded-lg border border-slate-200/60 dark:border-slate-700/60 bg-slate-50/30 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
                      >
                        <div
                          className={`w-3 h-3 rounded-full mt-1 ${
                            incident.type === "downtime"
                              ? "bg-red-500 shadow-lg shadow-red-500/50"
                              : "bg-amber-500 shadow-lg shadow-amber-500/50"
                          }`}
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-slate-900 dark:text-white">{incident.message}</p>
                            <Badge
                              variant="outline"
                              className="text-xs bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                            >
                              {incident.resolved ? "Resolved" : "Active"}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Duration: <span className="font-mono">{incident.duration}</span> • {incident.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
