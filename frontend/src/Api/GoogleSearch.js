import axios from "axios";
export const GoogleSearch = async (term) => {
    const { data } = await axios.get(
      'https://www.googleapis.com/customsearch/v1',
      {
        
        params: {
          key: import.meta.env.VITE_AUTH_GOOGLE_KEY,
          cx: import.meta.env.VITE_AUTH_GOOGLE_PASSWORD,
          q: term,
        },
      }
    );
  
    return data;
  };
  
