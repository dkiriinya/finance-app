import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.mpesa_statements_pdfs.$post>;
type RequestType = InferRequestType<typeof client.api.mpesa_statements_pdfs.$post>["json"];

export const useCreateMpesaStatementPdf = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    unknown,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.mpesa_statements_pdfs.$post({ json });

      return await response.json();;
    },
    onSuccess: () => {
      toast.success("Statement uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["mpesa_statements_pdfs"] });
    },
    onError: () => {
      toast.error("Failed to upload statement");
    },
  });

  return mutation;
};
