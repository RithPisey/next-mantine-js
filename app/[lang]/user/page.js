import User from "@/modules/user/User";

export default function UserPage({ params: { lang } }) {
  return <User lang={lang} />;
}
