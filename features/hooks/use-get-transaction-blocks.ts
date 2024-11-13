import { extractTransactionsFromFile } from "@/lib/file-to-obj";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionBlocks = (fileUrl:string) => {
    const query = useQuery({
        queryKey:["transaction_blocks",fileUrl],
        queryFn: async () => {
            const response = await extractTransactionsFromFile({fileUrl:fileUrl});
            if (!response.isSuccess){
                throw new Error("Failed to fetch transaction blocks");
            }
            const transactions = await response.transactions;
            return transactions;
        }
    })
    return query;
}