import { getTrendingScams } from '@/lib/data';
import ScamCard from '@/components/scams/scam-card';
import { TrendingUp } from 'lucide-react';

export default async function TrendingPage() {
  const trendingScams = await getTrendingScams();

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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trendingScams.map(scam => (
            <ScamCard key={scam.id} scam={scam} />
          ))}
        </div>
      </section>
    </div>
  );
}
