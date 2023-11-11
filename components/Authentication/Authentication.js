import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Authentication({ children }) {
	const [auth] = useAuth();
	const router = useRouter();
	useEffect(() => {
		console.log(auth);
		if (!auth.auth) {
			// router.push("/login");
		}
	}, []);

	return children;
}
