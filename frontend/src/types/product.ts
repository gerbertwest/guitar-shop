export type Product = {
  id: string;
  title: string;
  description: string;
  postDate: Date;
  productImage: string;
  type: string;
  code: string;
  stringsCount: number;
  price: number;
}

export type AddProduct = {
  title: string;
  description: string;
  type: string;
  code: string;
  stringsCount: number;
  price: number;
  productImage: File | undefined;
}

export type EditProduct = {
  id?: string;
  title: string | undefined;
  description: string | undefined;
  type: string | undefined;
  code: string | undefined;
  stringsCount: number | undefined;
  price: number | undefined;
  productImage: File | undefined;
  postDate: Date;
}
