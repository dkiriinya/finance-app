import { useQuery } from "@tanstack/react-query";

export const useGetMpesaStatementUpload = (id?:number) => {
    const query = useQuery({
        queryKey: ["mpesa-statement",id],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/upload/files/${id}`,{
                method: 'GET',
                headers:{
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_BEARER_TOKEN}`
               }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch mpesa statement");
            }
            const {data} = await response.json();
            console.log({data})
            return {
                data
            }
        },
        enabled: !!id,
    })
    return query;
}