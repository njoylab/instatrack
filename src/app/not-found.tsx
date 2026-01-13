import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | InstaTrack',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-4xl mb-2">404</CardTitle>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
            <CardDescription className="text-base mt-4">
              The page you are looking for does not exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Here are some helpful links instead:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go to Dashboard
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/how-to-export">
                    How to Export Data
                  </Link>
                </Button>
              </div>
            </div>
            <div className="pt-6 border-t">
              <h3 className="font-semibold mb-3">Popular Pages:</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-primary hover:underline">
                    Dashboard - Track your Instagram growth
                  </Link>
                </li>
                <li>
                  <Link href="/how-to-export" className="text-primary hover:underline">
                    How to Export - Step-by-step guide
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-primary hover:underline">
                    FAQ - Frequently asked questions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
