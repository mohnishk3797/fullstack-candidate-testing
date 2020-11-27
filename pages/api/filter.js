import jobs from "../../data/jobs.json";
import {
  isArray as _isArray,
  isObject as _isObject,
  isEmpty as _isEmpty,
  orderBy as _orderBy,
  mapValues as _mapValues,
  map as _map,
  forEach as _forEach,
} from "lodash";

export default (req, res) => {
  let jobData = jobs;
  const query = req.query;

  res.statusCode = 200;
  res.json(filterJobs(query, jobData));
};

function filterJobs(query, jobs) {
  const filterparam = query.search || "";
  let sort = query.sortBy || "";
  let order = query.orderBy;

  const filteredJobs = doFilter(filterparam, jobs);
  const sortedJobs = doSort(sort, order, filteredJobs);

  return {
    items: sortedJobs,
    totalJobs: sortedJobs.length,
  };

  function doFilter(filterparam, jobs) {
    const lowercasedJob = filterparam.toLowerCase().trim();
    if (lowercasedJob === "") return jobs;
    else {
      const filteredJobs = jobs.filter((item) => {
        return Object.keys(item).some((key) => {
          if (!_isArray(item[key])) {
            return item[key].toString().toLowerCase().includes(lowercasedJob);
          } else {
            const findString = item[key].filter((subItem) => {
              return Object.keys(subItem).some((ky) => {
                if (!_isArray(subItem[ky])) {
                  if (
                    subItem[ky].toString().toLowerCase().includes(lowercasedJob)
                  ) {
                  }
                  return subItem[ky]
                    .toString()
                    .toLowerCase()
                    .includes(lowercasedJob);
                }
              });
            });
            if (!_isEmpty(findString)) {
              return true;
            } else {
              return false;
            }
          }
        });
      });
      return filteredJobs;
    }
  }

  function doSort(sortBy, orderBy, jobs) {
    if (!_isEmpty(sortBy) && !_isEmpty(orderBy)) {
      if (sortBy === "department") {
        _forEach(jobs, (value) => {
          _forEach(value.items, (departmentList) => {
            if (orderBy === "asc") {
              departmentList.department = departmentList.department.sort(
                function (a, b) {
                  return a - b;
                }
              );
            } else if (orderBy === "desc") {
              departmentList.department = departmentList.department.sort(
                function (a, b) {
                  return b - a;
                }
              );
            }
          });
        });
        jobs = _orderBy(jobs, `items[0].department`, `${orderBy}`);
      } else if (sortBy === "required_skills") {
        _forEach(jobs, (value) => {
          _forEach(value.items, (requiredSkills) => {
            if (orderBy === "asc") {
              requiredSkills.required_skills = requiredSkills.required_skills.sort(
                function (a, b) {
                  return a - b;
                }
              );
            } else if (orderBy === "desc") {
              requiredSkills.required_skills = requiredSkills.required_skills.sort(
                function (a, b) {
                  return b - a;
                }
              );
            }
          });
        });
        jobs = _orderBy(jobs, `items[0].required_skills`, `${orderBy}`);
      } else {
        _forEach(jobs, (value) => {
          value.items = _orderBy(value["items"], `${sortBy}`, `${orderBy}`);
        });
        jobs = _orderBy(jobs, `items[0][${sortBy}]`, `${orderBy}`);
      }
    }
    return jobs;
  }
}
