import { useState } from "react";

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

export const useConfirm = (
    title: string,
    message: string,
): [() => JSX.Element,() => Promise<unknown>] => {
    const [promise,setPromise] = useState<{ resolve: (value: boolean) => void} | null>(null);
    const confirm = () => new Promise((resolve,reject)=> {
        setPromise({resolve});
    });
    const handleClose = () => {
        setPromise(null);
    }
    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    }
    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    }
    const ConfirmationDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {message}
                    </DialogDescription>
                </DialogHeader>
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