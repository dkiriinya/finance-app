import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";

import {client} from "@/lib/hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"];

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    unknown,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.accounts[":id"]["$patch"]({
        json,
        param:{id}});
      return await response.json();
    },
    onSuccess: () => {
        toast.success("Account updated successfully");
        queryClient.invalidateQueries({queryKey: ["accounts"]});
        queryClient.invalidateQueries({queryKey: ["account",{id}]});
    },
    onError: () => {
      toast.error("Failed to update account");
    }
  });
  return mutation;
};

