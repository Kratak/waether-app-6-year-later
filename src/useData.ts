import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {debounce} from "lodash";

const useData = () => {
    const [recentSearch, setRecentSearch] = useState([''])
    const [ inputValue, setInputValue] = useState('')
    const {isLoading, error, data, isFetching} = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            axios
                .get('https://api.github.com/repos/tannerlinsley/react-query')
                .then((res) => res.data),
    })

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
    const handleSetInputValue = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    },500)

    useEffect(() => {
        getRecentSearch()
    }, []);

    useEffect(() => {
        if(inputValue.length > 3){
            console.log('search')
        }
    }, [inputValue]);

    return {
        recentSearch,
        inputValue,
        handleSetInputValue
    }
}

export default useData;
