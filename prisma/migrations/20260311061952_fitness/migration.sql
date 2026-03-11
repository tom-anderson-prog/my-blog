-- CreateTable
CREATE TABLE "routines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "repeat_count" INTEGER NOT NULL DEFAULT 1,
    "steps" JSONB,
    "total_duration" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "routines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_session" (
    "id" SERIAL NOT NULL,
    "routineId" INTEGER NOT NULL,
    "routine_name" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "workout_session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "workout_session_routineId_idx" ON "workout_session"("routineId");

-- AddForeignKey
ALTER TABLE "workout_session" ADD CONSTRAINT "workout_session_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "routines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
