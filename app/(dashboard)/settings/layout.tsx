
import type { Metadata } from "next";

type Props = {
    children: React.ReactNode;
}
export const metadata: Metadata = {
    title: "Settings",
    description: "Manage your My Wallet Rafiki Settings",
    robots: {
        index: false,
        follow: true
    }
}

export default function SettingsLayout({
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

