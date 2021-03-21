import React from "react"

/**
 * Expected props for the CitySelection component
 */
export interface Props {
  /**
   * Currently selected city in App state
   */
  city: string
  /**
   * Callback function for when user selects a new city
   * @param newCity city name as string
   */
  onCityChange(newCity: string): void
}

/**
 * A reusable CitySelection component that gives users control over
 * which city is currently selected for data fetching.
 * @param props Props
 * @returns React element
 */
const CitySelection = (props: Props): JSX.Element => {
  const { city, onCityChange } = props

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    onCityChange(event.target.value)
  }

  return (
    <select name="city" defaultValue={city} onChange={handleChange}>
      <option value="tampere">Tampere</option>
      <option value="helsinki">Helsinki</option>
      <option value="jyväskylä">Jyväskylä</option>
    </select>
  )
}

export default CitySelection
