"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import toast from "react-hot-toast";

interface FileUploadProps {
//   value: string;
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
//   page: string;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message);
        }} 
      />
  );
};
