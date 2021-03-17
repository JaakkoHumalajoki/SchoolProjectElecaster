import axios, { AxiosResponse } from "axios"
import { TimeRange } from "../common"
import { FingridDatapoint } from "./fingrid-types"

export interface ElectricityDataPoint {
  /**
   * Time the point repsresents
   */
  time: Date
  /**
   * Value of electricity in megawatts
   */
  value: number
}

const formatFingridDate = (date: Date): string =>
  `${date.toISOString().slice(0, 19)}+0000`

export const fetchElectricityData = async (
  variable = 166, // Finland hourly consumption forecast
  timeRange: TimeRange
): Promise<ElectricityDataPoint[]> => {
  const response: AxiosResponse<FingridDatapoint[]> = await axios.get(
    `https://api.fingrid.fi/v1/variable/${variable}/events/json?` +
      `start_time=${encodeURIComponent(
        formatFingridDate(timeRange.startTime)
      )}&end_time=${encodeURIComponent(formatFingridDate(timeRange.endTime))}`,
    {
      headers: {
        "x-api-key": process.env.REACT_APP_FINGRID_API_KEY,
      },
    }
  )
  return response.data.map((item) => {
    return {
      time: new Date(item.start_time),
      value: item.value,
    }
  })
}
