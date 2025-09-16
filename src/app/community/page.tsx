import { getAllScams } from '@/lib/data';
import ScamCard from '@/components/scams/scam-card';
import { Shield } from 'lucide-react';

export default async function CommunityPage() {
  const allScams = await getAllScams();

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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allScams.map(scam => (
            <ScamCard key={scam.id} scam={scam} />
          ))}
        </div>
      </section>
    </div>
  );
}
