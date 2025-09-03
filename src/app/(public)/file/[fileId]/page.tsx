"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Download } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { blobToJson, downloadFile } from "@/lib/utils";
import PasswordDialog from "./components/password-dialog";

export default function FilePage() {
  const { fileId } = useParams<{ fileId: string }>()!;

  const [isDownloading, setIsDownloading] = useState(true);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const fetchFile = async (fileId: string, password?: string) => {
    const url = `/api/file/${fileId}${password ? `?password=${password}` : ""}`;
    const response = await axios.get(url, { responseType: "blob" });
    downloadFile(response.data, `${fileId}.zip`);
  };

  useEffect(() => {
    const handleFile = async () => {
      try {
        await fetchFile(fileId);
      } catch (error: any) {
        handleError(error);
      } finally {
        setIsDownloading(false);
      }
    };

    const handleError = async (error: any) => {
      const status = error.response?.status;

      if (status === 401) {
        setIsPasswordDialogOpen(true);
        return;
      }

      try {
        const data = await blobToJson(error.response?.data);
        toast.error(data?.message || "Failed to download the file.");
      } catch {
        toast.error("Failed to download the file. Please try again.");
      }
    };

    handleFile();
  }, [fileId]);

  return (
    <>
      <PasswordDialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
        onSubmit={async (password) => await fetchFile(fileId, password)}
      />
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <Download className="w-32 h-32 text-muted-foreground" />
        <p className="text-muted-foreground text-sm text-center">
          ID: <code className="font-mono font-bold">{fileId}</code>
        </p>
        <p className="mt-4 font-semibold text-2xl">
          {isDownloading ? "Downloading..." : "Download has started!"}
        </p>
        <p className="mt-2 w-96 text-muted-foreground text-center">
          {isDownloading
            ? "Please wait while we prepare your download."
            : "If your download doesn't start automatically, please refresh the page."}
        </p>
      </div>
    </>
  );
}
