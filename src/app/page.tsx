import DashboardClient from '@/components/dashboard-client';

export default function Home() {
  return (
    <main>
      {/* SEO content - visually hidden but accessible to search engines and screen readers */}
      <div className="sr-only">
        <h1>InstaTrack - Track Your Instagram Followers and Following</h1>
        <p>
          InstaTrack is a free, privacy-first web application that helps you monitor and analyze your Instagram followers and following lists over time.
          Track who unfollowed you, discover patterns in your Instagram growth, and get AI-powered insights into your follower relationships.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>Snapshot Tracking: Create snapshots of your Instagram followers and following lists over time</li>
          <li>Change Detection: Automatically detect who unfollowed you or who you unfollowed</li>
          <li>AI-Powered Analysis: Get intelligent insights about non-reciprocal followers and following patterns</li>
          <li>Privacy First: All data is processed locally in your browser - nothing is sent to our servers</li>
          <li>Easy Export: Download your Instagram data directly from Instagram and import it with one click</li>
          <li>Data Backup: Backup and restore your tracking data anytime</li>
        </ul>
        <h2>How It Works</h2>
        <p>
          Simply export your Instagram followers and following data from Instagram's official download page,
          import the JSON files into InstaTrack, and start tracking your Instagram growth. No login required,
          no Instagram API access needed, and complete privacy guaranteed.
        </p>
      </div>
      <DashboardClient />
    </main>
  );
}
