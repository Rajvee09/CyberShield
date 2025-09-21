
export type Scam = {
  id: string;
  title: string;
  description: string;
  country: string;
  type: 'Phishing' | 'Fake Job' | 'Investment' | 'Tech Support' | 'Delivery';
  platform:
    | 'Email'
    | 'Website'
    | 'Social Media'
    | 'Phone Call'
    | 'Text Message'
    | 'Instagram'
    | 'Facebook'
    | 'Flipkart'
    | 'Blinkit'
    | 'Zepto'
    | 'LinkedIn'
    | 'Freelancing Website'
    | 'Amazon'
    | 'Meesho';
  imageId: string;
  authorId: string;
  createdAt: string;
  financialLoss?: number;
  severity:
    | 'Low - Annoyance'
    | 'Medium - Moderate risk'
    | 'High - Immediate danger'
    | 'Critical - Financial loss occurred';
  warningSigns: string[];
  isTrending?: boolean;
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
