"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
exports.dataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./MTG_deck-builder.sqlite",
    entities: ["src/entities/*.ts"],
    synchronize: true,
    /*   migrations: ["./src/migrations/*.ts"],
    migrationsTableName: "migrations", */
    logging: true,
});
