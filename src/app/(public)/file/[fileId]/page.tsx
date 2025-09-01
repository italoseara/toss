"use client";

import { useParams } from "next/navigation";
import { Download } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

import { downloadFile } from "@/lib/utils";

export default function FilePage() {
  const { fileId } = useParams<{ fileId: string }>()!;

  useEffect(() => {
    axios
      .get(`/api/file/${fileId}`, { responseType: "blob" })
      .then((response) => downloadFile(response.data, `file-${fileId}.zip`))
      .catch((error) => {
        toast.error("Failed to download the file. Please try again.");
      });
  }, [fileId]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <Download className="w-32 h-32 text-muted-foreground" />
      <p className="text-muted-foreground text-sm text-center">
        ID: <code className="font-mono font-bold">{fileId}</code>
      </p>
      <p className="mt-4 font-semibold text-2xl">Download has started!</p>
      <p className="mt-2 text-muted-foreground text-center">
        If it doesn't, please refresh the page.
      </p>
    </div>
  );
}
