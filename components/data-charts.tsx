"use client"
import { useGetSummary } from "@/features/summary/api/use-get-summary" 
import { Chart, ChartLoading } from "./chart"
import { SpendingPie, SpendingPieLoading } from "./spending-pie"
import { useUser } from "@clerk/nextjs"
import { useState,useEffect } from "react"
import { useGetSubscription } from "@/features/subscriptions/api/use-get-subscription"

export const DataCharts = () => {
    const {data,isLoading} = useGetSummary()
    const { user, isLoaded } = useUser();
    const [userId, setUserId] = useState<string | undefined>(undefined);
  
    useEffect(() => {
      if (user?.id && isLoaded) {
        setUserId(user.id); 
      }
    }, [user, isLoaded]);
  
    const subscriptionQuery = useGetSubscription(userId);
    const subscription = subscriptionQuery.data;

    if (isLoading || subscriptionQuery.isPending){
        return (
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                    <ChartLoading/>
                </div>
                <div className="col-span-1 lg:col-span-3 xl:col-span-2">
                    <SpendingPieLoading />
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                <Chart data={data?.days} isPaid= {subscription?.isPaid}/>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-2">
                <SpendingPie data={data?.categories} isPaid= {subscription?.isPaid}/>
            </div>
        </div>
    )
}