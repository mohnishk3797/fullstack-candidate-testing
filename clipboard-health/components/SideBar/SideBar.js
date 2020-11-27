import React, { useState, useEffect } from "react";
import SideBarSection from "../SideBarSection";
import { getAllFilters } from "../../Api/FilterAPI";

const SideBar = () => {
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllFilters();
      if (response !== {}) {
        setFilters(response);
      }
    };
    fetchData();
  }, [filters]);

  return (
    <>
      {filters !== null && (
        <div className="flex-shrink-0 w-1/5">
          <SideBarSection
            title={"Job Type"}
            options={filters.job_type}
            limit={0}
          />
          <SideBarSection
            title={"Department"}
            options={filters.department}
            limit={10}
          />
          <SideBarSection
            title={"Work Schedule"}
            options={filters.work_schedule}
            limit={0}
          />
          <SideBarSection
            title={"Experience"}
            options={filters.experience}
            limit={0}
          />
        </div>
      )}
    </>
  );
};

export { SideBar as default };
