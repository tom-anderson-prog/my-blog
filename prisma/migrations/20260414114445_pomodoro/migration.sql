-- CreateTable
CREATE TABLE "FocusSession" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "mode" TEXT NOT NULL DEFAULT 'pomodoro',
    "short_break" INTEGER,
    "long_break" INTEGER,
    "long_break_after_num_cycles" INTEGER DEFAULT 1,
    "pomodoro_duration" INTEGER,
    "cycles" INTEGER DEFAULT 1,
    "emoji" INTEGER NOT NULL,
    "tags" TEXT[],
    "feeling" TEXT NOT NULL,

    CONSTRAINT "FocusSession_pkey" PRIMARY KEY ("id")
);
