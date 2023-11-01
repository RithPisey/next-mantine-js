import MainLayout from "@/components/MainLayout";

export default function OrganizationLayout({ children, lang }) {
	return <MainLayout lang={lang}>{children}</MainLayout>;
}
