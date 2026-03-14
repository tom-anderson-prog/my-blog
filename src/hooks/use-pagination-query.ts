import { parseAsInteger, useQueryState } from "nuqs";

export function usePaginationQuery() {
  return useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({
      shallow: false,
    }),
  );
}
