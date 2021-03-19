import React from "react"

interface Props {
  city: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCityChange(event: any): void
}

const CitySelection = (props: Props): JSX.Element => {
  const { city, onCityChange } = props

  return (
    <select name="city" defaultValue={city} onChange={onCityChange}>
      <option value="tampere">Tampere</option>
      <option value="helsinki">Helsinki</option>
      <option value="jyväskylä">Jyväskylä</option>
    </select>
  )
}

export default CitySelection
