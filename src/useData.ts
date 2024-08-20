import {useEffect, useState} from "react";
import {debounce} from "lodash";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {CityDataProps, WeatherDataProps} from "./types";
import {fetchCityData, fetchWeatherData} from "./api";

const useData = () => {
    const [recentSearch, setRecentSearch] = useState<Array<CityDataProps>>([])
    const [inputValue, setInputValue] = useState('')
    const queryClient = useQueryClient()

    const {data: weatherData, mutateAsync: fetchWeatherDataMutation} = useMutation({
        mutationFn: fetchWeatherData,
        onSuccess: (weatherData: WeatherDataProps) => {
            if (weatherData) {
                saverRecentSearch({name: weatherData.name, ...weatherData.coord})
            }
            queryClient.invalidateQueries({queryKey: ["weatherdata"]})
        }
    })


    const {mutateAsync: fetchCityDataMutation} = useMutation({
        mutationFn: fetchCityData,
        onSuccess: async (cityData) => {
            if (cityData.length > 0) {
                saverRecentSearch(cityData[0])
                await fetchWeatherDataMutation(cityData[0])
            } else {
                alert(`City ${inputValue} not found`)
            }
            await queryClient.invalidateQueries({queryKey: ["citydata"]})
        },
    })


    const getRecentSearch = () => {
        const prevRecentSearch = JSON.parse(String(localStorage.getItem('recentSearch')))
        setRecentSearch(prevRecentSearch)
    }

    const saverRecentSearch = (data: CityDataProps) => {
        const prevRecentSearch = JSON.parse(String(localStorage.getItem('recentSearch')))|| []
        const filteredPrevRecentSearch = [...prevRecentSearch].filter(item => item.name !== data.name).slice(0, 3)
        const newRecentSearch = [...filteredPrevRecentSearch, data]
        setRecentSearch(newRecentSearch)
        localStorage.setItem('recentSearch', JSON.stringify(newRecentSearch))
    }

    const handleSetInputValue = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }, 300)

    useEffect(() => {
        getRecentSearch()
    }, []);

    return {
        recentSearch,
        inputValue,
        handleSetInputValue,
        saverRecentSearch,
        weatherData,
        fetchCityDataMutation

    }
}

export default useData;
