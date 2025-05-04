import { MigrationInterface, QueryRunner } from 'typeorm';

export class ShellScheduleTables1746094988855 implements MigrationInterface {
  name = 'ShellScheduleTables1746094988855';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shell_items" ("pkid" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "identifierId" integer NOT NULL, "description" character varying(200) NOT NULL, "references" character varying(200) NOT NULL, "unit" character varying(200) NOT NULL, "quantity" character varying(200), "kind" character varying(200) NOT NULL, "shellSubCategoryPkid" integer, CONSTRAINT "UQ_0e5f582dd125286f2f5814bebc5" UNIQUE ("id"), CONSTRAINT "PK_e83c2a222c0fad459e310fb6a6b" PRIMARY KEY ("pkid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shell_phases" ("pkid" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "identifierId" integer NOT NULL, "name" character varying(200) NOT NULL, CONSTRAINT "UQ_975fdbea20dbe13242fedaf305c" UNIQUE ("id"), CONSTRAINT "PK_e8dd8e486bf0471eb0a84a38430" PRIMARY KEY ("pkid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shell_categories" ("pkid" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "identifierId" integer NOT NULL, "name" character varying(200) NOT NULL, "shellPhasePkid" integer, CONSTRAINT "UQ_1b2034c3f018aab2105f9d79570" UNIQUE ("id"), CONSTRAINT "PK_d78e34b5dc694a7b86bc548b608" PRIMARY KEY ("pkid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shell_sub_categories" ("pkid" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "identifierId" integer NOT NULL, "name" character varying(200) NOT NULL, "shellCategoryPkid" integer, CONSTRAINT "UQ_85ed144b26eecedf9013ebf101e" UNIQUE ("id"), CONSTRAINT "PK_814e58f5513de94a94442c739cd" PRIMARY KEY ("pkid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "shell_items" ADD CONSTRAINT "FK_e249417a2cff97f6dec3f861d61" FOREIGN KEY ("shellSubCategoryPkid") REFERENCES "shell_sub_categories"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shell_categories" ADD CONSTRAINT "FK_1580145b110f8535f78e54e4a26" FOREIGN KEY ("shellPhasePkid") REFERENCES "shell_phases"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shell_sub_categories" ADD CONSTRAINT "FK_7a4ac3a6ebb64787ba7a7e87f76" FOREIGN KEY ("shellCategoryPkid") REFERENCES "shell_categories"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shell_sub_categories" DROP CONSTRAINT "FK_7a4ac3a6ebb64787ba7a7e87f76"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shell_categories" DROP CONSTRAINT "FK_1580145b110f8535f78e54e4a26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shell_items" DROP CONSTRAINT "FK_e249417a2cff97f6dec3f861d61"`,
    );
    await queryRunner.query(`DROP TABLE "shell_sub_categories"`);
    await queryRunner.query(`DROP TABLE "shell_categories"`);
    await queryRunner.query(`DROP TABLE "shell_phases"`);
    await queryRunner.query(`DROP TABLE "shell_items"`);
  }
}
