'use client'

import { CreditCard, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from '@/components/ui/switch'
import { SubscriptionForm } from '@/features/subscriptions/components/subscription-form'
import { Unsubscribe } from "./unsubscribe";

type Props = {
  id:string
  subscription_status: string
  next_payment_date: Date
  isPaid: boolean;
  email_token: string;
  subscription_code: string;
}

export function SubscriptionStatus({ subscription_status,next_payment_date,isPaid,id,email_token,subscription_code}: Props) {
  const isNonRenew = subscription_status === "not renewing";

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
                {isNonRenew || !isPaid ? `` : `next payment date: ${next_payment_date.toLocaleDateString()}`}
    
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
          className=""
          disabled={isNonRenew}
        >
          {isPaid ? (isNonRenew ? "Unsubscribed" : <Unsubscribe id={id} email_token={email_token} subscription_code={subscription_code} />) : <SubscriptionForm />}
        </Button>
      </CardFooter>
    </Card>
  );
}
