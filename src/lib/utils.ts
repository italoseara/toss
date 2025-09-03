import JSZip from "jszip";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import {
  ImageIcon,
  FileIcon,
  FileTextIcon,
  FolderArchive,
  FileMusicIcon,
  FileCogIcon,
  FileCode2Icon,
  FileVideo2Icon,
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function getFileIcon(fileType: string) {
  const icons = {
    "image/": ImageIcon,
    "video/": FileVideo2Icon,
    "audio/": FileMusicIcon,
    "application/pdf": FileTextIcon,
    "application/x-zip-compressed": FolderArchive,
    "application/x-msdownload": FileCogIcon,
    "text/": FileCode2Icon,
  } as const;

  const Icon =
    icons[Object.keys(icons).find((key) => fileType.startsWith(key)) as keyof typeof icons] ||
    FileIcon;

  return Icon;
}

export async function createZipFile(files: File[], zipFileName: string): Promise<File> {
  const zip = new JSZip();

  // Add each File object to the zip archive
  for (const file of files) {
    zip.file(file.name, file); // Add file content with its original name
  }

  // Generate the zip file content as a Blob
  const content = await zip.generateAsync({ type: "blob" });

  // Create a new File object from the Blob
  return new File([content], zipFileName, { type: "application/zip" });
}

export function downloadFile(file: Blob, fileName: string) {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function createFormData(object: Record<string, any>): FormData {
  const formData = new FormData();
  Object.entries(object).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
}

export async function blobToJson(blob: Blob): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        resolve(json);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsText(blob);
  });
}