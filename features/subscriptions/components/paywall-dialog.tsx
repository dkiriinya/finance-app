'use client'

import { useState } from 'react'
import { Lock, BarChart2, FileSpreadsheet,FileDown,Receipt, ChevronDown} from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SubscriptionForm } from './subscription-form'

interface Feature {
  name: string
  description: string
  icon: React.ElementType
}

interface PaywallDialogProps {
  featureName: string
  features?: Feature[]
  price?: string
}

const defaultFeatures: Feature[] = [
  { 
    name: "Access Different Chart Types", 
    description: "Visualize your data with a variety of chart options for deeper insights", 
    icon: BarChart2 
  },
  { 
    name: "Upload a spreadsheet", 
    description: "Easily import your data by uploading spreadsheets for quick analysis", 
    icon: FileSpreadsheet 
  },
  { 
    name: "Export transactions to a spreadsheet", 
    description: "Download your transaction data in spreadsheet format for external use", 
    icon: FileDown 
  },
  { 
    name: "Upload M-Pesa transactions", 
    description: "Seamlessly integrate your M-Pesa transactions for comprehensive financial tracking", 
    icon: Receipt 
  },
]

export function PaywallDialog({ 
  featureName = "Premium Feature",
  features = defaultFeatures,
  price = "KES 299/month"
}: PaywallDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (featureName==="Access Different Chart Types"){
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="w-full lg:w-auto gap-x-2">
            {featureName}
            <ChevronDown size={16} />
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Upgrade to {featureName}
            </DialogTitle>
            <DialogDescription>
              Unlock all these amazing features, including {featureName}, with our premium plan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{feature.name}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button className="w-full sm:w-auto" onClick={() => {
              setIsOpen(false)
            }}>
              <SubscriptionForm />
            </Button>
            <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={() => setIsOpen(false)}>
              Maybe Later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full lg:w-auto bg-blue-600">{featureName}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Upgrade to {featureName}
          </DialogTitle>
          <DialogDescription>
            Unlock all these amazing features, including {featureName}, with our premium plan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">{feature.name}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button className="w-full sm:w-auto" onClick={() => {
            setIsOpen(false)
          }}>
            <SubscriptionForm />
          </Button>
          <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={() => setIsOpen(false)}>
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}