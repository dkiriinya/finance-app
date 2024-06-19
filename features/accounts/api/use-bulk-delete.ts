import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";

import {client} from "@/lib/hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteAccounts = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    unknown,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.accounts["bulk-delete"]["$post"]({
        json})
      return await response.json();
    },
    onSuccess: () => {
        toast.success("Account(s) deleted successfully");
        queryClient.invalidateQueries({queryKey: ["accounts"]});
    },
    onError: () => {
      toast.error("Failed to delete account(s)");
    }
  });
  return mutation;
};

