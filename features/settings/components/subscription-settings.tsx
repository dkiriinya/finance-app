'use client'

import { useEffect, useState } from 'react'
import { CreditCard, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from '@/components/ui/switch'
import { SubscriptionForm } from '@/features/subscriptions/components/subscription-form'

type Props = {
  initialSubscribed: boolean | undefined
};

export function SubscriptionStatus({ initialSubscribed }:Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage your subscription</CardTitle>
        <CardDescription>
          {initialSubscribed
            ? "Manage your subscription to our service" 
            : "Subscribe to unlock premium features"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full ${initialSubscribed? 'bg-green-100' : 'bg-gray-100'}`}>
              {initialSubscribed? (
                <CreditCard className="h-6 w-6 text-green-600" />
              ) : (
                <X className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">
                {initialSubscribed? "Active Subscription" : "No Active Subscription"}
              </p>
              <p className="text-sm text-muted-foreground">
                {initialSubscribed? "Your subscription is active" : "You are not currently subscribed"}
              </p>
            </div>
          </div>
          <Switch
            checked={initialSubscribed}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant={initialSubscribed? "destructive" : "default"}
          className="w-full"
        >
          {initialSubscribed? "Unsubscribe" : <SubscriptionForm />}
        </Button>
      </CardFooter>
    </Card>
  )
}