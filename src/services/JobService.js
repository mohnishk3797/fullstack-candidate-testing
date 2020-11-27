'use strict';

const { getData } = require('../loaders');
const { compareString, matchArray } = require('compare-string');
const config = require('../config');

class JobService {
  static async get ({
    filtersQuery,
    sortingQuery,
    search
  }) {
    const data = getData();

    const result = data.jobs.filter((item) => {
      let items = item.items;
      // Searching
      items = this._searchingItems({ items, search });
      // Filtering
      items = this._filteringItems({ items, filtersQuery });
      // Sorting
      items = this._sortingItems({ items, sortingQuery });

      item.items = items;
      item.total_jobs_in_hospital = items.length;
      return item.total_jobs_in_hospital > 0;
    });
    return result;
  }

  static async getById ({
    id
  }) {
    const data = getData();
    let job = null;
    data.jobs.forEach(j => {
      j.items.forEach(item => {
        if (parseInt(item.job_id) === parseInt(id)) job = item;
      });
    });
    if (!job) throw new Error('Job not found');
    return job;
  }

  static _searchingItems ({ items, search }) {
    if (!search) return items;
    const minMatchingForSearch = config.minMatchingForSearch;
    search = search.toLowerCase();
    return items.filter((job) => {
      let equal = false;
      const jobTittleMatching = compareString(
        search, job.job_title.toLowerCase());
      const { bestMatchRating: jobDepartmentMatching } = matchArray(
        search, job.department.map(d => d.toLowerCase()));
      if (jobTittleMatching >= minMatchingForSearch ||
          jobDepartmentMatching >= minMatchingForSearch) {
        equal = true;
      }
      return equal;
    });
  }

  static _filteringItems ({ items, filtersQuery }) {
    if (!filtersQuery) return items;
    const filters = {};
    if (Array.isArray(filtersQuery)) {
      for (const sort of filtersQuery) {
        let [key, values] = sort.split(':');
        if (key && values) {
          values = values.split(',');
          filters[key] ? filters[key].push(...values) : filters[key] = values;
        }
      }
    } else {
      const [key, values] = filtersQuery.split(':');
      if (key && values) filters[key] = values.split(',');
    }
    return items.filter((job) => {
      let equal = true;
      for (const [key, values] of Object.entries(filters)) {
        if (Array.isArray(job[key])) {
          const arr = job[key];
          if (!values.some(r => arr.includes(r))) equal = false;
        } else {
          if (!values.includes(job[key])) equal = false;
        }
      }
      return equal;
    });
  }

  static _sortingItems ({ items, sortingQuery }) {
    if (!sortingQuery) return items;
    if (Array.isArray(sortingQuery)) {
      for (const sort of sortingQuery) {
        items = this._sorting(items, sort);
      }
    } else {
      items = this._sorting(items, sortingQuery);
    }
    return items;
  }

  static _sortByProperty (property) {
    return function (a, b) {
      if (a[property] > b[property]) {
        return 1;
      } else if (a[property] < b[property]) {
        return -1;
      }
      return 0;
    };
  };

  static _sorting (items, value) {
    const orders = ['asc', 'desc'];
    const [orderBy, order] = value.split(':');
    if (!orders.includes(order)) return items;
    items = items.sort(this._sortByProperty(orderBy));
    if (order === 'desc') items = items.reverse();
    return items;
  };
}

module.exports = JobService;
