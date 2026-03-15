import { createLoader, createSerializer, parseAsInteger } from "nuqs/server";

const searchParams = {
  page: parseAsInteger.withDefault(1),
};

export const loadPagination = createLoader(searchParams);
export const getPaginatedLink = createSerializer(searchParams);
