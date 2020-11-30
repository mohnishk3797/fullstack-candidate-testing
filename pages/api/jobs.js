// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import filters from '../../data/filters';
import jobs from '../../data/jobs';

export default async (req, res) => {
  res.statusCode = 200;
  // @todo: implement filters and search
  // @todo: implement automated tests 
  if ((req.query.search && req.query.search != "") || (req.query.filterBy && req.query.filterBy != "")) {
    var data = JSON.parse(JSON.stringify(jobs));
    if (req.query.search && req.query.search != "") {
      data =
        data.filter((job) => {
          if (job.name.toLowerCase().includes(req.query.search.toLowerCase() || job.job_title.toLowerCase().includes(req.query.search.toLowerCase()))) {
            return job;
          }
          job.items = job.items.filter((item) => {
            if (item.experience.toLowerCase().includes(req.query.search.toLowerCase()) 
            || item.job_type.toLowerCase().includes(req.query.search.toLowerCase())
            || item.city.toLowerCase().includes(req.query.search.toLowerCase())) {
              return item;
            }
          })
          return job;
        });
    }
    if ((req.query.filterBy && req.query.filterBy != "")) {
      var filterBy = req.query.filterBy.split(/\s*,\s*/);
      var data = data.filter((job) => {
        job.items = job.items.filter((item) => {
          for (let filtering in filterBy) {
            var filteringBy = filterBy[filtering].split(/\s*:\s*/)[0];
            var filteringType = filterBy[filtering].split(/\s*:\s*/)[1];
            if (item[filteringBy] !== undefined && item[filteringBy] === filteringType) {
              return item;
            }
            else if (item[filteringBy] !== undefined && Array.isArray(item[filteringBy]) && item[filteringBy].some(a => a.includes(filteringType))) {
              return item;
            }
          }
        })
        return job;
      });
    }

    res.statusCode = 200
    // res.end(JSON.stringify({ results }))
    // this timeout emulates unstable network connection, do not remove this one
    // you need to figure out how to guarantee that client side will render
    // correct results even if server-side can't finish replies in the right order
    await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));
    res.json({ data })
  }
  else {
    res.statusCode = 200
    // res.end(JSON.stringify({ results }))
    // this timeout emulates unstable network connection, do not remove this one
    // you need to figure out how to guarantee that client side will render
    // correct results even if server-side can't finish replies in the right order
    await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));
    var data = jobs;
    res.json({ data })
  }
}
