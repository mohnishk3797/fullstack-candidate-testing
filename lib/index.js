import axios from 'axios'

export const getAllFiltersForHome = async () => {
    const filters = await axios(`http://localhost:3000/api/filters`)
    const { data: filtersArray } = filters
    return filtersArray
}

export const getJobsForHome = async () => {
    const jobs = await axios(`http://localhost:3000/api/jobs`)
    const { data: jobsArray } = jobs
    return jobsArray
}


export const getFilteredJobs = async ({ ...queryObject }, key) => {

    if (key)
        queryObject = { ...queryObject, keyword: key }
    let queryString = Object.entries(queryObject).map((filter) => filter[0] + '=' + filter[1])
    const filteredJobs = await axios(`http://localhost:3000/api/jobs?${queryString.join('&')}`)
    const { data: jobsArray } = filteredJobs
    return jobsArray

}
