"use client";

import { useState } from "react";

import { formatBytes } from "@/lib/utils";
import { LogoIcon } from "@/components/icons";
import UploadDialog from "./components/upload-dialog";
import Dropzone from "./components/dropzone";
import FileList from "./components/file-list";
import User from "./components/user";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const onSubmit = (e: React.FormEvent) => {
    console.log("Form submitted");
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
