'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Scam } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

interface TrendingScamsCarouselProps {
  scams: Scam[];
}

export default function TrendingScamsCarousel({
  scams,
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
          const image = PlaceHolderImages.find(p => p.id === scam.imageId);
          return (
            <CarouselItem key={scam.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                  <CardHeader className="relative h-48 w-full p-0">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        data-ai-hint={image.imageHint}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-0 p-4">
                      <Badge variant="destructive">{scam.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="font-headline text-xl">
                      <Link
                        href={`/community/${scam.id}`}
                        className="hover:underline"
                      >
                        {scam.title}
                      </Link>
                    </CardTitle>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {scam.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Badge variant="secondary">{scam.country}</Badge>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
