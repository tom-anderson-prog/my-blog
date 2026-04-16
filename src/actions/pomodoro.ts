"use server";

import { dalRequireAuthOperation } from "@/dal/helpers";
import { createFocusSession } from "@/lib/data";

export async function addFocusSession(data: any) {
  await dalRequireAuthOperation(async () => {
    return await createFocusSession(data);
  });
}
