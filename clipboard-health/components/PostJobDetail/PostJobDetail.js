import React, { useState } from "react";
import moment from "moment";

const PostJobDetail = ({ job }) => {
  const [isVisible, setVisibility] = useState(false);

  const {
    city,
    created,
    job_title,
    salary_range,
    job_type,
    department,
    work_schedule,
    hours,
    description,
  } = job;
  return (
    <div
      className="border-t-2 border-gray-300 pt-4 pb-4 text-sm cursor-pointer"
      key={`key-${city}-${created}`}
      onClick={() => setVisibility(isVisible ? false : true)}
    >
      <div className="float-right relative text-gray-400">
        {moment(created).fromNow()}
      </div>
      <div className="font-semibold">{job_title}</div>
      <div className="text-gray-400">
        {job_type} | ${salary_range[0]} - ${salary_range[1]} an hour | {city}
      </div>
      {isVisible && (
        <div className="flex flex-nowrap mt-4">
          <div className="w-1/3">
            <div className="font-semibold mb-4">Department: </div>
            <div className="font-semibold mb-4">Hours / shifts: </div>
            <div className="font-semibold mb-4">Summary: </div>
          </div>
          <div>
            <div className="mb-4">{department.join(",")}</div>
            <div className="mb-4">
              {hours} hours / {work_schedule}
            </div>
            <div className="mb-4">{description}</div>
          </div>
          <div className="ml-10">
            <a
              href="#go"
              className="border border-current rounded p-2 inline-block bg-blue-500 text-white mb-3"
            >
              Job details
            </a>
            <a
              href="#go"
              className="border border-current rounded p-2 inline-block text-blue-500"
            >
              Save job
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export { PostJobDetail as default };
