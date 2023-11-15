import { identity } from "@/api/identity";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
	reducer: {
		[identity.reducerPath]: identity.reducer,
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([identity.middleware]),
});

setupListeners(store.dispatch);
