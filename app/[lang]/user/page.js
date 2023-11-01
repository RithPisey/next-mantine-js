import MainLayout from "@/components/MainLayout";
import User from "@/modules/user/User";

export default async function UserPage({ params: { lang } }) {
  return (
    <>
      <User lang={lang} />
    </>
  );
}
