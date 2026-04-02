import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Got followers_1.json? How to Use Your Instagram Data — InstaTrack',
  description: 'Already have followers_1.json or following.json? Upload them to InstaTrack to see who unfollowed you. Or follow this guide to download your data from Instagram.',
  keywords: ['followers_1.json', 'following.json', 'connections followers_and_following', 'Instagram data export', 'import Instagram followers', 'Instagram JSON import'],
  openGraph: {
    title: 'Got followers_1.json? How to Use Your Instagram Data — InstaTrack',
    description: 'Already have followers_1.json? Upload it to InstaTrack to track unfollowers and growth. Free, private, no login.',
    url: 'https://instatrack.njoylab.com/how-to-export',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'InstaTrack — Import Instagram followers_1.json and following.json',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Got followers_1.json? How to Use Your Instagram Data — InstaTrack',
    description: 'Already have followers_1.json? Upload it to InstaTrack to see who unfollowed you. Free, private.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://instatrack.njoylab.com/how-to-export',
  },
};

export default function HowToExportPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Export Your Instagram Data',
    description: 'Step-by-step guide to export your Instagram followers and following data as JSON files.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Go to the Download Page',
        text: 'Navigate to Instagram\'s download page at https://accountscenter.instagram.com/info_and_permissions/dyi/',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Request a Download',
        text: 'Tap "Request a download". You might be asked to select the profile if you have multiple accounts.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Select Information Type',
        text: 'Choose "Select types of information". This allows you to download only what you need.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Choose Followers and following',
        text: 'From the list, select "Followers and following" and tap "Next".',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Set Format and Date Range',
        text: 'Change the format from HTML to JSON and set the date range to "All time".',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Submit Request',
        text: 'Tap "Submit request".',
      },
      {
        '@type': 'HowToStep',
        position: 7,
        name: 'Download and Unzip',
        text: 'Wait for Instagram to prepare your file (you\'ll receive an email), then download and unzip it.',
      },
      {
        '@type': 'HowToStep',
        position: 8,
        name: 'Locate Your Files',
        text: 'Navigate to connections/followers_and_following/ folder to find followers_1.json and following.json.',
      },
      {
        '@type': 'HowToStep',
        position: 9,
        name: 'Import to InstaTrack',
        text: 'Upload these two files in the InstaTrack import dialog.',
      },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is followers_1.json?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'followers_1.json is a file inside the Instagram data download ZIP. It contains a list of all your current followers in JSON format. You can find it in the connections/followers_and_following/ folder after unzipping your Instagram data export.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why do I have followers_1.json and followers_2.json?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you have a large number of followers, Instagram splits the list across multiple files (followers_1.json, followers_2.json, etc.). InstaTrack currently uses followers_1.json to track your followers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is the connections/followers_and_following folder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'After downloading and unzipping your Instagram data export, open the folder and navigate to connections/followers_and_following/. There you will find followers_1.json and following.json.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I download my Instagram data to get followers_1.json?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Go to https://accountscenter.instagram.com/info_and_permissions/dyi/, tap "Request a download", select "Followers and following", change the format to JSON and date range to All time, then submit. Instagram will email you when the file is ready to download.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I import followers_1.json into InstaTrack?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Open InstaTrack at instatrack.njoylab.com, click the import button, and upload both followers_1.json and following.json. Your data is processed entirely in your browser — nothing is sent to any server.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
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
            <h1 className="text-3xl font-semibold leading-none tracking-tight">How to Export &amp; Import Your Instagram Data</h1>
            <CardDescription>
              Already have <code className="bg-muted px-1 py-0.5 rounded text-sm">followers_1.json</code>? Skip to <a href="#import" className="underline">Step 9 — Import to InstaTrack</a>. Otherwise, follow all steps to download your data first.
              {' '}Want to understand what you can do with the data?{' '}
              <Link href="/blog/download-instagram-data-analyze" className="underline">
                Learn how to analyze your Instagram account data
              </Link>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-base">
            <h2 className="text-xl font-semibold" id="export-guide">Step-by-Step: Download Your Instagram Data</h2>
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
             <div id="import">
              <h2 className="text-xl font-semibold mb-2">Step 9: Import to InstaTrack</h2>
              <p>
                You&apos;re all set! Go back to the InstaTrack dashboard and upload these two files in the import dialog.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
