import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";


const formSchema = z.object({
  pdf_file: z.instanceof(File).nullable(),
  pdf_password: z.string().nonempty("Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  defaultValues?: FormValues;
  onSubmit: (data: FormValues) => void;
  disabled?: boolean;
};

export const UploadFileForm = ({ defaultValues, onSubmit, disabled }: Props) => {
  const form = useForm<FormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="pdf_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PDF File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file || null);
                  }}
                />
              </FormControl>
              {form.formState.errors.pdf_file && (
                <p className="text-red-600">
                  {form.formState.errors.pdf_file.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pdf_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PDF Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              {form.formState.errors.pdf_password && (
                <p className="text-red-600">
                  {form.formState.errors.pdf_password.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={disabled}>
            Upload
          </Button>
        </div>
      </form>
    </Form>
  );
};
