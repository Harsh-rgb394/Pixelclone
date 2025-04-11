import axios from "axios";
export const GoogleSearch = async (term) => {
    const { data } = await axios.get(
      'https://www.googleapis.com/customsearch/v1',
      {
        
        params: {
          key: 'AIzaSyC6wc5A9T__GGoVPcAHi2zWdJXL_u-hiBQ',
          cx: '52b9a87e5d43b45cb',
          q: term,
        },
      }
    );
  
    return data;
  };
  
