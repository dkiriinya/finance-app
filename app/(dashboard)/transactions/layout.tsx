
import type { Metadata } from "next";

type Props = {
    children: React.ReactNode;
}
export const metadata: Metadata = {
    title: "Transactions",
    description: "Manage your Transactions"
}

export default function TransactionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}

