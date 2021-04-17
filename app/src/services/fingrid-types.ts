export const fingridVariables = Object.freeze({
  // Forecasts
  consumptionForecast: "166",
  productionForecastTotal: "242",
  productionForecastWind: "245",
  productionForecastSolar: "248",

  // Real-time data
  consumptionTotal: "124",
  productionTotal: "74",
  productionNuclear: "188",
  productionHydro: "191",
  productionWind: "181",
})

export interface FingridDatapoint {
  value: number
  start_time: string
  end_time: string
}
