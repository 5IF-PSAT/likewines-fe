import axios from "axios";
import { BASE_URL } from "../constants";
const baseUrl = `${BASE_URL}`;
import { Wine } from "../interfaces";

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
    console.log(wines);
    return wines;
  });
};

const getWineById = (id: number) => {
  const request = axios.get(`${baseUrl}/wines/${id}/`);
  return request.then((response) => {
    const wine: Wine = {
      id: response.data.id,
      wine_id: response.data.wine_id,
      wine_name: response.data.wine_name,
      type: response.data.type,
      elaborate: response.data.elaborate,
      abv: response.data.abv,
      body: response.data.body,
      acidity: response.data.acidity,
      region_id: response.data.region_id,
      winery_id: response.data.winery_id,
      region: response.data.region_name,
      winery: response.data.winery_name,
    };
    return wine;
  });
};

export default { getWine, getWineById };
