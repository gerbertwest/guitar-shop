import { Product } from '../../types/product.type.js';

export function createProduct(productData: string): Product {
  const [
    title,
    description,
    postDate,
    productImage,
    type,
    code,
    stringsCount,
    price,
    name,
    email,
    password,
  ] = productData.replace('\n', '').split('\t');

  const user = {
    name,
    email,
    password
  };

  return {
    title,
    description,
    productImage,
    type,
    code,
    stringsCount: Number.parseInt(stringsCount, 10),
    price: Number.parseInt(price, 10),
    postDate: new Date(postDate),
    user
  } as Product;
}
