import Organization from "@/modules/admin/Organization";

export default function OrganizationPage({ params: { lang } }) {
	return (
		<>
			<Organization lang={lang} />
		</>
	);
}
