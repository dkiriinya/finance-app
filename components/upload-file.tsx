import { useState } from "react";
import { z } from "zod";
import { useCreateMpesaStatementPdf } from "@/features/mpesa-imports/api/use-create-mpesa-statement-pdf";
import { UploadFileForm } from "@/features/mpesa-imports/components/upload-file-form";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { useCreateMpesaUpload } from "@/features/strapi/api/use-create-mpesa-statement-upload";
import { ConvertToTxt } from "@/features/mpesa-imports/components/convert-to-txt";

const strapiformSchema = z.object({
  pdf_file: z.instanceof(File).nullable(),
  pdf_password: z.string().nonempty("Password is required"),
});

type FormValues = z.infer<typeof strapiformSchema>;

export function UploadFile() {
  const [statementId, setStatementId] = useState<string | null>(null);
  const mutation = useCreateMpesaStatementPdf();
  const strapiMutation = useCreateMpesaUpload();

  const onSubmit = (values: FormValues) => {
    if (!values.pdf_file) {
      toast.error("Please select a file.");
      return;
    }
  
    strapiMutation.mutate(values.pdf_file, {
      onSuccess: (data) => {
        const fileUrl = data?.[0]?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data[0].url}` : '';
        const strapiId = data?.[0]?.id;
        mutation.mutate(
          {
            pdf_url: fileUrl,
            pdf_password: values.pdf_password,
            strapiId: strapiId,
          },
          {
            onSuccess: (data: any) => {
              const Id = data.data.id;
              if (Id) {
                setStatementId(Id);  
              }
            },
          }
        );
      },
    });
  };

  const defaultValues: FormValues = {
    pdf_file: null,
    pdf_password: '',
  };

  if (statementId){
    return(
      <ConvertToTxt id={statementId} />
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
         size="sm"
         color="#20C073"
         className="w-full lg:w-auto bg-custom-green hover:bg-green-600">Upload M-Pesa Transactions</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Please select your Mpesa statement file to upload and enter the file's password.
          </DialogDescription>
        </DialogHeader>
        <UploadFileForm
          onSubmit={onSubmit}
          disabled={mutation.isPending || strapiMutation.isPending}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
