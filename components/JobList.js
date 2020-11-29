import JobItem from './JobItem';
import SortingItems from './SortingItem';

const JobList = ({ jobs }) => {
  const jobCount = jobs.reduce((count, job) => count + job.total_jobs_in_hospital, 0);
  return (
    <div className="flex flex-col">
      <div className="bg-white min-h-screen h-auto flex flex-col w-full">
        <div className="flex lg:flex-row flex-col mb-2 lg:items-center items-start space-y-2 justify-between p-5 text-sm">
          <div>
            <span className="font-bold">
              {jobCount}
            </span> job postings
          </div>
          <div className="flex lg:space-x-4 pt-2 lg:flex-row flex-col">
            <h4 className="font-semibold text-gray-500 flex-col">Sort by</h4>
            <div className="flex lg:pt-0 pt-2 space-x-4 item-start">
              <SortingItems />
            </div>
            
          </div>
        </div>
        <ul className="p-4 flex flex-col space-y-5">
          {
            jobs.map((job, i) => {
              return (
                <JobItem job={job} key={i} />
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default JobList;