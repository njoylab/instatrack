import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto py-4 px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} InstaTrack. MIT License</p>
        <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0 flex-wrap justify-center">
          <Link href="/how-to-export" className="hover:text-primary hover:underline">
            How to Export
          </Link>
          <Link href="/faq" className="hover:text-primary hover:underline">
            FAQ
          </Link>
          <Link href="/privacy" className="hover:text-primary hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-primary hover:underline">
            Terms
          </Link>
          <Link href="https://www.echovalue.dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
            Other Tools
          </Link>
          <Link href="https://github.com/njoylab/instatrack" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
            GitHub
          </Link>
        </nav>
      </div>
    </footer>
  );
}
