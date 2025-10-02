"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import type { Snapshot } from '@/lib/types';
import { ArrowDown, ArrowUp, Users, UserPlus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import type { ChartConfig } from "@/components/ui/chart";

interface OverviewTabProps {
  snapshots: Snapshot[];
}

const chartConfig = {
  followers: {
    label: "Followers",
    color: "hsl(var(--primary))",
  },
  following: {
    label: "Following",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

const getGrowth = (current: number, previous: number | undefined) => {
    if (previous === undefined || previous === 0) return { diff: 0, isPositive: true };
    const diff = current - previous;
    return { diff, isPositive: diff >= 0 };
};

export default function OverviewTab({ snapshots }: OverviewTabProps) {
  if (snapshots.length === 0) {
    return null;
  }

  const chartData = snapshots.map(snapshot => ({
    date: new Date(snapshot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    followers: snapshot.followers.length,
    following: snapshot.following.length,
  }));

  const latest = snapshots[snapshots.length - 1];
  const previous = snapshots.length > 1 ? snapshots[snapshots.length - 2] : undefined;

  const followerGrowth = getGrowth(latest.followers.length, previous?.followers.length);
  const followingGrowth = getGrowth(latest.following.length, previous?.following.length);

  const GrowthIndicator = ({ growth }: { growth: { diff: number; isPositive: boolean } }) => (
    <div className={`flex items-center text-xs ${growth.isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {growth.isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
      {Math.abs(growth.diff)}
      <span className="text-muted-foreground ml-1">from last snapshot</span>
    </div>
  );

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latest.followers.length}</div>
            {previous && <GrowthIndicator growth={followerGrowth} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Following</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latest.following.length}</div>
            {previous && <GrowthIndicator growth={followingGrowth} />}
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follower/Following Ratio</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
                {latest.following.length > 0 ? (latest.followers.length / latest.following.length).toFixed(2) : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">Higher is generally better</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Snapshots Taken</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{snapshots.length}</div>
            <p className="text-xs text-muted-foreground">Keep taking snapshots to see trends</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Follower & Following Trends</CardTitle>
          <CardDescription>An overview of your account growth over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={40}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="followers"
                  type="monotone"
                  stroke={chartConfig.followers.color}
                  strokeWidth={2}
                  dot={true}
                />
                <Line
                  dataKey="following"
                  type="monotone"
                  stroke={chartConfig.following.color}
                  strokeWidth={2}
                  dot={true}
                />
                 <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
