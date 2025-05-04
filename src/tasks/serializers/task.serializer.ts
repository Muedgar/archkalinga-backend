import { Expose, Type } from 'class-transformer';
import { BaseSerializer } from 'src/common/serializers';
import { ProjectSerializer } from 'src/projects/serializers';
import { UserSerializer } from 'src/user/serializers';

export class TaskSerializer extends BaseSerializer {
  @Expose()
  name: string;

  @Expose()
  @Type(() => ProjectSerializer)
  project: ProjectSerializer;

  @Expose()
  @Type(() => UserSerializer)
  assignedUsers: UserSerializer[];
}
