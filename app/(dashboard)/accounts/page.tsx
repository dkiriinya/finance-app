"use client"

import { useNewAccount } from "@/features/accounts/api/hooks/use-new-accounts";
import { Payment,columns } from "./columns";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle

} from "@/components/ui/card"

import { DataTable } from "@/components/data-table";


const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
        id: "728ed52f",
        amount: 50,
        status: "pending",
        email: "musi@example.com",
      }]


const AccountsPage = () => {
    const newAccount = useNewAccount();
    return (
        <div className="max-w-screen-2xl mx-auto w-ful pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">Accounts Page</CardTitle>
                    <Button onClick={newAccount.onOpen} size="sm">
                        Add new
                    </Button>
                </CardHeader>
                <CardContent className="pt-0">
                    <DataTable data={data} columns={columns} filterKey="email" onDelete={() => {}} disabled={false} />
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountsPage;