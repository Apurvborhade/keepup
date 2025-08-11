import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MoreHorizontal, ExternalLink, Settings, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const monitors = [
  {
    id: "1",
    name: "Main Website",
    url: "https://example.com",
    status: "up",
    uptime: "99.9%",
    responseTime: "245ms",
    lastCheck: "2 minutes ago",
  },
  {
    id: "2",
    name: "API Server",
    url: "https://api.example.com",
    status: "up",
    uptime: "100%",
    responseTime: "89ms",
    lastCheck: "1 minute ago",
  },
  {
    id: "3",
    name: "Database Connection",
    url: "db.example.com:5432",
    status: "up",
    uptime: "99.8%",
    responseTime: "12ms",
    lastCheck: "30 seconds ago",
  },
  {
    id: "4",
    name: "CDN Endpoint",
    url: "https://cdn.example.com",
    status: "warning",
    uptime: "98.5%",
    responseTime: "1.2s",
    lastCheck: "3 minutes ago",
  },
  {
    id: "5",
    name: "Payment Gateway",
    url: "https://payments.example.com",
    status: "down",
    uptime: "95.2%",
    responseTime: "timeout",
    lastCheck: "5 minutes ago",
  },
]

export function MonitorList() {
  return (
    <div className="space-y-4">
      {monitors.map((monitor) => (
        <Card key={monitor.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    monitor.status === "up"
                      ? "bg-green-500"
                      : monitor.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                />
                <div>
                  <h3 className="font-semibold text-lg">{monitor.name}</h3>
                  <p className="text-sm text-muted-foreground">{monitor.url}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-sm font-medium">{monitor.uptime}</p>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{monitor.responseTime}</p>
                  <p className="text-xs text-muted-foreground">Response</p>
                </div>
                <div className="text-center">
                  <Badge
                    variant={
                      monitor.status === "up" ? "default" : monitor.status === "warning" ? "secondary" : "destructive"
                    }
                    className={monitor.status === "up" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                  >
                    {monitor.status === "up" ? "Operational" : monitor.status === "warning" ? "Degraded" : "Down"}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/monitors/${monitor.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">Last checked {monitor.lastCheck}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
