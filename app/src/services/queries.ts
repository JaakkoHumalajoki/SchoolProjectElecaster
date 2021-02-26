// Here would be queries that we could use in frontend.
// Idea is that these queries collects the data from different endpoints

export interface WeatherData {
  data: string
}

export const getWeatherData = (): WeatherData => {
  // Calls FMI endpoints and parses them
  return { data: "dataa" }
}

export interface ElectricityData {
  data: string
  megawatts: number
}

export const getElectricityData = (): ElectricityData => {
  // Calls Findgird endpoints and parses them
  return { data: "dataa", megawatts: 10 }
}
