import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
