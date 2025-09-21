
import { getRecentScams, getTrendingScams, getUserById } from '@/lib/data';
import type { Scam, User } from '@/lib/definitions';
import HomePageClient from './home-page-client';

type ScamWithUser = {
  scam: Scam;
  user: User | undefined;
};

export default async function Home() {
  const trendingScams = await getTrendingScams({ limit: 5 });
  const recentScams = await getRecentScams(4);
  const recentScamsWithUsers = await Promise.all(
    recentScams.map(async scam => {
      const user = await getUserById(scam.authorId);
      return { scam, user };
    })
  );

  return (
    <HomePageClient
      trendingScams={trendingScams}
      recentScamsWithUsers={recentScamsWithUsers}
    />
  );
}
