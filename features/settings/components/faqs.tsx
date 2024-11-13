'use client'

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion" 
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FaqItem = { question: string; answer: string }
type FaqData = {
  transactions: FaqItem[]
  accounts: FaqItem[]
  categories: FaqItem[]
  general: FaqItem[]
}

const faqData: FaqData = {
  transactions: [
    {
      question: "How do I add a new transaction?",
      answer: "To add a new transaction, follow these steps:\n1. Go to the Transactions page.\n2. Click the 'Add New' button.\n3. Fill in the required details, such as date, amount, category, and description.\n4. Click 'Create Transaction' to save the new transaction."
    },
    {
      question: "Can I edit or delete a transaction?",
      answer: "Yes, you can edit or delete a transaction. Here's how:\n1. Go to the Transactions page.\n2. Find the transaction you want to modify.\n3. Click the three-dot menu next to it.\n4. Select 'Edit' to modify the transaction or 'Delete' to remove it."
    },
    {
      question: "How do I export my transactions to a spreadsheet?",
      answer: "If you are a premium member, you can export your transactions to a spreadsheet by following these steps:\n1. Go to the Transactions page.\n2. Click 'Export Transactions.'\n3. Save the file to your local machine."
    },
    {
      question: "How do I upload a spreadsheet?",
      answer: "Premium members can upload spreadsheets. To do so:\n1. Ensure your spreadsheet has three fields: Date (in the format YYYY-MM-DD HH:MM:SS), Payee, and Amount.\n2. Go to the Transactions page.\n3. Click the 'Upload a Spreadsheet' button.\n4. Select your file and upload it.\n5. A table will appear; choose fields for Date, Amount, and Payee.\n6. Select an existing account or create a new one for the transactions.\n7. Click 'Confirm' to add the transactions successfully."
    },
    {
      question: "How do I upload M-PESA transactions?",
      answer: "Premium members can upload M-PESA transactions. To upload M-PESA transactions, please follow these steps:\n1. Dial *334# on your Safaricom line.\n2. Select the 'My Account' option.\n3. Choose 'M-PESA Statement.'\n4. Select 'Request Statement' and then 'Full Statement.'\n5. Choose the duration you need.\n6. Enter your email address and M-PESA PIN.\n7. Safaricom will email you the statement and provide a password to unlock the PDF.\n8. Download the statement to your local machine.\n9. On the Transactions page, click 'Upload M-PESA Transactions.'\n10. Choose the M-PESA file from your machine and enter the PDF password provided.\n11. Click 'Upload' to complete the process."
    }
  ],  
  accounts: [
    { question: "How do I add a new account?", answer: "To add a new account, follow these steps: \n1. go to the Accounts page \n2. Click the 'Add New' button. \n3. Fill in the name. Create the account. \n4. You can also create an account while creating a new transaction." },
    {
      question: "Can I edit or delete an account?",
      answer: "Yes, you can edit or delete an account. Here's how:\n1. Go to the Account page.\n2. Find the Account you want to modify.\n3. Click the three-dot menu next to it.\n4. Select 'Edit' to modify the account or 'Delete' to remove it. \n4. Deleting an account will delete all transactions associated with it!"
    },
    {
      question: "How do I assign an account to a transaction?",
      answer: "To assign an account to a transaction, follow these steps:\n1. Go to the Transactions page.\n2. Find the transaction you want to categorise.\n3. Click the three-dot menu next to it.\n4. Select 'Edit' to modify the transaction or 'Delete' to remove it. \n4. Select the account you want to assign to the transaction."
    },
    {
      question: "Can I view how much I am spending on a particular account?",
      answer: "Yes you can, follow these steps:\n1. Go to the Overview page.\n2. Click the 'All Accounts' button.\n3. Select the account you want to view. \n4. You can also set a time duration."
    }
  ],
  categories: [
    { question: "How do I add a new category?", answer: "To add a new category, follow these steps: \n1. go to the categorys page \n2. Click the 'Add New' button. \n3. Fill in the name. Create the category. \n4. You can also create an category while creating a new transaction." },
    {
      question: "Can I edit or delete a category?",
      answer: "Yes, you can edit or delete a category. Here's how:\n1. Go to the categories page.\n2. Find the category you want to modify.\n3. Click the three-dot menu next to it.\n4. Select 'Edit' to modify the category or 'Delete' to remove it. \n4. Deleting a category will leave your transactions uncategorised!"
    },
    {
      question: "How do I assign a category to a transaction?",
      answer: "To assign a category to a transaction, follow these steps:\n1. Go to the Transactions page.\n2. Find the transaction you want to categorise.\n3. Click the three-dot menu next to it.\n4. Select 'Edit' to modify the transaction or 'Delete' to remove it. \n4. Select the category you want to assign to the transaction."
    },
    {
      question: "Can I view how much I am spending on a particular category?",
      answer: "Yes you can, follow these steps:\n1. Go to the Overview page.\n2. Navigate to the categories section\n3. Pick a chart \n4. View how much youre spending on each"
    }
  ],
  general: [
    { question: "How do I delete my account?", answer: "To delete your account \n1. click the icon at the top right of the page. \n2. click the manage account option. \n3. click the security option. \n4. click the delete account option. \n5. Deleting an account is fatal. You will lose all your data!" },
    { question: "Is my financial data secure?", answer: "Yes, we take data security very seriously. We ensure that only you have access to your transactions using middleware" },
    { question:"How do I reset my password?", answer:"To reset your account password \n1. click the icon at the top right of the page. \n2. click the manage account option. \n3. click the security option. \n4. click the set password option."}
  ],
}

export function Faqs() {
  const [activeCategory, setActiveCategory] = useState<keyof FaqData>('transactions')
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

  const renderAnswer = (answer: string) => {
    const parts = answer.split('\n')
    if (parts.length === 1) {
      return <p>{answer}</p>
    }

    return (
      <div>
        <p>{parts[0]}</p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          {parts.slice(1).map((step, index) => (
            <li key={index}>{step.replace(/^\d+\.\s*/, '')}</li>
          ))}
        </ol>
      </div>
    )
  }

  const renderFaqSection = (category: keyof FaqData) => (
    <Accordion type="single" collapsible className="w-full">
      {filteredFaqs[category].map((faq, index) => (
        <AccordionItem key={`${category}-${index}`} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{renderAnswer(faq.answer)}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Find quick answers to common questions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex space-x-6">
            <div className="flex-1">
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
            <div className="w-[180px]">
              <Select value={activeCategory} onValueChange={(value) => setActiveCategory(value as keyof FaqData)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transactions">Transactions</SelectItem>
                  <SelectItem value="accounts">Accounts</SelectItem>
                  <SelectItem value="categories">Categories</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {renderFaqSection(activeCategory)}
        </div>
      </CardContent>
    </Card>
  )
}