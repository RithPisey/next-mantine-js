import { useLoginMutation } from "@/api/identity";
import useNotification from "@/hooks/notifications/useNotification";
import { useState } from "react";

export default function useIdentity() {
	const [login] = useLoginMutation();
	const [user, setUser] = useState(null);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { NLoading, NSuccess, NError } = useNotification();

	const signIn = function (email, password) {
		setIsLoading(true);
		let lid = NLoading("Please wait").show();
		login({ email: email, password: password }).then((result) => {
			setIsLoading(false);
			if (result.data.success) {
				NSuccess("Login Successful").update();
				setUser(result.data.data);
			} else if (result.data.error) {
				setError(true);
				console.log(result);
				NError("Login failure").update();
			}
		});
		// return ({ data, success, error } = result.data);
	};

	return [user, signIn, isLoading, error];
}
