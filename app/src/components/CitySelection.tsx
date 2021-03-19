import React from "react"

interface Props {
  city: string
  onCityChange(newCity: string): void
}

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
