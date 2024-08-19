import {useEffect, useState} from "react";

const useData = () => {
    const [recentSearch, setRecentSearch] = useState([''])

    const getRecentSearch = () => {
        // get from local storage
        setRecentSearch(["Warszawa"]);
    }

    const saverRecentSearch = () => {
        //save to local storage
    }

    useEffect(() => {
        getRecentSearch()
    }, []);

    return {
        recentSearch
    }
}

export default useData;
