'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscriptionStatus } from "@/features/settings/components/subscription-settings";
import { Help_Section } from "@/features/settings/components/help-section";
import { Faqs } from "@/features/settings/components/faqs";
import { useGetSubscription } from "@/features/subscriptions/api/use-get-subscription";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

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
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              <Skeleton className="h-7 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-40" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-10 w-24" />
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-24" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Settings & Support</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <Help_Section />
              <SubscriptionStatus 
                subscription_status={subscriptionQuery.data?.subscription_status ?? ""}
                next_payment_date={new Date(subscriptionQuery.data?.next_payment_date ?? Date.now())}
                isPaid={subscriptionQuery.data?.isPaid ?? false}
              />
            </div>
            <div>
              <Faqs />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
