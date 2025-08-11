-- CreateTable
CREATE TABLE "public"."Otp" (
    "otp" INTEGER NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Otp_otp_key" ON "public"."Otp"("otp");
