'use client'
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";


import { useGetSubscription } from "@/features/subscriptions/api/use-get-subscription";
import { SubscriptionStatus } from "@/features/settings/components/subscription-settings";
import { Help_Section } from "@/features/settings/components/help-section";
import { Faqs } from "@/features/settings/components/faqs";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, CreditCard, BookOpen, Search } from 'lucide-react'

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user?.id && isLoaded) {
      setUserId(user.id); 
    }
  }, [user, isLoaded]);

  const subscriptionQuery = useGetSubscription(userId);

  if (subscriptionQuery.isLoading) {
    return (
      <div className="max-w-screen-3xl mx-auto w-full pb-10 -mt-24">
        <Tabs defaultValue="enquiries" className="border-none drop-shadow-sm">
          <TabsList className="grid w-full grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <TabsTrigger key={index} value={`tab-${index}`} disabled>
                <Skeleton className="w-4 h-4 mr-2 rounded-full" />
                <Skeleton className="w-24 h-4" />
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="enquiries">
            <div className="space-y-4">
              {[...Array(1)].map((_, index) => (
                <div key={index} className="flex flex-col space-y-2">
                   <Card>
                    <CardHeader className="space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-32 w-full" />
                      </div>
                      <Skeleton className="h-10 w-1/3" />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="max-w-screen-3xl mx-auto w-full pb-10 -mt-24">
      <Tabs defaultValue="enquiries" className="border-none drop-shadow-sm">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="enquiries">
            <HelpCircle className="w-4 h-4 mr-2" />
            General Enquiries
          </TabsTrigger>
          <TabsTrigger value="subscription">
            <CreditCard className="w-4 h-4 mr-2" />
            Manage Subscription
          </TabsTrigger>
          <TabsTrigger value="faqs">
            <BookOpen className="w-4 h-4 mr-2" />
            FAQs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="enquiries">
          <Help_Section />
        </TabsContent>
        <TabsContent value="subscription">
          <SubscriptionStatus 
            id={subscriptionQuery.data?.id ?? ""}
            subscription_status={subscriptionQuery.data?.subscription_status ?? ""}
            next_payment_date={new Date(subscriptionQuery.data?.next_payment_date ?? Date.now())}
            isPaid={subscriptionQuery.data?.isPaid ?? false}
            email_token={subscriptionQuery.data?.email_token ?? ""}
            subscription_code={subscriptionQuery.data?.subscription_code ?? ""}
          />
        </TabsContent>
        <TabsContent value="faqs">
          <Faqs />
        </TabsContent>
      </Tabs>
    </div>
  );
}
