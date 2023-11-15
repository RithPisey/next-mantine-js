import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const identity = createApi({
	reducerPath: "userApi", //default path after domain (optional)
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
	}),
	tagTypes: ["identity", "role"],
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: "/identity/token",
				body: data,
				method: "POST",
			}),
			providesTags: ["identity"],
		}),
	}),
});

export const { useLoginMutation } = identity;
