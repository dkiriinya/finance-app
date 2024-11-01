
import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function Help_Section() {
  const [enquirySubject, setEnquirySubject] = useState('')
  const [enquiryMessage, setEnquiryMessage] = useState('')

  const handleEnquirySubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Enquiry submitted:', { subject: enquirySubject, message: enquiryMessage })
    setEnquirySubject('')
    setEnquiryMessage('')
  }
  return (
    <Card>
          <CardHeader>
            <CardTitle>General Enquiries</CardTitle>
            <CardDescription>Have a question? We're here to help!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={enquirySubject}
                  onChange={(e) => setEnquirySubject(e.target.value)}
                  placeholder="What's your enquiry about?"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={enquiryMessage}
                  onChange={(e) => setEnquiryMessage(e.target.value)}
                  placeholder="Please provide details about your enquiry"
                  required
                />
              </div>
              <Button type="submit">Submit Enquiry</Button>
            </form>
          </CardContent>
        </Card>
  )
}