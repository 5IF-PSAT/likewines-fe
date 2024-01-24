export interface Wine {
  id: number;
  wine_id: number;
  wine_name: string;
  type: string;
  elaborate: string;
  abv: number;
  body: string;
  acidity: string;
  region_id: number;
  region: string;
  winery_id: number;
  winery: string;
}

export interface DetailedWine {
  id: number;
  wine_id: number;
  wine_name: string;
  type: string;
  elaborate: string;
  abv: number;
  body: string;
  acidity: string;
  region_id: number;
  region: string;
  winery_id: number;
  winery: string;
  winery_website: string;
  region_country: string;
  country_code: string;
}

export interface ComparedWine {
  id: number;
  wine_id: number;
  wine_name: string;
  type: string;
  elaborate: string;
  abv: number;
  body: string;
  acidity: string;
  region: string;
  winery: string;
  distance: number;
  vintage: number;
}

export interface Winery {
  id: number;
  winery_name: string;
  website: string;
}

export interface Region {
  id: number;
  region_name: string;
  country: string;
  code: string;
}

export interface Ratings {
  batch_vintage: number;
  actual_rating: number;
  predict_rating: number;
}
