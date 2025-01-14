import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./MTG_deck-builder.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
  /*   migrations: ["./src/migrations/*.ts"],
  migrationsTableName: "migrations", */
  logging: true,
});
