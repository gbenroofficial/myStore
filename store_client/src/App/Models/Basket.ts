export interface Basket {
  id: number;
  ownerId: string;
  items: BasketItem[];
}

export interface BasketItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
}
