import { SignUp,ClerkLoaded,ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="h-full lg:flex flex-col items-center justify-center px-4">
            <div className="text-center space-y-4 pt-16">
                <h1 className="font-bold text-3xl text-[#2E2A47]">
                    Welcome!
                </h1>
                <p className="text-base text-[#7b72b1]">
                    Sign up to your account to continue
                </p>
            </div>
            <div className="flex items-center justify-center mt-8">
                <ClerkLoaded>
                <SignUp/>
                </ClerkLoaded>
                <ClerkLoading>
                    <Loader2 className="animate-spin text-muted-foreground"/>
                </ClerkLoading>
            </div>
        </div>
        <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
            <Image src="/logo-no-background.svg" height={400} width={400} alt="logo"/>
        </div>
    </div>
  );
}