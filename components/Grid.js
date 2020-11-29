import { useState } from 'react'
import { get2CapitalLetters, formatDiffWeekName, formatCurrency } from '../utils'
export default function Grid({ data }) {

    let results = data.map((element) => {
        return (<HeaderResult key={element.name}
            facilityName={element.name}
            totalJobs={element.total_jobs_in_hospital}
            listJobs={element.items} />)
    })
    return (
        <div>
            {results}
        </div>
    )
}

function HeaderResult({ facilityName, totalJobs, listJobs }) {
    const [showDetail, setShowDetail] = useState(false)
    const toggleDetail = (e) => {
        setShowDetail(!showDetail)
    }
    let jobsDetails = listJobs.map((element) => {
        return < DetailJob key={element.job_id} job={element} />
    })
    return (
        <div>
            <div className="m-3 flex content-start" onClick={toggleDetail}>
                <p className="container flex flex-initial bg-gray-400 text-white w-10 justify-center rounded-md">
                    <label>{get2CapitalLetters(facilityName)}</label>
                </p>
                <p className="flex">&nbsp;&nbsp;{totalJobs} jobs for {facilityName}</p>
            </div>
            {showDetail ? (
                <div className="m-3">
                    {jobsDetails}
                </div >
            ) : ('')}
        </div>
    )
}

function DetailJob({ job }) {
    const [showReview, setshowReview] = useState(false)
    const toggleReview = (e) => {
        setshowReview(!showReview)
    }
    const { job_title,
        job_type,
        job_id,
        salary_range,
        city,
        created,
        department,
        description,
        hours,
        work_schedule } = job
    return (

        <div className="m-5 border-gray-300 border-t p-2 text-sm" >
            <div className="font-medium" onClick={toggleReview}>{job_title}</div>
            <label>{job_type}&nbsp;|</label>
            <label>&nbsp;{formatCurrency(salary_range[0])} - {formatCurrency(salary_range[1])} an hour&nbsp;|</label>
            <label>&nbsp;{city}</label>
            <p className="float-right">{formatDiffWeekName(created)}</p>
            {showReview ? (
                <div>
                    <ReviewJob
                        departments={department}
                        hours={hours}
                        description={description}
                        shift={work_schedule}
                        job_id={job_id} />
                </div >
            ) : ('')}

        </div>
    )
}

function ReviewJob({ departments, hours, description, shift, job_id }) {

    const handleClick=({target})=>{
        console.log(target.value)
    }
    return (
        <div className="m-3 flex flex-wrap">
            <div className="flex-col w-10/12">
                <div className="flex">
                    <div className="font-medium flex-col w-3/12">Department:</div>
                    <p className="flex-col w-9/12">{departments.join(', ')}</p>
                </div>
                <div className="flex">
                    <div className="font-medium flex-col w-3/12">Hours / Shift:</div>
                    <p className="flex-col w-9/12">{hours.join(' ')} hours / {shift}</p>
                </div>
                <div className="flex">
                    <div className="font-medium flex-col w-3/12">Summary:</div>
                    <p className="flex-col w-9/12">{description}</p>
                </div>
            </div>
            <div className="flex-col w-2/12 justify-end">
                <div className="w-full flex content-end">
                    <button onClick={handleClick} className="bg-blue-500 text-white p-3 rounded-md" value={job_id}>Job Details</button>
                </div>
                <div className="mt-3 flex content-end">
                    <button onClick={handleClick} className="bg-white text-blue-500 border-blue-500 border p-3 rounded-md" value={job_id}>Save Job</button>
                </div>
                
            </div>
        </div>
    )
}