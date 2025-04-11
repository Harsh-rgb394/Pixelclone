import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import HomeScree from './Pages/HomeScree'
import Search from './Pages/Search'
import { GoogleSearch } from "./Api/GoogleSearch"
// import { GoogleSearch } from './api/GoogleSearch'
import './App.css'

const App = () => {
  const naivgate = useNavigate();
  // let history = useHistory();
  //search term
  const [searchTerm, setSearchTerm] = useState('');

  // for recentsearches 
  const [recentSearch, setRecentSearch] = useState(false);
  // serach data
  const [searchData, setSearchData] = useState({});

  // recentdata 
  const [recentData, setRecentData] = useState([]);


  // for image preving 
  const [preview, setPreview] = useState(null);

  //set search term
  const setSearch = async (term) => {
    setSearchTerm(term);
    storerecentdata(term)
    await setData(term);
    // history.push('/search');
    naivgate('/search');
  };

  // for localStorage storing 
  const storerecentdata = (term) => {
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    if (!recentSearches.includes(term)) {
      recentSearches.unshift(term); // Add the new search term to the beginning of the array
    }
    recentSearches = recentSearches.slice(-5); // Keep only the last 5 searches
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    setRecentData(recentSearches);
  };

  useEffect(() => {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentData(recentSearches);
  }
    , []);


  // if (recentData) {
  //   console.log(recentData)
  // }

  //set search data
  const setData = async (term) => {
    const searches = await GoogleSearch(term);
    setSearchData(searches);
  };

  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<HomeScree setSearch={setSearch} onFocusChange={setRecentSearch} recentSearch={recentSearch} recentData={recentData} setPreview={setPreview} preview={preview} />} />

        {/* {searchTerm !== "" && ( */}
        <Route
          path="/search"
          element={
            <Search
              searchTerm={searchTerm}
              searchData={searchData}
              setSearch={setSearch}
              recentData={recentData}
              onFocusChange={setRecentSearch}
              recentSearch={recentSearch}
              preview={preview}
              setPreview={setPreview}
            />
          }
        />
        {/* )} */}

        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* </BrowserRouter> */}

    </>
  )
}

export default App
