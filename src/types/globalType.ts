export interface User {
  userId: string;
  role: "admin" | "user";
  image?: string;
  _id?: string;
}

export type ProductFormValues = {
  name: string;
  price: number;
  brand: string;
  quantity: number;
  category: string;
  image?: File;
};
