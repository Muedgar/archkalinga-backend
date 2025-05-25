import { Expose, Type } from 'class-transformer';
import { BaseSerializer } from 'src/common/serializers';
import { UserSerializer } from 'src/user/serializers';
import { ItemTaskToQuantitySerializer } from './item-task-quantity.serializer';

export class QuantitySerializer extends BaseSerializer {
  @Expose()
  @Type(() => UserSerializer)
  createdBy: UserSerializer;

  @Expose()
  @Type(() => ItemTaskToQuantitySerializer)
  itemTaskQuantity: ItemTaskToQuantitySerializer[];
}
