import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto py-4 px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} InstaTrack. All rights reserved.</p>
        <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
          <Link href="/how-to-export" className="hover:text-primary hover:underline">
            How to Export
          </Link>
          <Link href="/terms" className="hover:text-primary hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/faq" className="hover:text-primary hover:underline">
            FAQ
          </Link>
        </nav>
      </div>
    </footer>
  );
}
