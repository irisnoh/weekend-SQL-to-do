CREATE TABLE "to-do-list" (
	"id" SERIAL PRIMARY KEY, 
	"task" VARCHAR(120) NOT NULL,
	"completed" BOOLEAN NOT NULL
);


INSERT INTO "to-do-list" ("task", "completed")
VALUES ('go to the bank', true);
INSERT INTO "to-do-list" ("task", "completed")
VALUES ('laundry', false);
INSERT INTO "to-do-list" ("task", "completed")
VALUES ('car wash', false);
INSERT INTO "to-do-list" ("task", "completed")
VALUES ('clean kitchen', true);
INSERT INTO "to-do-list" ("task", "completed")
VALUES ('grocery shopping', true);

SELECT * FROM "to-do-list";