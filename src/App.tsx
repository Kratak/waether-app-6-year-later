import React from 'react';
import './App.css';
import useData from "./useData";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export interface CityDataProps {
    name: string;
    lon: number;
    lat: number
}

export async function fetchCityData(cityName: string): Promise<
    Array<CityDataProps>
> {
    const response = await fetch(
        `${process.env.REACT_APP_GEO_API_URL}q=${cityName}&limit=5&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
    )

    return await response.json()
}

export async function fetchWeatherData(cityData: CityDataProps): Promise<
    Array<{}>
> {
    const response = await fetch(
        `${process.env.REACT_APP_WERATHER_API_URL}lat=${cityData.lat}&lon=${cityData.lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
    )

    return await response.json()
}


function App() {
    const {recentSearch, handleSetInputValue, saverRecentSearch, inputValue} = useData();
    const queryClient = useQueryClient()


    const {data: weatherData, mutateAsync: fetchWeatherDataMutation} = useMutation({
        mutationFn: fetchWeatherData,
        onSuccess: (cityData) => {
            if (cityData.length > 0) {
                saverRecentSearch(cityData[0] as CityDataProps)
            }
            queryClient.invalidateQueries({queryKey: ["citydata"]})
        }
    })


    const {data: cityData, mutateAsync: fetchCityDataMutation} = useMutation({
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

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center bg-gray-100 p-12 rounded">
                <h1 className="font-bold mb-2">Weather app</h1>
                <div className="mb-6">
                    <p className="pb-2 text-center">Search for your city</p>
                    <input className="mr-2" type="search" onChange={handleSetInputValue}/>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={async () => {
                            await fetchCityDataMutation(inputValue)
                        }}
                    >
                        Search
                    </button>
                </div>
                <div className="pt-6 pb-6">
                    data
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="pb-2">Recent Search</h2>
                    <div className="flex flex-col-reverse items-center">
                        {recentSearch.map(item =>
                            <button
                                key={item.name}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                                onClick={async () => {
                                    await fetchCityDataMutation(item.name)
                                }}
                            >
                                {item.name}
                            </button>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
