import { AdminLayout } from "./layout/AdminLayout";

export default function MainLayout({ children, lang, loading }) {
  return (
    <AdminLayout loading={loading} lang={lang}>
      {children}
    </AdminLayout>
  );
}
