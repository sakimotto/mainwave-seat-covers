export interface Vehicle {
  id: string;
  make: string;
  slug: string;
  image: string;
  models: string[];
}

export interface ProductVariant {
  color: string;
  colorHex?: string;
  size?: string;
  sku: string;
  price: number;
  originalPrice?: number;
  stock: number;
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
  variants?: ProductVariant[];
  material?: string;
}

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  color: string;
  size?: string;
  sku: string;
  price: number;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  itemCount: number;
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
