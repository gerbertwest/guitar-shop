export const DEFAULT_PRODUCT_COUNT = 7;

export enum Length {
  MinTitle = 10,
  MaxTitle = 100,
  MinDescription = 20,
  MaxDescription = 1024,
  MinCode = 5,
  MaxCode = 40,
  MinPrice = 100,
  MaxPrice = 1000000
}

export enum ProductError {
  MinTitleLength = 'Minimum title length must be 10',
  MaxTitleLength = 'Maximum title length must be 100',
  MinDescriptionLength = 'Minimum description length must be 20',
  MaxDescriptionLength = 'Maximum description length must be 1024',
  MinCodeLength = 'Minimum address length must be 5',
  MaxCodeLength = 'Maximum address length must be 40',
  MinPriceLength = 'Minimum price must be 100',
  MaxPriceLength = 'Maximum price must be 1000000',
  MongoId = 'userId field must be valid an id',
  ProductImage = 'productImage is required',
  ProductImageContains = 'productImage format must be jpeg or png',
  GuitarType = 'the type of guitar should be электро, акустика, укулеле',
  StringsCount = 'the number of strings should be 4, 6, 7, 12'
}
