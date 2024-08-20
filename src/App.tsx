import React from 'react';
import './App.css';
import useData from "./useData";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Radar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

export interface CityDataProps {
    name: string;
    lon: number;
    lat: number
}

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);


export interface WeatherDataProps {
    "coord": {
        "lon": number;
        "lat": number
    };
    "weather": [
        {
            "id": number;
            "main": string;
            "description": string;
            "icon": string;
        }
    ];
    "base": string;
    "main": {
        "temp": number;
        "feels_like": number;
        "temp_min": number;
        "temp_max": number;
        "pressure": number;
        "humidity": number;
        "sea_level": number;
        "grnd_level": number;
    };
    rain: {
        "1h": number;
        "3h": number;
    };
    snow: {
        "1h": number;
        "3h": number;
    };
    cloud: {
        all: number;
    };
    "visibility": number;
    "wind": {
        "speed": number;
        "deg": number;
        "gust": number;
    };
    "clouds": {
        "all": number;
    };
    "dt": number;
    "sys": {
        "type": number;
        "id": number;
        "country": string;
        "sunrise": number;
        "sunset": number;
    };
    "timezone": number;
    "id": number;
    "name": string;
    "cod": number;
}

export async function fetchCityData(cityName: string): Promise<
    Array<CityDataProps>
> {
    const response = await fetch(
        `${process.env.REACT_APP_GEO_API_URL}q=${cityName}&limit=5&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
    )

    return await response.json()
}

export async function fetchWeatherData(cityData: CityDataProps): Promise<WeatherDataProps> {
    const response = await fetch(
        `${process.env.REACT_APP_WERATHER_API_URL}lat=${cityData.lat}&lon=${cityData.lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`,
    )

    return await response.json()
}


function App() {
    const {recentSearch, handleSetInputValue, saverRecentSearch, inputValue} = useData();
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


    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center bg-gray-100 p-6 rounded">
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
                {weatherData && <div className="pt-6 pb-6">
                    <p>Feels like temperature: {weatherData.main.feels_like}C</p>
                    <p>Temperature: {weatherData.main.temp}C</p>
                    <p>Minimal temperature: {weatherData.main.temp_min}C</p>
                    <p>Maximal temperature: {weatherData.main.temp_max}C</p>
                    <p>Atmospheric pressure: {weatherData.main.grnd_level}hPa</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <Radar width={600} data={{
                        labels: ['Feels like temperature', 'Temperature', 'Minimal temperature', 'Maximal temperature'],
                        datasets: [
                            {
                                label: 'Temperatures',
                                data: [weatherData.main.feels_like, weatherData.main.temp, weatherData.main.temp_min, weatherData.main.temp_max],
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                            },
                        ],
                    }}/>
                </div>}
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
