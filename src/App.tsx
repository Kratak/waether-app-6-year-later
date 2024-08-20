import React from 'react';
import './App.css';
import useData from "./useData";
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

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);


function App() {
    const {
        recentSearch,
        handleSetInputValue,
        fetchCityDataMutation,
        weatherData,
        inputValue} = useData();


    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center bg-gray-100 p-6 rounded">
                <h1 className="font-bold text-4xl mb-4">Weather app</h1>
                <div className="flex flex-col items-center mb-12">
                    <p className="font-bold text-xl mb-2">Search for your city</p>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                        type="search" onChange={handleSetInputValue}/>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={async () => {
                            await fetchCityDataMutation(inputValue)
                        }}
                    >
                        Search
                    </button>
                </div>
                {weatherData && <div className="flex flex-col items-center pt-6 pb-6">
                    <p className="text-lg font-bold pb-2">City: {weatherData.name}</p>
                    <p>Feels like temperature: {weatherData.main.feels_like}C</p>
                    <p>Temperature: {weatherData.main.temp}C</p>
                    <p>Minimal temperature: {weatherData.main.temp_min}C</p>
                    <p>Maximal temperature: {weatherData.main.temp_max}C</p>
                    <p>Atmospheric pressure: {weatherData.main.grnd_level}hPa</p>
                    <p className="pb-6">Humidity: {weatherData.main.humidity}%</p>
                    {weatherData.rain && <p>Rain fall 1h: {weatherData.rain["1h"]}mm</p>}
                    {weatherData.snow && <p>Snow fall 1h: {weatherData.snow["1h"]}mm</p>}
                    <Radar width={600} data={{
                        labels: ['Feels like temperature', 'Temperature', 'Minimal temperature', 'Maximal temperature'],
                        datasets: [
                            {
                                label: 'Temperatures',
                                data: [weatherData.main.feels_like, weatherData.main.temp, weatherData.main.temp_min, weatherData.main.temp_max],
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                            }
                        ],
                    }}/>
                </div>}
                <div className="flex flex-col items-center">
                    <h2 className="font-bold text-xl mb-2">Recent Search</h2>
                    <div className="flex flex-col-reverse items-center">
                        {recentSearch?.map(item =>
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
