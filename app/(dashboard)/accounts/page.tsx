"use client"

import { useNewAccount } from "@/features/accounts/hooks/use-new-accounts";
import { columns } from "./columns";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle

} from "@/components/ui/card"

import { DataTable } from "@/components/data-table";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete";




const AccountsPage = () => {
    const newAccount = useNewAccount();
    const accountsQuery = useGetAccounts();
    const accounts = accountsQuery.data || [];
    const deleteAccounts = useBulkDeleteAccounts();

    const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

    if (accountsQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-ful pb-10 -mt-24">
                 <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48"/>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin" />
                        </div>
                    </CardContent>
                </Card>

            </div>
        );
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-ful pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">Accounts Page</CardTitle>
                    <Button onClick={newAccount.onOpen} size="sm">
                        Add new account
                    </Button>
                </CardHeader>
                <CardContent className="pt-0">
                    <DataTable data={accounts} columns={columns} filterKey="name" onDelete={(row) => {
                        const ids = row.map((r)=>r.original.id);
                        deleteAccounts.mutate({ids});
                    }} disabled={isDisabled} />
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountsPage;