import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqPage() {
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
            <CardTitle className="text-3xl">Frequently Asked Questions (FAQ)</CardTitle>
            <CardDescription>
              Find answers to common questions about InstaTrack.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-base">
             <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is my data safe?</AccordionTrigger>
                <AccordionContent>
                  Yes. InstaTrack is a client-side application. All your data is processed and stored locally in your browser&apos;s local storage. No data is ever sent to our servers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Why do I need to export my data from Instagram?</AccordionTrigger>
                <AccordionContent>
                  Instagram&apos;s API does not provide an easy way to get follower/following lists for privacy reasons. The only official way to access this data is to request a download of your information directly from Instagram.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How often should I import my data?</AccordionTrigger>
                <AccordionContent>
                  For the most accurate tracking of unfollowers and changes, we recommend creating a new snapshot every week or two.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
