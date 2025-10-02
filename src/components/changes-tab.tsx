"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, UserMinus, UserX, LineChart, UserPlus } from 'lucide-react';
import type { Snapshot, User } from '@/lib/types';
import UserTable from '@/components/user-table';
import { Separator } from './ui/separator';

interface ChangesTabProps {
  snapshots: Snapshot[];
}

export default function ChangesTab({ snapshots }: ChangesTabProps) {
  const [unfollowers, setUnfollowers] = useState<User[] | null>(null);
  const [unfollowed, setUnfollowed] = useState<User[] | null>(null);
  const [newFollowers, setNewFollowers] = useState<User[] | null>(null);
  const [newFollowing, setNewFollowing] = useState<User[] | null>(null);


  useEffect(() => {
    if (snapshots.length >= 2) {
      const latestSnapshot = snapshots[snapshots.length - 1];
      const previousSnapshot = snapshots[snapshots.length - 2];

      // --- Unfollowers and New Followers ---
      const latestFollowersUsernames = new Set(latestSnapshot.followers.map(u => u.username));
      const previousFollowersUsernames = new Set(previousSnapshot.followers.map(u => u.username));

      const newUnfollowers = previousSnapshot.followers.filter(u => !latestFollowersUsernames.has(u.username));
      setUnfollowers(newUnfollowers);

      const newFollowersList = latestSnapshot.followers.filter(u => !previousFollowersUsernames.has(u.username));
      setNewFollowers(newFollowersList);

      // --- Unfollowed by you and New Following ---
      const latestFollowingUsernames = new Set(latestSnapshot.following.map(u => u.username));
      const previousFollowingUsernames = new Set(previousSnapshot.following.map(u => u.username));
      
      const newUnfollowed = previousSnapshot.following.filter(u => !latestFollowingUsernames.has(u.username));
      setUnfollowed(newUnfollowed);

      const newFollowingList = latestSnapshot.following.filter(u => !previousFollowingUsernames.has(u.username));
      setNewFollowing(newFollowingList);

    }
  }, [snapshots]);

  if (snapshots.length < 2) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8 mt-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <LineChart className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-bold tracking-tight">Not enough data</h2>
          <p className="text-muted-foreground">You need at least two snapshots to see changes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {unfollowers && unfollowed && newFollowers && newFollowing && (
        <Card>
          <CardHeader>
            <CardTitle>Changes Since Last Snapshot</CardTitle>
            <CardDescription>
              See who you&apos;ve followed/unfollowed and who has followed/unfollowed you between your last two snapshots.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center mb-4">
                <UserMinus className="mr-2 h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold">New Unfollowers</h3>
              </div>
              <UserTable title="Unfollowers" users={unfollowers} />
            </div>
            <Separator />
            <div>
              <div className="flex items-center mb-4">
                <UserX className="mr-2 h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold">You Unfollowed</h3>
              </div>
              <UserTable title="Unfollowed by You" users={unfollowed} />
            </div>
            <Separator />
            <div>
              <div className="flex items-center mb-4">
                <UserPlus className="mr-2 h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold">New Followers</h3>
              </div>
              <UserTable title="New Followers" users={newFollowers} />
            </div>
            <Separator />
             <div>
              <div className="flex items-center mb-4">
                <UserPlus className="mr-2 h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold">New Following</h3>
              </div>
              <UserTable title="New Following" users={newFollowing} />
            </div>
          </CardContent>
        </Card>
      )}

      <Alert className="mt-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Note on Accuracy</AlertTitle>
        <AlertDescription>
          The analysis is based on the data from your latest two snapshot(s). For the most accurate results, import fresh data from Instagram regularly.
        </AlertDescription>
      </Alert>
    </div>
  );
}
