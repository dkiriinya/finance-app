import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    email: string;
    subject: string;
    message: string;
}

export const useCreateClientResponse = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({
            email,
            subject,
            message
        }: Props) => {

            const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/client-responses`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_BEARER_TOKEN}`,
                    "Content-Type": "application/json"  
                },
                body: JSON.stringify({
                    data: {
                        email: email,
                        subject: subject,
                        message: message
                    }
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create message");
            }
            
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["client-responses"] });
            toast.success("Message sent successfully");
        },
        onError: (error) => {
            toast.error("Failed to send message!");
        }
    });

    return mutation;
};
