const { createContext, useContext, useState } = require("react");

export const AuthContext = createContext();

export function AuthContextWrapper({ children }) {
	const [auth, setAuth] = useState(null);
	function setAuthentication(value) {
		setAuth(value);
	}
	return (
		<AuthContext.Provider
			value={{
				auth: auth,
				setAuthentication: setAuthentication,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	return [context];
}
