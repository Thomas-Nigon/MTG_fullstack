import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1727444668396 implements MigrationInterface {
    name = 'Init1727444668396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstname" varchar(100) NOT NULL, "name" varchar NOT NULL, "birthday" datetime NOT NULL, "address" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "ad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar, "author" varchar NOT NULL, "price" integer NOT NULL, "created_at" datetime NOT NULL, "img_url" varchar NOT NULL, "city" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ad"`);
        await queryRunner.query(`DROP TABLE "student"`);
    }

}
