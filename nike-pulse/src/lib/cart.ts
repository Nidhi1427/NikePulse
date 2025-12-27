'use client';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

function loadCart(): CartItem[] {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('nikepulse_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
  return [];
}

function saveCart(items: CartItem[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('nikepulse_cart', JSON.stringify(items));
    } catch {
      console.error('Failed to save cart');
    }
  }
}

export function getCartCount(): number {
  return loadCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartItems(): CartItem[] {
  return loadCart();
}

export function addToCart(product: Omit<CartItem, 'quantity'>): void {
  const items = loadCart();
  const existing = items.find(item => item.id === product.id);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ ...product, quantity: 1 });
  }
  
  saveCart(items);
}

export function removeFromCart(id: string): void {
  const items = loadCart().filter(item => item.id !== id);
  saveCart(items);
}

export function updateCartQuantity(id: string, quantity: number): void {
  const items = loadCart();
  const item = items.find(item => item.id === id);
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      item.quantity = quantity;
      saveCart(items);
    }
  }
}

export function clearCart(): void {
  saveCart([]);
}

export function getCartTotal(): number {
  return loadCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}
