-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "backendUrl" TEXT,
    "frontendUrl" TEXT,
    "bpmnFile" TEXT,
    "thumbnail" TEXT,
    "repository" TEXT,
    "status" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
