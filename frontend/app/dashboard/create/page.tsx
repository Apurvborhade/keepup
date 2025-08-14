'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, ArrowLeft, Save, Zap, Shield, Activity, Clock, CloudFog } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"
import AxiosInstance from "@/lib/axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CreateMonitor() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState<{
    name: string,
    url: string,
    interval: string,
    timeout: number,
    description: string
  }>({
    name: "",
    url: "",
    interval: "300",
    timeout: 30,
    description: ""
  })


  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    console.log(formData)
  }


  const submitHandler = async () => {
    console.log(formData)
    try {
      setIsLoading(true)
      const { data } = await AxiosInstance.post('/monitor', {
        name: formData.name,
        url: formData.url,
        intervalSec: parseInt(formData.interval)
      })
      if (data) {
        toast.success("Success fully created new monitor", { style: { backgroundColor: '#10b981', } })
        router.push('/dasboard')
      }
      console.log("Monitor Created: ", data)
    } catch (error) {
      console.log("Error Creating New Monitor", error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

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
                <TabsList className="grid w-full grid-cols-1 bg-slate-100/50 dark:bg-slate-800/50">
                  <TabsTrigger
                    value="basic"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                  >
                    Basic Settings
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
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                      />
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
                      value={formData.url}
                      onChange={(e) => handleInputChange("url", e.target.value)}
                      className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="interval" className="text-slate-700 dark:text-slate-300 font-medium">
                        Check Interval
                      </Label>
                      <Select defaultValue="300" value={formData.interval}
                        onValueChange={(value) => handleInputChange("interval", value)}>
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
                        onChange={(e) => handleInputChange("timeout", e.target.value)}
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
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Brief description of what this monitor checks..."
                      rows={3}
                      className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                    />
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
                <Button onClick={submitHandler} className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-500/25" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Creating Monitor...' : 'Create Monitor'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
