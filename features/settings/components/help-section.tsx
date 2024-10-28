import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LifeBuoy, Mail, MessageSquare } from "lucide-react"

export function Help_Section() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Need Help?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <LifeBuoy className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">24/7 Support</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">support@example.com</span>
        </div>
        <form className="space-y-4">
          <Textarea placeholder="How can we help you?" />
          <Button className="w-full">
            <MessageSquare className="mr-2 h-4 w-4" /> Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}