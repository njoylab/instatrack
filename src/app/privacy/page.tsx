import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - InstaTrack',
  description: 'Privacy policy for InstaTrack. Learn how we protect your data with local processing and zero server storage.',
  openGraph: {
    title: 'Privacy Policy - InstaTrack',
    description: 'Privacy-first Instagram tracking with local data processing.',
    url: 'https://instatrack.njoylab.com/privacy',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - InstaTrack',
    description: 'Privacy-first Instagram tracking with local data processing.',
  },
  alternates: {
    canonical: 'https://instatrack.njoylab.com/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
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
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <CardDescription>
              Last updated: {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-base">
            <section>
              <h3 className="font-semibold text-xl mb-3">1. Introduction</h3>
              <p>
                Welcome to InstaTrack. We are committed to protecting your privacy and being transparent about how we handle your data. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">2. Our Privacy-First Approach</h3>
              <p className="mb-3">
                InstaTrack is designed with privacy as a core principle:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>100% Local Processing</strong>: All data processing occurs in your web browser</li>
                <li><strong>Zero Server Storage</strong>: We do not store, transmit, or have access to your Instagram data</li>
                <li><strong>No Tracking</strong>: We do not use analytics, cookies, or tracking technologies</li>
                <li><strong>No Third Parties</strong>: Your data is never shared with or sold to third parties</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">3. Information We Do NOT Collect</h3>
              <p className="mb-3">
                InstaTrack does <strong>NOT</strong> collect, store, or process:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your Instagram username or password</li>
                <li>Your Instagram follower or following data on our servers</li>
                <li>Personal information such as email, name, or phone number</li>
                <li>Usage data, analytics, or behavioral information</li>
                <li>IP addresses or device information</li>
                <li>Cookies or local storage data for tracking purposes</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">4. How the Application Works</h3>
              <div className="space-y-3">
                <h4 className="font-medium text-lg">Data Import</h4>
                <p>
                  When you upload Instagram data files (JSON format), these files are processed entirely in your browser using JavaScript. The files never leave your device.
                </p>

                <h4 className="font-medium text-lg">Local Storage</h4>
                <p>
                  All your snapshots and data are stored in your browser&apos;s local storage (localStorage API). This data remains on your device and is never transmitted to our servers or any third-party services.
                </p>

                <h4 className="font-medium text-lg">Data Control</h4>
                <p>
                  You have complete control over your data:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Export your data at any time using the backup feature</li>
                  <li>Delete all data using the &ldquo;Clear Data&rdquo; function</li>
                  <li>Data is automatically deleted if you clear your browser&apos;s local storage</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">5. AI Features</h3>
              <p>
                If you use AI-powered analysis features, the analysis is performed locally in your browser or using client-side AI models. No data is sent to external AI services or our servers.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">6. Third-Party Services</h3>
              <p className="mb-3">
                InstaTrack uses the following third-party services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Google Fonts</strong>: For typography (loaded from Google&apos;s CDN)</li>
                <li><strong>Hosting Provider</strong>: Static files hosted on our infrastructure</li>
              </ul>
              <p className="mt-3">
                These services do not receive or have access to your Instagram data. They may collect standard web server logs (IP addresses, user agents) as part of normal web hosting operations.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">7. Instagram Data Usage</h3>
              <p>
                InstaTrack does not connect to Instagram&apos;s API or access your Instagram account. You manually download your data from Instagram and upload it to the application. We comply with Instagram&apos;s Terms of Service by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Not accessing Instagram&apos;s platform programmatically</li>
                <li>Not storing Instagram data on external servers</li>
                <li>Processing only data you voluntarily provide</li>
                <li>Respecting Instagram&apos;s data export functionality</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">8. Data Security</h3>
              <p>
                Since all data processing happens locally in your browser and we never receive or store your data on our servers, the security of your data depends on:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Your browser&apos;s security settings</li>
                <li>Your device&apos;s security</li>
                <li>Your local network security</li>
              </ul>
              <p className="mt-3">
                We recommend using a modern, updated web browser and maintaining good security practices on your device.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">9. Children&apos;s Privacy</h3>
              <p>
                InstaTrack is not intended for use by anyone under the age of 13. We do not knowingly collect personal information from children. Since we don&apos;t collect any data, this policy applies universally to all users.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">10. Open Source Transparency</h3>
              <p>
                InstaTrack is open source software. The complete source code is available at{' '}
                <Link href="https://github.com/njoylab/instatrack" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  github.com/njoylab/instatrack
                </Link>
                . You can review the code to verify our privacy claims.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">11. GDPR Compliance</h3>
              <p className="mb-3">
                While we do not collect or process personal data on our servers, we respect GDPR principles:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Data Minimization</strong>: We collect zero data</li>
                <li><strong>Purpose Limitation</strong>: Data stays on your device for your use only</li>
                <li><strong>Storage Limitation</strong>: You control data retention</li>
                <li><strong>Right to Access</strong>: You have full access to your local data</li>
                <li><strong>Right to Erasure</strong>: You can delete data anytime</li>
                <li><strong>Data Portability</strong>: Export feature provides data portability</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">12. Changes to This Privacy Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top of this page will reflect the date of the most recent changes. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">13. Your Rights</h3>
              <p>
                Since we do not collect or store your data, traditional data rights (access, correction, deletion) are automatically satisfied:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>You have full access to your data (it&apos;s stored locally)</li>
                <li>You can modify your data using the application</li>
                <li>You can delete your data using the &ldquo;Clear Data&rdquo; function</li>
                <li>You can export your data using the backup feature</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">14. Contact Information</h3>
              <p>
                If you have questions about this Privacy Policy or InstaTrack&apos;s privacy practices, please contact us:
              </p>
              <ul className="list-none space-y-2 ml-4 mt-3">
                <li><strong>GitHub Issues</strong>: <Link href="https://github.com/njoylab/instatrack/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/njoylab/instatrack/issues</Link></li>
                <li><strong>Website</strong>: <Link href="https://www.njoylab.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.njoylab.com</Link></li>
              </ul>
            </section>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>TL;DR:</strong> InstaTrack is a privacy-first application. All your data stays on your device. We never see, store, or access your Instagram data. You have complete control over your information.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
