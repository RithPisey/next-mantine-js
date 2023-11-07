"use client";
import {
  Can,
  ability,
  field as importField,
  subject,
} from "@/config/Abilities";
import ProtectedPage from "../ProtectedPage";
export default function CheckPermissionWrapper({ children, key }) {
  return (
    <>
      {/* <Can I={ability.SEE} this={subject.COMPONENT} field={field} passThrough>
				{(allowed) => (allowed ? children : <ProtectedPage />)}
			</Can> */}
    </>
  );
}
