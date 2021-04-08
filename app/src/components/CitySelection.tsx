import React from "react"

const cityList: City[] = [
  { id: 101533, name: "Alajärvi" },
  { id: 101305, name: "Alavus" },
  { id: 852678, name: "Espoo" },
  { id: 101695, name: "Haapavesi" },
  { id: 100932, name: "Hanko" },
  { id: 101196, name: "Heinola" },
  { id: 100996, name: "Helsinki" },
  { id: 101075, name: "Huittinen" },
  { id: 101130, name: "Hyvinkää" },
  { id: 101150, name: "Hämeenlinna" },
  { id: 101277, name: "Ikaalinen" },
  { id: 101460, name: "Joensuu" },
  { id: 101352, name: "Jyväskylä" },
  { id: 101338, name: "Jämsä" },
  { id: 100934, name: "Kaarina" },
  { id: 101742, name: "Kajaani" },
  { id: 101685, name: "Kalajoki" },
  { id: 101291, name: "Kankaanpää" },
  { id: 101256, name: "Kaskinen" },
  { id: 101289, name: "Kauhajoki" },
  { id: 101503, name: "Kauhava" },
  { id: 101846, name: "Kemi" },
  { id: 101950, name: "Kemijärvi" },
  { id: 101712, name: "Kiuruvesi" },
  { id: 101068, name: "Kokemäki" },
  { id: 101675, name: "Kokkola" },
  { id: 101042, name: "Kotka" },
  { id: 101194, name: "Kouvola" },
  { id: 101268, name: "Kristiinankaupunki" },
  { id: 101771, name: "Kuhmo" },
  { id: 101572, name: "Kuopio" },
  { id: 101285, name: "Kurikka" },
  { id: 101899, name: "Kuusamo" },
  { id: 104796, name: "Lahti" },
  { id: 101252, name: "Lappeenranta" },
  { id: 101616, name: "Lieksa" },
  { id: 100963, name: "Lohja" },
  { id: 101039, name: "Loviisa" },
  { id: 151029, name: "Maarianhamina" },
  { id: 101410, name: "Mikkeli" },
  { id: 101116, name: "Nokia" },
  { id: 101763, name: "Nurmes" },
  { id: 101799, name: "Oulu" },
  { id: 101590, name: "Outokumpu" },
  { id: 100924, name: "Parainen" },
  { id: 101660, name: "Pietarsaari" },
  { id: 101267, name: "Pori" },
  { id: 101023, name: "Porvoo" },
  { id: 101812, name: "Pudasjärvi" },
  { id: 101706, name: "Pyhäjärvi" },
  { id: 101785, name: "Raahe" },
  { id: 100965, name: "Raasepori" },
  { id: 101061, name: "Rauma" },
  { id: 101933, name: "Rovaniemi" },
  { id: 100967, name: "Salo" },
  { id: 101423, name: "Savonlinna" },
  { id: 101486, name: "Seinäjoki" },
  { id: 101128, name: "Somero" },
  { id: 101578, name: "Suonenjoki" },
  { id: 101124, name: "Tampere" },
  { id: 101851, name: "Tornio" },
  { id: 100949, name: "Turku" },
  { id: 101049, name: "Uusikaupunki" },
  { id: 101485, name: "Vaasa" },
  { id: 100968, name: "Vantaa" },
  { id: 101421, name: "Varkaus" },
  { id: 101537, name: "Viitasaari" },
  { id: 101310, name: "Virrat" },
  { id: 101691, name: "Ylivieska" },
  { id: 101520, name: "Ähtäri" },
  { id: 101541, name: "Äänekoski" },
]

/**
 * Expected props for the CitySelection component
 */
export interface Props {
  /**
   * Currently selected city in App state
   */
  city: City
  /**
   * Callback function for when user selects a new city
   * @param newCity selected City object
   */
  onCityChange(newCity: City): void
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
    const cityName = event.target.value
    const newCity = cityList.find((cityItem) => cityItem.name === cityName)
    if (newCity) {
      onCityChange(newCity)
    }
  }

  return (
    <select name="city" defaultValue={city.name} onChange={handleChange}>
      {cityList.map((cityOption) => (
        <option key={cityOption.name} value={cityOption.name}>
          {cityOption.name}
        </option>
      ))}
    </select>
  )
}

export default CitySelection
