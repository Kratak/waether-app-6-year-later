
export interface CityDataProps {
    name: string;
    lon: number;
    lat: number
}



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
