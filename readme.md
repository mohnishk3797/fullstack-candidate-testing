# Clipboard Health Assignment

## Demo
https://hcb-test-task.herokuapp.com/jobs 


## Running locally
- `git clone`
- `npm i`
- `npm run start`

## Request Examples: 
- `/jobs` - get all data
- `/jobs?sorting=[property name]:[asc, desc]` - get sorted data (Can add multiple sorting parameters)
- `/jobs?sorting=job_title:asc&sorting=department:desc` - Sorting example

- `/jobs?filter=[job_type, work_schedule, experience, department]:value,value` - get filtered data(Can add multiple filter parameters)
- `/jobs?filter=job_type:Part-time,Traveler&filter=work_schedule:Night shift` - Filtering example

- `/jobs?search=value` - get searched data (search by job title, department)


## Tech Stack
- Koa web framework for node.js
- Deployment on Heroku

## Features 
- Full Text search
- Sorting on any property (multiple properties at a time)
- Filters based on department, job type, work schedule and experience.
- Search by job title and department
