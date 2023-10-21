import ProtectedPage from "@/components/ProtectedPage";
import { Can, field as importField } from "@/config/Abilities";
import User from "@/modules/user/User";

export default function UserPage({ params: { lang } }) {
  const field = importField;
  return (
    <>
      <Can I={"see"} this={"component"} field={field.ONLY_USER}>
        <User lang={lang} />
      </Can>
      <Can not I={"see"} this={"component"}>
        <ProtectedPage />
      </Can>
    </>
  );
}
