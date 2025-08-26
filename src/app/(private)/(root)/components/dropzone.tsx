"use client";

import { useDropzone } from "react-dropzone";
import { useCallback, useRef } from "react";
import { Upload, Folder } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
  }
}

interface DropzoneProps {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function Dropzone({
  setFiles,
  ...props
}: DropzoneProps & React.HTMLAttributes<HTMLDivElement>) {
  const folderInputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: Infinity,
    multiple: true,
  });

  return (
    <div
      {...props}
      {...getRootProps()}
      className={cn(
        "p-12 border-2 border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500 border-dashed rounded-md text-center cursor-pointer",
        props.className
      )}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-3">
        <Upload className="mx-auto text-muted-foreground" size={48} />
        <p className="font-semibold text-xl">Upload Files</p>
        <p className="text-muted-foreground">
          {isDragActive
            ? "Drop the files here..."
            : "Drag and drop files here, or click to select files"}
        </p>
      </div>

      <input
        ref={folderInputRef}
        type="file"
        webkitdirectory=""
        multiple
        className="hidden"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files || []);
          setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        }}
      />
      <Button
        variant="secondary"
        className="mt-6"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          folderInputRef.current?.click();
        }}
      >
        <Folder />
        <span>Select Folder</span>
      </Button>
    </div>
  );
}
