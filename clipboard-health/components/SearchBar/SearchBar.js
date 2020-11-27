import React, { useState, useContext } from "react";
import  AppContext from  '../../context/AppContext';

const SearchBar = () => {

  const [text, setText] = useState("");
  const { dispatch } = useContext(AppContext);

  const searchJob = (text) => {
    setText(text);
    setTimeout(() => {
      dispatch({
        type: "SEARCH",
        text,
      });
    },300)
  };

  return (
    <div className="flex relative bg-white m-4 border border-gray-300">
      <span className="absolute flex items-center pl-2 inset-y-0 left-0 sm:left-9">
      <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
    </svg>
      </span>
      <input
        type="text"
        className="flex flex-1 py-6 pl-10 sm:pl-20 text-sm text-black"
        placeholder="Search for any job, title, keywords or company"
        value={text}
        onChange={(e) => searchJob(e.target.value)}
      />
    </div>
  );
};
export { SearchBar as default };

