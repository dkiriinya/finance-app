import {z} from "zod";
import { Trash } from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";  

import {Input} from "./ui/input";
import { Button } from "./ui/button";
import { insertAccountSchema } from "@/db/schema";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
}from "./ui/form"
import { Console } from "console";

const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
    id?:string;
    defaultValues?:FormValues;
    onSubmit: (data: FormValues) => void;
    onDelete?: () => void;
    disabled?:boolean;
};

export const AccountForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
}:Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    };

    const handleDelete = () => {
        onDelete?.();
    };

    return(
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 pt-4">
                <FormField 
                    name="name"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g Cash,Bank,Credit Card"
                                 disabled={disabled}
                                 {...field}/>
                            </FormControl>
                        </FormItem>
                    )}/>
                    <Button className="w-full" disabled={disabled}>
                        {id ? "Save Changes" : "Create Account"}
                    </Button>
                    {!!id &&(<Button
                        type="button"
                        disabled={disabled}
                        onClick={handleDelete}
                        className="w-full"
                        variant="destructive"
                        
                        >
                        <Trash className="size-4 mr-2" /> Delete Account
                    </Button>)}
            </form>
        </Form>
            
    )

}