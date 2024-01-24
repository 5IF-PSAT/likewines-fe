import axios from "axios";
import { BASE_URL } from "../constants";
const baseUrl = `${BASE_URL}`;
import { DetailedWine, Wine } from "../interfaces";
import wineryService from "./winery";
import regionService from "./region";

const getWine = (query: string) => {
  const request = axios.get(`${baseUrl}/wines/filter/?wine_name=${query}`);
  return request.then((response) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wines: Wine[] = response.data.map((wine: any) => {
      return {
        id: wine.id,
        wine_id: wine.wine_id,
        wine_name: wine.wine_name,
        type: wine.type,
        elaborate: wine.elaborate,
        abv: wine.abv,
        body: wine.body,
        acidity: wine.acidity,
        region_id: wine.region_id,
        region: wine.region_name,
        winery_id: wine.winery_id,
        winery: wine.winery_name,
      };
    });
    return wines;
  });
};

const getWineById = (id: number) => {
  const request = axios.get(`${baseUrl}/wines/${id}/`);
  return request.then((response) => {
    const wine: DetailedWine = {
      id: response.data.id,
      wine_id: response.data.wine_id,
      wine_name: response.data.wine_name,
      type: response.data.type,
      elaborate: response.data.elaborate,
      abv: response.data.abv,
      body: response.data.body,
      acidity: response.data.acidity,
      region_id: response.data.region,
      winery_id: response.data.winery,
      region: response.data.region_name,
      winery: response.data.winery_name,
      winery_website: "",
      region_country: "",
      country_code: "",
    };

    return wineryService.getWinery(wine.winery_id).then((winery) => {
      const newWine = wine;
      newWine.winery_website = winery.website;
      return regionService.getRegion(wine.region_id).then((region) => {
        const newWine = wine;
        newWine.region_country = region.country;
        newWine.country_code = region.code;
        return newWine;
      });
    });
  });
};

export default { getWine, getWineById };
