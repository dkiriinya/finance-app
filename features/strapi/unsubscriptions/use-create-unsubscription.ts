import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    email:string
    reason:string
}
export const useCreateUnsubscription = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({
            email,
            reason,
        }:Props) => {
           
            const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/unsubscribtions`
            
            const response = await fetch(url, {
                method: "POST",
                headers:{
                     "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_BEARER_TOKEN}`,
                     "Content-Type": "application/json"  
                },
                body: JSON.stringify({
                    data: {
                        email: email,
                        reason:reason
                    }
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to create message");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["unsubsriptions"] });
        },
        onError: () => toast.error("Failed to unsubscribe")
    })
    return mutation
}


