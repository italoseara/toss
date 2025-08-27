import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatBytes, getFileIcon } from "@/lib/utils";

interface FileListProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FileList({ files, setFiles }: FileListProps) {
  return (
    <ScrollArea className="h-72">
      {files.length > 0 ? (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center gap-3 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md w-full"
            >
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = getFileIcon(file.type);
                  return <Icon className="text-muted-foreground" />;
                })()}

                <div className="flex flex-col">
                  <span className="max-w-[300px] md:max-w-full overflow-clip font-medium text-ellipsis">
                    {file.name}
                  </span>
                  <span className="text-muted-foreground text-sm">{formatBytes(file.size)}</span>
                </div>
              </div>

              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-destructive"
                  type="button"
                  onClick={(e) => setFiles((prev) => prev.filter((_, i) => i !== index))}
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex justify-center items-center h-72 text-muted-foreground">
          No files selected
        </p>
      )}
    </ScrollArea>
  );
}
