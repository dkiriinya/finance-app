
import type { Metadata } from "next";

type Props = {
    children: React.ReactNode;
}
export const metadata: Metadata = {
    title: "Categories",
    description: "Manage your Categories"
}

export default function CategoriesLayout({
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

