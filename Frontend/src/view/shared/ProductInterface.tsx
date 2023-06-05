export default interface ProductInterface {
    productId: string;
    name: string;
    brand: string;
    color: string;
    specification: string;
    price: number;
    imageURL: string;
    category: {
      categoryId: string;
      name: string;
    };
  }