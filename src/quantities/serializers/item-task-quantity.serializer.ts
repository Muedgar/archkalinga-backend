import { Expose, Type } from 'class-transformer';
import { BaseSerializer } from 'src/common/serializers';
import { TaskSerializer } from 'src/tasks/serializers';
import { QuantitySerializer } from './quantity.serializer';
import { ShellItemSerializer } from 'src/shellshedule/serializers/shellitem.serializer';

export class ItemTaskToQuantitySerializer extends BaseSerializer {
  @Expose()
  amount: number;
  @Expose()
  unit: string;
  @Expose()
  @Type(() => ShellItemSerializer)
  item: ShellItemSerializer;
  @Expose()
  @Type(() => TaskSerializer)
  task: TaskSerializer;
  @Expose()
  @Type(() => QuantitySerializer)
  quantity: QuantitySerializer;
}
