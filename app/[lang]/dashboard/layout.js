import MainLayout from "@/components/MainLayout";

export default function Layout({ children, lang }) {
	return <MainLayout lang={lang}>{children}</MainLayout>;
}
