import dayjs from 'dayjs';
import { generateRandomValue, getRandomItem } from '../../core/helpers/index.js';
import { MockData } from '../../types/mock-data.type.js';
import { ProductGeneratorInterface } from './product-generator.interface.js';

enum WeekDay {
  First = 1,
  Last = 7
}

enum Price {
  Max = 100,
  Min = 1000000
}

export default class ProductGenerator implements ProductGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const productImage = getRandomItem<string>(this.mockData.productImages);
    const type = getRandomItem<string>(this.mockData.types);
    const code = getRandomItem<string>(this.mockData.codes);
    const stringCount = getRandomItem<number>(this.mockData.stringsCounts);
    const price = generateRandomValue(Price.Min, Price.Max).toString();
    const postDate = dayjs().subtract(generateRandomValue(WeekDay.First, WeekDay.Last), 'day').toISOString();
    const name = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const password = getRandomItem<string>(this.mockData.passwords);


    return [
      title, description, postDate, productImage, type, code, stringCount, price, name, email, password,
    ].join('\t');
  }
}
