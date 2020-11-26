import React from 'react';
import jobs from '../data/jobs.json';
import HospitalJob from './HospitalJob';

export default class HospitalJobList extends React.Component {
  state = {
    totalJobs: 0,
    sort: [],
    data: jobs,
  };

  componentDidMount() {
    let totalJobs = 0;
    jobs.forEach(hospital => {
      totalJobs += hospital.total_jobs_in_hospital;
    });

    this.setState({
      totalJobs: totalJobs,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.applyFilter();
    }
    if (prevProps.searchKeyword !== this.props.searchKeyword) {
      this.applySearchKeyword();
    }
  }

  applyFilter() {
    const { filter } = this.props;
    const filtered = jobs.map(hospital => {
      let items;
      if (filter.type === 'string') {
        items = hospital.items.filter((item) => item[filter.name] === filter.value);
      } else {
        // Array
        items = hospital.items.filter((item) => item[filter.name].includes(filter.value));
      }
      return { name: hospital.name, items: items };
    })

    this.setState({ data: filtered });
    this.applySort(this.state.sort);
  }

  applySearchKeyword() {
    let keyword = this.props.searchKeyword.toLowerCase();
    const filtered = jobs.map(hospital => {
      return {
        name: hospital.name,
        items: hospital.items.filter((item) => item.name.toLowerCase().includes(keyword) ||
          item.job_title.toLowerCase().includes(keyword) ||
          item.description.toLowerCase().includes(keyword) ||
          item.required_skills.includes(keyword)
        )
      };
    })

    this.setState({ data: filtered });
    this.applySort(this.state.sort);
  }

  sortBy = (field) => () => {
    let currentSort = this.state.sort;
    if (Object.keys(currentSort).length > 0 && Object.keys(currentSort).find((key) => key === field)) {
      if (currentSort[field] === 'asc') {
        currentSort[field] = 'desc';
      } else if (currentSort[field] === 'desc') {
        delete currentSort[field];
      }
    } else {
      currentSort[field] = 'asc';
    }
    this.setState({ sort: currentSort });
    // Use the local variable so don't have to wait for setState to finish
    this.applySort(currentSort);
  };

  applySort(sort) {
    console.log('Sorting by', sort);
    const sortedJobs = this.state.data.map(hospital => {
      let sorted = hospital.items;
      Object.keys(sort).forEach(key => {
        sorted = sorted.sort((item1, item2) => {
          if (sort[key] === 'asc') {
            if (item1[key] < item2[key]) {
              return -1;
            } else if (item1[key] > item2[key]) {
              return 1;
            } else {
              return 0;
            }
          } else {
            if (item1[key] > item2[key]) {
              return -1;
            } else if (item1[key] < item2[key]) {
              return 1;
            } else {
              return 0;
            }
          }
        });
      });
      return {
        name: hospital.name,
        items: sorted
      };
    })
    this.setState({ data: sortedJobs });
  }

  renderSortingIcon(direction) {
    if (direction === 'asc') {
      return (
        <span className="w-4 h-4 inline-block text-pink-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
          </svg>
        </span>
      );
    } else if (direction === 'desc') {
      return (
        <span className="w-4 h-4 inline-block text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
          </svg>
        </span>
      );
    }
  }

  render() {
    const { data, totalJobs, sort } = this.state;
    return (
      <React.Fragment>
        <div className="sort-bar flex justify-between bg-white p-4">
          <div className="total-jobs">
            <span className="font-bold">{totalJobs}</span> job postings
          </div>
          <div className="sort-options space-x-4">
            <span className="text-gray-500">Sort By</span>
            <span className="cursor-pointer" onClick={this.sortBy('county')}>
              Location
              {this.renderSortingIcon(sort.county)}
            </span>
            <span className="cursor-pointer" onClick={this.sortBy('job_title')}>
              Role
              {this.renderSortingIcon(sort.job_title)}
            </span>
            <span className="cursor-pointer" onClick={this.sortBy('department')}>
              Department
              {this.renderSortingIcon(sort.department)}
            </span>
            <span className="cursor-pointer" onClick={this.sortBy('required_credentials')}>
              Education
              {this.renderSortingIcon(sort.required_credentials)}
            </span>
            <span className="cursor-pointer" onClick={this.sortBy('experience')}>
              Experience
              {this.renderSortingIcon(sort.experience)}
            </span>
          </div>
        </div>
        <div className="hospital-list bg-white p-4">
          {data.map((hospital) => <HospitalJob key={hospital.name} hospital={hospital} />)}
        </div>
      </React.Fragment>
    );
  }
}
