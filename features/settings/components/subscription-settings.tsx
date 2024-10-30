'use client'

import {z} from "zod";
import { CreditCard, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from '@/components/ui/switch'
import { SubscriptionForm } from '@/features/subscriptions/components/subscription-form'

type Props = {
  subscription_status: string
  next_payment_date: Date
  isPaid: boolean;
}

export function SubscriptionStatus({ subscription_status,next_payment_date,isPaid}: Props) {
  const isNonRenew = subscription_status === "not_renew";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage your subscription</CardTitle>
        <CardDescription>
          {isPaid
            ? "Manage your subscription to our service" 
            : "Subscribe to unlock premium features"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full ${isPaid ? 'bg-green-100' : 'bg-gray-100'}`}>
              {isPaid ? (
                <CreditCard className="h-6 w-6 text-green-600" />
              ) : (
                <X className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">
                {isPaid ? "Active Subscription" : "No Active Subscription"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isPaid ? `Your subscription is ${subscription_status}` : "You are not currently subscribed"}
    
              </p>
              <p className="text-sm text-muted-foreground">
                {isNonRenew || !isPaid ? `` : `next payment date: ${next_payment_date}`}
    
              </p>
            </div>
          </div>
          <Switch
            checked={isPaid}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={isPaid ? "destructive" : "default"}
          className="w-full"
          disabled={isNonRenew}
        >
          {isPaid ? (isNonRenew ? "Unsubscribed" : "Unsubscribe") : <SubscriptionForm />}
        </Button>
      </CardFooter>
    </Card>
  );
}
