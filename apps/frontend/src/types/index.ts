// /apps/frontend/src/types/index.ts

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  createdAt: string; // ISO Date String
}

export interface Content {
  id: number;
  section: string;
  title: string;
  description: string;
  icon?: string | null;
  order: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
