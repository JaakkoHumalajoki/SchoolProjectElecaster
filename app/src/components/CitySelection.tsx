import React from "react"

const cityList: string[] = [
  "Akaa",
  "Alajärvi",
  "Alavus",
  "Espoo",
  "Forssa",
  "Haapajärvi",
  "Haapavesi",
  "Hamina",
  "Hanko",
  "Harjavalta",
  "Heinola",
  "Helsinki",
  "Huittinen",
  "Hyvinkää",
  "Hämeenlinna",
  "Iisalmi",
  "Ikaalinen",
  "Imatra",
  "Joensuu",
  "Jyväskylä",
  "Jämsä",
  "Järvenpää",
  "Kaarina",
  "Kajaani",
  "Kalajoki",
  "Kangasala",
  "Kankaanpää",
  "Kannus",
  "Karkkila",
  "Kaskinen",
  "Kauhajoki",
  "Kauhava",
  "Kauniainen",
  "Kemi",
  "Kemijärvi",
  "Kerava",
  "Keuruu",
  "Kitee",
  "Kiuruvesi",
  "Kokemäki",
  "Kokkola",
  "Kotka",
  "Kouvola",
  "Kristiinankaupunki",
  "Kuhmo",
  "Kuopio",
  "Kurikka",
  "Kuusamo",
  "Lahti",
  "Laitila",
  "Lappeenranta",
  "Lapua",
  "Lieksa",
  "Lohja",
  "Loimaa",
  "Loviisa",
  "Maarianhamina",
  "Mikkeli",
  "Mänttä-Vilppula",
  "Naantali",
  "Nivala",
  "Nokia",
  "Nurmes",
  "Närpiö",
  "Orimattila",
  "Orivesi",
  "Oulainen",
  "Oulu",
  "Outokumpu",
  "Paimio",
  "Parainen",
  "Parkano",
  "Pieksämäki",
  "Pietarsaari",
  "Pori",
  "Porvoo",
  "Pudasjärvi",
  "Pyhäjärvi",
  "Raahe",
  "Raasepori",
  "Raisio",
  "Rauma",
  "Riihimäki",
  "Rovaniemi",
  "Saarijärvi",
  "Salo",
  "Sastamala",
  "Savonlinna",
  "Seinäjoki",
  "Somero",
  "Suonenjoki",
  "Tampere",
  "Tornio",
  "Turku",
  "Ulvila",
  "Uusikaarlepyy",
  "Uusikaupunki",
  "Vaasa",
  "Valkeakoski",
  "Vantaa",
  "Varkaus",
  "Viitasaari",
  "Virrat",
  "Ylivieska",
  "Ylöjärvi",
  "Ähtäri",
  "Äänekoski",
]

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
      {cityList.map((cityOption) => (
        <option key={cityOption} value={cityOption}>
          {cityOption}
        </option>
      ))}
    </select>
  )
}

export default CitySelection
