"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, HeartHandshake, HeartOff, Info } from 'lucide-react';
import type { Snapshot, User } from '@/lib/types';
import UserTable from '@/components/user-table';
import { useToast } from '@/hooks/use-toast';

interface AnalysisTabProps {
  snapshots: Snapshot[];
}

export default function AnalysisTab({ snapshots }: AnalysisTabProps) {
  const { toast } = useToast();
  const [nonFollowers, setNonFollowers] = useState<string[] | null>(null);
  const [nonFollowing, setNonFollowing] = useState<string[] | null>(null);

  const latestSnapshot = snapshots.length > 0 ? snapshots[snapshots.length - 1] : null;

  useEffect(() => {
    if (!latestSnapshot) return;

    // Analyze Non-Followers
    try {
      const followersUsernames = new Set(latestSnapshot.followers.map(u => u.username));
      const nonFollowersList = latestSnapshot.following
        .map(u => u.username)
        .filter(username => !followersUsernames.has(username));
      setNonFollowers(nonFollowersList);
    } catch {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not analyze non-followers.",
      });
    }

    // Analyze Non-Following
    try {
      const followingUsernames = new Set(latestSnapshot.following.map(u => u.username));
      const nonFollowingList = latestSnapshot.followers
        .map(u => u.username)
        .filter(username => !followingUsernames.has(username));
      setNonFollowing(nonFollowingList);
    } catch {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not analyze non-following users.",
      });
    }
  }, [snapshots, latestSnapshot, toast]);


  const getFullUserDetails = (usernames: string[]): User[] => {
    if (!latestSnapshot) return [];
    // Create a map of all users from both lists for efficient lookup
    const allUsers = new Map<string, User>();
    latestSnapshot.followers.forEach(u => allUsers.set(u.username, u));
    latestSnapshot.following.forEach(u => {
      if (!allUsers.has(u.username)) {
        allUsers.set(u.username, u);
      }
    });
    return usernames.map(username => allUsers.get(username)).filter((u): u is User => !!u);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relationship Analysis</CardTitle>
          <CardDescription>
            Analyze your follower/following lists to find non-reciprocal relationships. Based on the latest snapshot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="non-followers">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="non-followers"><HeartOff className="mr-2 h-4 w-4" />Non-Followers</TabsTrigger>
              <TabsTrigger value="non-following"><HeartHandshake className="mr-2 h-4 w-4" />Non-Following</TabsTrigger>
            </TabsList>

            <TabsContent value="non-followers" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Who Doesn&apos;t Follow You Back?</CardTitle>
                  <CardDescription>This list shows accounts you follow that don&apos;t follow you back.</CardDescription>
                </CardHeader>
                <CardContent>
                  {nonFollowers === null && <p className="mt-4 text-sm text-muted-foreground flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing...</p>}
                  {nonFollowers !== null && (
                    <div className="mt-4">
                      <UserTable title="Non-Followers" users={getFullUserDetails(nonFollowers)} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="non-following" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Accounts You Don&apos;t Follow Back</CardTitle>
                  <CardDescription>This list shows accounts that follow you, but you don&apos;t follow back.</CardDescription>
                </CardHeader>
                <CardContent>
                  {nonFollowing === null && <p className="mt-4 text-sm text-muted-foreground flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing...</p>}
                  {nonFollowing !== null && (
                    <div className="mt-4">
                      <UserTable title="Non-Following" users={getFullUserDetails(nonFollowing)} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Alert className="mt-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Note on Accuracy</AlertTitle>
        <AlertDescription>
          The analysis is based on the data from your latest snapshot(s). For the most accurate results, import fresh data from Instagram regularly.
        </AlertDescription>
      </Alert>
    </div>
  );
}
