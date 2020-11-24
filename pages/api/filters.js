import fs from 'fs'
import path from 'path'

const directory = path.join(process.cwd(), 'data')

function getfilters() {
  
  const fullPath = path.join(directory, 'filters.json')
  const fileContent = fs.readFileSync(fullPath, 'utf8')
  return fileContent;
}

export default (req, res) => {
  const allFilters = getfilters()
  console.log(typeof(allFilters))
  
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json({ allFilters:JSON.parse(allFilters)})
}