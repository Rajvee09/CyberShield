import { getAllScams, getUserById } from '@/lib/data';
import ScamCard from '@/components/scams/scam-card';
import { Shield } from 'lucide-react';

export default async function CommunityPage() {
  const allScams = await getAllScams();

  const scamsWithUsers = await Promise.all(
    allScams.map(async scam => {
      const user = await getUserById(scam.authorId);
      return { scam, user };
    })
  );

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
          {scamsWithUsers.map(({ scam, user }) => (
            <ScamCard key={scam.id} scam={scam} user={user} />
          ))}
        </div>
      </section>
    </div>
  );
}
