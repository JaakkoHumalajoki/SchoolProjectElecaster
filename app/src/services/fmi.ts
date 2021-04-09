import axios, { AxiosResponse } from "axios"
import * as xpath from "xpath"
import { DOMParser } from "xmldom"
import { FmiForecastResponse } from "./fmi-types"

/**
 * @class WeatherService handles all data related to weather
 * @implements WeatherData
 * @method fetch refreshes all data within the current timerange and city
 * @property timerange {TimeRange}
 */
class WeatherService implements WeatherData {
  /**
   * City that the service currently represents
   */
  public city: City

  /**
   * Timerange that the service currently represents
   */
  private historyTimeRange: TimeRange

  /**
   * Internal container for storing the weatherdata
   */
  private weatherData: WeatherData

  /**
   * Parser to be used for paring XML responses from FMI
   */
  private readonly domParser = new DOMParser()

  /**
   * @param city {City} City interface to fetch data for
   * @param timerange {TimeRange} timerange to fetch data for
   */
  constructor(
    city: City,
    timeRange: TimeRange = {
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
    this.city = city

    this.weatherData = {} as WeatherData
    this.historyTimeRange = timeRange
  }

  /**
   * Getter for history data. Exposes class data read-only
   */
  get history(): WeatherData["history"] {
    return this.weatherData.history
  }

  /**
   * Getter for forecast data. Exposes class data read-only
   */
  get forecast(): WeatherData["forecast"] {
    return this.weatherData.forecast
  }

  /**
   * Convert Date to FMI compatible string
   */
  private dateToFmiString = (date: Date): string =>
    date.toISOString().replace(/.\d+Z$/g, "Z")

  /**
   * Return forecast URL for current City
   */
  private getForecastUrl = (city: City): string =>
    `https://www.ilmatieteenlaitos.fi/api/weather/forecasts?area=&place=${city.name.toLowerCase()}`

  /**
   * Return history URL for current city and timerange
   * @param timeRange timerange to bo set for the URL
   */
  private getHistoryUrl(timeRange: TimeRange): string {
    return (
      `https://opendata.fmi.fi/wfs?request=getFeature&version=2.0.0&storedquery_id=fmi::observations::weather::multipointcoverage&parameters=t2m,wd_10min,ws_10min,r_1h&timestep=60` +
      `&starttime=${this.dateToFmiString(
        timeRange.startTime
      )}&endtime=${this.dateToFmiString(timeRange.endTime)}&${
        this.city.fmisid
          ? `fmisid=${this.city.fmisid}`
          : `place=${this.city.name}`
      }`
    )
  }

  /**
   * Set the timerange for the class to represent
   * @param timerange {TimeRange} timerange to fetch data for
   */
  public set timeRange(timeRange: TimeRange) {
    if (timeRange.startTime > timeRange.endTime)
      throw new Error("End time cannot be before start time")

    this.historyTimeRange = timeRange
  }

  /**
   * Timerange that the service currently represents
   */
  public get timeRange(): TimeRange {
    return this.historyTimeRange
  }

  /**
   * Fetches all fields from Fingrid api for the current timerange
   *
   * This method MUST be called before accessing the data!
   */
  public async fetch(): Promise<void> {
    await Promise.allSettled([
      this.updateForecastData(),
      this.updateHistoryData(),
    ])
  }

  /**
   * Refreshes historydata
   */
  private async updateHistoryData(): Promise<void> {
    const historyUrls = await this.generateHistoryUrls()

    const requestPromises = historyUrls.map((url: string) => axios.get(url))

    const requests = await Promise.all(requestPromises)

    this.weatherData.history = []

    requests.forEach((request) => {
      const dataPoints = this.parseXMLResponse(request.data)
      this.weatherData.history = this.weatherData.history?.concat(dataPoints)
    })
  }

  /** Generates list of history URLs to be fetched for the current
   * timerange
   */
  private async generateHistoryUrls(): Promise<string[]> {
    const timeHolder: TimeRange = {
      startTime: new Date(this.historyTimeRange.startTime),
      endTime: new Date(this.historyTimeRange.startTime),
    }
    timeHolder.endTime.setDate(timeHolder.startTime.getDate() + 7)

    const historyUrls: string[] = []
    while (timeHolder.endTime < this.historyTimeRange.endTime) {
      historyUrls.push(this.getHistoryUrl(timeHolder))

      timeHolder.startTime.setDate(timeHolder.startTime.getDate() + 7)
      timeHolder.endTime.setDate(timeHolder.endTime.getDate() + 7)
    }

    // Fetch the last part left, which is only partial week
    historyUrls.push(
      this.getHistoryUrl({
        startTime: timeHolder.startTime,
        endTime: this.historyTimeRange.endTime,
      })
    )

    return historyUrls
  }

  /**
   * Refreshes forecastdata
   */
  private async updateForecastData(): Promise<void> {
    const response: AxiosResponse<FmiForecastResponse> = await axios.get(
      this.getForecastUrl(this.city)
    )
    const rawWeatherData = response.data

    const descriptions: { [key: number]: string } = {}
    rawWeatherData.symbolDescriptions.forEach((description) => {
      descriptions[description.id] = description.text_en
    })

    this.weatherData.forecast = rawWeatherData.forecastValues
      .filter(
        (_value, index) =>
          // Ensure there are no null value temperatures
          rawWeatherData.forecastDecimalValues[index].Temperature !== null
      )
      .map(
        (item, index): WeatherDataPoint => {
          return {
            time: this.parseFmiDate(item.localtime),
            modifiedAt: this.parseFmiDate(item.modtime),
            // Null values are filtered out above
            temperature: rawWeatherData.forecastDecimalValues[index]
              .Temperature as number,
            windSpeed: item.WindSpeedMS ?? undefined,
            windDirection: item.WindDirection ?? undefined,
            precipitation1h: item.Precipitation1h ?? undefined,
            description: item.SmartSymbol
              ? descriptions[item.SmartSymbol]
              : undefined,
          }
        }
      )
  }

  /**
   * Parse XML response from fmi multipointcoverage
   * @param rawXml xml document from FMI
   * @returns WeatherDataPoint[] parsed weatherdatapoints
   */
  private parseXMLResponse(rawXml: string): WeatherDataPoint[] {
    const geoXml: Document = this.domParser.parseFromString(rawXml)

    const selectGmlcov: xpath.XPathSelect = xpath.useNamespaces({
      gmlcov: "http://www.opengis.net/gmlcov/1.0",
    })
    const selectGml: xpath.XPathSelect = xpath.useNamespaces({
      gml: "http://www.opengis.net/gml/3.2",
    })

    // Forcing no any type is not very convenient as the
    // FMI data is not structured properly, it's just two fields
    /* eslint-disable @typescript-eslint/no-explicit-any */

    const dateValues: string = (selectGmlcov(
      "//gmlcov:positions/text()",
      geoXml
    )[0] as any).nodeValue
    const datapoints: string = (selectGml(
      "//gml:doubleOrNilReasonTupleList/text()",
      geoXml
    )[0] as any).nodeValue

    const dateValuesParsed: Date[] = dateValues
      .split("\n")
      .filter((value: any) => value !== "")
      .map((value: any) => value.trim().split(" ")[3])
      .map((value: any) => new Date(Number(value) * 1000))

    const datapointsParsed: Array<string[]> = datapoints
      .split("\n")
      .filter((value: any) => value !== "")
      .map((value: string) => {
        return value.trim().split(" ")
      })

    if (datapointsParsed.length !== dateValuesParsed.length)
      throw new Error("Error parsing FMI historydata")

    /* eslint-enable @typescript-eslint/no-explicit-any */

    return dateValuesParsed
      .map(
        (date: Date, index: number): WeatherDataPoint => {
          const temp = Number(datapointsParsed[index][0])
          const windDir = Number(datapointsParsed[index][1])
          const windSpeed = Number(datapointsParsed[index][2])
          const rain = Number(datapointsParsed[index][3])
          return {
            time: date,
            temperature: temp,
            windDirection: !Number.isNaN(windDir) ? windDir : undefined,
            windSpeed: !Number.isNaN(windSpeed) ? windSpeed : undefined,
            precipitation1h: !Number.isNaN(rain) ? rain : undefined,
          }
        }
      )
      .filter(
        (value) =>
          this.isValidDate(value.time) && !Number.isNaN(value.temperature)
      )
  }

  private isValidDate = (d: Date): boolean => {
    return d instanceof Date && !Number.isNaN(d.getTime())
  }

  private parseFmiDate = (rawDate: string): Date => {
    // Fmi date is formatted like this 20210316T020000
    // which is not ISO8601 compliant...
    const [date, clock] = rawDate.split("T")

    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6)

    const hours = clock.slice(0, 2)
    const minutes = clock.slice(2, 4)
    const seconds = clock.slice(4, 6)

    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`)
  }
}

export default WeatherService
