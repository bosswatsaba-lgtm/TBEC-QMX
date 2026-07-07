-- CreateEnum
CREATE TYPE "Phase" AS ENUM ('EARTHWORKS', 'SUBSTRUCTURE', 'SUPERSTRUCTURE', 'ROOFING', 'FINISHES');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'CALCULATING', 'READY', 'REVISION');

-- CreateEnum
CREATE TYPE "MeasurementUnit" AS ENUM ('M', 'M2', 'M3', 'T', 'KG', 'HR', 'DAY');

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "client" TEXT,
    "location" TEXT,
    "region" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "ProjectStatus" NOT NULL DEFAULT 'DRAFT',
    "totalValue" DOUBLE PRECISION,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhaseProgress" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "phase" "Phase" NOT NULL,
    "pct" INTEGER NOT NULL DEFAULT 0,
    "quantified" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhaseProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "phase" "Phase" NOT NULL,
    "smm7Code" TEXT,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" "MeasurementUnit" NOT NULL DEFAULT 'M',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoqItem" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoqItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MaterialCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialRate" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "wastage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "categoryId" TEXT NOT NULL,
    "supplierId" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaterialRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_slug_key" ON "Tenant"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PhaseProgress_projectId_phase_key" ON "PhaseProgress"("projectId", "phase");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialCategory_name_key" ON "MaterialCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialRate_code_key" ON "MaterialRate"("code");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhaseProgress" ADD CONSTRAINT "PhaseProgress_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoqItem" ADD CONSTRAINT "BoqItem_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialRate" ADD CONSTRAINT "MaterialRate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MaterialCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialRate" ADD CONSTRAINT "MaterialRate_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
