import React from "react";
import HeaderSearchPage from "../Components/HeaderSearchPage";
import SubHeaderPage from "../Components/SubHeaderPage";
import SearchData from "../Components/SearchData";

const Search = ({ searchTerm, setSearch, searchData, recentData, onFocusChange, recentSearch, preview,
    setPreview }) => {
    return (
        <div className="bg-[#202124] min-h-screen text-white">
            <HeaderSearchPage searchTerm={searchTerm} setSearch={setSearch} recentData={recentData} onFocusChange={onFocusChange} recentSearch={recentSearch} preview={preview} setPreview={setPreview} />
            <SubHeaderPage />
            <SearchData data={searchData} />
        </div>

    );
}


export default Search;