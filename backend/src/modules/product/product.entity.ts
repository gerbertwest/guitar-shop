import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { GuitarType } from '../../types/guitar-type.enum.js';
import { StringsCount } from '../../types/strings-count.enum.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

@modelOptions({
  schemaOptions: {
    collection: 'products'
  }
})

export class ProductEntity extends defaultClasses.TimeStamps {

  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true, required: true})
  public description!: string;

  @prop({required: true})
  public productImage!: string;

  @prop({
    type: () => String,
    required: true,
    enum: GuitarType
  })
  public type!: GuitarType;

  @prop({required: true})
  public code!: string;

  @prop({
    type: () => Number,
    required: true,
    enum: StringsCount
  })
  public stringsCount!: StringsCount;

  @prop({required: true})
  public price!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const ProductModel = getModelForClass(ProductEntity);
