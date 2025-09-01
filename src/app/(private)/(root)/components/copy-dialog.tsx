"use client";

import { useRouter } from "next/navigation";

import { CopyInput } from "@/components/ui/copy-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CopyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
}

export default function CopyDialog({ open, onOpenChange, url }: CopyDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>File Uploaded Successfully</DialogTitle>
          <DialogDescription>
            Your files have been uploaded successfully. You can copy the link below to share it.
          </DialogDescription>
        </DialogHeader>

        <CopyInput value={url} readOnly />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={() => {
              if (url) router.push(url);
            }}
          >
            Go to Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
