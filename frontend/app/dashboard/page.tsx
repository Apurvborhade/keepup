import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Globe, Clock, TrendingUp, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { DashboardChart } from "@/components/dashboard-chart"
import { MonitorList } from "@/components/monitor-list"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Dashboard() {
  const stats = [
    {
      title: "Total Monitors",
      value: "12",
      change: "+2 from last month",
      icon: Globe,
    },
    {
      title: "Average Uptime",
      value: "99.9%",
      change: "+0.1% from last month",
      icon: TrendingUp,
    },
    {
      title: "Avg Response Time",
      value: "245ms",
      change: "-12ms from last month",
      icon: Clock,
    },
    {
      title: "Incidents",
      value: "3",
      change: "-2 from last month",
      icon: AlertTriangle,
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
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search monitors..." className="pl-8 w-64" />
          </div>
          <ThemeToggle />
          <Button asChild>
            <Link href="/dashboard/create">
              <Plus className="h-4 w-4 mr-2" />
              Add Monitor
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Monitor your websites and APIs in real-time</p>
            </div>
            <Button asChild>
              <Link href="/dashboard/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Monitor
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts and Monitor List */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Overview</CardTitle>
                  <CardDescription>Average response time across all monitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <DashboardChart />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest monitor status changes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      monitor: "API Server",
                      status: "up",
                      time: "2 minutes ago",
                      message: "Service restored",
                    },
                    {
                      monitor: "Main Website",
                      status: "down",
                      time: "1 hour ago",
                      message: "Connection timeout",
                    },
                    {
                      monitor: "Database",
                      status: "up",
                      time: "3 hours ago",
                      message: "Performance improved",
                    },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.status === "up" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.monitor}</p>
                        <p className="text-xs text-muted-foreground">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Monitor List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Monitors</CardTitle>
              <CardDescription>Manage and view the status of all your monitors</CardDescription>
            </CardHeader>
            <CardContent>
              <MonitorList />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
