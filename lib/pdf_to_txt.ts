"use server";
import { config } from "dotenv";
config({ path: ".env.local" });

import https from "https";
import path from "path";
import FormData from "form-data";
import axios from "axios";


type Props = {
  FileUrl: string;
  Pdf_Password: string;
};

export const pdf_to_txt = async ({ FileUrl, Pdf_Password}: Props) => {
  const API_KEY = process.env.NEXT_PUBLIC_PDFCO_API_KEY;
  const Pages = "";
  const SourceFileUrl = FileUrl;
  const Password = Pdf_Password;

  const queryPath = `/v1/pdf/convert/to/text`;

  const jsonPayload = JSON.stringify({
    name: path.basename(SourceFileUrl),
    password: Password,
    pages: Pages,
    url: SourceFileUrl,
  });

  const conversionOptions: https.RequestOptions = {
    host: "api.pdf.co",
    method: "POST",
    path: queryPath,
    headers: {
      "x-api-key": API_KEY!,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(jsonPayload, "utf8"),
    },
  };

  return new Promise(async (resolve, reject) => {
    const postRequest = https.request(conversionOptions, (response) => {
      let responseData = "";

      response.on("data", (chunk: Buffer) => {
        responseData += chunk;
      });

      response.on("end", async () => {
        const data = JSON.parse(responseData);
        if (!data.error) {
          https.get(data.url, async (response2) => {
            let fileContent: Buffer[] = [];

            response2.on("data", (chunk: Buffer) => {
              fileContent.push(chunk);
            });

            response2.on("end", async () => {
              const fullFileContent = Buffer.concat(fileContent);
              
              const formData = new FormData();
              formData.append('files', fullFileContent, {
                filename: "mpesa-statement.txt",
                contentType: "text/plain",
              });

              try {
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/upload`,
                  formData,
                  {
                    headers: {
                      ...formData.getHeaders(),
                      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_BEARER_TOKEN}`,
                    },
                  }
                );

                console.log("Upload completed successfully:", response.data);
                resolve({ success: true,
                    data:response.data
                 });
              } catch (error) {
                console.error("Error uploading file:", error);
                reject(new Error("File upload failed"));
              }
            });
          });
        } else {
          console.log(data.message);
          reject(new Error(data.message));
        }
      });
    });

    postRequest.on("error", (e: Error) => {
      console.log(e.message);
      reject(e);
    });

    postRequest.write(jsonPayload);
    postRequest.end();
  });
};