import axios from 'axios'

const env = process.env.NODE_ENV
const host = (env == 'development') ? 'http://localhost:3000' : 'https://clipboard-test.vercel.app/';

console.log(host)
export const getAllFiltersForHome = async () => {

    const filters = await axios(`${host}/api/filters`)
    const { data: filtersArray } = filters
    return filtersArray
}

export const getJobsForHome = async () => {
    console.log(host)

    const jobs = await axios(`${host}/api/jobs`)
    const { data: jobsArray } = jobs
    return jobsArray
}


export const getFilteredJobs = async ({ ...queryObject }, key) => {

    if (key)
        queryObject = { ...queryObject, keyword: key }
    let queryString = Object.entries(queryObject).map((filter) => filter[0] + '=' + filter[1])
    console.log(host, env)
    const filteredJobs = await axios(`${host}/api/jobs?${queryString.join('&')}`)
    const { data: jobsArray } = filteredJobs
    return jobsArray

}
