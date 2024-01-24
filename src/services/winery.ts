import axios from "axios";
import { BASE_URL } from "../constants";
const baseUrl = `${BASE_URL}/wineries`;
import { Winery } from "../interfaces";

const getWinery = (id: number) => {
  const request = axios.get(`${baseUrl}/${id}/`);
  return request.then((response) => {
    const winery: Winery = {
      id: response.data.id,
      winery_name: response.data.winery_name,
      website: response.data.website,
    };
    return winery;
  });
};

export default { getWinery };
