import fs from 'fs'
import path from 'path'

const jobsDirectory = path.join(process.cwd(), 'data')

function getJobs() {
  
  const fullPath = path.join(jobsDirectory, 'jobs.json')
  const fileContent = fs.readFileSync(fullPath, 'utf8')
  return fileContent;
}

export default (req, res) => {
  const allJobs = getJobs()
  console.log(typeof(allJobs))
  
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json({ allJobs:JSON.parse(allJobs)})
}
