import OrganizationComponent from "@/modules/organization/components/OrganizationComponent";

export default function OrganizationPage({ params: { lang } }) {
	return (
		<>
			<OrganizationComponent lang={lang} />
		</>
	);
}
