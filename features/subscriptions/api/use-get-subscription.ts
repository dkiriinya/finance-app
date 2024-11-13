import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetSubscription = (id?:string) => {
    const query = useQuery({
        queryKey: ["subscription",{ id }],
        queryFn: async () => {
            try {
                const response = await client.api.subscriptions[":id"].$get({
                    param: { id }
                });
        
                if (!response.ok) {
                    console.error("Error in response:", response.statusText);
                    throw new Error("Failed to fetch paystack payment");
                }
        
                const { data } = await response.json();
                return data;
            } catch (error) {
                throw error;
            }
        },      
        enabled: !!id
    });
    return query
}