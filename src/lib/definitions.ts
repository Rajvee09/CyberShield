export type Scam = {
  id: string;
  title: string;
  description: string;
  country: string;
  type: 'Phishing' | 'Fake Job' | 'Investment' | 'Tech Support' | 'Delivery';
  imageId: string;
  authorId: string;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Comment = {
  id: string;
  scamId: string;
  authorId: string;
  content: string;
  createdAt: string;
};
