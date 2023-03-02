import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1677768866367 implements MigrationInterface {
    name = 'initialMigration1677768866367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" varchar PRIMARY KEY NOT NULL, "cep" varchar NOT NULL, "state" varchar(24) NOT NULL, "city" varchar(30) NOT NULL, "road" varchar(50) NOT NULL, "number" varchar NOT NULL, "complement" varchar(50) NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "email" varchar(50) NOT NULL, "password" varchar(60) NOT NULL, "cpf" varchar(11) NOT NULL, "telephone" varchar NOT NULL, "birth_date" varchar NOT NULL, "bio" varchar(255) NOT NULL, "is_advertiser" boolean NOT NULL DEFAULT (0), "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "address" varchar, CONSTRAINT "REL_3122b4b8709577da50e89b6898" UNIQUE ("address"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" varchar PRIMARY KEY NOT NULL, "comment" varchar(255) NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "announcementId" varchar, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "images" ("id" varchar PRIMARY KEY NOT NULL, "image" varchar(255) NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "announcementId" varchar)`);
        await queryRunner.query(`CREATE TABLE "announcement" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(24) NOT NULL, "year" integer NOT NULL, "mileage" integer NOT NULL, "price" integer NOT NULL, "bio" varchar(255) NOT NULL, "is_motorbike" boolean NOT NULL DEFAULT (0), "cover_image" varchar NOT NULL DEFAULT (0), "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "email" varchar(50) NOT NULL, "password" varchar(60) NOT NULL, "cpf" varchar(11) NOT NULL, "telephone" varchar NOT NULL, "birth_date" varchar NOT NULL, "bio" varchar(255) NOT NULL, "is_advertiser" boolean NOT NULL DEFAULT (0), "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "address" varchar, CONSTRAINT "REL_3122b4b8709577da50e89b6898" UNIQUE ("address"), CONSTRAINT "FK_3122b4b8709577da50e89b68983" FOREIGN KEY ("address") REFERENCES "address" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "email", "password", "cpf", "telephone", "birth_date", "bio", "is_advertiser", "created_at", "updated_at", "address") SELECT "id", "name", "email", "password", "cpf", "telephone", "birth_date", "bio", "is_advertiser", "created_at", "updated_at", "address" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_comments" ("id" varchar PRIMARY KEY NOT NULL, "comment" varchar(255) NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "announcementId" varchar, "userId" varchar, CONSTRAINT "FK_2bf4aa41d384038daf10e39a8e8" FOREIGN KEY ("announcementId") REFERENCES "announcement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comments"("id", "comment", "created_at", "updated_at", "announcementId", "userId") SELECT "id", "comment", "created_at", "updated_at", "announcementId", "userId" FROM "comments"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`ALTER TABLE "temporary_comments" RENAME TO "comments"`);
        await queryRunner.query(`CREATE TABLE "temporary_images" ("id" varchar PRIMARY KEY NOT NULL, "image" varchar(255) NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "announcementId" varchar, CONSTRAINT "FK_fac6198a89ec23116ca0352104d" FOREIGN KEY ("announcementId") REFERENCES "announcement" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_images"("id", "image", "created_at", "updated_at", "announcementId") SELECT "id", "image", "created_at", "updated_at", "announcementId" FROM "images"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`ALTER TABLE "temporary_images" RENAME TO "images"`);
        await queryRunner.query(`CREATE TABLE "temporary_announcement" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(24) NOT NULL, "year" integer NOT NULL, "mileage" integer NOT NULL, "price" integer NOT NULL, "bio" varchar(255) NOT NULL, "is_motorbike" boolean NOT NULL DEFAULT (0), "cover_image" varchar NOT NULL DEFAULT (0), "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "userId" varchar, CONSTRAINT "FK_fd25dfe3da37df1715f11ba6ec8" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_announcement"("id", "title", "year", "mileage", "price", "bio", "is_motorbike", "cover_image", "created_at", "updated_at", "userId") SELECT "id", "title", "year", "mileage", "price", "bio", "is_motorbike", "cover_image", "created_at", "updated_at", "userId" FROM "announcement"`);
        await queryRunner.query(`DROP TABLE "announcement"`);
        await queryRunner.query(`ALTER TABLE "temporary_announcement" RENAME TO "announcement"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" RENAME TO "temporary_announcement"`);
        await queryRunner.query(`CREATE TABLE "announcement" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(24) NOT NULL, "year" integer NOT NULL, "mileage" integer NOT NULL, "price" integer NOT NULL, "bio" varchar(255) NOT NULL, "is_motorbike" boolean NOT NULL DEFAULT (0), "cover_image" varchar NOT NULL DEFAULT (0), "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "announcement"("id", "title", "year", "mileage", "price", "bio", "is_motorbike", "cover_image", "created_at", "updated_at", "userId") SELECT "id", "title", "year", "mileage", "price", "bio", "is_motorbike", "cover_image", "created_at", "updated_at", "userId" FROM "temporary_announcement"`);
        await queryRunner.query(`DROP TABLE "temporary_announcement"`);
        await queryRunner.query(`ALTER TABLE "images" RENAME TO "temporary_images"`);
        await queryRunner.query(`CREATE TABLE "images" ("id" varchar PRIMARY KEY NOT NULL, "image" varchar(255) NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "announcementId" varchar)`);
        await queryRunner.query(`INSERT INTO "images"("id", "image", "created_at", "updated_at", "announcementId") SELECT "id", "image", "created_at", "updated_at", "announcementId" FROM "temporary_images"`);
        await queryRunner.query(`DROP TABLE "temporary_images"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME TO "temporary_comments"`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" varchar PRIMARY KEY NOT NULL, "comment" varchar(255) NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "announcementId" varchar, "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "comments"("id", "comment", "created_at", "updated_at", "announcementId", "userId") SELECT "id", "comment", "created_at", "updated_at", "announcementId", "userId" FROM "temporary_comments"`);
        await queryRunner.query(`DROP TABLE "temporary_comments"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "email" varchar(50) NOT NULL, "password" varchar(60) NOT NULL, "cpf" varchar(11) NOT NULL, "telephone" varchar NOT NULL, "birth_date" varchar NOT NULL, "bio" varchar(255) NOT NULL, "is_advertiser" boolean NOT NULL DEFAULT (0), "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "address" varchar, CONSTRAINT "REL_3122b4b8709577da50e89b6898" UNIQUE ("address"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "email", "password", "cpf", "telephone", "birth_date", "bio", "is_advertiser", "created_at", "updated_at", "address") SELECT "id", "name", "email", "password", "cpf", "telephone", "birth_date", "bio", "is_advertiser", "created_at", "updated_at", "address" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`DROP TABLE "announcement"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
