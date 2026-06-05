# PRH Yrityshaku / PRH Company Search

🔗 **Live demo:** https://delightful-ground-042faae03.7.azurestaticapps.net/

Yritystietojen hakusovellus PRH:n (Patentti- ja rekisterihallitus) avoimesta YTJ-rajapinnasta.

Hae yrityksiä nimellä tai y-tunnuksella. Tulokset näytetään taulukkomuodossa keskeisine tietoineen.

## Ominaisuudet

- Haku yrityksen nimellä tai y-tunnuksella
- Tulosten sivutus (100 tulosta/sivu)
- Näytettävät tiedot: nimi, y-tunnus, yhtiömuoto, toimiala, osoite, verkkosivut
- Syötteiden validointi ja sanitointi
- Kielivalinta: suomi / englanti (i18n)
- Responsiivinen Material UI -käyttöliittymä

## Teknologiat

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 5](https://vitejs.dev/)
- [Material UI 9](https://mui.com/)
- [i18next](https://www.i18next.com/)
- [PRH Avoin data YTJ-rajapinta](https://avoindata.prh.fi/fi/ytj/swagger-ui)

## Asennus ja käynnistys

Node.js 20+ vaaditaan.

```bash
npm install
npm run dev
```

Sovellus käynnistyy osoitteessa http://localhost:5173

## Tuotantoversio

```bash
npm run build
```

Tuotantokäännetty sovellus löytyy `dist/`-kansiosta.

## Käyttö

1. Kirjoita yrityksen nimi tai y-tunnus (muoto `1234567-8`) hakukenttään
2. Paina **Hae** tai Enter
3. Selaa tuloksia sivutuspalkin avulla
4. Vaihda käyttöliittymän kieli FI/EN-painikkeella oikeasta yläkulmasta

## Rajapinta

Sovellus käyttää PRH:n avointa YTJ-rajapintaa suoraan selaimesta ilman välipalvelinta.

- Rajapinnan dokumentaatio: https://avoindata.prh.fi/fi/ytj/swagger-ui
- Ei API-avainta tai autentikointia tarvita
