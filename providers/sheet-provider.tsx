"use client"
import { NewAccountSheet } from "@/components/new-account-sheet";
import { EditAccountSheet } from "@/components/edit-account-sheet";

import { NewCategorySheet } from "@/components/new-category-sheet";
import { EditCategorySheet } from "@/components/edit-category-sheet";

import { useMountedState } from "react-use";

export const SheetProvider = () => {
    const isMounted = useMountedState();

    if (!isMounted) return null;
    
    return (
        <>
            <NewAccountSheet />
            <EditAccountSheet />
            <NewCategorySheet />
            <EditCategorySheet />
        </>
        
    )
}