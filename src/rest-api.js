import axios from "axios";

const YOUR_ACCESS_KEY = "irEfdu0P_DhxyNxjlI-dYb5RJInsIwZKwWego8ISNwc";

export const fetchImages = async (query, page) => {
  axios.defaults.baseURL = "https://api.unsplash.com";

  const response = await axios.get("/search/photos", {
    params: {
      query,
      client_id: YOUR_ACCESS_KEY,
      page,
      per_page: 12,
    },
  });
  return {
    imageData: response.data.results,
    totalPages: response.data.total_pages,
  };
};
