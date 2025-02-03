export interface User {
  userId: string;
  role: "admin" | "user";
}

export type ProductFormValues = {
  name: string;
  price: number;
  brand: string;
  quantity: number;
  category: string;
  image?: File; 
};


