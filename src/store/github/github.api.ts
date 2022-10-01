import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser, ServerResponse } from "../../models/users";
import { IRepo } from "../../models/repos";

export const githubApi = createApi({
  reducerPath: "github/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
  }),
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: `search/users`,
        params: {
          q: search,
        },
      }),
      transformResponse: (response: ServerResponse<IUser>) => response.items,
    }),
    getRepos: build.query<IRepo[], string>({
      query: (name: string) => ({
        url: `users/${name}/repos`,
      }),
    }),
  }),
});

export const { useSearchUsersQuery, useLazyGetReposQuery } = githubApi;
