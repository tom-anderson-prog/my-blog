import { redirect } from "next/navigation";
import {
  createErrorReturn,
  createSuccessReturn,
  DalError,
  DalReturn,
  ThrowableDalError,
} from "./types";
import { headers } from "next/headers";
import { PrismaClientKnownRequestError } from "@/generated/prisma/internal/prismaNamespace";
import { auth, type SessionType } from "@/lib/auth";

export function dalLoginRedirect<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
) {
  if (dalReturn.success) return dalReturn;
  if (dalReturn.error.type === "no-user") return redirect("/login");

  return dalReturn as DalReturn<T, Exclude<E, { type: "no-user" }>>;
}

export function dalThrowError<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
) {
  if (dalReturn.success) return dalReturn;

  throw dalReturn.error;
}

export function dalVerifySuccess<T>(dalReturn: DalReturn<T>): T {
  const res = dalThrowError(dalLoginRedirect(dalReturn));

  return res.data;
}

export async function dalDbOperation<T>(
  operation: () => Promise<T>,
): Promise<DalReturn<T>> {
  try {
    const data = await operation();
    return createSuccessReturn(data);
  } catch (e) {
    if (e instanceof ThrowableDalError) {
      return createErrorReturn(e.dalError);
    }
    if (e instanceof PrismaClientKnownRequestError) {
      return createErrorReturn({
        type: "prisma-error",
        error: e,
      });
    }
    return createErrorReturn({
      type: "unknown-error",
      error: e,
    });
  }
}

export async function dalRequireAuth<T>(
  operation: (session: SessionType) => Promise<DalReturn<T>>,
) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    return createErrorReturn({
      type: "no-user",
    });
  }

  return operation(session);
}

export async function dalRequireAuthOperation(operation: () => void) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return operation();
  }
}

export function dalFormatErrorMessage(error: DalError) {
  const type = error.type;

  switch (type) {
    case "no-user":
      return "You must be logged in to perform this action";
    case "prisma-error":
      return "A database error occurred";
    case "unknown-error":
      return "An unknown error occurred";

    default:
      throw new Error(`Unhandled error type: ${type as never}`);
  }
}
