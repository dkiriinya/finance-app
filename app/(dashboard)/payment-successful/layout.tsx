
import type { Metadata } from "next";

type Props = {
    children: React.ReactNode;
}
export const metadata: Metadata = {
    title: "Payment Successful",
    description: "Payment Successful",
    robots: {
        index: false,
        follow: true
    }
}

export default function PaymentSuccessfulLayout({
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

