import { useState } from 'react';

const getPostedTime = (time) => {
  let noOfWeeks = Math.ceil(
    (+new Date() - +new Date(time)) / (24 * 60 * 60 * 1000 * 7)
  );
  return noOfWeeks;
}

const JobItemDetails = ({ item }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleJobItemClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDetail(!showDetail);
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }


  return (
    <li className="flex flex-col border-t p-3 text-sm" onClick={handleJobItemClick}>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h4 className="font-bold">{item.job_title}</h4>
          <p>
          {item.job_type} |
          ${item.salary_range[0]} - ${item.salary_range[1]} an hour | {item.city}
          </p>
        </div>
        <div>
          <p className="text-gray-600">
          {getPostedTime(item.created)} weeks ago
          </p>
        </div>
      </div>
      {showDetail && (
        <div className="flex lg:flex-row flex-col py-4 w-full px-2 md:px-4 rounded shadow mt-2">
          <div className="flex flex-col lg:w-2/3 items-start py-1">
            <div className="flex flex-row mb-4 w-full items-start flex-wrap">
              <h4 className="font-semibold w-full md:w-1/2">Department: </h4>
              <p className="w-full md:w-1/2">
                {item.department.join(', ')}
              </p>
            </div>
            <div className="flex flex-row mb-4 w-full items-start flex-wrap">
              <h4 className="font-semibold w-full md:w-1/2">Hours/Shifts: </h4>
              <p className="w-full md:w-1/2">
                {item.hours?.[0] || 0} hours / {item.work_schedule}
              </p>
            </div>
            <div className="flex flex-row mb-4 w-full items-start flex-wrap">
              <h4 className="font-semibold w-full md:w-1/2">Summary: </h4>
              <p className="w-full md:w-1/2">
                {item.description}
              </p>
            </div>
          </div>
          <div className="flex flex-row lg:flex-col lg:items-end items-start lg:w-1/3 lg:space-y-2 space-x-2">
            <button className="border border-blue-500 bg-blue-500 text-white rounded-lg px-4 py-2 text-xs md:text-sm" onClick={handleClick}>
              Job Details
            </button>
            <button className="border border-blue-500 text-blue-500 rounded-lg px-4 py-2 text-xs md:text-sm" onClick={handleClick}>
              Save Job
            </button>
          </div>
        </div>
      )}
    </li>
  )
}

export default JobItemDetails;