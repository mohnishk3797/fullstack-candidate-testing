// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import _ from 'lodash';

import jobs from '../../data/jobs.json';

const getJobs = async (req, res) => {
  const body = JSON.parse(req.body);
  res.statusCode = 200;
  // @todo: implement filters and search
  // @todo: implement automated tests


  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve)=>setTimeout(resolve, 1000 * Math.random()));

  let jobsArray = fetchJobs(body)
  res.json(jobsArray)
}

export const fetchJobs = (body) => {
  let jobsArray = []
  jobs.map(job => {
    let filteredJobs = job.items;

    //Check if body search param exist or not
    //if yes, filter jobs based on it
    if (body.search) {
      filteredJobs = job.items.filter(item => searchBasedOnText(item, body.search));
    }
    
    //Check if after filter params exist or not and if there are any jobs available to query    
    if (filteredJobs.length && Object.keys(body.filter).length > 0) {
      filteredJobs = filteredJobs.filter(item => searchBasedOnFilter(item, body.filter))
    }

    //Check if sorting is required
    if (filteredJobs.length && Object.keys(body.sort).length > 0) {
      filteredJobs = sortingBasedOnParams(filteredJobs, body.sort);
    }
    
    if (filteredJobs.length) {
      jobsArray.push({
        ...job,
        total_jobs_in_hospital: filteredJobs.length,
        items: filteredJobs
      });
    }
  });
  return jobsArray
}

const searchBasedOnFilter = (job, filter) => {
  return Object.keys(filter).every(key => {
    if (typeof job[key] === 'object') {
      return job[key].includes(filter[key])
    } else {
      return job[key] === filter[key]
    }
  })
}

const searchBasedOnText = (job, search) => {
  return Object.values(job).some(val => {
    if (typeof val === 'string') {
      return val.toLowerCase().includes(search.toLowerCase());
    } else if (typeof val === 'object') {
      return searchBasedOnText(val, search)
    }
  });
}

const sortingBasedOnParams = (jobs, sort) => {

  const customSortKeys = ['created'];
  const customSortKeysFunc = {
    created: customDateSort
  }

  let sortingParams = [];
  let sortingParamsOrder = [];
  let customSortingParams = [];
  Object.keys(sort).forEach(key => {
    if (customSortKeys.indexOf(key) === -1) {
      sortingParams.push(key);
      sortingParamsOrder.push(sort[key]);
    } else {
      customSortingParams.push(key);
    }
  });
  jobs = _.orderBy(jobs, sortingParams, sortingParamsOrder);
  
  customSortingParams.forEach(param => {
    jobs = customSortKeysFunc[param](jobs, sort[param]);
  });

  return jobs;
}



const customDateSort = (jobs, order) => {
  jobs.sort(function(a, b) {
    if (order === 'asc') {
      return new Date(b.created) - new Date(a.created);
    } else {
      return new Date(a.created) - new Date(b.created);
    }
  });
  return jobs;
}

export default getJobs;