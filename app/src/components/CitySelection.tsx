import React from "react"

const cityList: City[] = [
  { fmisid: 101533, name: "Alajärvi" },
  { fmisid: 101305, name: "Alavus" },
  { fmisid: 852678, name: "Espoo" },
  // { fmisid: 101695, name: "Haapavesi" },
  { fmisid: 100932, name: "Hanko" },
  { fmisid: 101196, name: "Heinola" },
  { fmisid: 100996, name: "Helsinki" },
  { fmisid: 101075, name: "Huittinen" },
  { fmisid: 101130, name: "Hyvinkää" },
  { fmisid: 101150, name: "Hämeenlinna" },
  { fmisid: 101277, name: "Ikaalinen" },
  { fmisid: 101460, name: "Joensuu" },
  { fmisid: 101352, name: "Jyväskylä" },
  { fmisid: 101338, name: "Jämsä" },
  { fmisid: 100934, name: "Kaarina" },
  { fmisid: 101742, name: "Kajaani" },
  { fmisid: 101685, name: "Kalajoki" },
  { fmisid: 101291, name: "Kankaanpää" },
  { fmisid: 101256, name: "Kaskinen" },
  { fmisid: 101289, name: "Kauhajoki" },
  { fmisid: 101503, name: "Kauhava" },
  { fmisid: 101846, name: "Kemi" },
  { fmisid: 101950, name: "Kemijärvi" },
  { fmisid: 101712, name: "Kiuruvesi" },
  { fmisid: 101068, name: "Kokemäki" },
  { fmisid: 101675, name: "Kokkola" },
  { fmisid: 101042, name: "Kotka" },
  { fmisid: 101194, name: "Kouvola" },
  // { fmisid: 101268, name: "Kristiinankaupunki" },
  { fmisid: 101771, name: "Kuhmo" },
  { fmisid: 101572, name: "Kuopio" },
  { fmisid: 101285, name: "Kurikka" },
  { fmisid: 101899, name: "Kuusamo" },
  { fmisid: 104796, name: "Lahti" },
  { fmisid: 101252, name: "Lappeenranta" },
  { fmisid: 101616, name: "Lieksa" },
  { fmisid: 100963, name: "Lohja" },
  { fmisid: 101039, name: "Loviisa" },
  { fmisid: 151029, name: "Maarianhamina" },
  { fmisid: 101410, name: "Mikkeli" },
  { fmisid: 101116, name: "Nokia" },
  { fmisid: 101763, name: "Nurmes" },
  { fmisid: 101799, name: "Oulu" },
  { fmisid: 101590, name: "Outokumpu" },
  // { fmisid: 100924, name: "Parainen" },
  // { fmisid: 101660, name: "Pietarsaari" },
  { fmisid: 101267, name: "Pori" },
  { fmisid: 101023, name: "Porvoo" },
  { fmisid: 101812, name: "Pudasjärvi" },
  { fmisid: 101706, name: "Pyhäjärvi" },
  { fmisid: 101785, name: "Raahe" },
  // { fmisid: 100965, name: "Raasepori" },
  { fmisid: 101061, name: "Rauma" },
  { fmisid: 101933, name: "Rovaniemi" },
  { fmisid: 100967, name: "Salo" },
  { fmisid: 101423, name: "Savonlinna" },
  { fmisid: 101486, name: "Seinäjoki" },
  { fmisid: 101128, name: "Somero" },
  { fmisid: 101578, name: "Suonenjoki" },
  { fmisid: 101124, name: "Tampere" },
  { fmisid: 101851, name: "Tornio" },
  { fmisid: 100949, name: "Turku" },
  { fmisid: 101049, name: "Uusikaupunki" },
  { fmisid: 101485, name: "Vaasa" },
  { fmisid: 100968, name: "Vantaa" },
  { fmisid: 101421, name: "Varkaus" },
  { fmisid: 101537, name: "Viitasaari" },
  { fmisid: 101310, name: "Virrat" },
  { fmisid: 101691, name: "Ylivieska" },
  { fmisid: 101520, name: "Ähtäri" },
  { fmisid: 101541, name: "Äänekoski" },
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
    <div className="card-sm flex space-x-4 justify-between items-center">
      <h3 className="text-lg font-bold">Select city</h3>
      <div>
        <select
          className="card-xs"
          name="city"
          defaultValue={city.name}
          onChange={handleChange}
        >
          {cityList.map((cityOption) => (
            <option key={cityOption.name} value={cityOption.name}>
              {cityOption.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CitySelection
