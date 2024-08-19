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

    const getDataCityData = () => {
        //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
        //http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
    }

    useEffect(() => {
        getRecentSearch()
    }, []);

    return {
        recentSearch
    }
}

export default useData;
