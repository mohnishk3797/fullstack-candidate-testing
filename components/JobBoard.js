import { useState } from 'react';

import FilterList from './FilterList';
import JobList from './JobList';

import {useQueryFieldsContext } from '../contexts/queryContext';


const JobBoard = ({ filters }) => {
  const { jobs } = useQueryFieldsContext();
  const [showFilters, setFilters] = useState(false);

  return (
    <div className="flex m-5 lg:space-x-4">
      <div className="w-1/4 hidden lg:block space-y-4">
        <FilterList filters={filters}/>
      </div>
      <div className="w-3/4 w-full flex flex-col min-h-screen h-full">
      <button className="lg:hidden border bg-white self-start mb-5  text-blue-500 rounded-lg px-4 py-2 text-xs md:text-sm" onClick={() => setFilters(!showFilters)}>
        Filters
      </button>
        {
          showFilters && (
            <div className="mb-10 max-h-80 overflow-x-auto">
              <FilterList filters={filters}/>
            </div>
          )
        }
        
        <JobList jobs={jobs}/>
      </div>
    </div>
  )
}

export default JobBoard;