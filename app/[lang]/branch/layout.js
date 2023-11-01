import MainLayout from "@/components/MainLayout";

export default function BranchLayout({ children, lang }) {
	return <MainLayout lang={lang}>{children}</MainLayout>;
}
