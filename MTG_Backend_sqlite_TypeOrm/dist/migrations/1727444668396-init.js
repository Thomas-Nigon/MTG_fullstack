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
exports.Init1727444668396 = void 0;
class Init1727444668396 {
    constructor() {
        this.name = 'Init1727444668396';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "student" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstname" varchar(100) NOT NULL, "name" varchar NOT NULL, "birthday" datetime NOT NULL, "address" varchar NOT NULL)`);
            yield queryRunner.query(`CREATE TABLE "ad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar, "author" varchar NOT NULL, "price" integer NOT NULL, "created_at" datetime NOT NULL, "img_url" varchar NOT NULL, "city" varchar NOT NULL)`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "ad"`);
            yield queryRunner.query(`DROP TABLE "student"`);
        });
    }
}
exports.Init1727444668396 = Init1727444668396;
