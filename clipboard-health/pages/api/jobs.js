// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jobPosts from '../../../data/jobs.json'

export default (req, res) => {
  res.statusCode = 200
  res.json(jobPosts)
}
