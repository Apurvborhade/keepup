import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Clock,
  Shield,
  BarChart3,
  Bell,
  Globe,
  TrendingUp,
  ArrowRight,
  Play,
  Star,
  Users,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60">
        <Link className="flex items-center justify-center group" href="/">
          <div className="relative">
            <Globe className="h-7 w-7 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
            <div className="absolute -inset-1 bg-emerald-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
          <span className="ml-3 text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Pinger
          </span>
        </Link>
        <nav className="ml-auto flex gap-6 sm:gap-8 items-center">
          <Link
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors relative group"
            href="#features"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-200" />
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors relative group"
            href="#pricing"
          >
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-200" />
          </Link>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <ThemeToggle />
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden flex justify-center">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-blue-50/30 dark:from-emerald-950/20 dark:via-transparent dark:to-blue-950/10" />
          <div className="absolute top-1/4 -right-64 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />

          <div className="relative container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="flex items-center space-x-4">
                  <Badge
                    variant="outline"
                    className="px-4 py-2 bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Real-time Monitoring
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-slate-600 dark:text-slate-400">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.9</span>
                    <span>from 2,847 reviews</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl">
                    <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent">
                      Never Miss
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      Downtime Again
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    Monitor your websites and APIs with enterprise-grade reliability. Get instant alerts, detailed
                    analytics, and peace of mind knowing your services are always running smoothly.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
                  >
                    <Link href="/dashboard" className="flex items-center">
                      Start Monitoring Free
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 group bg-transparent"
                  >
                    <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Free 14-day trial</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span>Trusted by 10,000+ teams</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-lg">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-60" />

                  {/* Main card */}
                  <Card className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-slate-200/60 dark:border-slate-800/60 shadow-2xl">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                            <Activity className="w-4 h-4 text-white" />
                          </div>
                          <CardTitle className="text-lg font-semibold">System Status</CardTitle>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                          All Systems Operational
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { name: "Production API", status: "up", response: "89ms", uptime: "99.99%" },
                        { name: "Main Website", status: "up", response: "245ms", uptime: "99.97%" },
                        { name: "Database Cluster", status: "up", response: "12ms", uptime: "100%" },
                        { name: "CDN Network", status: "warning", response: "1.2s", uptime: "99.85%" },
                      ].map((monitor, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  monitor.status === "up"
                                    ? "bg-emerald-500"
                                    : monitor.status === "warning"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              />
                              <div
                                className={`absolute inset-0 rounded-full animate-ping ${
                                  monitor.status === "up"
                                    ? "bg-emerald-500"
                                    : monitor.status === "warning"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                } opacity-20`}
                              />
                            </div>
                            <div>
                              <span className="font-medium text-slate-900 dark:text-slate-100">{monitor.name}</span>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{monitor.uptime} uptime</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              {monitor.response}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">response</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-20 md:py-32 bg-white dark:bg-slate-900 relative flex justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-900" />
          <div className="relative container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <Badge
                variant="outline"
                className="px-4 py-2 bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-300"
              >
                Powerful Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Everything you need to monitor
              </h2>
              <p className="max-w-[900px] text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Professional monitoring tools trusted by developers and businesses worldwide
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
              {[
                {
                  icon: Clock,
                  title: "Real-time Monitoring",
                  description:
                    "Check your websites and APIs every 30 seconds from 15+ global locations with sub-second precision.",
                  color: "emerald",
                },
                {
                  icon: Bell,
                  title: "Smart Alerts",
                  description:
                    "Get notified instantly via email, SMS, Slack, Discord, or custom webhooks when issues arise.",
                  color: "blue",
                },
                {
                  icon: BarChart3,
                  title: "Advanced Analytics",
                  description:
                    "Deep insights into uptime, response times, and performance trends with beautiful visualizations.",
                  color: "purple",
                },
                {
                  icon: Shield,
                  title: "SSL & Security",
                  description:
                    "Monitor SSL certificates, domain expiration, and security headers with automated alerts.",
                  color: "orange",
                },
                {
                  icon: Globe,
                  title: "Global Network",
                  description: "Monitor from 15+ worldwide locations including US, EU, Asia-Pacific, and more regions.",
                  color: "teal",
                },
                {
                  icon: TrendingUp,
                  title: "Performance Insights",
                  description:
                    "Identify bottlenecks, track Core Web Vitals, and optimize your site's performance over time.",
                  color: "pink",
                },
              ].map((feature, i) => (
                <Card
                  key={i}
                  className="group hover:shadow-xl transition-all duration-300 border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:-translate-y-1"
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Monitoring Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to keep your services running smoothly and your users happy.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 text-blue-600" />
                  <CardTitle>Real-time Monitoring</CardTitle>
                  <CardDescription>
                    Check your websites and APIs every 30 seconds from multiple locations worldwide.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Bell className="h-10 w-10 text-blue-600" />
                  <CardTitle>Instant Alerts</CardTitle>
                  <CardDescription>
                    Get notified immediately via email, SMS, Slack, or webhook when downtime occurs.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-blue-600" />
                  <CardTitle>Detailed Analytics</CardTitle>
                  <CardDescription>
                    View uptime statistics, response times, and performance trends over time.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-blue-600" />
                  <CardTitle>SSL Monitoring</CardTitle>
                  <CardDescription>
                    Monitor SSL certificate expiration and get alerts before they expire.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Globe className="h-10 w-10 text-blue-600" />
                  <CardTitle>Global Monitoring</CardTitle>
                  <CardDescription>Monitor from 15+ locations worldwide to ensure global availability.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-blue-600" />
                  <CardTitle>Performance Insights</CardTitle>
                  <CardDescription>
                    Track performance metrics and identify bottlenecks before they impact users.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start free, scale as you grow. No hidden fees or surprises.
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8 max-w-5xl mx-auto mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>Perfect for small projects</CardDescription>
                  <div className="text-3xl font-bold">Free</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Up to 5 monitors
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      5-minute intervals
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Email alerts
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      30-day history
                    </li>
                  </ul>
                  <Button className="w-full bg-transparent" variant="outline">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-blue-200 relative">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                  <div className="text-3xl font-bold">
                    $19<span className="text-lg font-normal">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Up to 50 monitors
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      1-minute intervals
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Multiple alert channels
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      1-year history
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      SSL monitoring
                    </li>
                  </ul>
                  <Button className="w-full">Start Free Trial</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                  <div className="text-3xl font-bold">
                    $99<span className="text-lg font-normal">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Unlimited monitors
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      30-second intervals
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Advanced integrations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Unlimited history
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                  <Button className="w-full bg-transparent" variant="outline">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="relative w-full py-20 md:py-32 overflow-hidden flex justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />

          <div className="relative container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center text-white">
              <Badge className="px-4 py-2 bg-white/20 border-white/30 text-white hover:bg-white/30">
                Ready to get started?
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl max-w-4xl">
                Start monitoring your services in under 2 minutes
              </h2>
              <p className="mx-auto max-w-[600px] text-xl text-emerald-100 leading-relaxed">
                Join thousands of developers and businesses who trust Pinger to keep their services running smoothly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-200 group"
                >
                  <Link href="/dashboard" className="flex items-center">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 bg-transparent backdrop-blur-sm"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60 flex justify-center">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold text-slate-900 dark:text-slate-100">Pinger</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">© 2024 All rights reserved.</span>
            </div>
            <nav className="flex gap-6">
              <Link
                className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                href="#"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                href="#"
              >
                Support
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
