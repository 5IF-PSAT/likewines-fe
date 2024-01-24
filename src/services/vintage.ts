import axios from "axios";
import { BASE_URL } from "../constants";
const baseUrl = `${BASE_URL}/compare/list_vintages`;

const getVintages = (id: number) => {
  const request = axios.get(`${baseUrl}/?wine_id=${id}`);
  return request.then((response) => response.data.list_vintages);
};

export default { getVintages };
