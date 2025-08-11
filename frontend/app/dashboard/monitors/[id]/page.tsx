import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, ArrowLeft, Settings, Clock, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link className="flex items-center justify-center" href="/">
          <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="ml-2 text-xl font-bold">Pinger</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </nav>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Monitor Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold tracking-tight">{monitor.name}</h1>
                <Badge
                  variant={monitor.status === "up" ? "default" : "destructive"}
                  className={monitor.status === "up" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-1 ${monitor.status === "up" ? "bg-green-500" : "bg-red-500"}`}
                  />
                  {monitor.status === "up" ? "Operational" : "Down"}
                </Badge>
              </div>
              <p className="text-muted-foreground">{monitor.url}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Operational</div>
                <p className="text-xs text-muted-foreground">Last checked {monitor.lastCheck}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uptime (30d)</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monitor.uptime}</div>
                <p className="text-xs text-muted-foreground">+0.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monitor.avgResponse}</div>
                <p className="text-xs text-muted-foreground">-12ms from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Incidents</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">-2 from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Data */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="response-time">Response Time</TabsTrigger>
              <TabsTrigger value="uptime">Uptime</TabsTrigger>
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Response Time (24h)</CardTitle>
                    <CardDescription>Response time over the last 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MonitorChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Uptime Status</CardTitle>
                    <CardDescription>Uptime status for the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UptimeChart />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="response-time" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Analysis</CardTitle>
                  <CardDescription>Detailed response time metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <MonitorChart />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="uptime" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Uptime History</CardTitle>
                  <CardDescription>Historical uptime data and availability metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <UptimeChart />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="incidents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Incident History</CardTitle>
                  <CardDescription>Recent incidents and their resolution details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {incidents.map((incident) => (
                      <div key={incident.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div
                          className={`w-3 h-3 rounded-full mt-1 ${
                            incident.type === "downtime" ? "bg-red-500" : "bg-yellow-500"
                          }`}
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{incident.message}</p>
                            <Badge variant="outline" className="text-xs">
                              {incident.resolved ? "Resolved" : "Active"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Duration: {incident.duration} • {incident.time}
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
