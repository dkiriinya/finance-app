import { useEffect, useState } from "react";
import { pdf_to_txt } from "@/lib/pdf_to_txt";
import { useGetMpesaStatementPdf } from "../api/use-get-mpesa-statement-pdf";
import { useDeleteMpesaStatementUpload } from "@/features/strapi/mpesa-uploads/api/use-delete-mpesa-statement-upload"; 
import { useDeleteMpesaStatementPdf } from "../api/use-delete-mpesa-statement-pdf";
import { LoadingDialog } from "@/components/loading-dialog";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";
import { useGetOrCreateMpesaAccount } from "@/features/hooks/use-create-mpesa-account";
import { useGetTransactionBlocks } from "@/features/hooks/use-get-transaction-blocks"; 
import { convertAmountToMiliunits } from "@/lib/utils";

type Props = {
    id: string;
};

type Data = {
    id: number;
    url: string;
    [key: string]: any;
};

type Response = {
    success: boolean;
    data: Data[];
};

export const ConvertToTxt = ({ id }: Props) => {
    const [open, setIsOpen] = useState(true);
    const [data, setData] = useState<Data | null>(null);
    const [isConversionDone, setIsConversionDone] = useState(false);

    const mutation = useGetMpesaStatementPdf(id);
    const deleteMutation = useDeleteMpesaStatementPdf(id);
    const bulkCreateMutation = useBulkCreateTransactions();
    const mpesaAccount = useGetOrCreateMpesaAccount().mpesaAccount;

    const pdfUrl = mutation.data?.pdf_url;
    const pdfPassword = mutation.data?.pdf_password;

    useEffect(() => {
        const handlePdfToTextConversion = async () => {
            if (mutation.isSuccess && pdfUrl && pdfPassword && !isConversionDone) {
                try {
                    const response = await pdf_to_txt({
                        Pdf_Password: pdfPassword,
                        FileUrl: pdfUrl,
                    }) as Response;

                    if (response.success) {
                        console.log("PDF to text conversion success:", response);
                        setData(response.data[0]);
                        setIsConversionDone(true);
                    } else {
                        throw new Error("PDF to text conversion failed");
                    }
                } catch (error) {
                    console.error("PDF to text conversion failed:", error);
                }
            }
        };

        handlePdfToTextConversion();
    }, [mutation.isSuccess, pdfUrl, pdfPassword, isConversionDone]);

    const fileUrl = data?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.url}` : null;
    const transactionMutation = useGetTransactionBlocks(fileUrl || "");

    // Handle the transaction creation and deletion
    useEffect(() => {
        const handleTransactionBlocksAndDeletion = async () => {
            if (isConversionDone && fileUrl && transactionMutation.isSuccess && mpesaAccount?.id) {
                const transactionsData = transactionMutation.data.map((transaction) => ({
                    ...transaction,
                    accountId: mpesaAccount.id, 
                    amount: convertAmountToMiliunits(transaction.amount)
                }));

                console.log("Transactions: ", transactionsData);
                bulkCreateMutation.mutate(transactionsData, {
                    onSuccess: () => {
                        console.log("Transactions created successfully");
                    },
                });
                deleteMutation.mutate();
                useDeleteMpesaStatementUpload(data?.id);
                setIsOpen(false);
            }
        };

        if (isConversionDone && mpesaAccount?.id) {
            handleTransactionBlocksAndDeletion();
        }
    }, [isConversionDone, fileUrl, mpesaAccount, transactionMutation.isSuccess]);

    return <LoadingDialog onOpen={open} />;
};
