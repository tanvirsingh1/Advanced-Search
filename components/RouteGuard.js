import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { searchHistoryAtom } from "@/store";
import { getFavourites } from "@/lib/userData";
import { getHistory } from "@/lib/userData";
import { isAuthenticated } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { useEffect ,useState} from "react";
const PUBLIC_PATHS = ['/register','/login' ,'/', '/_error'];
export default function RouteGuard(props) {
    const router = useRouter();
   
    const[, setFavouritesList] = useAtom(favouritesAtom)
    const[, setSearchHistory] = useAtom(searchHistoryAtom)
    const [authorized, setAuthorized] = useState(false);


    async function updateAtoms(){
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
       }
       useEffect(() => {
        updateAtoms();
        // on initial load - run auth check
        authCheck(router.pathname);
    
        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);
    
        // unsubscribe from events in useEffect return function
        return () => {
          router.events.off('routeChangeComplete', authCheck);
        };
      }, []);


      function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
          setAuthorized(false);
          router.push('/login');
        } else {
          setAuthorized(true);
        }
      }

    return (
      <>
        {authorized && props.children}
      </>
    )
  }