import axios, { AxiosResponse } from "axios"
import { FmiForecastResponse, FmiLocation } from "./fmi-types"

const getForecastUrl = (city = "Tampere") =>
  `https://www.ilmatieteenlaitos.fi/api/weather/forecasts?area=&place=${city.toLowerCase()}`

const parseFmiDate = (rawdate: string): Date => {
  // Fmi date is formatted like this 20210316T020000
  // which is not ISO8601 compliant...
  const [date, clock] = rawdate.split("T")

  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6)

  const hours = clock.slice(0, 2)
  const minutes = clock.slice(2, 4)
  const seconds = clock.slice(4, 6)

  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`)
}

export interface WeatherDataPoint {
  time: Date
  modifiedAt: Date
  temperature: number | null
  windSpeed?: number
  windDirection?: number
  description?: string
  pericipation1h?: number
}

export interface WeatherData {
  location: FmiLocation
  data: WeatherDataPoint[]
}

const getWeatherData = async (city?: string): Promise<WeatherData> => {
  const response: AxiosResponse<FmiForecastResponse> = await axios.get(
    getForecastUrl(city)
  )
  const rawWeatherData = response.data

  const weatherData: WeatherData = {
    location: rawWeatherData.location,
    data: [],
  }

  weatherData.data = rawWeatherData.forecastValues.map(
    (item, index): WeatherDataPoint => {
      return {
        time: parseFmiDate(item.localtime),
        modifiedAt: parseFmiDate(item.modtime),
        temperature: rawWeatherData.forecastDecimalValues[index].Temperature,
        windSpeed: item.WindSpeedMS ?? undefined,
        windDirection: item.WindDirection ?? undefined,
        pericipation1h: item.Precipitation1h ?? undefined,
        // TODO: Parse rest of the optional fields
      }
    }
  )

  return weatherData
}

export default { getWeatherData }
