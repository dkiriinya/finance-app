import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessful() {
  return (
    <div className="max-w-screen-2xl mx-auto w-ful pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Subscription Successful!</CardTitle>
          <CardDescription>Thank you for subscribing to our service.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="font-medium">Subscription Details:</p>
            <p className="text-muted-foreground">Plan: Premium</p>
            <p className="text-muted-foreground">Billing Cycle: Monthly</p>
            <p className="text-muted-foreground">Next Billing Date: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Go to Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}