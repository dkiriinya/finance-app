'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion,AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion" 

const faqs = [
  {
    question: "How do I change my password?",
    answer: "To change your password, go to the 'Account Settings' section and click on 'Change Password'. Follow the prompts to enter your current password and set a new one."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, you can cancel your subscription at any time. Go to the 'Subscription Settings' section and click on 'Cancel Subscription'. Your access will continue until the end of your current billing period."
  },
  {
    question: "How do I update my payment information?",
    answer: "To update your payment information, navigate to the 'Billing and Payments' section. Click on 'Manage Payment Methods' and follow the instructions to add or update your payment details."
  },
  {
    question: "What happens to my data if I delete my account?",
    answer: "When you delete your account, all your personal data will be permanently removed from our systems after a 30-day grace period. During this period, you can reactivate your account if you change your mind."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can contact our customer support team by using the 'Need Help?' section on this page. Fill out the form with your query, and we'll get back to you as soon as possible. Alternatively, you can email us directly at support@example.com."
  }
]

export function Faqs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}