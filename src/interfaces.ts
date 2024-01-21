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
