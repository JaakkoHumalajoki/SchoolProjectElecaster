export const variables = Object.freeze({
  // Forecasts
  consumptionForecast: 166,
  productionForecastWind: 245,
  productionForecastSolar: 248,

  // Real-time data
  productionNuclear: 188,
  productionHydro: 191,
  productionWind: 181,
})

export interface FingridDatapoint {
  value: number
  start_time: string
  end_time: string
}
