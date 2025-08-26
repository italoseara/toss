import { Trash2, Upload } from "lucide-react";

import { formatBytes, getFileIcon } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileListProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FileList({ files, setFiles }: FileListProps) {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Files to be uploaded:</h2>
        <Button type="submit" disabled={files.length === 0}>
          <Upload />
          Upload Files
        </Button>
      </div>

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
                    className="hover:text-red-500"
                    type="button"
                    onClick={(e) =>
                      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
                    }
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

      <h2 className="my-2">
        {files.length} File{files.length > 1 && "s"}{" "}
        <span className="text-muted-foreground">
          ({formatBytes(files.reduce((total, file) => total + file.size, 0))})
        </span>
      </h2>
    </div>
  );
}
