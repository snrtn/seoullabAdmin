import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const menuApi = createApi({
	reducerPath: 'menuApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	endpoints: (builder) => ({
		getMenuItems: builder.query({
			query: () => 'api/seoullab',
		}),
		addMenuItem: builder.mutation({
			query: (newItem) => ({
				url: 'api/seoullab',
				method: 'POST',
				body: newItem,
			}),
		}),
		deleteMenuItem: builder.mutation({
			query: (itemId) => ({
				url: `api/seoullab/${itemId}`,
				method: 'DELETE',
			}),
		}),
	}),
});
