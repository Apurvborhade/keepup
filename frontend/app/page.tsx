import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Shield, Zap, BarChart3, Bell, Globe, TrendingUp } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link className="flex items-center justify-center" href="/">
          <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="ml-2 text-xl font-bold">Pinger</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
            Dashboard
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit">
                    <Zap className="w-3 h-3 mr-1" />
                    Real-time Monitoring
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Never Miss Downtime Again
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Monitor your websites and APIs 24/7. Get instant alerts when something goes wrong. Keep your
                    services running smoothly with Pinger.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">Start Monitoring Free</Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    View Demo
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                    Free 14-day trial
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                    No credit card required
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg blur opacity-75"></div>
                  <Card className="relative bg-background">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Monitor Status</CardTitle>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          All Systems Operational
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { name: "Main Website", status: "up", response: "245ms" },
                        { name: "API Server", status: "up", response: "89ms" },
                        { name: "Database", status: "up", response: "12ms" },
                        { name: "CDN", status: "warning", response: "1.2s" },
                      ].map((monitor, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded border">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                monitor.status === "up"
                                  ? "bg-green-500"
                                  : monitor.status === "warning"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                            />
                            <span className="font-medium">{monitor.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{monitor.response}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
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

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Monitoring?
                </h2>
                <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of developers and businesses who trust Pinger to keep their services running.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/dashboard">Start Free Trial</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 Pinger. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
