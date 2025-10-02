"use client";

import { useState, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Snapshot } from '@/lib/types';
import { Loader2, RotateCcw } from 'lucide-react';

interface RestoreDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onRestore: (snapshots: Snapshot[]) => void;
}

const parseJsonFile = (file: File): Promise<Snapshot[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = JSON.parse(e.target?.result as string) as Snapshot[];
        resolve(result);
      } catch {
        reject(new Error(`Failed to parse ${file.name}. Not a valid JSON file.`));
      }
    };
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}.`));
    reader.readAsText(file);
  });
};

export default function RestoreDialog({ isOpen, onOpenChange, onRestore }: RestoreDialogProps) {
  const [backupFile, setBackupFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/json') {
        setBackupFile(file);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please select a valid JSON backup file.",
        });
      }
    }
  };

  const handleRestore = async () => {
    if (!backupFile) {
      toast({
        variant: "destructive",
        title: "Missing File",
        description: "Please select a backup file to restore."
      });
      return;
    }

    setIsLoading(true);
    try {
      const snapshots = await parseJsonFile(backupFile);
      
      // Basic validation
      if (!Array.isArray(snapshots) || snapshots.some(s => !s.date || !s.followers || !s.following)) {
        throw new Error("Invalid backup file format.");
      }

      onRestore(snapshots);

      toast({
        title: "Success",
        description: `Restored ${snapshots.length} snapshots from your backup.`,
      });
      setBackupFile(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Restore Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setBackupFile(null);
      }
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Restore Data</DialogTitle>
          <DialogDescription>
            Upload your `instatrack_backup.json` file to restore your snapshots. This will overwrite any existing data.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="backup-file">Backup File</Label>
            <Input id="backup-file" type="file" accept="application/json" onChange={handleFileChange} />
            {backupFile && <p className="text-sm text-muted-foreground">Selected: {backupFile.name}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" onClick={handleRestore} disabled={isLoading || !backupFile}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RotateCcw className="mr-2 h-4 w-4" />}
            Restore Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
