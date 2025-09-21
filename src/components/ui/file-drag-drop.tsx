"use client";

import { useState, useCallback, useRef } from 'react';
import { Upload, File as FileIcon, X, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from './button';

interface FileDragDropProps {
  onFilesChange: (files: File[]) => void;
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
}

export function FileDragDrop({
  onFilesChange,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
}: FileDragDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;

    const addedFiles: File[] = Array.from(newFiles);
    let validFiles = [...files];
    let errorOccurred = false;

    for (const file of addedFiles) {
      if (validFiles.length >= maxFiles) {
        toast({ variant: 'destructive', title: `You can only upload up to ${maxFiles} files.` });
        errorOccurred = true;
        break;
      }
      if (file.size > maxSize) {
        toast({ variant: 'destructive', title: `File ${file.name} is too large. Max size is ${maxSize / 1024 / 1024}MB.` });
        errorOccurred = true;
        continue;
      }
      if (accept && !accept.split(',').map(s => s.trim()).includes(file.type)) {
         toast({ variant: 'destructive', title: `File type ${file.type} is not supported.` });
         errorOccurred = true;
         continue;
      }
      validFiles.push(file);
    }
    
    setFiles(validFiles);
    onFilesChange(validFiles);

  }, [files, maxFiles, maxSize, accept, onFilesChange, toast]);


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <FileIcon className="h-6 w-6 text-primary" />;
    }
    if (fileType.startsWith('video/')) {
      return <Video className="h-6 w-6 text-primary" />;
    }
    return <FileIcon className="h-6 w-6 text-muted-foreground" />;
  }

  return (
    <div className="space-y-4">
      <div
        className={cn(
          'flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
          isDragging ? 'border-primary bg-primary/10' : 'border-input hover:border-primary/50'
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-10 w-10 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="font-semibold text-primary">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">Images or Videos (up to 10MB)</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          accept={accept}
          onChange={handleFileSelect}
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
            <h4 className="font-medium text-sm">Attached files:</h4>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-secondary/50">
                <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <span className="text-sm font-medium truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => removeFile(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
