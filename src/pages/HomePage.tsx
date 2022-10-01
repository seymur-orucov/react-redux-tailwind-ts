import {
  useLazyGetReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const debounce = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounce, {
    skip: debounce.length < 3,
  });
  const [fetching, { data: repos }] = useLazyGetReposQuery();

  useEffect(() => {
    setDropdown(debounce.length > 3 && data?.length! > 0);
    console.log(dropdown);
  }, [debounce, data]);

  const getRepos = (name: string) => {
    fetching(name);
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="relative w-[500px]">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              className="h-5 w-5 fill-slate-300"
              viewBox="0 0 30 30"
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 C 3 18.511334 7.4886661 23 13 23 C 15.396652 23 17.59741 22.148942 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148942 17.59741 23 15.396652 23 13 C 23 7.4886661 18.511334 3 13 3 z M 13 5 C 17.430666 5 21 8.5693339 21 13 C 21 17.430666 17.430666 21 13 21 C 8.5693339 21 5 17.430666 5 13 C 5 8.5693339 8.5693339 5 13 5 z" />
            </svg>
          </span>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Github user search..."
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        {data?.length && (
          <div className="absolute left-0 right-0 shadow-md rounded-md rounded-tl-none rounded-tr-none">
            <ul className="max-h-[300px] overflow-y-scroll">
              {isLoading && <h3>Loading...</h3>}
              {isError && <h3>:(</h3>}
              {dropdown &&
                data?.map((user) => {
                  return (
                    <li
                      key={user.id}
                      onClick={() => getRepos(user.login)}
                      className="px-3 py-2 hover:bg-gray-600 hover:text-white transition-all my-1"
                    >
                      {user.login}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
        <div className="container">{repos?.map((repo: any) => repo.url)}</div>
      </div>
    </div>
  );
};

export default HomePage;
