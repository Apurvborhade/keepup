'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Globe, TrendingUp, AlertTriangle, Activity, Zap, Shield, Users } from "lucide-react"
import Link from "next/link"
import { DashboardChart } from "@/components/dashboard-chart"
import { MonitorList } from "@/components/monitor-list"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"
import {  useRouter } from "next/navigation"

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=dashboard')
    }
  }, [user])
  const stats = [
    {
      title: "Active Monitors",
      value: "12",
      change: "+2 this month",
      trend: "up",
      icon: Globe,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      title: "Global Uptime",
      value: "99.97%",
      change: "+0.12% vs last month",
      trend: "up",
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      title: "Avg Response",
      value: "187ms",
      change: "-58ms improvement",
      trend: "up",
      icon: Zap,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
    },
    {
      title: "Incidents",
      value: "2",
      change: "-4 vs last month",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-950/20",
    },
  ]

  const quickActions = [
    { name: "HTTP Monitor", icon: Globe, description: "Monitor website uptime" },
    { name: "API Endpoint", icon: Activity, description: "Track API performance" },
    { name: "SSL Certificate", icon: Shield, description: "Monitor SSL expiry" },
    { name: "Team Monitor", icon: Users, description: "Shared team monitoring" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Enhanced Header */}
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
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <Input
              placeholder="Search monitors, incidents..."
              className="pl-10 w-80 bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          <ThemeToggle />
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200"
          >
            <Link href="/dashboard/create">
              <Plus className="h-4 w-4 mr-2" />
              New Monitor
            </Link>
          </Button>
          <UserNav />
        </nav>
      </header>

      <main className="flex-1 p-6 space-y-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Enhanced Page Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
                Mission Control
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                Real-time monitoring dashboard for your critical infrastructure and services
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  All systems operational
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Last updated: 2 minutes ago</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent"
              >
                View Reports
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-500/25"
              >
                <Link href="/dashboard/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Monitor
                </Link>
              </Button>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
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
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${stat.trend === "up"
                        ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                        : "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400"
                        }`}
                    >
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Quick Actions</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Create new monitors with pre-configured templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-3 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-200 group bg-transparent"
                    asChild
                  >
                    <Link href="/dashboard/create">
                      <action.icon className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      <div className="text-center">
                        <div className="font-medium text-sm text-slate-900 dark:text-white">{action.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{action.description}</div>
                      </div>
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Charts and Activity */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-slate-900 dark:text-white">Performance Overview</CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Response time trends across all monitors
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-slate-600 dark:text-slate-400">Response Time</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <DashboardChart />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Live Activity</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Real-time status updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      monitor: "Production API",
                      status: "up",
                      time: "32 seconds ago",
                      message: "Response time improved to 89ms",
                      responseTime: "89ms",
                    },
                    {
                      monitor: "E-commerce Site",
                      status: "warning",
                      time: "2 minutes ago",
                      message: "Elevated response time detected",
                      responseTime: "1.2s",
                    },
                    {
                      monitor: "Payment Gateway",
                      status: "up",
                      time: "5 minutes ago",
                      message: "Service fully restored",
                      responseTime: "156ms",
                    },
                    {
                      monitor: "CDN Europe",
                      status: "up",
                      time: "12 minutes ago",
                      message: "All endpoints operational",
                      responseTime: "45ms",
                    },
                  ].map((activity, i) => (
                    <div
                      key={i}
                      className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-200"
                    >
                      <div className="relative">
                        <div
                          className={`w-3 h-3 rounded-full mt-1 ${activity.status === "up"
                            ? "bg-emerald-500 shadow-lg shadow-emerald-500/50"
                            : activity.status === "warning"
                              ? "bg-amber-500 shadow-lg shadow-amber-500/50"
                              : "bg-red-500 shadow-lg shadow-red-500/50"
                            }`}
                        />
                        {activity.status === "up" && (
                          <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.monitor}</p>
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                            {activity.responseTime}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{activity.message}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Monitor List */}
          <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900 dark:text-white">Monitor Status</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Overview of all your monitoring endpoints
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700 bg-transparent">
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700 bg-transparent">
                    Export
                  </Button>
                </div>
              </div>
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
