import {CityDataProps, WeatherDataProps} from "./types";

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
