"use client";

import { useState } from "react";

import { LogoIcon } from "@/components/icons";
import Dropzone from "./components/dropzone";
import FileList from "./components/file-list";
import User from "./components/user";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="mx-5 md:mx-auto md:w-3/5">
      <User className="top-0 right-0 absolute m-6" />
      
      <h1 className="flex items-center gap-3 mt-32">
        <LogoIcon className="w-10 h-10" />
        <span className="font-bold text-4xl align-middle">Toss – File Sharing</span>
      </h1>
      <p className="mt-4 text-muted-foreground text-lg">
        Upload and share files securely with expiration controls
      </p>

      <form onSubmit={onSubmit}>
        <Dropzone className="mt-10" setFiles={setFiles} />
        <FileList files={files} setFiles={setFiles} />
      </form>
    </div>
  );
}
