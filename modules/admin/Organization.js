import { Lang } from "@/config/lang";
import AdminComponent from "./components/Organization";
import AdminProtected from "./components/OrganizationProtected";
import OrganizationComponent from "./components/Organization";

export default function Organization() {
	const key = "organization";
	return <OrganizationComponent module={key} />;
}
