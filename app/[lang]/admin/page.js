import MainLayout from "@/components/MainLayout";
import Admin from "@/modules/admin/Admin";

export default function AdminPage({ params: { lang } }) {
  return (
    <>
      <Admin lang={lang} />
    </>
  );
}
