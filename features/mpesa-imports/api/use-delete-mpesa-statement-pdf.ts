import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import {client} from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.mpesa_statements_pdfs[":id"]["$delete"]>

export const useDeleteMpesaStatementPdf = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType,Error>({
        mutationFn: async () => {
            const response = await client.api.mpesa_statements_pdfs[":id"]["$delete"]({
                param: {id},
            });
            if (!response.ok){
                throw new Error("Failed to delete mpesa statement")
            }
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["mpesa-statement-pdfs"]});
            toast.success("Mpesa statement deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete mpesa statement");
        }
    });
    return mutation;
}
