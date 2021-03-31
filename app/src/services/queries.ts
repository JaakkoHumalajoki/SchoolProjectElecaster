// Here would be queries that we could use in frontend.
// Idea is that these queries collects the data from different endpoints
import { fetchElectricityData } from "./fingrid"
import { fingridVariables as fvars } from "./fingrid-types"

/**
 * @class ElectricityPageData holds all data related to the Electricity page
 * and handles all data fetching and caching
 * @implements ElectricityPageDataInterface
 * @method fetchAll refreshes all data with the current timerange
 * @method setTimeRange sets timerange to hold
 */

// eslint-disable-next-line import/prefer-default-export
export class ElectricityPageData implements ElectricityPageDataInterface {
  private electricityData: ElectricityPageDataInterface

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
    this.electricityData = {} as ElectricityPageDataInterface
  }

  /**
   * Getter for forecsast data. Exposes class data read-only
   */
  public get forecast(): ElectricityPageDataInterface["forecast"] {
    return this.electricityData.forecast
  }

  /**
   * Getter for history data. Exposes class data read-only
   */
  public get history(): ElectricityPageDataInterface["history"] {
    return this.electricityData.history
  }

  /**
   * Fetches all fields from Fingrid api for the current timerange
   *
   * This method MUST be called before accessing the data!
   */
  public async fetch(): Promise<void> {
    const responseData: Array<ElectricityDataPoint[]> = await Promise.all([
      fetchElectricityData(fvars.consumptionForecast, this.timeRange), // 0
      fetchElectricityData(fvars.consumptionTotal, this.timeRange), // 1
      fetchElectricityData(fvars.productionForecastSolar, this.timeRange), // 2
      fetchElectricityData(fvars.productionForecastTotal, this.timeRange), // 3
      fetchElectricityData(fvars.productionForecastWind, this.timeRange), // 4
      fetchElectricityData(fvars.productionHydro, this.timeRange), // 5
      fetchElectricityData(fvars.productionNuclear, this.timeRange), // 6
      fetchElectricityData(fvars.productionTotal, this.timeRange), // 7
      fetchElectricityData(fvars.productionWind, this.timeRange), // 8
    ])

    this.electricityData = {
      forecast: {
        production: {
          total: responseData[3],
          wind: responseData[4],
          solar: responseData[2],
        },
        consumption: {
          total: responseData[1],
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
  }
}

// export const getElectricityData = (): ElectricityData => {
//   // Calls Findgird endpoints and parses them
//   return { data: "dataa", megawatts: 10 }
// }
