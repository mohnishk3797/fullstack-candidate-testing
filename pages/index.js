import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useCallback, useState, useEffect, useRef } from 'react'

const Home = props => {
  const [data, setState] = useState(props);
  const searchRef = useRef(null)
  const [showMe, setShowMe] = useState([]);
  const [showMeChild, setShowMeChild] = useState([]);
  const [active, setActive] = useState(false);

  let sortOrder = 'DESC';
  let sortBy = 'Location';
  let filterBy = [];
  let query = '';

  const setNumberOfJobs = useCallback((result) => {
    let numberOfJobs = result.data.reduce((total, currentItem) => {
      return total += currentItem.items.length;
    }, 0);

    var result = { data: result.data, filters: data.filters, sortBy: data.sortBy, NumberOfJobs: numberOfJobs }
    setState(result);
  }, [])

  function toggle(index) {
    setShowMe(currentShowMe => currentShowMe.includes(index)
      ? currentShowMe.filter(i => i !== index)
      : [...currentShowMe, index]);
  }
  function toggleChild(index) {
    setShowMeChild(currentShowMe => currentShowMe.includes(index)
      ? currentShowMe.filter(i => i !== index)
      : [...currentShowMe, index]);
  }
  const searchEndpoint = (query, filterBy) => `/api/jobs?search=${query}&filterBy=${filterBy}`

  const onChange = useCallback((event) => {
    query = event.target.value
    fetchJobs();
  }, [])

  function fetchJobs() {
    fetch(searchEndpoint(query, filterBy.toString()))
      .then(res => res.json())
      .then(res => {
        var result = { data: res.data, filters: data.filters, sortBy: data.sortBy, NumberOfJobs: data.NumberOfJobs }
        setState(result);
        setNumberOfJobs(result);
        sortJobs(result);
      })
  }

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', onClick)
    }
  }, [])

  const filter = useCallback((filteringBy, filteringType) => {
    if (data.filters[filteringBy].find(x => x.key == filteringType).Active) {
      data.filters[filteringBy].find(x => x.key == filteringType).Active = false
    }
    else {
      data.filters[filteringBy].find(x => x.key == filteringType).Active = true
    }

    if (filterBy.includes(filteringBy + ":" + filteringType)) {
      filterBy = filterBy.filter(i => i !== filteringBy + ":" + filteringType)
    }
    else {
      filterBy.push(filteringBy + ":" + filteringType)
    }
    fetchJobs();
  }, [])

  const sort = useCallback((type) => {
    if (sortBy !== type) {
      sortBy = type;
    }
    data.sortBy.By = sortBy;
    if (sortOrder === null || sortOrder === "") {
      sortOrder = 'ASC';
    }
    else if (sortOrder === 'ASC') {
      sortOrder = 'DESC';
    }
    else if (sortOrder === 'DESC') {
      sortOrder = '';
    }
    data.sortBy.sortOrder = sortOrder;
    fetchJobs();
    // sortJobs(data);
    // if (sortOrder == "") {
    //   fetchJobs();
    // }
  }, []);

  function sortJobs(currentDataList){
    debugger;
    if (sortBy == "Hospital") {
      if (sortOrder === 'ASC') {
        var res = currentDataList.data.sort((a, b) => {
          if (a["name"] < b["name"]) {
            return -1;
          }
          if (a["name"] > b["name"]) {
            return 1;
          }
          return 0;
        });
        var currentData = { data: res, filters: data.filters, sortBy: data.sortBy, NumberOfJobs: data.NumberOfJobs }
        setState(currentData);
        setNumberOfJobs(currentData);
      }
      else if (sortOrder === 'DESC') {
        var res = currentDataList.data.sort((a, b) => {
          if (a["name"] > b["name"]) {
            return -1;
          }

          if (a["name"] < b["name"]) {
            return 1;
          }
          return 0;
        });
        var currentData = { data: res, filters: data.filters, sortBy: data.sortBy, NumberOfJobs: data.NumberOfJobs }
        setState(currentData);
        setNumberOfJobs(currentData);
      }
    }
    else if (sortBy == "JobTitle") {
      if (sortOrder === 'ASC') {
        var res = currentDataList.data.sort((a, b) => {
          if (a["job_title"] < b["job_title"]) {
            return -1;
          }
          if (a["job_title"] > b["job_title"]) {
            return 1;
          }
          return 0;
        });
        var currentData = { data: res, filters: data.filters, sortBy: data.sortBy, NumberOfJobs: data.NumberOfJobs }
        setState(currentData);
        setNumberOfJobs(currentData);
      }
      else if (sortOrder === 'DESC') {
        var res = currentDataList.data.sort((a, b) => {
          if (a["job_title"] > b["job_title"]) {
            return -1;
          }

          if (a["job_title"] < b["job_title"]) {
            return 1;
          }
          return 0;
        });
        var currentData = { data: res, filters: data.filters, sortBy: data.sortBy, NumberOfJobs: data.NumberOfJobs }
        setState(currentData);
        setNumberOfJobs(currentData);
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <div className="relative bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a href="#">
                  <span className="sr-only">Workflow</span>
                  <img className="h-8 w-auto sm:h-10" alt="" />
                </a>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <nav className="hidden md:flex space-x-10">
                <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  PROFILE
                </a>
                <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  JOBS
                </a>
                <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  PROFESSIONAL NETWORK
                </a>
                <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  LOUNGE
                </a>
                <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  SALARY
                </a>
              </nav>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">

              </div>
            </div>
          </div>

          <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="py-6 px-5 space-y-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Pricing
                  </a>
                  <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Docs
                  </a>
                  <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Enterprise
                  </a>
                  <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Blog
                  </a>
                  <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Help Center
                  </a>
                  <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Guides
                  </a>
                  <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Security
                  </a>
                  <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Events
                 </a>
                </div>
                <div>
                  <a href="#" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Sign up
                </a>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                      Sign in
                  </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Head>
      <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mt-10">
            <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-6 md:gap-x-8 md:gap-y-10">
              <div class="flex">
                <div className="align-left rounded-tl-lg rounded-tr-lg inline-block py-4 overflow-hidden bg-white shadow-lg px-2">
                  <div>
                    <div className="text-sm leading-5 text-gray-800"><b>Job Type</b></div>
                  </div>
                  {
                    data.filters["job_type"].map((item) => (
                      <tbody className={(item.Active ? 'bg-blue-500' : 'bg-white')} >
                        <tr style={{ cursor: "pointer" }}>
                          <td className="px-2 py-2 whitespace-no-wrap border-b border-gray-500">
                            <div className="flex items-center" onClick={() => filter('job_type', item.key)}>
                              <div>
                                <div className="text-sm leading-5 text-gray-800">{item.key}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-2 whitespace-no-wrap border-b border-gray-900">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">{item.doc_count}</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  <div>
                    <div className="text-sm leading-5 text-gray-800"><b>Work Schedule</b></div>
                  </div>
                  {
                    data.filters["work_schedule"].map((item) => (
                      <tbody className={(item.Active ? 'bg-blue-500' : 'bg-white')} >
                        <tr style={{ cursor: "pointer" }}>
                          <td className="px-2 py-2 whitespace-no-wrap border-b border-gray-500" onClick={() => filter('work_schedule', item.key)}>
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">{item.key}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-2 whitespace-no-wrap border-b border-gray-900">
                            <div className="flex items-center"  >
                              <div>
                                <div className="text-sm leading-5 text-gray-800">{item.doc_count}</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  <div>
                    <div className="text-sm leading-5 text-gray-800"><b>Experience</b></div>
                  </div>
                  {
                    data.filters["experience"].map((item) => (
                      <tbody className={(item.Active ? 'bg-blue-500' : 'bg-white')} >
                        <tr style={{ cursor: "pointer" }}>
                          <td className="px-2 py-2 whitespace-no-wrap border-b border-gray-500">
                            <div className="flex items-center" onClick={() => filter('experience', item.key)}>
                              <div>
                                <div className="text-sm leading-5 text-gray-800">{item.key}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-2 whitespace-no-wrap border-b border-gray-900">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">{item.doc_count}</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  <div>
                    <div className="text-sm leading-5 text-gray-800"><b>Department</b></div>
                  </div>
                  {
                    data.filters["department"].map((item) => (
                      <tbody className={(item.Active ? 'bg-blue-500' : 'bg-white')} >
                        <tr style={{ cursor: "pointer" }}>
                          <td className="px-2 py-2 whitespace-no-wrap border-b border-gray-500">
                            <div className="flex items-center" onClick={() => filter('department', item.key)}>
                              <div>
                                <div className="text-sm leading-5 text-gray-800">{item.key}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-2 whitespace-no-wrap border-b border-gray-900">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm leading-5 text-gray-800">{item.doc_count}</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </div>
              </div>
              <div class="md:col-span-5 flex">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                  <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
                    <section className="bg-indigo-dark h-50">
                      <div className="container mx-auto" ref={searchRef}>
                        <input className="w-full h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg" type="search" placeholder="Search for any job, title, keywords and company" onChange={onChange} onFocus={onFocus} />
                        <nav className="flex">
                          <a className="no-underline text-white py-3 px-4 font-medium mr-3 bg-indigo hover:bg-indigo-darker" href="#">Cardamom</a>
                          <a className="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-darker hover:bg-indigo" href="#">Cinnamon</a>
                          <a className="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo hover:bg-indigo-darker" href="#">Chamomille</a>
                          <a className="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-darker hover:bg-indigo" href="#">Apple</a>
                          <a className="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo hover:bg-indigo-darker" href="#">Mint</a>
                          <a className="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-darker hover:bg-indigo" href="#">Curry</a>
                          <a className="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo hover:bg-indigo-darker" href="#">Fragrance</a>
                          <a className="no-underline text-white py-3 px-4 font-medium ml-auto bg-indigo-darker hover:bg-indigo" href="#">Amchoor</a>
                        </nav>
                      </div>
                    </section>
                    <div>
                      <div class="flex justify-left">
                        {data.NumberOfJobs} job postings
                </div>
                    </div>
                    <div>
                      <div class="flex justify-left">
                        Sort by :
                  {data.sortBy.map((item) => (
                        <a className="py-6 px-5 space-y-6" href="javascript:;" className="text-base font-medium text-gray-900 hover:text-gray-700 mx-5 border-b border-gray-500" onClick={() => sort(item.value)} style={{ cursor: "pointer" }}>
                          {item.key} {data.sortBy.By == item.value && data.sortBy.sortOrder != '' ? "(" + data.sortBy.sortOrder + ")" : ''}
                        </a>
                      ))}
                      </div>
                    </div>
                    {
                      data.data.map((item, index) => (
                        <div key={index}>
                          <div className="single">
                            <div className="title" onClick={() => toggle(index)}>
                              <tbody className="bg-white">
                                <tr>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                    <div className="flex items-center">
                                      <div>
                                        <div className="text-sm leading-5 text-gray-800"><b>{item.items.length} jobs for {item.name}</b></div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-900">
                                  </td>
                                </tr>
                              </tbody>
                            </div>
                            <ul style={{ display: showMe.includes(index) ? "block" : "none" }}>
                              {item.items.map((single, index1) => (
                                <li key={index1}>
                                  <tbody className="bg-white" >
                                    <div onClick={() => toggleChild(index1)}>
                                      <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap">
                                          <div className="text-sm leading-5 text-blue-900"><strong>{single.job_title}</strong></div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 ">{single.job_type} | ${single.salary_range[0]} - ${single.salary_range[1]} an hour | {single.city} </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900"></td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900">
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 text-sm leading-5"></td>
                                      </tr>
                                    </div>
                                  </tbody>
                                  <tbody>
                                    <ul style={{ display: showMeChild.includes(index1) ? "block" : "none", width: "800px" }}>
                                      <tr onClick={() => toggleChild(index1)}>
                                        <td className="px-6 py-4 whitespace-no-wrap  text-sm leading-5">
                                          <div className="text-sm leading-5 text-blue-900 ">Department : <strong>{single.department.toString()}</strong></div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap  text-sm leading-5">
                                          <div className="text-sm leading-5 text-blue-900 ">Hours / Shift : <strong>{single.hours[1]} hours / {single.work_schedule}</strong></div>
                                        </td>
                                        <td className="px-8 py-4 whitespace-no-wrap text-right">
                                          <button className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Job Details</button>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-sm leading-5">
                                          <div className="text-sm leading-5 text-blue-900 ">Summary : <strong>{single.description}</strong></div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap text-right">
                                          <button className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm border-blue-500 border text-blue-500 text-base font-medium text-white hover:bg-blue-700 hover:text-white focus:outline-none">Save Details</button>
                                        </td>
                                      </tr>
                                    </ul>
                                  </tbody>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <hr />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>

    </div>

  )
}

export async function getStaticProps() {

  const request = await fetch('http://localhost:3000/api/jobs')
  const json = await request.json()
  const filterRequest = await fetch('http://localhost:3000/api/filters')
  const filtersJson = await filterRequest.json()

  let numberOfJobs = json.data.reduce((total, currentItem) => {
    return total += currentItem.items.length;
  }, 0);
  return {
    props: {
      data: json.data,
      filters: filtersJson,
      sortBy: [{ key: "Hospital Name", value: "Hospital" }, { key: "Job Title", value: "JobTitle" }],
      NumberOfJobs: numberOfJobs
    }
  }
}

export default Home;
