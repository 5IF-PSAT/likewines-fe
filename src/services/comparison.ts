import axios from "axios";
import { BASE_URL } from "../constants";
const baseUrl = `${BASE_URL}/compare/compare_wine`;
import { ComparedWine } from "../interfaces";

const getWineComparison = (id: number, vintage: number) => {
  const request = axios.get(`${baseUrl}/?wine_id=${id}&vintage=${vintage}`);
  return request.then((response) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wines: ComparedWine[] = response.data.list_wines.map((wine: any) => {
      return {
        id: wine.id,
        wine_id: wine.wine_id,
        wine_name: wine.wine_name,
        type: wine.type,
        elaborate: wine.elaborate,
        abv: wine.abv,
        body: wine.body,
        acidity: wine.acidity,
        region: wine.region,
        winery: wine.winery,
        distance: wine.distance,
        vintage: wine.vintage,
      };
    });
    return wines;
  });
};

export default { getWineComparison };
