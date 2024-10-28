"use client"

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import {transactions as transactionSchema }from "@/db/schema"
import { columns } from "./columns";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle

} from "@/components/ui/card"

import { DataTable } from "@/components/data-table";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { UploadButton } from "./upload-button";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { ImportCard } from "./import-card";
import { useState,useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";
import {ExportButton} from "./export-button";
import { UploadFile } from "@/components/upload-file";
import { useGetSubscription } from "@/features/subscriptions/api/use-get-subscription";
import {PaywallDialog} from "@/features/subscriptions/components/paywall-dialog";
enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT"
}

const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta:{}
}

const TransactionsPage = () => {
    const [AccountDialog, confirm] = useSelectAccount()
    const [variant,setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS)

    const paywallFeatures = [
        { featureName: 'Upload a spreadsheet', description: 'Unlock the upload spreadsheet function', price: '299' },
        { featureName: 'Export transactions to a spreadsheet', description: 'Unlock exporting files as spreadsheets function', price: '299' },
        { featureName: 'Upload m-pesa transactions', description: 'Unlock Mpesa File Uploads function', price: '299' },
    ];

    const { user, isLoaded } = useUser();
    const [userId, setUserId] = useState<string | undefined>(undefined);
  
    useEffect(() => {
      if (user?.id && isLoaded) {
        setUserId(user.id); 
      }
    }, [user, isLoaded]);
  
    const subscriptionQuery = useGetSubscription(userId);
    const subscription = subscriptionQuery.data;

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);
    }

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS);
        setVariant(VARIANTS.LIST);
    }


    const newTransaction = useNewTransaction();
    const createTransactions = useBulkCreateTransactions();
    const transactionsQuery = useGetTransactions();
    const transactions = transactionsQuery.data || [];
    const deleteTransactions = useBulkDeleteTransactions();

    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

    const onSubmitImport = async (
        values: typeof transactionSchema.$inferInsert[],
    ) => {
        const accountId = await confirm();

        if (!accountId){
            return toast.error("Please select an account to continue")
        }

        const data = values.map((value) => ({
            ...value,
            accountId: accountId as string,
        }));
        createTransactions.mutate(data, {
            onSuccess: () => {
               onCancelImport();
            },
            onError: () => {
                toast.error("Failed to import transactions");
            }
        });
    }

    if (transactionsQuery.isLoading) {
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

    if (variant === VARIANTS.IMPORT){
        return (
            <>
                <AccountDialog />
                <ImportCard
                  data={importResults.data}
                  onCancel={onCancelImport}
                  onSubmit={onSubmitImport}  />
            </>
        )
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-ful pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">Transaction History</CardTitle>
                    
                        {
                            subscription?.isPaid? (
                                <div className="flex flex-col lg:flex-row items-center gap-y-2 gap-x-2">
                                    <Button 
                                        onClick={newTransaction.onOpen}
                                        size="sm"
                                        className="w-full lg:w-auto">
                                        Add new transaction
                                    </Button>
                                    <UploadButton
                                        onUpload = {onUpload}
                                    />
                                    <ExportButton data={transactions} />
                                    <UploadFile /> 
                                </div>):
                                (
                                    <div className="flex flex-col lg:flex-row items-center gap-y-2 gap-x-2">
                                         <Button 
                                            onClick={newTransaction.onOpen}
                                            size="sm"
                                            className="w-full lg:w-auto">
                                            Add new transaction
                                        </Button>
                                        {paywallFeatures.map((feature) => (
                                           <PaywallDialog 
                                            featureName={feature.featureName} />
                                        ))}
                                    </div>
                                )
                        }
                </CardHeader>
                <CardContent className="pt-0">
                    <DataTable 
                        data={transactions}
                        columns={columns}
                        filterKey="payee" 
                        onDelete={(row) => {
                            const ids = row.map((r)=>r.original.id);
                            deleteTransactions.mutate({ids});
                    }} disabled={isDisabled} />
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionsPage;