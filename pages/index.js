import { getAllFiltersForHome, getJobsForHome, getFilteredJobs } from '../lib'
import { Grid, Filter, Modal } from '../components'
import { useState } from 'react'

export default function Home({ filtersData, jobsArray }) {
  const [filters, setFilters] = useState({})
  const [sortBy, setSortBy] = useState({
    address: undefined,
    job_title: undefined,
    department: undefined,
    required_credentials: undefined,
    experience: undefined
  })
  const [loading, setLoading] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [jobsData, setJobsData] = useState(jobsArray)
  const applyFilter = async (key, value) => {
    let newFilter = { ...filters }
    if (key in newFilter) {
      delete newFilter[key]
    } else {
      newFilter = { ...newFilter, [key]: value }
    }

    setFilters(newFilter)

    await refreshJobs(newFilter, searchKeyword)
  }

  const seachByKeyword = async (value) => {

    setSearchKeyword(value)
    switch (value.length) {
      case 0:
        await refreshJobs(filters)
        break;
      case 1:
        break;
      default:
        await refreshJobs(filters, value)
        break;
    }
  }

  async function refreshJobs(filters, keyword) {
    setLoading(true)
    let filteredJobs = await getFilteredJobs(filters, keyword)
    filteredJobs = filteredJobs.map((facility) => {
      facility.items.sort(sortingJobs)
      return facility
    })
    setJobsData(filteredJobs);
    setLoading(false)
  }

  function sortingJobs(jobA, jobB) {
    let arrayResponses = Object.entries(sortBy).map(([key, asc]) => {
      if (typeof asc == 'undefined')
        return null
      if (asc) {
        if (jobA[key] > jobB[key]) return -1
        if (jobA[key] < jobB[key]) return 1
      } else {
        if (jobA[key] > jobB[key]) return 1
        if (jobA[key] < jobB[key]) return -1
      }
      return null
    })

    for (let i = 0; i < arrayResponses.length; i++)
      if (arrayResponses[i])
        return arrayResponses[i]
    return 0
  }

  async function updateSorting(key) {
    let newSortOptions = { ...sortBy }
    if (typeof newSortOptions[key] != 'undefined')
      newSortOptions[key] = (newSortOptions[key]) ? false : undefined;
    else
      newSortOptions[key] = true

    setSortBy(newSortOptions)
    await refreshJobs(filters, searchKeyword)
  }

  return (

    <div className="container mx-auto">
      <div>
        {loading ? (<Modal content={'Loading'} />) : ''}
      </div>
      <div className="flex container mx-3 w-auto">
        <Search searchByKeyword={seachByKeyword} />
      </div>
      <div className="flex container mx-auto">
        <div className="flex-initial mx-auto w-3/12">
          {<Filter filters={filtersData} apply={applyFilter} selectedFilter={filters} />}
        </div>
        <div className="flex-1 m-3 bg-white w-9/12" >
          <div className="flex ">
            <Sorter updateSorting={updateSorting} />
          </div>
          <div>
            <Grid data={jobsData} />
          </div>
        </div>
      </div>
    </div>
  )
}
export async function getServerSideProps({ preview = false }) {

  try {
    const filtersData = await getAllFiltersForHome(preview)
    const jobsArray = await getJobsForHome(preview)
    return { props: { filtersData, jobsArray } }
  } catch (e) {
    console.log(e)
  }
}

function Search({ searchByKeyword }) {
  const handler = ({ target }) => {
    searchByKeyword(target.value)
  }
  return (
    <div className="flex p-3 bg-white w-full">
      <label className=" flex DocSearch-MagnifierLabel" htmlFor="docsearch-input" id="docsearch-label">
        <svg width="20" height="20" className="DocSearch-Search-Icon" viewBox="0 0 20 20">
          <path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </label>
      <input
        className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent flex-grow"
        type="text"
        placeholder="Search for any job, title, keywords or company"
        onKeyUp={handler} />

    </div>
  )
}

function Sorter({ updateSorting }) {
  const handlerClick = (value) => {
    updateSorting(value)
  }
  return (
    <div className="flex container justify-end font-sans text-sm m-3 content-end">
      <label className="text-gray-500 mx-5">Sort by</label>
      <label onClick={handlerClick.bind(this, 'address')} className="mx-1 px-3">Location</label>
      <label onClick={handlerClick.bind(this, 'job_title')} className="mx-1 px-3">Role</label>
      <label onClick={handlerClick.bind(this, 'department')} className="mx-1 px-3">Department</label>
      <label onClick={handlerClick.bind(this, 'required_credentials')} className="mx-1 px-3">Education</label>
      <label onClick={handlerClick.bind(this, 'experience')} className="mx-1 px-3">Experience</label>
    </div>
  );
}
