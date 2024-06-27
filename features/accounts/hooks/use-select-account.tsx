import { useState,useRef } from "react";

import { useCreateAccount } from "../api/use-create-account";
import { useGetAccounts } from "../api/use-get-accounts";

import { Button } from "@/components/ui/button";
import {

    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { set, unknown } from "zod";
import { Select } from "@/components/select";


export const useSelectAccount = (): [() => JSX.Element,() => Promise<unknown>] => {

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name: string) => {
        accountMutation.mutate({ name });
    };
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id,
    }));

    const [promise,setPromise] = useState<{ resolve: (value: string | undefined) => void} | null>(null);
    const confirm = () => new Promise((resolve,reject)=> {
        setPromise({resolve});
    });

    const selectValue = useRef<string>();

    const handleClose = () => {
        setPromise(null);
    }
    const handleConfirm = () => {
        promise?.resolve(selectValue.current);
        handleClose();
    }
    const handleCancel = () => {
        promise?.resolve(undefined);
        handleClose();
    }
    const ConfirmationDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Select Account</DialogTitle>
                    <DialogDescription>
                        please select an account to continue
                    </DialogDescription>
                </DialogHeader>
                <Select 
                    placeholder="select an account"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    onChange={(value)=> selectValue.current = value}
                    disabled={accountQuery.isLoading || accountMutation.isPending}
                />
                <DialogFooter className="pt-2">
                    <div className="flex w-full items-center justify-between">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm}>Confirm</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
    return [ConfirmationDialog,confirm]

}