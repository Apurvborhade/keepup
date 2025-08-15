'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Globe, TrendingUp, AlertTriangle, Activity, Zap, Shield, Users } from "lucide-react"
import Link from "next/link"
import { DashboardChart } from "@/components/dashboard-chart"
import { Monitor, MonitorList } from "@/components/monitor-list"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMonitorStore } from "@/store/useMonitorStore"

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const monitors = useMonitorStore(state => state.monitors)


  const activeMonitors = monitors.reduce((acc, curr) => {
    return curr.active ? acc + 1 : acc;
  }, 0)

  const avgResponseTime = monitors.reduce((acc, curr) => {
    const latencyEach = curr.histories?.length !== 0 ? curr.histories?.reduce((acc, history) => ((acc + history.latencyMs) / curr.histories.length), 0) : 0

    console.log(latencyEach)
    return ((acc + latencyEach) / monitors.length)
  }, 0)

  const incidents = monitors.reduce((acc, monitor) => {
    return acc + monitor.histories.reduce((acc, history) => {
      return !history.success ? (acc + 1) : acc
    }, 0)
  }, 0);

  const uptime = () => {
    return monitors.map((monitor) => {
      if (!monitor.histories.length) {
        return "N/A";
      }

      const successCount = monitor.histories.filter(h => h.success).length;
      const uptimePercent = ((successCount / monitor.histories.length) * 100).toFixed(1);

      return `${uptimePercent}%`;
    });
  }

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
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.title == 'Active Monitors' ? activeMonitors : stat.title === 'Avg Response' ? `${avgResponseTime}ms` : stat.title === 'Incidents' ? incidents : stat.title === 'Global Uptime' ? uptime() : stat.value}</div>

                </CardContent>
              </Card>
            ))}
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
