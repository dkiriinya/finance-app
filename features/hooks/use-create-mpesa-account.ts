import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

export const useGetOrCreateMpesaAccount = () => {
    const accountsQuery = useGetAccounts();

    const createMutation = useCreateAccount();

    const accounts = accountsQuery.data || [];


    const mpesaAccount = accounts.find((account) => account.name === 'M-PESA');

    // If "M-PESA" account does not exist, trigger mutation to create it
    if (!mpesaAccount && !createMutation.isPending) {
        createMutation.mutate(
            { name: "M-PESA" }
        );
    }

    return {
        mpesaAccount: mpesaAccount || null, 
        isLoading: accountsQuery.isLoading || createMutation.isPending,
        error: accountsQuery.error || createMutation.error,
    };
};
