"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEntities1727446575529 = void 0;
class UpdateEntities1727446575529 {
    constructor() {
        this.name = 'UpdateEntities1727446575529';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "temporary_ad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar, "author" varchar NOT NULL, "price" integer NOT NULL, "created_at" datetime NOT NULL, "img_url" varchar NOT NULL, "city" varchar NOT NULL, "categoryId" integer)`);
            yield queryRunner.query(`INSERT INTO "temporary_ad"("id", "title", "description", "author", "price", "created_at", "img_url", "city") SELECT "id", "title", "description", "author", "price", "created_at", "img_url", "city" FROM "ad"`);
            yield queryRunner.query(`DROP TABLE "ad"`);
            yield queryRunner.query(`ALTER TABLE "temporary_ad" RENAME TO "ad"`);
            yield queryRunner.query(`CREATE TABLE "temporary_ad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar, "author" varchar NOT NULL, "price" integer NOT NULL, "created_at" datetime NOT NULL, "img_url" varchar NOT NULL, "city" varchar NOT NULL, "categoryId" integer, CONSTRAINT "FK_c418809c6e081f861cefe495668" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
            yield queryRunner.query(`INSERT INTO "temporary_ad"("id", "title", "description", "author", "price", "created_at", "img_url", "city", "categoryId") SELECT "id", "title", "description", "author", "price", "created_at", "img_url", "city", "categoryId" FROM "ad"`);
            yield queryRunner.query(`DROP TABLE "ad"`);
            yield queryRunner.query(`ALTER TABLE "temporary_ad" RENAME TO "ad"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "ad" RENAME TO "temporary_ad"`);
            yield queryRunner.query(`CREATE TABLE "ad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar, "author" varchar NOT NULL, "price" integer NOT NULL, "created_at" datetime NOT NULL, "img_url" varchar NOT NULL, "city" varchar NOT NULL, "categoryId" integer)`);
            yield queryRunner.query(`INSERT INTO "ad"("id", "title", "description", "author", "price", "created_at", "img_url", "city", "categoryId") SELECT "id", "title", "description", "author", "price", "created_at", "img_url", "city", "categoryId" FROM "temporary_ad"`);
            yield queryRunner.query(`DROP TABLE "temporary_ad"`);
            yield queryRunner.query(`ALTER TABLE "ad" RENAME TO "temporary_ad"`);
            yield queryRunner.query(`CREATE TABLE "ad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar, "author" varchar NOT NULL, "price" integer NOT NULL, "created_at" datetime NOT NULL, "img_url" varchar NOT NULL, "city" varchar NOT NULL)`);
            yield queryRunner.query(`INSERT INTO "ad"("id", "title", "description", "author", "price", "created_at", "img_url", "city") SELECT "id", "title", "description", "author", "price", "created_at", "img_url", "city" FROM "temporary_ad"`);
            yield queryRunner.query(`DROP TABLE "temporary_ad"`);
        });
    }
}
exports.UpdateEntities1727446575529 = UpdateEntities1727446575529;
