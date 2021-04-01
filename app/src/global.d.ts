declare global {
  /**
   * Interface for defining time ranges
   * application wide
   *
   * Start time should never be earlier than end time
   */
  export interface TimeRange {
    /**
     * Point of time range should start
     */
    startTime: Date
    /**
     * Point of time range should end
     */
    endTime: Date
  }

  /**
   * Inteface for a single data point in a list of weather data
   */
  export interface WeatherDataPoint {
    time: Date
    modifiedAt: Date
    temperature: number
    windSpeed?: number
    windDirection?: number
    description?: string
    precipitation1h?: number
  }

  /**
   * Inteface for weather data
   */
  export interface WeatherData {
    location: FmiLocation
    data: WeatherDataPoint[]
  }

  /**
   * Inteface for a single data point in a list of electricity data
   */
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
  /**
   * Interface defining data to be fetched for the
   * Electricitypage
   */
  export interface ElectricityData {
    forecast: {
      production: {
        /**
         * Total production in Finland
         */
        total: ElectricityDataPoint[]
        /**
         * Wind production forecast
         */
        wind: ElectricityDataPoint[]
        /**
         * Solar production forecast
         */
        solar: ElectricityDataPoint[]
      }
      consumption: {
        /**
         * Total consumption in Finland
         */
        total: ElectricityDataPoint[]
      }
    }
    history: {
      production: {
        /**
         * Total production in Finland
         */
        total: ElectricityDataPoint[]
        /**
         * Nuclear production history
         */
        nuclear: ElectricityDataPoint[]
        /**
         * Hydro production history
         */
        hydro: ElectricityDataPoint[]
        /**
         * Wind production history
         */
        wind: ElectricityDataPoint[]
      }
      consumption: {
        /**
         * Total consumption history in Finland
         */
        total: ElectricityDataPoint[]
      }
    }
  }
}

export {}
