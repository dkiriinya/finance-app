"use client"
import { NewAccountSheet } from "@/components/new-account-sheet";
import { use } from "react";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
    const isMounted = useMountedState();

    if (!isMounted) return null;
    
    return (
        <>
            <NewAccountSheet />
        </>
        
    )
}