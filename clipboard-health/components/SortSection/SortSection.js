import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

const SortSection = ({ prop, name, filter }) => {

  const arrowIndicator  = () => {
      if(filter === 0) {
          return ""
      } else if (filter === 1) {
          return '^'
      } else { 
          return '⌄'
      }
  }

  return (
    <div
      className="cursor-pointer"
    >
      {name} {arrowIndicator()}
    </div>
  );
};

export { SortSection as default };
