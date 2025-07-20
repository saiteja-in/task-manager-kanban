-- Rename tables to remove app_ prefix for NextAuth compatibility
ALTER TABLE "app_user" RENAME TO "user";
ALTER TABLE "app_account" RENAME TO "account";
ALTER TABLE "app_session" RENAME TO "session";
ALTER TABLE "app_verificationToken" RENAME TO "verificationToken";

-- Update foreign key constraint names to match new table names
ALTER TABLE "account" DROP CONSTRAINT "app_account_userId_app_user_id_fk";
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "session" DROP CONSTRAINT "app_session_userId_app_user_id_fk";
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;

-- Keep app_profile and app_tasks with their prefixes since they're not NextAuth tables
ALTER TABLE "app_profile" DROP CONSTRAINT "app_profile_user_id_app_user_id_fk";
ALTER TABLE "app_profile" ADD CONSTRAINT "app_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "app_tasks" DROP CONSTRAINT "app_tasks_user_id_app_user_id_fk";
ALTER TABLE "app_tasks" ADD CONSTRAINT "app_tasks_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;