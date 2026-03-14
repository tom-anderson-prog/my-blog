import { NuqsAdapter } from "nuqs/adapters/react";

interface AdminProviders {
  children: React.ReactNode;
}

export function AdminProviders({ children }: AdminProviders) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
