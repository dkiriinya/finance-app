'use client'

import { useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCancelSubscription } from '@/features/subscriptions/api/use-cancel-subscription'

type Props = {
    id:string
    email_token:string
    subscription_code:string
}

export  function Unsubscribe({id,email_token,subscription_code}:Props) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')

  const unsubscribeMutation = useCancelSubscription(id)

  const handleUnsubscribe = () => {
    unsubscribeMutation.mutate({
        email_token,
        subscription_code
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Unsubscribe</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Unsubscription</DialogTitle>
          <DialogDescription>
            We're sorry to see you go. Are you sure you want to unsubscribe from our service?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select onValueChange={setReason} value={reason}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Reason for unsubscribing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="too-expensive">Too expensive</SelectItem>
              <SelectItem value="not-using">Not using the service enough</SelectItem>
              <SelectItem value="found-alternative">Found an alternative</SelectItem>
              <SelectItem value="not-satisfied">Not satisfied with the service</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleUnsubscribe}>Confirm Unsubscribe</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}