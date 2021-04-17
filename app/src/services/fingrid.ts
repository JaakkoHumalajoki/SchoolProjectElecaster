import axios, { AxiosResponse } from "axios"
import { fingridVariables as fvars, FingridDatapoint } from "./fingrid-types"

const formatFingridDate = (date: Date): string =>
  `${date.toISOString().slice(0, 19)}+0000`

/**
 * @class ElectricityPageData holds all data related to the Electricity page
 * and handles all data fetching and caching
 * @implements ElectricityData
 * @method fetchAll refreshes all data with the current timerange
 * @method setTimeRange sets timerange to hold
 */
class ElectricityService implements ElectricityData {
  private electricityData: ElectricityData

  private timeRange: TimeRange

  /**
   * @param timerange {TimeRange} timerange to fetch data for
   */
  constructor(
    timerange: TimeRange = {
      startTime: new Date( // Last 7 days
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDay() - 7
      ),
      endTime: new Date( // Next 3
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDay() + 3
      ),
    }
  ) {
    this.timeRange = timerange
    this.electricityData = {} as ElectricityData
  }

  /**
   * Getter for forecsast data. Exposes class data read-only
   */
  public get forecast(): ElectricityData["forecast"] {
    return this.electricityData.forecast
  }

  /**
   * Getter for history data. Exposes class data read-only
   */
  public get history(): ElectricityData["history"] {
    return this.electricityData.history
  }

  /**
   * Fetches all fields from Fingrid api for the current timerange
   *
   * This method MUST be called before accessing the data!
   */
  public async fetch(): Promise<void> {
    const responseData: Array<ElectricityDataPoint[]> = await Promise.all([
      this.fetchElectricityData(fvars.consumptionForecast, this.timeRange), // 0
      this.fetchElectricityData(fvars.consumptionTotal, this.timeRange), // 1
      this.fetchElectricityData(fvars.productionForecastSolar, this.timeRange), // 2
      this.fetchElectricityData(fvars.productionForecastTotal, this.timeRange), // 3
      this.fetchElectricityData(fvars.productionForecastWind, this.timeRange), // 4
      this.fetchElectricityData(fvars.productionHydro, this.timeRange), // 5
      this.fetchElectricityData(fvars.productionNuclear, this.timeRange), // 6
      this.fetchElectricityData(fvars.productionTotal, this.timeRange), // 7
      this.fetchElectricityData(fvars.productionWind, this.timeRange), // 8
    ])

    this.electricityData = {
      forecast: {
        production: {
          total: responseData[3],
          wind: responseData[4],
          solar: responseData[2],
        },
        consumption: {
          total: responseData[0],
        },
      },
      history: {
        consumption: {
          total: responseData[1],
        },
        production: {
          total: responseData[7],
          hydro: responseData[5],
          nuclear: responseData[6],
          wind: responseData[8],
        },
      },
    }
  }

  /**
   * Set current time range to return from the class
   * @param {TimeRange} timeRange
   */
  public setTimeRange(timeRange: TimeRange): void {
    this.timeRange = timeRange
  } // eslint-disable-next-line import/prefer-default-export

  private fetchElectricityData = async (
    variable: string,
    timeRange: TimeRange
  ): Promise<ElectricityDataPoint[]> => {
    const response: AxiosResponse<FingridDatapoint[]> = await axios.get(
      `https://api.fingrid.fi/v1/variable/${variable}/events/json?` +
        `start_time=${encodeURIComponent(
          formatFingridDate(timeRange.startTime)
        )}&end_time=${encodeURIComponent(
          formatFingridDate(timeRange.endTime)
        )}`,
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
}

export default ElectricityService
