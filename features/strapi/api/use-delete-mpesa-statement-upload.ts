export async  function useDeleteMpesaStatementUpload (id?: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/upload/files/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_BEARER_TOKEN}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete mpesa statement from Strapi");
    }

    return response.json();
}
