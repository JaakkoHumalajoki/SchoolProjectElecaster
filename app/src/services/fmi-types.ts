// This file implements interface for https://www.ilmatieteenlaitos.fi/api/weather/forecasts?area=&place=Tampere
//
// Help for generating file like this one: https://quicktype.io

export interface FmiForecastResponse {
  municipalityCode: string
  observationStations: FmiObservationStations
  dayLengthValues: FmiDayLengthValue[]
  forecastValues: FmiForecastValue[]
  forecastDecimalValues: FmiForecastDecimalValue[]
  fractiles: FmiFractile[]
  symbolDescriptions: FmiSymbolDescription[]
  location: FmiLocation
  dayLength: FmiDayLength
  forecastModtime: FmiModtime
  fractilesModtime: FmiModtime
}

export interface FmiDayLength {
  sunrise: string
  sunset: string
  lengthofday: string
}

export interface FmiDayLengthValue {
  Sunrise: string
  Sunset: string
}

export interface FmiForecastDecimalValue {
  geoid: number
  name: string
  localtime: string
  modtime: string
  Temperature: number | null
}

export interface FmiModtime {
  modtime: string
}

export interface FmiForecastValue {
  geoid: number
  name: string
  localtz: string
  localtime: string
  modtime: string
  SmartSymbol: number | null
  Temperature: number | null
  FeelsLike: number | null
  WindSpeedMS: number | null
  WindDirection: number | null
  HourlyMaximumGust: number | null
  PoP: number | null
  Precipitation1h: number | null
}

export interface FmiFractile {
  geoid: number
  name: string
  localtz: string
  localtime: string
  modtime: string
  TemperatureF10: number
  TemperatureF25: number
  TemperatureF50: number
  TemperatureF75: number
  TemperatureF90: number
  TotalPrecipitationF90: number
  TotalPrecipitationF75: number
  TotalPrecipitationF50: number
  TotalPrecipitationF25: number
  TotalPrecipitationF10: number
}

export interface FmiLocation {
  place: string
  area: string
}

export interface FmiObservationStations {
  stationData: FmiStationDatum[]
  dropdownItems: FmiDropdownItem[]
}

export interface FmiDropdownItem {
  text: string
  value: number
}

export interface FmiStationDatum {
  id: number
  coordinates: FmiCoordinates
  "start-date": string
  names: FmiDescription[] | FmiNamesClass
  groups: string[] | FmiGroupsClass
  descriptions?: FmiDescriptions
  "visibility-maximum"?: FmiVisibilityMaximum
}

export interface FmiCoordinates {
  latitude: FmiItude
  longitude: FmiItude
  elevation: FmiVisibilityMaximum
}

export interface FmiVisibilityMaximum {
  text: number
  unit: string
}

export interface FmiItude {
  text: number
  crs: string
}

export interface FmiDescriptions {
  description: FmiDescription
}

export interface FmiDescription {
  text: string
  lang: FmiLang
}

export enum FmiLang {
  En = "en",
  Fi = "fi",
  Sv = "sv",
}

export interface FmiGroupsClass {
  group: string
}

export interface FmiNamesClass {
  name: FmiDescription
}

export interface FmiSymbolDescription {
  id: number
  text_fi: string
  text_en: string
  text_sv: string
}
