import axios from "axios";
import { BASE_URL } from "../constants";
const baseUrl = `${BASE_URL}/regions/`;
import { Region } from "../interfaces";

const getRegion = (id: number) => {
  const request = axios.get(`${baseUrl}/${id}/`);
  return request.then((response) => {
    const region: Region = {
      id: response.data.id,
      region_name: response.data.region_name,
      country: response.data.country,
      code: response.data.code,
    };
    return region;
  });
};

export default { getRegion };
