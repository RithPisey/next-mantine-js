import { getDictionary } from "@/lib/dictionary";
import UserComponent from "./components/UserComponent";
import UserProtected from "./components/UserProtected";

export default async function User({ lang }) {
	const { user } = await getDictionary(lang);

	return (
		<>
			<UserProtected>
				<UserComponent t={user} />
			</UserProtected>
		</>
	);
}
