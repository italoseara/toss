import { z } from "zod";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { PasswordInput } from "@/components/ui/password-input";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UploadDialogProps {
  files: File[];
  onSubmit: (data: UploadFormValues) => void;
}

const formSchema = z.object({
  expiresIn: z.string().min(1, "Expiration is required"),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters",
    }),
});

export type UploadFormValues = z.infer<typeof formSchema>;

export function UploadDialog({ files, onSubmit }: UploadDialogProps) {
  const form = useForm<UploadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expiresIn: "604800",
      password: "",
    },
  });

  function handleSubmit(values: UploadFormValues) {
    onSubmit(values);
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="gap-4 grid mt-4">
            <FormField
              control={form.control}
              name="expiresIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} required>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password (Optional)</FormLabel>
                  <FormControl>
                    <PasswordInput id="password" placeholder="**********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>

              <DialogClose asChild>
                <Button type="submit">Upload Files</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
