import { Scam, User } from './definitions';
import scams from '@/data/scams.json';
import users from '@/data/users.json';

// Simulate a database delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getTrendingScams({
  country = 'all',
  type = 'all',
  limit,
}: {
  country?: string;
  type?: string;
  limit?: number;
} = {}): Promise<Scam[]> {
  await delay(100);
  let allScams = scams as Scam[];

  if (country.toLowerCase() !== 'all') {
    allScams = allScams.filter(
      scam => scam.country.toLowerCase() === country.toLowerCase()
    );
  }

  if (type.toLowerCase() !== 'all') {
    allScams = allScams.filter(
      scam => scam.type.toLowerCase() === type.toLowerCase()
    );
  }

  // For "trending", we'll just take the most recent ones for now.
  const sortedScams = allScams.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (limit) {
    return sortedScams.slice(0, limit);
  }
  return sortedScams;
}


export async function getRecentScams(limit: number = 8): Promise<Scam[]> {
  await delay(100);
  const allScams = scams as Scam[];
  return allScams.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit);
}


export async function getAllScams(): Promise<Scam[]> {
    await delay(200);
    const allScams = scams as Scam[];
    return allScams.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getScamById(id: string): Promise<Scam | undefined> {
    await delay(50);
    const allScams = scams as Scam[];
    return allScams.find(scam => scam.id === id);
}

export async function getUserById(id: string): Promise<User | undefined> {
    await delay(10);
    const allUsers = users as User[];
    return allUsers.find(user => user.id === id);
}
