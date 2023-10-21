import { getDictionary } from "@/lib/dictionary";
import UserComponent from "./components/UserComponent";

export default async function User({ lang }) {
  const { user } = await getDictionary(lang);
  return (
    <>
      <UserComponent t={user} />
    </>
  );
}
