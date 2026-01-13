"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useSnapshots } from '@/hooks/use-snapshots';
import type { Snapshot, User } from '@/lib/types';
import { Info, Loader2, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { useState, type ChangeEvent } from 'react';
import { Alert, AlertDescription } from './ui/alert';

interface ImportDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (snapshot: Snapshot) => void;
}

// Compare two snapshots to check if they contain the same data
const areSnapshotsEqual = (snapshot1: Snapshot, snapshot2: Snapshot): boolean => {
  // Compare followers
  if (snapshot1.followers.length !== snapshot2.followers.length) return false;
  const followers1Usernames = new Set(snapshot1.followers.map(f => f.username));
  const followers2Usernames = new Set(snapshot2.followers.map(f => f.username));
  if (followers1Usernames.size !== followers2Usernames.size) return false;
  for (const username of followers1Usernames) {
    if (!followers2Usernames.has(username)) return false;
  }

  // Compare following
  if (snapshot1.following.length !== snapshot2.following.length) return false;
  const following1Usernames = new Set(snapshot1.following.map(f => f.username));
  const following2Usernames = new Set(snapshot2.following.map(f => f.username));
  if (following1Usernames.size !== following2Usernames.size) return false;
  for (const username of following1Usernames) {
    if (!following2Usernames.has(username)) return false;
  }

  return true;
};

interface InstagramData {
  relationships_followers?: Array<{
    title?: string;
    string_list_data: Array<{ value?: string; href?: string; timestamp?: number }>;
  }>;
  relationships_following?: Array<{
    title?: string;
    string_list_data: Array<{ value?: string; href?: string; timestamp?: number }>;
  }>;
}

type FileContent = InstagramData | Array<{ title?: string; string_list_data: Array<{ value?: string; href?: string; timestamp?: number }> }>;

const parseJsonFile = (file: File): Promise<FileContent> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = JSON.parse(e.target?.result as string) as FileContent;
        resolve(result);
      } catch {
        reject(new Error(`Failed to parse ${file.name}. Not a valid JSON file.`));
      }
    };
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}.`));
    reader.readAsText(file);
  });
};

// Extract username from Instagram URL or use value/title directly
const extractUsername = (data: { value?: string; href?: string }, title?: string): string | null => {
  // If value exists, use it
  if (data.value) return data.value;

  // If title exists at parent level, use it
  if (title) return title;

  // If no value but href exists, extract from URL
  if (data.href) {
    // Handle formats: https://www.instagram.com/_u/username or https://www.instagram.com/username
    const match = data.href.match(/instagram\.com\/(?:_u\/)?([^/?]+)/);
    if (match?.[1]) return match[1];
  }

  return null;
};

const parseFollowers = (json: FileContent): User[] => {
  // New structure from user
  if (Array.isArray(json)) {
    return json.flatMap(item =>
      (item.string_list_data || [])
        .map(d => {
          const username = extractUsername(d, item.title);
          return username ? { username, profileUrl: d.href || '' } : null;
        })
        .filter((user): user is User => user !== null)
    );
  }
  // Original structure
  if (json.relationships_followers) {
    return (json.relationships_followers || []).flatMap(item =>
      (item.string_list_data || [])
        .map(d => {
          const username = extractUsername(d, item.title);
          return username ? { username, profileUrl: d.href || '' } : null;
        })
        .filter((user): user is User => user !== null)
    );
  }
  throw new Error("Invalid followers file format. Expected an array or an object with 'relationships_followers' key.");
};

const parseFollowing = (json: InstagramData): User[] => {
  if (!json.relationships_following) throw new Error("Invalid following file format. Expected 'relationships_following' key.");
  console.log(json.relationships_following);
  return (json.relationships_following || []).flatMap(item =>
    (item.string_list_data || [])
      .map(d => {
        const username = extractUsername(d, item.title);
        return username ? { username, profileUrl: d.href || '' } : null;
      })
      .filter((user): user is User => user !== null)
  );
};

export default function ImportDialog({ isOpen, onOpenChange, onSave }: ImportDialogProps) {
  const [followersFile, setFollowersFile] = useState<File | null>(null);
  const [followingFile, setFollowingFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { snapshots } = useSnapshots();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fileType: 'followers' | 'following') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/json') {
        if (fileType === 'followers') setFollowersFile(file);
        else setFollowingFile(file);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: `Please select a JSON file for ${fileType}.`
        });
      }
    }
  };

  const handleSave = async () => {
    if (!followersFile || !followingFile) {
      toast({
        variant: "destructive",
        title: "Missing Files",
        description: "Please select both a followers and a following file."
      });
      return;
    }

    setIsLoading(true);
    try {
      const followersJson = await parseJsonFile(followersFile);
      const followingJson = await parseJsonFile(followingFile);

      const followers = parseFollowers(followersJson);
      const following = parseFollowing(followingJson as InstagramData);

      // say which file is empty
      if (followers.length === 0) {
        throw new Error("Followers file is empty. Check file content and format.");
      }
      if (following.length === 0) {
        throw new Error("Following file is empty. Check file content and format.");
      }

      const newSnapshot: Snapshot = {
        date: new Date(followersFile.lastModified).toISOString(),
        followers,
        following,
      };

      // Check if the new snapshot is identical to the most recent one
      const lastSnapshot = snapshots.length > 0 ? snapshots[snapshots.length - 1] : null;
      if (lastSnapshot && areSnapshotsEqual(newSnapshot, lastSnapshot)) {
        toast({
          title: "No Changes Detected",
          description: `The imported data is identical to your most recent snapshot. No new snapshot was created.`,
        });
        // Reset state without saving
        setFollowersFile(null);
        setFollowingFile(null);
        onOpenChange(false);
        return;
      }

      onSave(newSnapshot);
      toast({
        title: "Success",
        description: `Snapshot created with ${followers.length} followers and ${following.length} following.`,
      });
      // Reset state after save
      setFollowersFile(null);
      setFollowingFile(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Snapshot</DialogTitle>
          <DialogDescription>
            Upload your &lsquo;followers_1.json&rsquo; and &lsquo;following.json&rsquo; files exported from Instagram. A new snapshot will be created.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="followers-file">Followers File (followers_1.json)</Label>
            <Input id="followers-file" type="file" accept="application/json" onChange={(e) => handleFileChange(e, 'followers')} />
            {followersFile && <p className="text-sm text-muted-foreground">Selected: {followersFile.name}</p>}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="following-file">Following File (following.json)</Label>
            <Input id="following-file" type="file" accept="application/json" onChange={(e) => handleFileChange(e, 'following')} />
            {followingFile && <p className="text-sm text-muted-foreground">Selected: {followingFile.name}</p>}
          </div>

          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Need help? Follow {' '}
              <Link
                href="/how-to-export"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                this guide
              </Link>
              {' '}to export your data from Instagram.
            </AlertDescription>
          </Alert>

        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSave} disabled={isLoading || !followersFile || !followingFile}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
            Create Snapshot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
