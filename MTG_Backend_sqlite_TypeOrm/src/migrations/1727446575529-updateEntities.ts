import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1727446575529 implements MigrationInterface {
    name = 'UpdateEntities1727446575529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_ad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar, "author" varchar NOT NULL, "price" integer NOT NULL, "created_at" datetime NOT NULL, "img_url" varchar NOT NULL, "city" varchar NOT NULL, "categoryId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_ad"("id", "title", "description", "author", "price", "created_at", "img_url", "city") SELECT "id", "title", "description", "author", "price", "created_at", "img_url", "city" FROM "ad"`);
        await queryRunner.query(`DROP TABLE "ad"`);
        await queryRunner.query(`ALTER TABLE "temporary_ad" RENAME TO "ad"`);
        await queryRunner.query(`CREATE TABLE "temporary_ad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar, "author" varchar NOT NULL, "price" integer NOT NULL, "created_at" datetime NOT NULL, "img_url" varchar NOT NULL, "city" varchar NOT NULL, "categoryId" integer, CONSTRAINT "FK_c418809c6e081f861cefe495668" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_ad"("id", "title", "description", "author", "price", "created_at", "img_url", "city", "categoryId") SELECT "id", "title", "description", "author", "price", "created_at", "img_url", "city", "categoryId" FROM "ad"`);
        await queryRunner.query(`DROP TABLE "ad"`);
        await queryRunner.query(`ALTER TABLE "temporary_ad" RENAME TO "ad"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" RENAME TO "temporary_ad"`);
        await queryRunner.query(`CREATE TABLE "ad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar, "author" varchar NOT NULL, "price" integer NOT NULL, "created_at" datetime NOT NULL, "img_url" varchar NOT NULL, "city" varchar NOT NULL, "categoryId" integer)`);
        await queryRunner.query(`INSERT INTO "ad"("id", "title", "description", "author", "price", "created_at", "img_url", "city", "categoryId") SELECT "id", "title", "description", "author", "price", "created_at", "img_url", "city", "categoryId" FROM "temporary_ad"`);
        await queryRunner.query(`DROP TABLE "temporary_ad"`);
        await queryRunner.query(`ALTER TABLE "ad" RENAME TO "temporary_ad"`);
        await queryRunner.query(`CREATE TABLE "ad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar, "author" varchar NOT NULL, "price" integer NOT NULL, "created_at" datetime NOT NULL, "img_url" varchar NOT NULL, "city" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "ad"("id", "title", "description", "author", "price", "created_at", "img_url", "city") SELECT "id", "title", "description", "author", "price", "created_at", "img_url", "city" FROM "temporary_ad"`);
        await queryRunner.query(`DROP TABLE "temporary_ad"`);
    }

}
