"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

import { UploadFormValues, UploadDialog } from "./components/upload-dialog";
import { createFormData, createZipFile, formatBytes } from "@/lib/utils";
import { LogoIcon } from "@/components/icons";
import CopyDialog from "./components/copy-dialog";
import FileList from "./components/file-list";
import Dropzone from "./components/dropzone";
import User from "./components/user";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  const [url, setUrl] = useState("");

  const onSubmit = async (data: UploadFormValues) => {
    const { expiresIn, password } = data;
    if (files.length === 0) return;

    const file = await createZipFile(files, "files.zip");

    const uploadFiles = async () => {
      const formData = createFormData({ file, expiresIn, password });
      const response = await axios.post("/api/file/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    };

    try {
      toast.promise(
        uploadFiles().then((data) => {
          setUrl(`${window.location.origin}/file/${data.fileId}`);
          setIsCopyDialogOpen(true);
          setFiles([]);
          return data;
        }),
        {
          loading: "Uploading files...",
          success: "Files uploaded successfully!.",
          error: "Failed to upload files.",
        }
      );
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An unexpected error occurred during upload.");
    }
  };

  return (
    <div className="mx-5 md:mx-auto pt-32 md:w-3/5">
      <User className="top-0 right-0 fixed m-6" />

      <h1 className="flex items-center gap-3">
        <LogoIcon className="w-10 h-10" />
        <span className="font-bold text-4xl align-middle">Toss – File Sharing</span>
      </h1>
      <p className="mt-4 text-muted-foreground text-lg">
        Upload and share files securely with expiration controls
      </p>

      <Dropzone className="mt-10" setFiles={setFiles} />

      <div className="flex justify-between items-center my-4">
        <h2 className="font-semibold text-lg">Files to be uploaded:</h2>
        <UploadDialog files={files} onSubmit={onSubmit} />
        <CopyDialog open={isCopyDialogOpen} onOpenChange={setIsCopyDialogOpen} url={url} />
      </div>

      <FileList files={files} setFiles={setFiles} />

      <h2 className="my-2">
        {files.length} File{files.length > 1 && "s"}{" "}
        <span className="text-muted-foreground">
          ({formatBytes(files.reduce((total, file) => total + file.size, 0))})
        </span>
      </h2>
    </div>
  );
}
