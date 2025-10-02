import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function HowToExportPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="outline" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">How to Export Your Instagram Data</CardTitle>
            <CardDescription>
              Follow these steps to download the necessary JSON files from your Instagram account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-base">
            <div>
              <h3 className="font-semibold text-xl mb-2">Step 1: Go to the Download Page</h3>
              <p>
                The easiest way is to go directly to Instagram&apos;s download page by clicking this link:
              </p>
              <Button asChild variant="link" className="px-0 h-auto text-base">
                <a href="https://accountscenter.instagram.com/info_and_permissions/dyi/" target="_blank" rel="noopener noreferrer">
                  https://accountscenter.instagram.com/info_and_permissions/dyi/
                </a>
              </Button>
              <p className="mt-2">
                You may need to log in to your account.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Step 2: Request a Download</h3>
              <p>
                Tap <span className="font-semibold">Request a download</span>. You might be asked to select the profile if you have multiple accounts.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Step 3: Select Information Type</h3>
              <p>
                Choose <span className="font-semibold">Select types of information</span>. This allows you to download only what you need, which is much faster.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Step 4: Choose &ldquo;Followers and following&rdquo;</h3>
              <p>
                From the list, select <span className="font-semibold">Followers and following</span> and tap <span className="font-semibold">Next</span>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Step 5: Set Format and Date Range</h3>
              <p>
                This is a very important step. On the next screen, configure the following options:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Format</strong>: Change it from HTML to <span className="font-semibold">JSON</span>.
                </li>
                <li>
                  <strong>Date range</strong>: Change it to <span className="font-semibold">All time</span>.
                </li>
              </ul>
            </div>
             <div>
              <h3 className="font-semibold text-xl mb-2">Step 6: Submit Request</h3>
              <p>
                Tap <span className="font-semibold">Submit request</span>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Step 7: Download and Unzip</h3>
              <p>
                Instagram will prepare your file and send you an email when it&apos;s ready. This can take a few minutes. Once you get the email, download the file and unzip it.
              </p>
            </div>
             <div>
              <h3 className="font-semibold text-xl mb-2">Step 8: Locate Your Files</h3>
              <p>
                Inside the unzipped folder, navigate to the <code className="bg-muted px-1.5 py-0.5 rounded">connections/followers_and_following/</code> folder. You will find the two files you need:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code className="bg-muted px-1.5 py-0.5 rounded">followers_1.json</code></li>
                <li><code className="bg-muted px-1.5 py-0.5 rounded">following.json</code></li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                Note: If you have a very large number of followers, your followers list might be split into multiple files (e.g., &ldquo;followers_1.json&rdquo;, &ldquo;followers_2.json&rdquo;). This app currently only supports &ldquo;followers_1.json&rdquo;.
              </p>
            </div>
             <div>
              <h3 className="font-semibold text-xl mb-2">Step 9: Import to InstaTrack</h3>
              <p>
                You&apos;re all set! Go back to the InstaTrack dashboard and upload these two files in the import dialog.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
