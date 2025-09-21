import Link from 'next/link';
import { Menu, ShieldAlert, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/scam-checker', label: 'Scam Checker' },
  { href: '/community', label: 'Community Reports' },
  { href: '/prevention', label: 'Prevention' },
  { href: '/trending', label: 'Trending Scams' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-headline text-xl font-bold">CyberShield</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button
            asChild
            className="transform transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Link href="/report-scam">
              <ShieldAlert className="mr-2 h-4 w-4" /> Report a Scam
            </Link>
          </Button>
          <Button variant="outline">
            <User className="mr-2 h-4 w-4" />
            Login / Sign Up
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <Link href="/" className="flex items-center gap-2">
                  <span className="font-headline text-xl font-bold">
                    CyberShield
                  </span>
                </Link>
              </SheetHeader>
              <div className="mt-8 flex h-full flex-col">
                <div className="flex flex-col gap-6">
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild size="lg" className="mt-4">
                    <Link href="/report-scam">
                      <ShieldAlert className="mr-2 h-4 w-4" /> Report a Scam
                    </Link>
                  </Button>
                </div>

                <div className="mt-auto flex flex-col gap-4 pt-8">
                   <Button variant="outline">
                    <User className="mr-2 h-4 w-4" />
                    Login / Sign Up
                  </Button>
                  <div className="flex justify-center">
                    <ThemeToggle />
                  </div>
                </div>

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
