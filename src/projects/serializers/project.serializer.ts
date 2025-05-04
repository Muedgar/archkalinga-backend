import { Expose, Type } from 'class-transformer';
import { BaseSerializer } from 'src/common/serializers';
import { TaskSerializer } from 'src/tasks/serializers';
import { UserSerializer } from 'src/user/serializers';

export class ProjectSerializer extends BaseSerializer {
  @Expose()
  name: string;

  @Expose()
  @Type(() => UserSerializer)
  createdBy: UserSerializer;

  @Expose()
  @Type(() => TaskSerializer)
  tasks: TaskSerializer[];
}
