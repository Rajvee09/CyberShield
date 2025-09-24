
import { getAllUsers, getRecentScams, getTrendingScams } from '@/lib/data';
import type { Scam, User } from '@/lib/definitions';
import HomePageClient from './home-page-client';

type ScamWithUser = {
  scam: Scam;
  user: User | undefined;
};

export default async function Home() {
  const trendingScams = await getTrendingScams({ limit: 8 });
  const recentScams = await getRecentScams(4);
  const users = await getAllUsers();
  const recentScamsWithUsers = await Promise.all(
    recentScams.map(async scam => {
      const user = users.find(u => u.id === scam.authorId);
      return { scam, user };
    })
  );

  return (
    <HomePageClient
      trendingScams={trendingScams}
      recentScamsWithUsers={recentScamsWithUsers}
      users={users}
    />
  );
}
//Testing complete
