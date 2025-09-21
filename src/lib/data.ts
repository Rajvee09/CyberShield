
import { Scam, User, Comment } from './definitions';
import scams from '@/data/scams.json';
import users from '@/data/users.json';
import comments from '@/data/comments.json';

// Simulate a database delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getTrendingScams({
  country = 'all',
  type = 'all',
  platform = 'all',
  limit,
}: {
  country?: string;
  type?: string;
  platform?: string;
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

  if (platform.toLowerCase() !== 'all') {
    allScams = allScams.filter(
      scam => scam.platform.toLowerCase() === platform.toLowerCase()
    );
  }

  // For "trending", we'll use the `isTrending` flag.
  const sortedScams = allScams
    .filter(scam => scam.isTrending)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  if (limit) {
    return sortedScams.slice(0, limit);
  }
  return sortedScams;
}

export async function getRecentScams(limit: number = 8): Promise<Scam[]> {
  await delay(100);
  const allScams = scams as Scam[];
  return allScams
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
}

export async function getAllScams(): Promise<Scam[]> {
  await delay(200);
  const allScams = scams as Scam[];
  return allScams.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getScamById(id: string): Promise<Scam | undefined> {
  await delay(50);
  const allScams = scams as Scam[];
  return allScams.find(scam => scam.id === id);
}

export async function getAllUsers(): Promise<User[]> {
  await delay(10);
  return users as User[];
}


export async function getUserById(id: string): Promise<User | undefined> {
  await delay(10);
  const allUsers = users as User[];
  return allUsers.find(user => user.id === id);
}

export async function getCommentsByScamId(
  scamId: string
): Promise<Comment[]> {
  await delay(100);
  const allComments = comments as Comment[];
  return allComments
    .filter(comment => comment.scamId === scamId)
    .sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
}

export async function addComment(
  scamId: string,
  authorId: string,
  content: string
): Promise<Comment> {
  await delay(300);
  const newComment: Comment = {
    id: `comment-${Date.now()}`,
    scamId,
    authorId,
    content,
    createdAt: new Date().toISOString(),
  };
  // In a real app, you'd save this to your database.
  // For now, we just log it and return it.
  console.log('New comment added:', newComment);
  return newComment;
}
