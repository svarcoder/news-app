const API_DOMAIN = "https://newsapi.org/v2/top-headlines?country=";
const API_DOMAIN2 = "https://content.guardianapis.com/search";
const API_SEARCH_DOMAIN = "https://newsapi.org/v2/everything?q=";
const API_KEY = "e8120873c3d140759d332b01cd7e7907";
const API_KEY2 = "test";
export const endpointPath = (country, category) =>
  `${API_DOMAIN}${country}&lang=en&category=${category}&apikey=${API_KEY}`;
export const endpointSearch = (searchQuery) =>
  `${API_SEARCH_DOMAIN}${searchQuery}&lang=en&apikey=${API_KEY}`;
export const endpointPathGaurdian = (category) =>
  `${API_DOMAIN2}?page=1&q=${category}&api-key=${API_KEY2}`;
