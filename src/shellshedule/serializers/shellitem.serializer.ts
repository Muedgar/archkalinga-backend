import { Expose } from 'class-transformer';
import { BaseSerializer } from 'src/common/serializers';

export class ShellItemSerializer extends BaseSerializer {
  @Expose()
  identifierId: number;
  @Expose()
  description: string;
  @Expose()
  references: string[];
  @Expose()
  unit: string;
  @Expose()
  quantity: string;
  @Expose()
  kind: string;
}
