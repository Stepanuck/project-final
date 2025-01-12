import RandomManga from "./RandomManga";
import {ListPopularManga} from "./ListPopularManga";
import { SearchManga } from "./SearchManga";


export function Main({search}) {
    return (
        <>
        <RandomManga/>
        <ListPopularManga/>
        {search && <SearchManga search={search}/>}
        </>
        );
        }
