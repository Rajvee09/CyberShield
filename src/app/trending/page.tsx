'use client';

import { useState, useEffect } from 'react';
import { getTrendingScams, getUserById } from '@/lib/data';
import ScamCard from '@/components/scams/scam-card';
import { TrendingUp, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Scam, User } from '@/lib/definitions';
import { Skeleton } from '@/components/ui/skeleton';

type ScamWithUser = {
  scam: Scam;
  user: User | undefined;
};

const scamTypes = [
  'Phishing',
  'Fake Job',
  'Investment',
  'Tech Support',
  'Delivery',
];
const countries = [
  'USA',
  'UK',
  'Canada',
  'Australia',
  'Germany',
  'Nigeria',
  'India',
];

const platforms = [
  'Email',
  'Website',
  'Social Media',
  'Phone Call',
  'Text Message',
];

export default function TrendingPage() {
  const [scams, setScams] = useState<ScamWithUser[]>([]);
  const [filteredScams, setFilteredScams] = useState<ScamWithUser[]>([]);
  const [country, setCountry] = useState('all');
  const [type, setType] = useState('all');
  const [platform, setPlatform] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadScams() {
      setIsLoading(true);
      const allScams = await getTrendingScams();
      const scamsWithUsers = await Promise.all(
        allScams.map(async scam => {
          const user = await getUserById(scam.authorId);
          return { scam, user };
        })
      );
      setScams(scamsWithUsers);
      setFilteredScams(scamsWithUsers);
      setIsLoading(false);
    }
    loadScams();
  }, []);

  useEffect(() => {
    let result = scams;
    if (country !== 'all') {
      result = result.filter(
        item => item.scam.country.toLowerCase() === country.toLowerCase()
      );
    }
    if (type !== 'all') {
      result = result.filter(
        item => item.scam.type.toLowerCase() === type.toLowerCase()
      );
    }
    if (platform !== 'all') {
      result = result.filter(
        item => item.scam.platform.toLowerCase() === platform.toLowerCase()
      );
    }
    setFilteredScams(result);
  }, [country, type, platform, scams]);

  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <TrendingUp className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Trending Scams
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay ahead of the curve. Here are the most recent and frequently
            reported scams our community is tracking.
          </p>
        </div>

        <div className="my-8 flex justify-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter Scams
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Select onValueChange={setCountry} value={country}>
                  <SelectTrigger className="mb-2">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map(c => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setType} value={type}>
                  <SelectTrigger className="mb-2">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {scamTypes.map(t => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setPlatform} value={platform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    {platforms.map(p => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredScams.map(({ scam, user }) => (
              <ScamCard key={scam.id} scam={scam} user={user} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-40 w-full" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex items-center justify-between p-4 pt-0">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-12" />
      </div>
    </div>
  );
}
