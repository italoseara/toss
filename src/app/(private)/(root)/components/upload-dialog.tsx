import { Upload } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatBytes } from "@/lib/utils";
import { PasswordInput } from "@/components/ui/password-input";

interface UploadDialogProps {
  files: File[];
  onSubmit: (e: React.FormEvent) => void;
}

export default function UploadDialog({ files, onSubmit }: UploadDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={files.length === 0}>
          <Upload />
          Upload Files
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            You are about to upload {files.length} file{files.length > 1 && "s"} (
            {formatBytes(files.reduce((total, file) => total + file.size, 0))}).
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 grid mt-4">
          <div className="gap-3 grid">
            <Label htmlFor="expiration">Expiration</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select expiration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3600">1 hour</SelectItem>
                <SelectItem value="86400">1 day</SelectItem>
                <SelectItem value="604800">7 days</SelectItem>
                <SelectItem value="2592000">30 days</SelectItem>
                <SelectItem value="0">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="gap-3 grid">
            <Label htmlFor="password">Password (Optional)</Label>
            <PasswordInput id="password" name="password" placeholder="**********" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={onSubmit}>Upload Files</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
