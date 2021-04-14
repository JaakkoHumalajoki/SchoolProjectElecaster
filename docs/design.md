# Design dokumentti - 0xc0ff3e

## Sisällysluettelo

[Prototyypit](#prototyppit)

[Arkkitehtuuri](#Arkkitehtuuri)

- [Web sovelluksen toimintaperiaate](#web-sovelluksen-toimintaperiaate)
- [Sovelluksen kansiorakenne](#sovelluksen-kansiorakenne)
- [Sovelluksen UI:n rakenne](#sovelluksen-UIn-rakenne)
- [Sovelluksen koodin kansiorakenne](#sovelluksen-koodin-kansiorakenne)
- [Sovelluksen "Big Picture" ja design ratkaisut](#sovelluksen-"big-picture"-ja-design-ratkaisut)

Ratkaisumme kurssin määrittelemään tehtävään on kirjoittaa React-pohjainen web-sovellus, joka hakee datan suoraan tietolähteiden API:sta ajon aikaisesti. Hyödynnämme projektissa moderneja teknologioita sekä työkaluja. Projektin kielenä toimii TypeScript.

Modernin web-ohjelmoinnin tarjoamat menetelmät ja rajapinnat sopivat täydellisesti kurssin projektin toteuttamiseksi. Molemmat APIt ovat myös itsessään web-sovelluksia, joten web-sovelluksen tekeminen on luonnollinen ratkaisu.

Typescriptin tarjoama vahva tyypitys ja Reactin tapa erotella komponentin funktionaalisiksi kokonaisuuksiksi täyttää kurssilla esitellyt modulaarisuuden ja OOP-mallin vaatimukset jaotella koodia. Näin tiimityöskentely helpottuu ja projektia on myös helppo laajentaa tulevaisuudessa.

## Prototyypit

Alla linkit Figmassa toteutettuihin prototyyppeihin sovelluksen työpöytä- ja mobiiliversioista

- [Työpöytäversio](https://www.figma.com/proto/hUkQpST2beG7YZ00qm2K2q/Prototype?node-id=57%3A158&scaling=scale-down)
- [Mobiiliversio](https://www.figma.com/proto/hUkQpST2beG7YZ00qm2K2q/Prototype?node-id=20%3A933&scaling=scale-down)

## Arkkitehtuuri

Arkkitehtuuri oli pitkälti suunniteltu etukäteen. Tämä oli mahdollista kokemuksen ansioista, joka oli jo olemassa Reactilla suunnitelluista web sovellukisista. Pienessä sovelluksessa voi ennalta tiedostaa sopivan rakenteen, toisin kuin suuremmassa sovelluksessa. Myös teknologiavalinnoilla on ansionsa projektin yksinkertaisuuteen. Reactia käytettäessä käyttöliittymän tekeminen on suhteellisen helppoa. Näin ollen logiikka ja ohjelmointityö, mitä vaaditaan käyttöliittymän suunnittelluun on verrattain pientä, verrattuna esimerkiksi C++:aan Qt:lla. React antaa viitekehyksen, jonka käyttäminen välttää monet kompastuskivet, kuten datan tilaan liittyvät asiat käyttöliittymän kannalta. Reactin komponenttiajattelu kannustaa myös modulaariseen ajatteluun, vaikka ei se takaa vielä modulaarisuutta. Vielä yksi syy yksinkertaiseen arkkitehtuuriin on valmiiden kirjastojen käyttäminen, joita Reactin ja web ekosysteemin ansioista on olemassa. Näistä esimerkkinä mainittakoon Highcharts, joka tarjosi yksinkertaisen sisäisen rajapinnan kuvaajien tekemiseksi. Tarkemmat tiedot kolmannen osapuolien kirjastoista löytyvät [alempaa](#kolmannen-osapuolen-kirjastot-ja-työkalut).

### Web sovelluksen toimintaperiaate

Kuten aluksi mainittiin, sovellus hakee ajon aikana datan API:sta, ja näin ollen minkäänlaiselle backendille ei ole tarvetta. Tiedostimme, että mikäli on tarvetta tallentaa jotain tietoa myöhemmässä vaiheessa, voidaan siihen käyttää selaimen välimuistia. Mikäli web sovellukset ovat tuntemattomia, seuraava kuvaaja auttaa hahmottamaan, kuinka tämä sovellus käytännössä toimii.

![Web sovelluksen toimintaperiaate](./web-sovelluksen-perusteet.png)

Ensiksi Netlifyn serveri (kutsutaan hostiksi) lähettää sovelluksen tietokoneellesi, jonka selain ajaa tietopaketin tultua perille. Teknisesti sanottuna olemme toteuttaneet sovelluksemme SPA (Single page app) tyylisesti, eli perinteiseen web kehitykseen verrattuna lähetetään vain yksi HTML tiedosto, jonka jälkeen JavaScript (JS), muokkaa näkymää. Perinteisesti selaimen vaihtaessa osoitetta URI kentässä, ollaan haettu uusi HTML tiedosto, jossa on ollut uudet näkymään liittyvät tiedot. SPA sovelluksessa näkymä vaihtuu käyttäjän suorittaessa toimintoja, mutta uutta kutsua ei tehdä, ellei haluta näyttää dynaamista sisältö käyttäjälle erikseen. Tässä sovelluksessa dynaamista sisältöä on FMI:n ja Fingridin tarjoama data, jota visualisoidaan kuvaajina näytöllä.

### Sovelluksen kansiorakenne

App kansiosta löytyy sovellus kokonaisuudessaan sisältäen kaiken konfiguraation sun muut asiat, mitkä liittyvät sovelluksen kehitykseen. Alla selitettynä kansiorakenne. Sovelluksen pohja on luotu [Create React Appin](https://create-react-app.dev/) avulla ja siitä on lähetty laajentamaan.

```
├── public # Tärkein tiedosto on index.html, joka on se ainut html tiedosto, mikä lähetetään SPA sovellusta tehdessä.
├── src # Sovelluksen koodi. Tästä lisää alempana
├── .eslintignore # Vertaa .gitignore. Sama asia staattiselle tarkastusohjelmalle
├── .eslintrc # Staattisen tarkastusohjelman konfiguraatio
├── .prettierignore # Vertaa .gitignore. Sama asia formatointiohjelmalle
├── .prettierrc # Koodin formatointiohjelma.
├── craco.config.js # Konfiguraatiohelvetin yksi palasista. Lisää kustomointimahdollisuuksia CRA:lle.
├── package-lock.json # Sovelluksen kirjastojen riippuvuksien tarkat versiot ja riippuvuudet.
├── package.json # Projektin tärkeimmät tiedot liittyen riippuvuuksiin yms.
├── tailwind.config.js # Tailwindin konfiguraatio
├── tsconfig.json # TypeScriptin konfiguraatio
├── tsdoc.json # TypeDocin eli dokumentaatiogeneraattorin konfiguraatio
```

### Sovelluksen UI:n rakenne

Sovellusta tehdessä pyrittiin löytämään intuitiivista rakennetta, joka auttaa hahmottamaan vastuualueet selkeästi. Sovelluksessa on yksi layout, joka vastaa näkymän rakenteesta riippumatta mikä näkymä on kyseessä. Näkymää kutsumme sivuksi, koska sivun vaihtaminen on intuitiivinen käsite web sovelluksissa (vrt. sana nettisivu). Layoutin rakenne on myös web sovelluksista tuttu. Header, joka toimii otsikkona ja navigaatiopalkkina, "Sivu", joka renderöi jokaiseen näkymään sisällön ja Footer, joka on myös web sovellukista tuttu käsite. Footerissa näytetään usein vähemmän relevanttia yleistietoa sovelluksesta.

![Sovelluksen näkymän rakenne](./sovelluksen-rakenne.png)

### Sovelluksen koodin kansiorakenne

Aiemmin mainittiin, että /app/src löytyy sovelluksen varsinainen koodi. Tämän kansion rakenne on seuraavanlainen.

```
├── components # Yhtenäisiä komponentteja. "Rakennuspalikoita", joita käytetään enemmän kuin yhdellä sivulla.
├── layout # Sovelluksen layout, selitetty yllä
├── pages # "Sivut". Sovelluksen sisältö. Katso sovelluksen headeristä löytyvä navigaatiopalkki.
│   ├── Analysis # Jokainen sivun kansio sisältää sivun komponentit, joista muodostuu sivu (index.tsx).
│   ├── Electricy
│   ├── Home
│   └── Weather
├── services # Sovelluksen datan hakeminen eriytetty omaksi moduuliksi
```

Tarkemmat tiedot yksittäisistä tiedostoista löytyvät sivupalkista --->

### Sovelluksen "Big Picture" ja design ratkaisut

Sovelluksen "Big Picture" on kuvattu alla. Siinä kuvataan datan kulku sovelluksen läpi aina renderöityviin komponentteihin asti.

![Sovelluksen "Big Picture"](./big-picture.png)

## Rajapinnat ja palvelut

Tulemme kirjoittamaan kaksi palvelua, `fmiService` ja `fingridService`, jotka vastaavat datan noutamisesta ja parsimisesta.

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
- [Tailwind CSS](https://tailwindcss.com/)
  - Visuaalinen ilme
  - Käyttöliittymän asettelu ja skaalaus
  - Responsiivisuus (mobiilinäkymä)
- [Axios](https://github.com/axios/axios)
  - Datan noutaminen ja parsiminen
- Gitlab
  - Projektinhallinta
  - CI/CD
