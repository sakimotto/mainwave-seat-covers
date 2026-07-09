export interface Vehicle {
  id: string;
  make: string;
  slug: string;
  image: string;
  models: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  vehicle: string;
  category: string;
  isSale?: boolean;
  description?: string;
  features?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  content?: string;
}
