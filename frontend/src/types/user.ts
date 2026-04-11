export interface UserProfile {
  id: string;
  address: string;
  bio: string;
  skills: string[];
  rating: number;
  completedGigs: number;
  totalEarned: string; // I128 representation
  isVerified: boolean;
}

export interface WalletSession {
  address: string;
  tokenBalance: number;
  jwt: string;
}

export type ProjectStatus = 'OPEN' | 'FUNDED' | 'COMPLETED' | 'DISPUTED';
