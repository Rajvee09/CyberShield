

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
  email: string;
  password?: string; // Should be hashed in a real app
};

export type Comment = {
  id: string;
  scamId: string;
  authorId: string;
  content: string;
  createdAt: string;
};
