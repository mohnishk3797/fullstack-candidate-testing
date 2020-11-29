import { useState } from 'react';
import JobItemDetails from './JobItemDetails';

const convertToInitials = (name) => name.substring(0,2).toUpperCase();

const JobItem = ({ job }) => {
  const [showJobItem, setJobShowItem] = useState(false);
  return (
    <li 
      className="w-full space-y-2 flex flex-col items-center cursor-pointer"
      key={job.name}
      onClick={() => setJobShowItem(!showJobItem)}
    >
    <div className="w-full space-x-4 flex item-center">
      <div className="flex items-center justify-center flex-shrink-0 text-xs uppercase w-8 h-8 bg-gray-500 text-white rounded">
        {convertToInitials(job.name)}
      </div>
      <p className="text-gray-500">
          {job.items.length || 0} jobs for {job.name}
      </p>
    </div>
    {
      showJobItem && (
        <ul className="w-full flex flex-col">
          {
            job.items.map((item, i) => {
              return (
                <JobItemDetails item={item} key={i} />
              )
            })
          }
        </ul>
      )
    }
    </li>
  )
}
export default JobItem;