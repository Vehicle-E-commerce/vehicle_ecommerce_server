import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1677609288328 implements MigrationInterface {
    name = 'createTables1677609288328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" varchar PRIMARY KEY NOT NULL, "cep" integer NOT NULL, "state" varchar(24) NOT NULL, "city" varchar(30) NOT NULL, "road" varchar(50) NOT NULL, "number" integer NOT NULL, "complement" varchar(50) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "email" varchar(50) NOT NULL, "password" varchar(60) NOT NULL, "confirm_password" varchar(60) NOT NULL, "cpf" varchar(11) NOT NULL, "telephone" varchar NOT NULL, "birth_date" varchar NOT NULL, "bio" varchar(255) NOT NULL, "is_advertiser" boolean NOT NULL DEFAULT (0), "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "address_id" varchar, CONSTRAINT "REL_302d96673413455481d5ff4022" UNIQUE ("address_id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" varchar PRIMARY KEY NOT NULL, "comment" varchar(255) NOT NULL, "announcementId" varchar, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "images" ("id" varchar PRIMARY KEY NOT NULL, "image" varchar(255) NOT NULL, "announcementId" varchar)`);
        await queryRunner.query(`CREATE TABLE "announcement" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(24) NOT NULL, "year" integer NOT NULL, "mileage" integer NOT NULL, "price" integer NOT NULL, "bio" varchar(255) NOT NULL, "is_motorbike" boolean NOT NULL DEFAULT (0), "cover_image" varchar NOT NULL DEFAULT (0))`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "email" varchar(50) NOT NULL, "password" varchar(60) NOT NULL, "confirm_password" varchar(60) NOT NULL, "cpf" varchar(11) NOT NULL, "telephone" varchar NOT NULL, "birth_date" varchar NOT NULL, "bio" varchar(255) NOT NULL, "is_advertiser" boolean NOT NULL DEFAULT (0), "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "address_id" varchar, CONSTRAINT "REL_302d96673413455481d5ff4022" UNIQUE ("address_id"), CONSTRAINT "FK_302d96673413455481d5ff4022a" FOREIGN KEY ("address_id") REFERENCES "address" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "email", "password", "confirm_password", "cpf", "telephone", "birth_date", "bio", "is_advertiser", "created_at", "updated_at", "address_id") SELECT "id", "name", "email", "password", "confirm_password", "cpf", "telephone", "birth_date", "bio", "is_advertiser", "created_at", "updated_at", "address_id" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_comments" ("id" varchar PRIMARY KEY NOT NULL, "comment" varchar(255) NOT NULL, "announcementId" varchar, "userId" varchar, CONSTRAINT "FK_2bf4aa41d384038daf10e39a8e8" FOREIGN KEY ("announcementId") REFERENCES "announcement" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comments"("id", "comment", "announcementId", "userId") SELECT "id", "comment", "announcementId", "userId" FROM "comments"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`ALTER TABLE "temporary_comments" RENAME TO "comments"`);
        await queryRunner.query(`CREATE TABLE "temporary_images" ("id" varchar PRIMARY KEY NOT NULL, "image" varchar(255) NOT NULL, "announcementId" varchar, CONSTRAINT "FK_fac6198a89ec23116ca0352104d" FOREIGN KEY ("announcementId") REFERENCES "announcement" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_images"("id", "image", "announcementId") SELECT "id", "image", "announcementId" FROM "images"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`ALTER TABLE "temporary_images" RENAME TO "images"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" RENAME TO "temporary_images"`);
        await queryRunner.query(`CREATE TABLE "images" ("id" varchar PRIMARY KEY NOT NULL, "image" varchar(255) NOT NULL, "announcementId" varchar)`);
        await queryRunner.query(`INSERT INTO "images"("id", "image", "announcementId") SELECT "id", "image", "announcementId" FROM "temporary_images"`);
        await queryRunner.query(`DROP TABLE "temporary_images"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME TO "temporary_comments"`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" varchar PRIMARY KEY NOT NULL, "comment" varchar(255) NOT NULL, "announcementId" varchar, "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "comments"("id", "comment", "announcementId", "userId") SELECT "id", "comment", "announcementId", "userId" FROM "temporary_comments"`);
        await queryRunner.query(`DROP TABLE "temporary_comments"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "email" varchar(50) NOT NULL, "password" varchar(60) NOT NULL, "confirm_password" varchar(60) NOT NULL, "cpf" varchar(11) NOT NULL, "telephone" varchar NOT NULL, "birth_date" varchar NOT NULL, "bio" varchar(255) NOT NULL, "is_advertiser" boolean NOT NULL DEFAULT (0), "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" date NOT NULL DEFAULT (datetime('now')), "address_id" varchar, CONSTRAINT "REL_302d96673413455481d5ff4022" UNIQUE ("address_id"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "email", "password", "confirm_password", "cpf", "telephone", "birth_date", "bio", "is_advertiser", "created_at", "updated_at", "address_id") SELECT "id", "name", "email", "password", "confirm_password", "cpf", "telephone", "birth_date", "bio", "is_advertiser", "created_at", "updated_at", "address_id" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`DROP TABLE "announcement"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
