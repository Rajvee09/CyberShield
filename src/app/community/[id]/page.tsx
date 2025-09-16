import { getScamById, getUserById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Globe, User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';

export default async function ScamDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const scam = await getScamById(params.id);

  if (!scam) {
    notFound();
  }

  const user = await getUserById(scam.authorId);
  const image = PlaceHolderImages.find(p => p.id === scam.imageId);

  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          {image && (
            <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg shadow-lg md:h-96">
              <Image
                src={image.imageUrl}
                alt={image.description}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <Badge variant="destructive" className="text-base md:text-lg">
                  {scam.type}
                </Badge>
              </div>
            </div>
          )}

          <h1 className="font-headline text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl">
            {scam.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-muted-foreground">
            {user && (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(scam.createdAt), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{scam.country}</span>
            </div>
          </div>

          <Card className="mt-10">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                Report Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap font-body text-base leading-relaxed">
                {scam.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
