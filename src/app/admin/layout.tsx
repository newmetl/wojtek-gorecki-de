import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin | Wojtek Gorecki",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  // Allow login page without session
  // The login page will render inside this layout but we skip the sidebar
  // We detect this via a wrapper approach - login page has its own full layout

  if (!session) {
    // We can't easily detect the path in a layout, so we return children
    // and let individual pages handle auth. But we wrap protected pages.
    // The login page handles its own rendering without sidebar.
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f5f4f1]">
      <AdminSidebar />
      <div className="md:ml-60">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-[#e0ddd8] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="md:hidden w-10" />
            <h2 className="font-label font-medium text-sm text-[#1a1c1a]/50">
              Verwaltung
            </h2>
            <div className="text-xs font-label text-[#1a1c1a]/40">Admin</div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
