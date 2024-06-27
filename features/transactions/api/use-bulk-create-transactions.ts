import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";

import {client} from "@/lib/hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"];

export const useBulkCreateTransactions = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    unknown,
    RequestType
  >({
    mutationFn: async (json) => {
      console.log("Sending payload:", json);
      const response = await client.api.transactions["bulk-create"]["$post"]({
        json})
        const result = await response.json();
        return result;
    },
    onSuccess: () => {
        toast.success("Transactions created successfully");
        queryClient.invalidateQueries({queryKey: ["transactions"]});
    },
    onError: () => {
      toast.error("Failed to create transactions");
    }
  });
  return mutation;
};

