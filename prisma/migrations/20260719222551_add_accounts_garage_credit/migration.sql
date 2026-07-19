-- Accounts, garage & credit ledger
ALTER TABLE "Customer" ADD COLUMN IF NOT EXISTS "referralCode" TEXT;
ALTER TABLE "Customer" ADD COLUMN IF NOT EXISTS "referredById" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "Customer_referralCode_key" ON "Customer"("referralCode");

CREATE TABLE IF NOT EXISTS "Session" (
  "id" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Session_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Session_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "Session_token_key" ON "Session"("token");
CREATE INDEX IF NOT EXISTS "Session_customerId_idx" ON "Session"("customerId");

CREATE TABLE IF NOT EXISTS "CustomerVehicle" (
  "id" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "vehicleId" TEXT NOT NULL,
  "model" TEXT,
  "year" INTEGER,
  "nickname" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CustomerVehicle_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "CustomerVehicle_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "CustomerVehicle_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "CustomerVehicle_customerId_idx" ON "CustomerVehicle"("customerId");

CREATE TABLE IF NOT EXISTS "CreditEntry" (
  "id" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "amount" DECIMAL(10,2) NOT NULL,
  "reason" TEXT NOT NULL,
  "orderId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CreditEntry_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "CreditEntry_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "CreditEntry_customerId_idx" ON "CreditEntry"("customerId");
