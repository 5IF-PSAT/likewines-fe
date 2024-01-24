import axios from "axios";
import { BASE_URL } from "../constants";
const baseUrl = `${BASE_URL}/predict/predict_all_rating`;
//import { Ratings } from "../interfaces";

const getWinePrediction = (id: number, rating_year: number) => {
  const request = axios.get(
    `${baseUrl}/?wine_id=${id}&rating_year=${rating_year}`
  );
  return request.then((response) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log(response.data.list_ratings);
    return response.data.list_ratings;
  });
};

export default { getWinePrediction };
