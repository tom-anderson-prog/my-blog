import Header from "@/components/header";
import Footer from "@/components/footer";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow bg-white w-full max-w-4xl mx-auto px-4 md:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
