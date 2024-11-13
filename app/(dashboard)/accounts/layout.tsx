
import type { Metadata } from "next";

type Props = {
    children: React.ReactNode;
}
export const metadata: Metadata = {
    title: "Accounts",
    description: "Manage your accounts"
}

export default function AccountsLayout({
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

