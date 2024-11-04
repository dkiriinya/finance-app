import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateMpesaUpload = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (pdf_file:File) => {
            const formData = new FormData();
            formData.append("files", pdf_file);
            const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/upload`
            const response = await fetch(url, {
                method: "POST",
                headers:{
                     "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_BEARER_TOKEN}`
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Failed to create mpesa url");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mpesa-statements"] });
            toast.success("Upload to Strapi was successful.");
        },
        onError: () => toast.error("Failed to upload to strapi.")
    })
    return mutation
}


