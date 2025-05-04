import { MigrationInterface, QueryRunner } from 'typeorm';

export class ItemTaskQuantityTables1746121582678 implements MigrationInterface {
  name = 'ItemTaskQuantityTables1746121582678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "projects" ("pkid" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(200) NOT NULL, "createdByPkid" integer NOT NULL, CONSTRAINT "UQ_6271df0a7aed1d6c0691ce6ac50" UNIQUE ("id"), CONSTRAINT "UQ_2187088ab5ef2a918473cb99007" UNIQUE ("name"), CONSTRAINT "REL_49471d36f534d6de47a5488238" UNIQUE ("createdByPkid"), CONSTRAINT "PK_878187e9dd8a1279fe18c10ce3b" PRIMARY KEY ("pkid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "quantities" ("pkid" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdByPkid" integer NOT NULL, CONSTRAINT "UQ_61dfbc552b276df52954d2f8086" UNIQUE ("id"), CONSTRAINT "REL_ef02ddec47b221f5e66693ac41" UNIQUE ("createdByPkid"), CONSTRAINT "PK_401a86449e5af1b128fff6cdfb2" PRIMARY KEY ("pkid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "itemstasksquantities" ("pkid" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "unit" character varying(200), "itemPkid" integer NOT NULL, "taskPkid" integer NOT NULL, "quantityPkid" integer NOT NULL, CONSTRAINT "UQ_f5a85eccd8458fc34b7f4b6f9b7" UNIQUE ("id"), CONSTRAINT "PK_2a70651f2783eac092708af53e3" PRIMARY KEY ("pkid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tasks" ("pkid" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(200) NOT NULL, "projectPkid" integer, CONSTRAINT "UQ_8d12ff38fcc62aaba2cab748772" UNIQUE ("id"), CONSTRAINT "UQ_19372f1089accbc2bf181a5055f" UNIQUE ("name", "projectPkid"), CONSTRAINT "PK_69d0a202ccd69eea67510ed041d" PRIMARY KEY ("pkid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tasks_assigned_users_users" ("tasksPkid" integer NOT NULL, "usersPkid" integer NOT NULL, CONSTRAINT "PK_0299e523698fd3096ffd8e41fce" PRIMARY KEY ("tasksPkid", "usersPkid"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f5b269151f75e9e6d1a65d853f" ON "tasks_assigned_users_users" ("tasksPkid") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_15e564469f4e3e7171edb325c7" ON "tasks_assigned_users_users" ("usersPkid") `,
    );
    await queryRunner.query(
      `ALTER TABLE "shell_items" DROP COLUMN "references"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shell_items" ADD "references" character varying array NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_49471d36f534d6de47a54882384" FOREIGN KEY ("createdByPkid") REFERENCES "users"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quantities" ADD CONSTRAINT "FK_ef02ddec47b221f5e66693ac41d" FOREIGN KEY ("createdByPkid") REFERENCES "users"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "itemstasksquantities" ADD CONSTRAINT "FK_1ac7b25c707248ae9a7d55a9594" FOREIGN KEY ("itemPkid") REFERENCES "shell_items"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "itemstasksquantities" ADD CONSTRAINT "FK_aeae4c8cd5f93911b8c9da42f4d" FOREIGN KEY ("taskPkid") REFERENCES "tasks"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "itemstasksquantities" ADD CONSTRAINT "FK_eaacbfac22327ff5247358bcb41" FOREIGN KEY ("quantityPkid") REFERENCES "quantities"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_4f3d4a875acca0cc841059d7813" FOREIGN KEY ("projectPkid") REFERENCES "projects"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks_assigned_users_users" ADD CONSTRAINT "FK_f5b269151f75e9e6d1a65d853fd" FOREIGN KEY ("tasksPkid") REFERENCES "tasks"("pkid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks_assigned_users_users" ADD CONSTRAINT "FK_15e564469f4e3e7171edb325c74" FOREIGN KEY ("usersPkid") REFERENCES "users"("pkid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks_assigned_users_users" DROP CONSTRAINT "FK_15e564469f4e3e7171edb325c74"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks_assigned_users_users" DROP CONSTRAINT "FK_f5b269151f75e9e6d1a65d853fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_4f3d4a875acca0cc841059d7813"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itemstasksquantities" DROP CONSTRAINT "FK_eaacbfac22327ff5247358bcb41"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itemstasksquantities" DROP CONSTRAINT "FK_aeae4c8cd5f93911b8c9da42f4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itemstasksquantities" DROP CONSTRAINT "FK_1ac7b25c707248ae9a7d55a9594"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quantities" DROP CONSTRAINT "FK_ef02ddec47b221f5e66693ac41d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_49471d36f534d6de47a54882384"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shell_items" DROP COLUMN "references"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shell_items" ADD "references" character varying(200) NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_15e564469f4e3e7171edb325c7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f5b269151f75e9e6d1a65d853f"`,
    );
    await queryRunner.query(`DROP TABLE "tasks_assigned_users_users"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TABLE "itemstasksquantities"`);
    await queryRunner.query(`DROP TABLE "quantities"`);
    await queryRunner.query(`DROP TABLE "projects"`);
  }
}
