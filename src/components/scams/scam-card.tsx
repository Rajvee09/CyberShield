import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Scam, User } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ScamCardProps {
  scam: Scam;
  user: User | undefined;
}

export default function ScamCard({ scam, user }: ScamCardProps) {
  const image = PlaceHolderImages.find(p => p.id === scam.imageId);

  return (
    <Link href={`/community/${scam.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {image && (
          <CardHeader className="relative h-40 w-full p-0">
            <Image
              src={image.imageUrl}
              alt={image.description}
              data-ai-hint={image.imageHint}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <div className="absolute bottom-2 left-2 flex w-full justify-start">
               <Badge variant="destructive">{scam.type}</Badge>
             </div>
          </CardHeader>
        )}
        <CardContent className="p-4">
          <h3 className="font-headline text-lg font-semibold leading-tight group-hover:text-primary">
            {scam.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {scam.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0 text-xs text-muted-foreground">
          {user && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{user.name}</span>
            </div>
          )}
          <span>{scam.country}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
