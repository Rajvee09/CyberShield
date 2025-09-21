
import { Scam, User, Comment } from './definitions';
import scams from '@/data/scams.json';
import users from '@/data/users.json';
import comments from '@/data/comments.json';

// In a real app, these would be database calls.
// Here, we're just modifying in-memory arrays.
// For persistence in this example, we'd need to write back to the JSON files,
// which is outside the scope of this simulation.

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

export async function getUserByEmail(email: string): Promise<User | undefined> {
  await delay(10);
  const allUsers = users as User[];
  return allUsers.find(user => user.email === email);
}

export async function getCommentsByScamId(
  scamId: string
): Promise<Comment[]> {
  await delay(100);
  const allComments = comments as Comment[];
  return allComments
    .filter(comment => comment.scamId === scamId)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
  // We'll push to our "in-memory" array.
  comments.unshift(newComment);
  console.log('New comment added:', newComment);
  return newComment;
}

export async function addScam(scamData: Omit<Scam, 'id' | 'createdAt' | 'imageId'>): Promise<Scam> {
  await delay(500);
  const newScam: Scam = {
    ...scamData,
    id: `scam-${Date.now()}`,
    createdAt: new Date().toISOString(),
    imageId: `carousel-${Math.floor(Math.random() * 5) + 1}`, // Assign a random image for now
  };
  scams.unshift(newScam);
  console.log('New scam reported:', newScam);
  return newScam;
}

export async function addUser(userData: Omit<User, 'id' | 'avatarUrl'>): Promise<User> {
  await delay(200);
  const newUser: User = {
    ...userData,
    id: `user-${Date.now()}`,
    // Generate a random avatar
    avatarUrl: `https://i.pravatar.cc/150?u=user-${Date.now()}`,
  };
  users.push(newUser);
  console.log('New user created:', newUser);
  return newUser;
}

export async function deleteScam(scamId: string): Promise<boolean> {
  await delay(400);
  const scamIndex = scams.findIndex(s => s.id === scamId);
  if (scamIndex === -1) return false;

  scams.splice(scamIndex, 1);
  const initialCommentsLength = comments.length;
  const filteredComments = comments.filter(c => c.scamId !== scamId);
  comments.length = 0;
  Array.prototype.push.apply(comments, filteredComments);

  console.log(`Scam ${scamId} and related comments deleted.`);
  return true;
}

export async function deleteComment(commentId: string): Promise<boolean> {
  await delay(200);
  const commentIndex = comments.findIndex(c => c.id === commentId);
  if (commentIndex === -1) return false;

  comments.splice(commentIndex, 1);
  console.log(`Comment ${commentId} deleted.`);
  return true;
}
