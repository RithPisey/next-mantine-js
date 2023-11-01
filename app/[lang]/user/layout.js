import MainLayout from "@/components/MainLayout";

export default function UserLayout({ children, lang }) {
  return <MainLayout lang={lang}>{children}</MainLayout>;
}
