import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";

import {client} from "@/lib/hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.subscriptions[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.subscriptions[":id"]["$patch"]>["json"];

export const useCancelSubscription = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    unknown,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.subscriptions[":id"]["$patch"]({
        json,
        param:{id}});
      return await response.json();
    },
    onSuccess: () => {
        toast.success("Subscription cancelled successfully. Sorry to see you go 🙁");
        queryClient.invalidateQueries({queryKey: ["subscriptions"]});
        queryClient.invalidateQueries({queryKey: ["subscription",{id}]});
    },
    onError: () => {
      toast.error("Failed to cancel subscription");
    }
  });
  return mutation;
};

