import { AdminProviders } from "@/components/admin-provider";
import { GlobalConfirmModal } from "@/hooks/use-confirm";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full bg-slate-50/50">
      <AdminProviders>
        <main className="flex-1 h-full overflow-y-auto px-8 pb-8">
          {children}
          <GlobalConfirmModal />
        </main>
      </AdminProviders>
    </div>
  );
}
