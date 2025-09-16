import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3">
        <div className="flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-bold">CyberShield</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Community-powered scam awareness and prevention.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3 md:col-span-2">
          <div className="space-y-2">
            <h4 className="font-medium">Explore</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link href="/community" className="hover:text-primary">Reports</Link></li>
              <li><Link href="/prevention" className="hover:text-primary">Prevention Tips</Link></li>
              <li><Link href="/#trending" className="hover:text-primary">Trending Scams</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Tools</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link href="/scam-checker" className="hover:text-primary">Scam Checker</Link></li>
              <li><Link href="/report-scam" className="hover:text-primary">Report a Scam</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Legal</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} CyberShield. All rights reserved.</p>
          {/* Social media links can go here */}
        </div>
      </div>
    </footer>
  );
}
