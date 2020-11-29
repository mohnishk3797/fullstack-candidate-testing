// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import JobService from './Services/JobService'
export default async (req, res) => {
  res.statusCode = 200;
  const { job_type, work_schedule, experience, department, keyword } = req.query

  const jobService = new JobService()
  let jobs = jobService.findByFilter({ job_type, work_schedule, experience }, { department }, { keyword })

  // @todo: implement filters and search
  // @todo: implement automated tests

  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));

  res.json(jobs)
}
