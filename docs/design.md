# Design dokumentti - 0xc0ff3e

Ratkaisumme kurssin määrittelemään tehtävään on kirjoittaa React-pohjainen web-sovellus, joka hakee datan suoraan tietolähteiden API:sta ajon aikaisesti. Hyödynnämme projektissa moderneja teknologioita sekä työkaluja. Projektin kielenä toimii TypeScript.

Modernin web-ohjelmoinnin tarjoamat menetelmät ja rajapinnat sopivat täydellisesti kurssin projektin toteuttamiseksi. Molemmat APIt ovat myös itsessään web-sovelluksia, joten web-sovelluksen tekeminen on luonnollinen ratkaisu.

Typescriptin tarjoama vahva tyypitys ja Reactin tapa erotella komponentin funktionaalisiksi kokonaisuuksiksi täyttää kurssilla esitellyt modulaarisuuden ja OOP-mallin vaatimukset jaotella koodia. Näin tiimityöskentely helpottuu ja projektia on myös helppo laajentaa tulevaisuudessa.

## Prototyypit

Alla linkit Figmassa toteutettuihin prototyyppeihin sovelluksen työpöytä- ja mobiiliversioista

- [Työpöytäversio](https://www.figma.com/proto/hUkQpST2beG7YZ00qm2K2q/Prototype?node-id=57%3A158&scaling=scale-down)
- [Mobiiliversio](https://www.figma.com/proto/hUkQpST2beG7YZ00qm2K2q/Prototype?node-id=20%3A933&scaling=scale-down)

## Korkean tason määrittely

Applikaatio rakentuu yhdestä pääkomponentista nimeltä `App`, joka puolestaan koostuu kolmesta alakomponentista `Header`, `Content` ja `Footer`. Näistä `Header` ja `Footer` ovat navigaatiota sekä, käyttäjän informointia varten ja pysyvät staattisina. `Content` komponentin sisältö muuttuu kulloisenkin näkymän mukaan. `Content` pitää hallussaan kulloinkin käsiteltävää dataa. `Content`-komponentin sisällä elää erilaisia `Card`-komponentteja, visualisoidaan ja kontroilloidaan näytettävää dataa käyttäjälle.

- App
    - Header
    - Content
         - *Card 1*
         - *Card 2*
         - *Card 3*
         - ...
    - Footer

## Rajapinnat ja palvelut

Tulemme kirjoittamaan kaksi palvelua, `fmiService` ja `fingridService`, jotka vastaavat datan noutamisesta ja parsimisesta. Komponentti `Content` käyttää näiden palvelujen tarjoamia rajapintoja kullosenkin näkymän mukaan. 

## Kolmannen osapuolen kirjastot ja työkalut

Alla on listattu kirjastoja ja työkaluja, joita olemme suunnitelleet käytettäväksi projektin toteutukseen.

- [React](https://reactjs.org/)
    - Koko applikaation "aivot"
    - Hallitsee koko käyttölittymää
- [React router](https://reactrouter.com/)
    - Helpottaa käyttäjän navigointia käyttöliittymässä
    - Pitää URLn synkronoituna näkymän kanssa
- [Highcharts](https://www.npmjs.com/package/highcharts-react-official)
    - Datan visualisointi ja filtteröinti
    - Interaktiivinen
    - "Make your data come alive"
- [Tailwind CSS](https://tailwindcss.com/) (tai [MUI](https://material-ui.com/))
    - Visuaalinen ilme
    - Käyttöliittymän asettelu ja skaalaus
    - Responsiivisuus (mobiilinäkymä)
- [Axios](https://github.com/axios/axios)
    - Datan noutaminen ja parsiminen
- Gitlab
    - Projektinhallinta
    - CI/CD



