import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PaystackButton = dynamic(() => import("react-paystack").then(mod => mod.PaystackButton), { ssr: false });

export const SubscriptionForm = () => {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;
    const planId = process.env.NEXT_PUBLIC_PAYSTACK_PLAN_ID!;
   
    const { user, isLoaded, isSignedIn } = useUser();
    const [userId, setUserId] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        if (isLoaded && isSignedIn && user?.id && user?.emailAddresses[0]?.emailAddress) {
            setUserId(user.id);
            setEmail(user.emailAddresses[0].emailAddress);
        }
    }, [isLoaded, isSignedIn, user]);

    const componentProps = {
        email,
        amount: 299, 
        publicKey,
        plan: planId,
        text: "Pay Now",
        metadata: {
            custom_fields: [
                {
                    display_name: "User ID",
                    variable_name: "userId",
                    value: userId,
                },
            ],
        },
        onSuccess: () => {
            toast.success("Payment Successful");
        },
        onClose: () => {
            toast.error("Payment failed");
        },
    };

    return (
        <Button>
            <PaystackButton {...componentProps} />
        </Button>
    );
};
