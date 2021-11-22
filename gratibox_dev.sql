CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL UNIQUE,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "logged_users" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "logged_users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plans" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "products" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "aux" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"plan_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"date" varchar(255) NOT NULL,
	"subscription_date" date NOT NULL,
	CONSTRAINT "aux_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "adress" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "adress_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "logged_users" ADD CONSTRAINT "logged_users_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;



ALTER TABLE "aux" ADD CONSTRAINT "aux_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "aux" ADD CONSTRAINT "aux_fk1" FOREIGN KEY ("plan_id") REFERENCES "plans"("id");
ALTER TABLE "aux" ADD CONSTRAINT "aux_fk2" FOREIGN KEY ("product_id") REFERENCES "products"("id");

ALTER TABLE "adress" ADD CONSTRAINT "adress_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

insert into plans (name) values ('Mensal');
insert into plans (name) values ('Semanal');
insert into products (name) values ('Chás');
insert into products (name) values ('Incensos');
insert into products (name) values ('Produtos orgânicos');






