
'use client';

import { useEffect, useState } from 'react';
import { getAllScams, getUserById } from '@/lib/data';
import ScamCard from '@/components/scams/scam-card';
import { Shield } from 'lucide-react';
import type { Scam, User } from '@/lib/definitions';
import ScamDetailModal from '@/components/scams/scam-detail-modal';
import { Skeleton } from '@/components/ui/skeleton';

type ScamWithUser = {
  scam: Scam;
  user: User | undefined;
};

export default function CommunityPage() {
  const [scamsWithUsers, setScamsWithUsers] = useState<ScamWithUser[]>([]);
  const [selectedScam, setSelectedScam] = useState<ScamWithUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadScams() {
      setIsLoading(true);
      const allScams = await getAllScams();
      const loadedScamsWithUsers = await Promise.all(
        allScams.map(async scam => {
          const user = await getUserById(scam.authorId);
          return { scam, user };
        })
      );
      setScamsWithUsers(loadedScamsWithUsers);
      setIsLoading(false);
    }
    loadScams();
  }, []);

  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Shield className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Community Reports
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Browse all scam reports submitted by our vigilant community. Your
            awareness helps protect everyone.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(12)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {scamsWithUsers.map(item => (
              <ScamCard
                key={item.scam.id}
                scam={item.scam}
                user={item.user}
                onCardClick={() => setSelectedScam(item)}
              />
            ))}
          </div>
        )}
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

function CardSkeleton() {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <Skeleton className="h-40 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-12" />
      </div>
    </div>
  );
}
