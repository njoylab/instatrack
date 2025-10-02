"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Trash2, LineChart, UsersRound, HeartOff, Users, Save, RotateCcw } from 'lucide-react';
import { useSnapshots } from '@/hooks/use-snapshots';
import ImportDialog from '@/components/import-dialog';
import OverviewTab from '@/components/overview-tab';
import AnalysisTab from '@/components/analysis-tab';
import { Logo } from '@/components/icons';
import type { Snapshot } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import ChangesTab from './changes-tab';
import Link from 'next/link';
import RestoreDialog from './restore-dialog';

export default function DashboardClient() {
  const [isImportOpen, setImportOpen] = useState(false);
  const [isRestoreOpen, setRestoreOpen] = useState(false);
  const { snapshots, addSnapshot, clearSnapshots, isLoaded, restoreSnapshots } = useSnapshots();

  const handleSaveSnapshot = (newSnapshot: Snapshot) => {
    addSnapshot(newSnapshot);
    setImportOpen(false);
  };
  
  const handleBackup = () => {
    const data = localStorage.getItem('instaTrackSnapshots');
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const today = new Date();
      const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD
      a.download = `instatrack_backup_${dateString}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleRestore = (newSnapshots: Snapshot[]) => {
    restoreSnapshots(newSnapshots);
    setRestoreOpen(false);
  };

  if (!isLoaded) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <Skeleton className="h-16 w-full mb-8" />
        <div className="grid gap-6">
          <Skeleton className="h-10 w-48 mb-4" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <Logo className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-headline">InstaTrack</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {snapshots.length > 0 && (
            <>
               <Button variant="outline" size="sm" onClick={handleBackup}>
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Backup Data</span>
              </Button>
              <Button variant="destructive" size="sm" onClick={clearSnapshots}>
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Clear Data</span>
              </Button>
            </>
          )}
          <Button onClick={() => setImportOpen(true)} size="sm">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">New Snapshot</span>
          </Button>
        </div>
      </header>

      <main className="flex-grow flex flex-col gap-4 p-4 sm:p-6 md:p-8">
        {snapshots.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Hero Section */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <LineChart className="h-20 w-20 text-primary" />
                    <div className="absolute -top-1 -right-1 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Users className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Welcome to InstaTrack</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Analyze your Instagram followers and following patterns with complete privacy.
                  All data processing happens locally in your browser.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 my-12">
                <div className="space-y-3 p-6 rounded-lg border bg-card">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Track Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor your follower and following trends over time with beautiful charts and insights.
                  </p>
                </div>

                <div className="space-y-3 p-6 rounded-lg border bg-card">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <HeartOff className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Smart Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover who doesn&apos;t follow you back and identify mutual connections with smart insights.
                  </p>
                </div>

                <div className="space-y-3 p-6 rounded-lg border bg-card">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Save className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Complete Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    Your data never leaves your browser. Process and analyze everything locally with full control.
                  </p>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-green-800 dark:text-green-200">100% Privacy Protected</h3>
                </div>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  InstaTrack processes all your data locally in your browser. No personal information is transmitted to external servers,
                  ensuring your Instagram data remains completely private and secure.
                </p>
              </div>

              {/* Getting Started */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Get Started in 3 Easy Steps</h2>

                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                        1
                      </div>
                      <h3 className="font-semibold">Export Your Data</h3>
                    </div>
                    <p className="text-sm text-muted-foreground ml-11">
                      Request your Instagram data download and get the followers_1.json and following.json files.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                        2
                      </div>
                      <h3 className="font-semibold">Create Snapshot</h3>
                    </div>
                    <p className="text-sm text-muted-foreground ml-11">
                      Upload your JSON files to create your first snapshot and start tracking your progress.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                        3
                      </div>
                      <h3 className="font-semibold">Analyze & Track</h3>
                    </div>
                    <p className="text-sm text-muted-foreground ml-11">
                      Explore your data with interactive charts, insights, and growth tracking over time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Button onClick={() => setImportOpen(true)} size="lg" className="text-base px-8">
                    <Upload className="mr-2 h-5 w-5" /> Create Your First Snapshot
                  </Button>
                  <Button variant="outline" onClick={() => setRestoreOpen(true)} size="lg" className="text-base px-8">
                    <RotateCcw className="mr-2 h-5 w-5" /> Restore Backup Data
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Need help exporting your data?{' '}
                  <Link href="/how-to-export" className="underline text-primary hover:text-primary/80 font-medium">
                    Follow our step-by-step guide
                  </Link>
                  {' '}or check out the{' '}
                  <Link href="/faq" className="underline text-primary hover:text-primary/80 font-medium">
                    FAQ
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3 md:w-[600px]">
              <TabsTrigger value="overview">
                <UsersRound className="mr-2 h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="analysis">
                <HeartOff className="mr-2 h-4 w-4" /> Analysis
              </TabsTrigger>
              <TabsTrigger value="changes">
                <Users className="mr-2 h-4 w-4" /> Changes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <OverviewTab snapshots={snapshots} />
            </TabsContent>
            <TabsContent value="analysis">
              <AnalysisTab snapshots={snapshots} />
            </TabsContent>
            <TabsContent value="changes">
              <ChangesTab snapshots={snapshots} />
            </TabsContent>
          </Tabs>
        )}
      </main>

      <ImportDialog
        isOpen={isImportOpen}
        onOpenChange={setImportOpen}
        onSave={handleSaveSnapshot}
      />

      <RestoreDialog
        isOpen={isRestoreOpen}
        onOpenChange={setRestoreOpen}
        onRestore={handleRestore}
      />
    </div>
  );
}
