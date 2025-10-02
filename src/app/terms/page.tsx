import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
            <CardTitle className="text-3xl">Terms and Conditions</CardTitle>
            <CardDescription>
              Last updated: {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-base">
            <section>
              <h3 className="font-semibold text-xl mb-3">1. Acceptance of Terms</h3>
              <p>
                By accessing and using InstaTrack (&ldquo;the Service&rdquo;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">2. Description of Service</h3>
              <p>
                InstaTrack is a privacy-focused web application that helps users analyze their Instagram follower and following data. The Service processes data locally in your browser and does not transmit personal data to external servers.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">3. Privacy and Data Processing</h3>
              <div className="space-y-3">
                <h4 className="font-medium text-lg">Local Processing</h4>
                <p>
                  All data processing occurs locally in your browser. Your Instagram data is stored in your browser&apos;s local storage and is never transmitted to our servers or any third-party services.
                </p>

                <h4 className="font-medium text-lg">Data Collection</h4>
                <p>
                  We do not collect, store, or process any personal data on our servers. The only data processed is the Instagram export files you voluntarily upload to the application.
                </p>

                <h4 className="font-medium text-lg">Third-Party Services</h4>
                <p>
                  The Service does not use any third-party services for data processing. All analysis is performed locally in your browser using client-side algorithms.
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">4. User Responsibilities</h3>
              <div className="space-y-3">
                <p>You agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use the Service only for lawful purposes</li>
                  <li>Only upload Instagram data that belongs to you</li>
                  <li>Not attempt to reverse engineer or modify the Service</li>
                  <li>Not use the Service to violate Instagram&apos;s Terms of Service</li>
                  <li>Be responsible for maintaining the security of your data</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">5. Intellectual Property</h3>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of InstaTrack and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">6. Disclaimer of Warranties</h3>
              <p>
                The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. We make no warranties, expressed or implied, and hereby disclaim all warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">7. Limitation of Liability</h3>
              <p>
                In no event shall InstaTrack, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">8. Instagram Data Usage</h3>
              <div className="space-y-3">
                <p>
                  You acknowledge that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You are responsible for obtaining your Instagram data through official channels</li>
                  <li>You must comply with Instagram&apos;s Terms of Service when exporting your data</li>
                  <li>InstaTrack is not affiliated with Instagram or Meta Platforms, Inc.</li>
                  <li>The Service analyzes data you provide but does not access Instagram directly</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">9. Open Source</h3>
              <p>
                InstaTrack is open source software. The source code is available for review and contribution under the MIT License at{' '}
                <Link href="https://github.com/njoylab/instatrack" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  github.com/njoylab/instatrack
                </Link>
                . You may inspect, modify, and distribute the code in accordance with the license terms.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">10. Changes to Terms</h3>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">11. Termination</h3>
              <p>
                You may stop using the Service at any time. Since all data is stored locally, you can delete your data by clearing your browser&apos;s local storage or using the &ldquo;Clear Data&rdquo; function in the application.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">12. Governing Law</h3>
              <p>
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which the Service is operated, without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-xl mb-3">13. Contact Information</h3>
              <p>
                If you have any questions about these Terms and Conditions, please contact us through the GitHub repository issues page or the contact information on my website https://www.njoylab.com
              </p>
            </section>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> This application processes all data locally in your browser. No personal information is transmitted to external servers. Your privacy and data security are our top priorities.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
