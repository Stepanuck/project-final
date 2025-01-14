import {  useEffect } from "react";
import { useLocation } from "react-router-dom";
import RandomManga from "./RandomManga";
import { ListPopularManga } from "./ListPopularManga";
import { SearchManga } from "./SearchManga";

export function Main({ search, setSearch }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setSearch('');
    }
  }, [location, setSearch]);

  return (
    <>
      {!search ? (
        <>
          <RandomManga />
          <ListPopularManga />
        </>
      ) : (
        <SearchManga search={search} />
      )}
    </>
  );
}
