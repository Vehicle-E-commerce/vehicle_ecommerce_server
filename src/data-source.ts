import { DataSource } from "typeorm"
import "dotenv/config";

export const AppDataSource = new DataSource(
  process.env.DB_ENV === "dev"
    ? {
        type: "sqlite",
        database: "./app.sqlite3",
        synchronize: true,
        entities: ["src/entities/*.ts"],
        migrations:["src/migrations/*.ts"],
      }
    : {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PWD,
        database: process.env.POSTGRES_DB,
        synchronize: false,
        logging: true,
        entities:["src/entities/*.ts"],
        migrations:["src/migrations/*.ts"],
      }
);