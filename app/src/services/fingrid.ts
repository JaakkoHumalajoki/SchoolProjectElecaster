import axios, { AxiosResponse } from "axios"

import { FingridDatapoint } from "./fingrid-types"

export interface EletricityDataPoint {
  time: Date
  value: number
}
export interface EletricityData {
  data: FingridDatapoint[]
}

const formatFingridDate = (date: Date): string =>
  `${date.toISOString().slice(0, 19)}+0000`

const getElectricityData = async (
  variable = 166, // Finland hourly consumption forecast
  startTime: Date = new Date(),
  endTime: Date = new Date( // Next 10 days
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDay() + 10
  )
): Promise<EletricityData> => {
  const response: AxiosResponse<FingridDatapoint[]> = await axios.get(
    `https://api.fingrid.fi/v1/variable/${variable}/events/json?` +
      `start_time=${encodeURIComponent(
        formatFingridDate(startTime)
      )}&end_time=${encodeURIComponent(formatFingridDate(endTime))}`,
    {
      headers: {
        "x-api-key": process.env.REACT_APP_FINGRID_API_KEY,
      },
    }
  )
  return { data: response.data }
}

export default { getElectricityData }
