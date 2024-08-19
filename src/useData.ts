import {useEffect, useState} from "react";
import {debounce} from "lodash";
import {CityDataProps} from "./App";

const useData = () => {
    const [recentSearch, setRecentSearch] = useState(Array<CityDataProps>)
    const [ inputValue, setInputValue] = useState('')


    const getRecentSearch = () => {
        const prevRecentSearch = JSON.parse(String(localStorage.getItem('recentSearch')))
        setRecentSearch(prevRecentSearch)
    }

    const saverRecentSearch = (data: CityDataProps) => {
        const prevRecentSearch = JSON.parse(String(localStorage.getItem('recentSearch')))
        const filteredPrevRecentSearch = [...prevRecentSearch].filter(item => item.name !== data.name).slice(0,4)
        const newRecentSearch = [...filteredPrevRecentSearch, data]
        setRecentSearch(newRecentSearch)
        localStorage.setItem('recentSearch', JSON.stringify(newRecentSearch))
    }

    const getDataCityData = () => {
        //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
        //http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
    }
    const handleSetInputValue = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    },300)

    useEffect(() => {
        getRecentSearch()
    }, []);

    return {
        recentSearch,
        inputValue,
        handleSetInputValue,
        saverRecentSearch,
    }
}

export default useData;
