import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  /*  type: "sqlite",
  database: "./MTG_deck-builder.sqlite", */
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  port: parseInt(process.env.DB_PORT || "5432"),

  entities: ["src/entities/*.ts"],
  synchronize: true,
  /*   migrations: ["./src/migrations/*.ts"],
  migrationsTableName: "migrations", */
  logging: true,
});
