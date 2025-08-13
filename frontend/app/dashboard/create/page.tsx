import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, ArrowLeft, Save, Zap, Shield, Activity, Clock } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CreateMonitor() {
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
        </nav>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
                  Create Monitor
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">
                  Set up intelligent monitoring for your critical infrastructure
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { icon: Globe, name: "Website", desc: "HTTP/HTTPS monitoring", color: "blue" },
                { icon: Activity, name: "API", desc: "REST API endpoints", color: "emerald" },
                { icon: Shield, name: "SSL", desc: "Certificate monitoring", color: "amber" },
                { icon: Clock, name: "Ping", desc: "Network connectivity", color: "purple" },
              ].map((type, i) => (
                <Card
                  key={i}
                  className="group cursor-pointer border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`inline-flex p-3 rounded-lg mb-3 ${
                        type.color === "blue"
                          ? "bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                          : type.color === "emerald"
                            ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                            : type.color === "amber"
                              ? "bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
                              : "bg-purple-100 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400"
                      } group-hover:scale-110 transition-transform duration-200`}
                    >
                      <type.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{type.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{type.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm shadow-xl shadow-slate-200/10 dark:shadow-slate-900/20">
            <CardHeader className="border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/50">
              <CardTitle className="text-slate-900 dark:text-white">Monitor Configuration</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Configure your monitor settings and alert preferences with advanced options
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="basic" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-slate-100/50 dark:bg-slate-800/50">
                  <TabsTrigger
                    value="basic"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                  >
                    Basic Settings
                  </TabsTrigger>
                  <TabsTrigger
                    value="advanced"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                  >
                    Advanced
                  </TabsTrigger>
                  <TabsTrigger
                    value="alerts"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                  >
                    Alerts
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 font-medium">
                        Monitor Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="My Website Monitor"
                        className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-slate-700 dark:text-slate-300 font-medium">
                        Monitor Type
                      </Label>
                      <Select defaultValue="http">
                        <SelectTrigger className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="http">HTTP/HTTPS</SelectItem>
                          <SelectItem value="ping">Ping</SelectItem>
                          <SelectItem value="tcp">TCP Port</SelectItem>
                          <SelectItem value="dns">DNS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url" className="text-slate-700 dark:text-slate-300 font-medium">
                      URL to Monitor
                    </Label>
                    <Input
                      id="url"
                      placeholder="https://example.com"
                      type="url"
                      className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="interval" className="text-slate-700 dark:text-slate-300 font-medium">
                        Check Interval
                      </Label>
                      <Select defaultValue="300">
                        <SelectTrigger className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="60">1 minute</SelectItem>
                          <SelectItem value="300">5 minutes</SelectItem>
                          <SelectItem value="600">10 minutes</SelectItem>
                          <SelectItem value="1800">30 minutes</SelectItem>
                          <SelectItem value="3600">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeout" className="text-slate-700 dark:text-slate-300 font-medium">
                        Timeout (seconds)
                      </Label>
                      <Input
                        id="timeout"
                        type="number"
                        defaultValue="30"
                        min="1"
                        max="300"
                        className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-slate-700 dark:text-slate-300 font-medium">
                      Description (Optional)
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of what this monitor checks..."
                      rows={3}
                      className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="method" className="text-slate-700 dark:text-slate-300 font-medium">
                        HTTP Method
                      </Label>
                      <Select defaultValue="GET">
                        <SelectTrigger className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                          <SelectItem value="HEAD">HEAD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expected-status" className="text-slate-700 dark:text-slate-300 font-medium">
                        Expected Status Code
                      </Label>
                      <Input
                        id="expected-status"
                        placeholder="200"
                        defaultValue="200"
                        className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="headers" className="text-slate-700 dark:text-slate-300 font-medium">
                      Custom Headers (JSON)
                    </Label>
                    <Textarea
                      id="headers"
                      placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                      rows={4}
                      className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body" className="text-slate-700 dark:text-slate-300 font-medium">
                      Request Body
                    </Label>
                    <Textarea
                      id="body"
                      placeholder="Request body for POST/PUT requests..."
                      rows={4}
                      className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keyword" className="text-slate-700 dark:text-slate-300 font-medium">
                      Keyword Check
                    </Label>
                    <Input
                      id="keyword"
                      placeholder="Text that should be present in response"
                      className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                    <Switch id="ssl-check" />
                    <div>
                      <Label htmlFor="ssl-check" className="text-slate-700 dark:text-slate-300 font-medium">
                        Monitor SSL Certificate
                      </Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Get alerts before your SSL certificate expires
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="alerts" className="space-y-6">
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                      <div className="flex items-center space-x-3 mb-4">
                        <Switch id="email-alerts" defaultChecked />
                        <div>
                          <Label htmlFor="email-alerts" className="text-slate-700 dark:text-slate-300 font-medium">
                            Email Alerts
                          </Label>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Receive notifications via email when issues are detected
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="alerts@example.com"
                          className="bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                      <div className="flex items-center space-x-3 mb-4">
                        <Switch id="webhook-alerts" />
                        <div>
                          <Label htmlFor="webhook-alerts" className="text-slate-700 dark:text-slate-300 font-medium">
                            Webhook Alerts
                          </Label>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Send alerts to external services like Slack or Discord
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url" className="text-slate-700 dark:text-slate-300 font-medium">
                          Webhook URL
                        </Label>
                        <Input
                          id="webhook-url"
                          placeholder="https://hooks.slack.com/services/..."
                          className="bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 font-mono text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="alert-threshold" className="text-slate-700 dark:text-slate-300 font-medium">
                          Alert After (failures)
                        </Label>
                        <Select defaultValue="1">
                          <SelectTrigger className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 failure</SelectItem>
                            <SelectItem value="2">2 failures</SelectItem>
                            <SelectItem value="3">3 failures</SelectItem>
                            <SelectItem value="5">5 failures</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recovery-alert" className="text-slate-700 dark:text-slate-300 font-medium">
                          Recovery Alert
                        </Label>
                        <Select defaultValue="yes">
                          <SelectTrigger className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Send recovery alert</SelectItem>
                            <SelectItem value="no">No recovery alert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
                <Button
                  variant="outline"
                  asChild
                  className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent"
                >
                  <Link href="/dashboard">Cancel</Link>
                </Button>
                <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-500/25">
                  <Save className="h-4 w-4 mr-2" />
                  Create Monitor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
