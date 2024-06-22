import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";

import {client} from "@/lib/hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"];

export const useEditTransaction = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    unknown,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.transactions[":id"]["$patch"]({
        json,
        param:{id}});
      return await response.json();
    },
    onSuccess: () => {
        toast.success("Transaction updated successfully");
        queryClient.invalidateQueries({queryKey: ["transactions"]});
        queryClient.invalidateQueries({queryKey: ["transaction",{id}]});
    },
    onError: () => {
      toast.error("Failed to update transaction");
    }
  });
  return mutation;
};

