
'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Scam, User } from '@/lib/definitions';
import ScamCard from './scam-card';

interface TrendingScamsCarouselProps {
  scams: Scam[];
  users: User[];
  onScamClick: (scam: Scam, user: User | undefined) => void;
}

export default function TrendingScamsCarousel({
  scams,
  users,
  onScamClick,
}: TrendingScamsCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {scams.map(scam => {
          const user = users.find(u => u.id === scam.authorId);
          return (
            <CarouselItem
              key={scam.id}
              className="p-2 md:basis-1/2 lg:basis-1/3"
            >
              <ScamCard
                scam={scam}
                onCardClick={() => onScamClick(scam, user)}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="-left-4 hidden sm:flex" />
      <CarouselNext className="-right-4 hidden sm:flex" />
    </Carousel>
  );
}
