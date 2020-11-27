import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import SortSection from '../SortSection';

const FilterActions = () => {
  const { state } = useContext(AppContext);
  return (
    <div className="flex m-3">
      <div className="flex-1">
        <strong>{state.jobs && state.jobs.length}</strong> job postings
      </div>
      <div className="flex-1">
        <div className="flex items-stretch space-x-10 align-middle py-2 text-sm float-right">
          <div className="text-gray-400">Sort By</div>
          <SortSection name={"Location"} prop={"location"}  />
          <SortSection name={"Role"} prop={"job_title"} />
          <SortSection name={"Department"} prop={"department"}  />
          <SortSection name={"Education"} prop={"required_skills"}  />
          <SortSection name={"Experience"} prop={"experience"}  />
        </div>
      </div>
    </div>
  );
};

export { FilterActions as default };
