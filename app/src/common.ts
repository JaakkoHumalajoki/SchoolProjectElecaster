export const calculateAverage = (values: number[]): number => {
  if (!values || values.length < 1) {
    return 0
  }
  const total = values.reduce((sum, value) => sum + value, 0)
  return total / values.length
}

export const calculateMinimum = (values: number[]): number => {
  if (!values || values.length < 1) {
    return 0
  }
  return values.reduce((min, value) => (value < min ? value : min), values[0])
}

export const calculateMaximum = (values: number[]): number => {
  if (!values || values.length < 1) {
    return 0
  }
  return values.reduce((max, value) => (value > max ? value : max), values[0])
}

export const emptyElectricityData: ElectricityData = {
  forecast: {
    production: {
      total: [],
      wind: [],
      solar: [],
    },
    consumption: {
      total: [],
    },
  },
  history: {
    production: {
      total: [],
      nuclear: [],
      hydro: [],
      wind: [],
    },
    consumption: {
      total: [],
    },
  },
}

export const emptyWeatherData: Pick<WeatherData, "forecast" | "history"> = {
  forecast: [],
  history: [],
}

export const commonOptions: Highcharts.Options = {
  chart: {
    height: "600px",
  },
  time: {
    useUTC: false,
  },
  navigator: {
    enabled: true,
    maskFill: "rgba(0, 82, 156, 0.3)",
    series: { color: "rgba(0, 82, 156, 0.3)" },
    adaptToUpdatedData: true,
    handles: {
      height: 25,
      width: 15,
    },
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    type: "datetime",
    crosshair: true,
  },
  tooltip: {
    valueDecimals: 1,
    shared: true,
  },
}
