import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'How to Download Your Instagram Data and Analyze It',
  description:
    'Download your Instagram account data and analyze who unfollowed you for free. Step-by-step guide to get followers_1.json and what to do with it.',
  keywords: [
    'download instagram account data',
    'download instagram analytics data',
    'download ig data',
    'followers_1.json',
    'instagram data export',
    'instagram followers analysis',
  ],
  openGraph: {
    title: 'How to Download Your Instagram Data and Analyze It',
    description:
      'Download your Instagram account data and analyze who unfollowed you for free. Step-by-step guide to get followers_1.json and what to do with it.',
    url: 'https://instatrack.njoylab.com/blog/download-instagram-data-analyze',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How to Download and Analyze Your Instagram Data — InstaTrack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Download Your Instagram Data and Analyze It',
    description:
      'Step-by-step guide to get followers_1.json from Instagram and analyze who unfollowed you. Free, private, no login.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://instatrack.njoylab.com/blog/download-instagram-data-analyze',
  },
};

export default function DownloadInstagramDataPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'How to Download Your Instagram Data and Analyze It',
        description:
          'Step-by-step guide to download your Instagram account data (followers_1.json, following.json) and analyze who unfollowed you for free.',
        url: 'https://instatrack.njoylab.com/blog/download-instagram-data-analyze',
        datePublished: '2026-03-30',
        dateModified: '2026-03-30',
        author: {
          '@type': 'Organization',
          name: 'InstaTrack',
          url: 'https://instatrack.njoylab.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'InstaTrack',
          url: 'https://instatrack.njoylab.com',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How often can I download my Instagram data?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Instagram doesn't publish a hard limit, but in practice you can request a download every few days without issue. For follower tracking, monthly downloads are sufficient for most users.",
            },
          },
          {
            '@type': 'Question',
            name: 'How long does it take to get my Instagram data?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Usually between a few minutes and a few hours. Instagram sends you an email with a download link when it is ready. Occasionally it takes up to 48 hours.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I see who unfollowed me with just one download?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. You need at least two snapshots taken at different times. The first download establishes your baseline; subsequent downloads let you detect changes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is it safe to use third-party Instagram analytics tools?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Tools that analyze your downloaded JSON files (like InstaTrack) are safe — they never touch your Instagram credentials. Tools that ask you to log in with Instagram are riskier and may violate Instagram's Terms of Service.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
        <div className="max-w-3xl mx-auto">
          <Button asChild variant="outline" className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              How to Download Your Instagram Data and Analyze It
            </h1>

            <p className="text-muted-foreground text-sm mb-8">
              Published March 30, 2026 · 6 min read
            </p>

            <p className="text-lg leading-relaxed">
              Most Instagram users don&apos;t know they can download a complete copy of their account
              data — including their full follower and following lists — directly from Instagram, for
              free, with no third-party app required. This guide shows you exactly how to do it and,
              more importantly, what you can actually learn from that data once you have it.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">
              What&apos;s Inside Your Instagram Data Download
            </h2>
            <p>
              When you request your account data, Instagram sends you a ZIP file. Most of it is
              content you already know about — your photos, comments, DMs. The analytically useful
              part is a folder called{' '}
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                connections/followers_and_following/
              </code>
              , which contains two files:
            </p>
            <ul className="space-y-2 my-4">
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">followers_1.json</code>{' '}
                — every account that follows you: username and profile URL
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">following.json</code> —
                every account you follow
              </li>
            </ul>
            <p>
              These aren&apos;t engagement analytics (no likes, reach, or impressions). They&apos;re
              something more valuable: the raw, unfiltered ground truth of your follower
              relationships. With them you can answer questions Instagram&apos;s built-in Insights
              deliberately won&apos;t show you — like exactly who unfollowed you last month.
            </p>
            <p className="text-sm text-muted-foreground border-l-4 border-muted pl-4 my-4">
              <strong>Note:</strong> If you have a large number of followers, Instagram may split
              your list across multiple files ({' '}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">followers_1.json</code>,{' '}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">followers_2.json</code>, etc.).
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">
              How to Download Your Instagram Account Data (Step by Step)
            </h2>
            <p>
              The download is free and requires no third-party app. Instagram will email you a link
              when the file is ready — it usually takes between a few minutes and a few hours.
            </p>

            <div className="space-y-6 my-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Step 1: Go to Instagram&apos;s data download page
                </h3>
                <p>Open this link directly:</p>
                <Button asChild variant="link" className="px-0 h-auto text-base">
                  <a
                    href="https://accountscenter.instagram.com/info_and_permissions/dyi/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    accountscenter.instagram.com/info_and_permissions/dyi/
                  </a>
                </Button>
                <p className="mt-2 text-sm text-muted-foreground">
                  You can also get there manually: Instagram app → Profile → Menu (☰) → Your
                  activity → Download your information.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Step 2: Tap &ldquo;Request a download&rdquo;</h3>
                <p>If you have multiple accounts, select the one you want to analyze.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Step 3: Choose &ldquo;Select types of information&rdquo;
                </h3>
                <p>
                  This lets you download only what you need instead of your entire account history.
                  It&apos;s faster and produces a much smaller file.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Step 4: Select &ldquo;Followers and following&rdquo; → tap Next
                </h3>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Step 5: Set format to JSON and date range to &ldquo;All time&rdquo;
                </h3>
                <p>
                  This step is critical. The default format is HTML — change it to{' '}
                  <strong>JSON</strong>. JSON is the format that tools (and the analysis below) can
                  actually read. Set the date range to &ldquo;All time&rdquo; to get your complete
                  list.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Step 6: Submit the request</h3>
                <p>
                  Instagram will send you an email when your file is ready. Download the ZIP and
                  unzip it. Your files are at:
                </p>
                <pre className="bg-muted rounded p-4 text-sm mt-2 overflow-x-auto">
                  {`connections/\n  followers_and_following/\n    followers_1.json\n    following.json`}
                </pre>
              </div>
            </div>

            <p className="text-sm">
              Need a more detailed walkthrough?{' '}
              <Link href="/how-to-export" className="underline text-primary hover:text-primary/80">
                See our step-by-step import guide
              </Link>
              .
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">
              What You Can Learn From followers_1.json
            </h2>
            <p>
              The raw JSON files are readable but not immediately actionable. Here&apos;s what the
              data reveals once you process it:
            </p>
            <ul className="space-y-4 my-4">
              <li>
                <strong>Who unfollowed you.</strong> Compare two snapshots taken at different times
                — accounts in the first snapshot&apos;s followers list but not in the second have
                unfollowed you. Instagram doesn&apos;t notify you about this; the data download is
                the only official way to find out.
              </li>
              <li>
                <strong>Who you follow that doesn&apos;t follow you back.</strong> Cross-reference{' '}
                <code className="bg-muted px-1 py-0.5 rounded text-sm">following.json</code>{' '}
                against{' '}
                <code className="bg-muted px-1 py-0.5 rounded text-sm">followers_1.json</code>.
                Anyone in &ldquo;following&rdquo; but not in &ldquo;followers&rdquo; is a one-way
                relationship.
              </li>
              <li>
                <strong>Follower growth over time.</strong> By taking periodic snapshots — weekly or
                monthly — and comparing individual accounts, you build a timeline of your actual
                growth: who joined and who left, not just a net number.
              </li>
              <li>
                <strong>New followers since your last snapshot.</strong> Accounts in your latest
                snapshot that weren&apos;t in the previous one are new followers — useful for
                correlating growth with specific posts or campaigns.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-10 mb-4">
              How to Analyze Your Instagram Data for Free with InstaTrack
            </h2>
            <p>
              Manually cross-referencing two JSON files is tedious.{' '}
              <Link href="/" className="underline text-primary hover:text-primary/80">
                InstaTrack
              </Link>{' '}
              does it automatically, for free, with no account required.
            </p>
            <p className="mt-4">The workflow:</p>
            <ol className="space-y-2 my-4 list-decimal list-inside">
              <li>Download your Instagram data using the steps above</li>
              <li>
                Open{' '}
                <Link href="/" className="underline text-primary hover:text-primary/80">
                  InstaTrack
                </Link>{' '}
                — no login, no signup
              </li>
              <li>
                Upload{' '}
                <code className="bg-muted px-1 py-0.5 rounded text-sm">followers_1.json</code> and{' '}
                <code className="bg-muted px-1 py-0.5 rounded text-sm">following.json</code> to
                create your first snapshot
              </li>
              <li>Repeat in a few weeks to create a second snapshot</li>
              <li>
                InstaTrack automatically shows you: who unfollowed you, who you&apos;re not
                following back, and your net growth between snapshots
              </li>
            </ol>
            <p>
              The privacy model is worth calling out explicitly: your data never leaves your
              browser. InstaTrack processes everything locally — no file is ever uploaded to a
              server. Most &ldquo;Instagram analytics&rdquo; tools require you to log in with your
              Instagram credentials, which carries real security risk. InstaTrack requires neither.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">
              What Instagram Data Downloads <em>Don&apos;t</em> Include
            </h2>
            <p>To set realistic expectations:</p>
            <ul className="space-y-2 my-4">
              <li>
                <strong>No engagement data</strong> — likes, comments, reach, and impressions are
                not in the personal data download. For those, you need a Business or Creator account
                and Meta Business Suite.
              </li>
              <li>
                <strong>No historical follower counts</strong> — the download gives you your
                follower list <em>right now</em>, not a history. That&apos;s why periodic snapshots
                are important.
              </li>
              <li>
                <strong>No competitor data</strong> — you can only download data from your own
                account.
              </li>
              <li>
                <strong>No profile visit or story view data</strong> — that&apos;s only available
                inside Instagram Insights.
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              If you need engagement analytics (reach per post, best posting times), Instagram
              Insights is the right tool. If you need follower relationship data — who follows you,
              who doesn&apos;t, who came and went — the data download is the only official source.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">Common Mistakes</h2>
            <div className="space-y-4">
              <div>
                <p>
                  <strong>Downloading in HTML format instead of JSON.</strong> HTML is
                  human-readable but can&apos;t be processed by tools. Always switch to JSON before
                  submitting the request.
                </p>
              </div>
              <div>
                <p>
                  <strong>Selecting &ldquo;All time&rdquo; but getting an incomplete list.</strong>{' '}
                  If your followers list seems shorter than your displayed follower count, Instagram
                  may be paginating across{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">followers_1.json</code>,{' '}
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">followers_2.json</code>,
                  etc. Check for multiple files.
                </p>
              </div>
              <div>
                <p>
                  <strong>Waiting too long between snapshots.</strong> Unfollower tracking only
                  works if you have two data points to compare. Monthly snapshots give a useful
                  resolution without being burdensome.
                </p>
              </div>
              <div>
                <p>
                  <strong>Using third-party apps that require Instagram login.</strong> Several
                  tools advertise instant follower tracking but require you to authenticate with
                  your Instagram credentials. This violates Instagram&apos;s Terms of Service and
                  puts your account at risk. The data download approach is the only method
                  that&apos;s fully compliant and safe.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mt-10 mb-4">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-1">
                  How often can I download my Instagram data?
                </h3>
                <p className="text-muted-foreground">
                  Instagram doesn&apos;t publish a hard limit, but in practice you can request a
                  download every few days without issue. For follower tracking, monthly downloads
                  are sufficient for most users.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  How long does it take to get my Instagram data?
                </h3>
                <p className="text-muted-foreground">
                  Usually between a few minutes and a few hours. Instagram sends you an email with
                  a download link when it&apos;s ready. Occasionally it takes up to 48 hours if
                  Instagram is under load.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Does the data download include deleted followers?
                </h3>
                <p className="text-muted-foreground">
                  No. The file reflects your follower list at the moment the download was
                  processed. Accounts that unfollowed you before you requested the download
                  won&apos;t appear — which is why tracking over time with multiple snapshots is
                  the only way to catch unfollows.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Can I see who unfollowed me with just one download?
                </h3>
                <p className="text-muted-foreground">
                  No. You need at least two snapshots taken at different times. The first download
                  establishes your baseline; subsequent downloads let you detect changes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Is it safe to use third-party Instagram analytics tools?
                </h3>
                <p className="text-muted-foreground">
                  It depends on the tool. Tools that analyze your downloaded JSON files (like
                  InstaTrack) are safe — they never touch your Instagram credentials. Tools that
                  ask you to log in with Instagram are riskier: they request API access that can be
                  revoked at any time, and some have been known to misuse account permissions.
                </p>
              </div>
            </div>

            <div className="mt-12 p-6 rounded-lg border bg-card text-center space-y-3">
              <p className="font-semibold text-lg">Ready to analyze your Instagram data?</p>
              <p className="text-muted-foreground text-sm">
                Upload your <code className="bg-muted px-1 py-0.5 rounded">followers_1.json</code>{' '}
                and <code className="bg-muted px-1 py-0.5 rounded">following.json</code> to
                InstaTrack — free, private, no login required.
              </p>
              <Button asChild size="lg">
                <Link href="/">Open InstaTrack →</Link>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
