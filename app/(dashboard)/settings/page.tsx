'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SubscriptionStatus } from "@/features/settings/components/subscription-settings"
import { Help_Section } from "@/features/settings/components/help-section"
import { Faqs } from "@/features/settings/components/faqs"

export default function SettingsPage() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Settings & Support</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <SubscriptionStatus />
              <Help_Section />
            </div>
            <div>
            <Faqs />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}