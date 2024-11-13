import { PiggyBank } from "./PiggyBank";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

type Props = {
    onOpen: boolean;
};


export const LoadingDialog = ({ onOpen }: Props) => {
    return (
        <Dialog open={onOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>File Processing</DialogTitle>
                    <DialogDescription>Your Mpesa Statement is being processed. Kindly wait as the process is being completed.</DialogDescription>
                </DialogHeader>
                <div>
                    <PiggyBank/>
                </div>
            </DialogContent>
        </Dialog>
    );
};
