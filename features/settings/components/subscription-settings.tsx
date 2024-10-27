'use client'

import { useState } from 'react'
import { CreditCard, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from '@/components/ui/switch'

export function SubscriptionStatus({ initialSubscribed = false }: { initialSubscribed?: boolean }) {
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed)

  const handleSubscriptionChange = () => {
    // This is where you would typically make an API call to update the subscription status
    setIsSubscribed(!isSubscribed)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage your subscription</CardTitle>
        <CardDescription>
          {isSubscribed 
            ? "Manage your subscription to our service" 
            : "Subscribe to unlock premium features"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full ${isSubscribed ? 'bg-green-100' : 'bg-gray-100'}`}>
              {isSubscribed ? (
                <CreditCard className="h-6 w-6 text-green-600" />
              ) : (
                <X className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">
                {isSubscribed ? "Active Subscription" : "No Active Subscription"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isSubscribed ? "Your subscription is active" : "You are not currently subscribed"}
              </p>
            </div>
          </div>
          <Switch
            checked={isSubscribed}
            onCheckedChange={handleSubscriptionChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubscriptionChange} 
          variant={isSubscribed ? "destructive" : "default"}
          className="w-full"
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe Now"}
        </Button>
      </CardFooter>
    </Card>
  )
}