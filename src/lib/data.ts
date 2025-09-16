import { Scam, User } from './definitions';
import scams from '@/data/scams.json';
import users from '@/data/users.json';

// Simulate a database delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getTrendingScams(
  country: string = 'all',
  limit: number = 5
): Promise<Scam[]> {
  await delay(100);
  const allScams = scams as Scam[];
  const filteredScams =
    country.toLowerCase() === 'all'
      ? allScams
      : allScams.filter(
          scam => scam.country.toLowerCase() === country.toLowerCase()
        );
  
  // For "trending", we'll just take the most recent ones for now.
  return filteredScams.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit);
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
