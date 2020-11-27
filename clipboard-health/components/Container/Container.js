import React, { useContext } from "react";
import FilterActions from "../FilterActions";
import FilterResults from "../FilterResults";
import AppContext from "../../context/AppContext";

const Container = () => {
  const { state } = useContext(AppContext);
  return (
    <div className="flex-1 w-4/5 border border-gray-300 bg-white p-3 mr-1 mb-5">
      {state.isLoading && <div>Loading...</div>}
      {!state.isLoading && (
        <>
          <FilterActions />
          <FilterResults />
        </>
      )}
    </div>
  );
};
export { Container as default };
