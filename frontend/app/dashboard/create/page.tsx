import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CreateMonitor() {
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
        </nav>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Monitor</h1>
            <p className="text-muted-foreground">Set up a new monitor to track your website or API</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monitor Configuration</CardTitle>
              <CardDescription>Configure your monitor settings and alert preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Monitor Name</Label>
                      <Input id="name" placeholder="My Website Monitor" defaultValue="" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Monitor Type</Label>
                      <Select defaultValue="http">
                        <SelectTrigger>
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
                    <Label htmlFor="url">URL to Monitor</Label>
                    <Input id="url" placeholder="https://example.com" type="url" />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="interval">Check Interval</Label>
                      <Select defaultValue="300">
                        <SelectTrigger>
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
                      <Label htmlFor="timeout">Timeout (seconds)</Label>
                      <Input id="timeout" type="number" defaultValue="30" min="1" max="300" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of what this monitor checks..."
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="method">HTTP Method</Label>
                      <Select defaultValue="GET">
                        <SelectTrigger>
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
                      <Label htmlFor="expected-status">Expected Status Code</Label>
                      <Input id="expected-status" placeholder="200" defaultValue="200" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="headers">Custom Headers (JSON)</Label>
                    <Textarea
                      id="headers"
                      placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body">Request Body</Label>
                    <Textarea id="body" placeholder="Request body for POST/PUT requests..." rows={4} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keyword">Keyword Check</Label>
                    <Input id="keyword" placeholder="Text that should be present in response" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="ssl-check" />
                    <Label htmlFor="ssl-check">Monitor SSL Certificate</Label>
                  </div>
                </TabsContent>

                <TabsContent value="alerts" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="email-alerts" defaultChecked />
                      <Label htmlFor="email-alerts">Email Alerts</Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="alerts@example.com" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="webhook-alerts" />
                      <Label htmlFor="webhook-alerts">Webhook Alerts</Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input id="webhook-url" placeholder="https://hooks.slack.com/services/..." />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="alert-threshold">Alert After (failures)</Label>
                      <Select defaultValue="1">
                        <SelectTrigger>
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
                      <Label htmlFor="recovery-alert">Recovery Alert</Label>
                      <Select defaultValue="yes">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Send recovery alert</SelectItem>
                          <SelectItem value="no">No recovery alert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
                <Button>
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
