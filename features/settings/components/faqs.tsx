'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion" 
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useState, useMemo } from "react"

type FaqItem = { question: string; answer: string }
type FaqData = {
  transactions: FaqItem[]
  accounts: FaqItem[]
  categories: FaqItem[]
  general: FaqItem[]
}

const faqData: FaqData = {
  transactions: [
    { question: "How do I add a new transaction?", answer: "To add a new transaction, go to the Transactions page and click the 'Add Transaction' button. Fill in the required details such as date, amount, category, and description, then click 'Save'." },
    { question: "Can I edit or delete a transaction?", answer: "Yes, you can edit or delete a transaction. On the Transactions page, find the transaction you want to modify, click the three-dot menu next to it, and select 'Edit' or 'Delete' as needed." },
    { question: "How do I split a transaction between multiple categories?", answer: "When adding or editing a transaction, click the 'Split Transaction' option. You can then allocate portions of the total amount to different categories as needed." },
  ],
  accounts: [
    { question: "How do I add a new account?", answer: "To add a new account, go to the Accounts page and click 'Add Account'. Choose the account type, enter the account details, and click 'Save'. You can then start tracking transactions for this account." },
    { question: "Can I link my bank account for automatic updates?", answer: "Yes, we support linking bank accounts for automatic updates. Go to the Accounts page, select the account you want to link, and click 'Link Bank'. Follow the prompts to securely connect your bank account." },
    { question: "How do I reconcile my account balance?", answer: "To reconcile your account, go to the account details page and click 'Reconcile'. Enter your current bank statement balance and the statement date. The system will help you identify any discrepancies between your recorded transactions and the bank statement." },
  ],
  categories: [
    { question: "How do I create a new category?", answer: "To create a new category, go to the Categories page and click 'Add Category'. Enter a name for the category, select a parent category if applicable, and choose a color for easy identification. Click 'Save' to create the new category." },
    { question: "Can I merge two categories?", answer: "Yes, you can merge categories. On the Categories page, select the two categories you want to merge, then click the 'Merge' button. Choose which category name to keep, and all transactions from both categories will be combined under the chosen category." },
    { question: "How do I set up budget limits for categories?", answer: "To set budget limits, go to the Budgets page and select the category you want to budget for. Enter your desired monthly or annual limit for that category. The system will then track your spending against this budget and provide alerts when you're approaching your limit." },
  ],
  general: [
    { question: "How do I reset my password?", answer: "To reset your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to reset your password." },
    { question: "Is my financial data secure?", answer: "Yes, we take data security very seriously. We use bank-level encryption to protect your data, and we never sell your personal information to third parties. For more details, please review our security policy." },
    { question: "Can I export my data?", answer: "Yes, you can export your data at any time. Go to the Settings page and select 'Export Data'. You can choose to export in various formats including CSV and PDF. This feature is useful for creating backups or for use in other financial software." },
  ],
}

export function Faqs() {
  const [activeTab, setActiveTab] = useState<keyof FaqData>('transactions')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return faqData

    const lowerCaseQuery = searchQuery.toLowerCase()
    return Object.fromEntries(
      Object.entries(faqData).map(([category, questions]) => [
        category,
        questions.filter(
          ({ question, answer }) =>
            question.toLowerCase().includes(lowerCaseQuery) ||
            answer.toLowerCase().includes(lowerCaseQuery)
        )
      ])
    ) as FaqData
  }, [searchQuery])

  const renderFaqSection = (category: keyof FaqData) => (
    <Accordion type="single" collapsible className="w-full">
      {filteredFaqs[category].map((faq, index) => (
        <AccordionItem key={`${category}-${index}`} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )

  return (
    <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search-faqs" className="sr-only">Search FAQs</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-faqs"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as keyof FaqData)} className="">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions">
              {renderFaqSection('transactions')}
            </TabsContent>
            <TabsContent value="accounts">
              {renderFaqSection('accounts')}
            </TabsContent>
            <TabsContent value="categories">
              {renderFaqSection('categories')}
            </TabsContent>
            <TabsContent value="general">
              {renderFaqSection('general')}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
  )
}
