"use client"

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
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
import { useState } from "react";

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
    const [variant,setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS)

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        console.log(results)
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);
    }

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS);
        setVariant(VARIANTS.LIST);
    }


    const newTransaction = useNewTransaction();
    const transactionsQuery = useGetTransactions();
    const transactions = transactionsQuery.data || [];
    const deleteTransactions = useBulkDeleteTransactions();

    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

    

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
                <ImportCard
                  data={importResults.data}
                  onCancel={onCancelImport}
                  onSubmit={()=>{}}  />
            </>
        )
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-ful pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">Transaction History</CardTitle>
                    <div className="flex flex-col lg:flex-row items-center gap-y-2 gap-x-2">
                        <Button 
                            onClick={newTransaction.onOpen}
                            size="sm"
                            className="w-full lg:w-auto">
                            Add new
                        </Button>
                        <UploadButton
                            onUpload = {onUpload}
                        />
                    </div> 
                </CardHeader>
                <CardContent className="pt-0">
                    <DataTable 
                        data={transactions}
                        columns={columns}
                        filterKey="date" 
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