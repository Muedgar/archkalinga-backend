import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProjectsChangeRelation1746205917023 implements MigrationInterface {
  name = 'ProjectsChangeRelation1746205917023';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_49471d36f534d6de47a54882384"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "REL_49471d36f534d6de47a5488238"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_49471d36f534d6de47a54882384" FOREIGN KEY ("createdByPkid") REFERENCES "users"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_49471d36f534d6de47a54882384"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "REL_49471d36f534d6de47a5488238" UNIQUE ("createdByPkid")`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_49471d36f534d6de47a54882384" FOREIGN KEY ("createdByPkid") REFERENCES "users"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
