
'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import { useState, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TrendingScamsCarousel from '@/components/scams/trending-scams-carousel';
import ScamCard from '@/components/scams/scam-card';
import type { Scam, User } from '@/lib/definitions';
import ScamDetailModal from '@/components/scams/scam-detail-modal';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ScamWithUser = {
  scam: Scam;
  user: User | undefined;
};

interface HomePageClientProps {
  trendingScams: Scam[];
  recentScamsWithUsers: ScamWithUser[];
  users: User[];
}

export default function HomePageClient({
  trendingScams,
  recentScamsWithUsers,
  users,
}: HomePageClientProps) {
  const [selectedScam, setSelectedScam] = useState<ScamWithUser | null>(null);
  const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const placeholderImages = PlaceHolderImages;

  return (
    <div className="flex flex-col">
      <section className="w-full bg-background py-12 md:py-16">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
          <div className="flex flex-col items-center space-y-6 text-center md:items-start md:text-left">
            <h1 className="font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
              Stay Ahead of Digital Deception
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              CyberShield is your community-powered guide to navigating the
              digital world safely. Analyze suspicious messages, learn about
              emerging threats, and report scams to protect others.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="transform transition-transform duration-200 hover:-translate-y-1"
              >
                <Link href="/scam-checker">
                  Analyse a Message
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Carousel
              plugins={[autoplayPlugin.current]}
              className="w-full max-w-xl"
              onMouseEnter={autoplayPlugin.current.stop}
              onMouseLeave={autoplayPlugin.current.reset}
            >
              <CarouselContent>
                {trendingScams.map(scam => {
                   const user = users.find(u => u.id === scam.authorId);
                  return (
                  <CarouselItem key={scam.id}>
                    <div className="p-1">
                      <ScamCard scam={scam} onCardClick={() => setSelectedScam({ scam, user })} />
                    </div>
                  </CarouselItem>
                )})}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      <section id="trending" className="w-full bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Trending Scams
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              See the most reported scams right now, filtered by your region.
            </p>
          </div>
          <TrendingScamsCarousel
            scams={trendingScams}
            users={users}
            onScamClick={(scam, user) => {
              setSelectedScam({ scam, user });
            }}
          />
        </div>
      </section>

      <section id="recent-reports" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Latest Community Reports
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Fresh reports submitted by vigilant users like you.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild>
                <Link href="/community">
                  View All Reports <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/trending">
                  Trending Scams <TrendingUp className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentScamsWithUsers.map(item => (
              <ScamCard
                key={item.scam.id}
                scam={item.scam}
                onCardClick={() => setSelectedScam(item)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Protect Yourself and Your Community
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            Three simple steps to a safer digital life with CyberShield.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="transform text-left transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  1. Analyze
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Got a suspicious email or text? Paste it into our AI Scam
                  Checker for an instant risk analysis.
                </p>
              </CardContent>
            </Card>
            <Card className="transform text-left transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  2. Learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Browse our Prevention section to learn the tell-tale signs of
                  common scams and how to avoid them.
                </p>
              </CardContent>
            </Card>
            <Card className="transform text-left transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  3. Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Encountered a scam? Report it to the community to warn others
                  and help build a global defense network.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {selectedScam && (
        <ScamDetailModal
          scam={selectedScam.scam}
          user={selectedScam.user}
          isOpen={!!selectedScam}
          onOpenChange={() => setSelectedScam(null)}
        />
      )}
    </div>
  );
}
