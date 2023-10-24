import { AdminLayout } from "./layout/AdminLayout";

export default function MainLayout({ children, lang }) {
	return <AdminLayout lang={lang}>{children}</AdminLayout>;
}
