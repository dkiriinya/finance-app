import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetMpesaStatementPdfs = () => {
    const query = useQuery({
        queryKey: ["mpesa-statement-pdfs"],
        queryFn: async () => {
            const response = await client.api.mpesa_statements_pdfs.$get();
            if (!response.ok){
                throw new Error("Failed to fetch mpesa statement")
            }
            const { data } = await response.json();
            return data;
        },
    });
    return query
}