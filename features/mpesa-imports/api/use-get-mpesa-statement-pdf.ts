import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetMpesaStatementPdf = (id?:string) => {
    const query = useQuery({
        queryKey: ["mpesa_statement_pdf",id],
        queryFn: async () => {
            const response = await client.api.mpesa_statements_pdfs[":id"].$get({
                param:{id},
            });
            if (!response.ok){
                throw new Error("Failed to fetch mpesa statement")
            }
            const { data } = await response.json();
            return data;
        },
        enabled: !!id,
    });
    return query
}