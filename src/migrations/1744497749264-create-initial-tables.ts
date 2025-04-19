import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1744497749264 implements MigrationInterface {
  name = 'CreateInitialTables1744497749264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permissions" ("pkid" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "slug" character varying(100) NOT NULL, "status" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_920331560282b8bd21bb02290df" UNIQUE ("id"), CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "UQ_d090ad82a0e97ce764c06c7b312" UNIQUE ("slug"), CONSTRAINT "PK_94d951725a06126a080c3ed3179" PRIMARY KEY ("pkid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("pkid" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "slug" character varying(100) NOT NULL, "status" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_c1433d71a4838793a49dcad46ab" UNIQUE ("id"), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "UQ_881f72bac969d9a00a1a29e1079" UNIQUE ("slug"), CONSTRAINT "PK_618a115d0bd8d25941e84c51904" PRIMARY KEY ("pkid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organizations" ("pkid" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "organizationName" character varying(200) NOT NULL, "organizationAddress" character varying(200) NOT NULL, "organizationCity" character varying(200) NOT NULL, "organizationCountry" character varying(200) NOT NULL, "createdByPkid" integer NOT NULL, CONSTRAINT "UQ_6b031fcd0863e3f6b44230163f9" UNIQUE ("id"), CONSTRAINT "REL_1a25b3eba16056c95df8198cd3" UNIQUE ("createdByPkid"), CONSTRAINT "PK_b18af184647c8912b6a58e54e53" PRIMARY KEY ("pkid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("pkid" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userName" character varying(200) NOT NULL, "firstName" character varying(200) NOT NULL, "lastName" character varying(200) NOT NULL, "title" character varying(200) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(250) NOT NULL, "userType" character varying(50) NOT NULL, "status" boolean NOT NULL DEFAULT true, "isDefaultPassword" boolean NOT NULL DEFAULT true, "twoFactorAuthentication" boolean NOT NULL DEFAULT false, "emailVerified" boolean NOT NULL DEFAULT true, "emailVerificationKey" character varying(250), "emailVerificationExpiry" TIMESTAMP WITH TIME ZONE, "rolePkid" integer, "organizationPkid" integer, CONSTRAINT "UQ_a3ffb1c0c8416b9fc6f907b7433" UNIQUE ("id"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_19ad66d3f7250b74880458f4eb9" PRIMARY KEY ("pkid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_permissions" ("rolesPkid" integer NOT NULL, "permissionsPkid" integer NOT NULL, CONSTRAINT "PK_cee9abf6fddabbb268e1a53751c" PRIMARY KEY ("rolesPkid", "permissionsPkid"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b55ad12dee7e2f66afbe273247" ON "role_permissions" ("rolesPkid") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_707f7439fbb135f9763ca90b49" ON "role_permissions" ("permissionsPkid") `,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" ADD CONSTRAINT "FK_1a25b3eba16056c95df8198cd37" FOREIGN KEY ("createdByPkid") REFERENCES "users"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_7152f1f7b25884597d1e49b18f8" FOREIGN KEY ("rolePkid") REFERENCES "roles"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_0aa095c521f6fe66d252e8716f8" FOREIGN KEY ("organizationPkid") REFERENCES "organizations"("pkid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_b55ad12dee7e2f66afbe2732473" FOREIGN KEY ("rolesPkid") REFERENCES "roles"("pkid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_707f7439fbb135f9763ca90b49f" FOREIGN KEY ("permissionsPkid") REFERENCES "permissions"("pkid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_707f7439fbb135f9763ca90b49f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_b55ad12dee7e2f66afbe2732473"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_0aa095c521f6fe66d252e8716f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_7152f1f7b25884597d1e49b18f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" DROP CONSTRAINT "FK_1a25b3eba16056c95df8198cd37"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_707f7439fbb135f9763ca90b49"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b55ad12dee7e2f66afbe273247"`,
    );
    await queryRunner.query(`DROP TABLE "role_permissions"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "organizations"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
  }
}
