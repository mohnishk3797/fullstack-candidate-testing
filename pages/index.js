import React from 'react';
import Filter from '../components/Filter';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import HospitalJobList from '../components/HospitalJobList';
import filters from '../data/filters.json';

const FILTER_FIELDS = [
  { name: 'job_type', type: 'string' },
  { name: 'department', type: 'array' },
  { name: 'work_schedule', type: 'string' },
  { name: 'experience', type: 'string' },
];

export default class IndexPage extends React.Component {
  state = {
    filter: null,
    searchKeyword: '',
  };

  setFilter = (fieldName, filterType) => (value) => () => {
    this.setState({ filter: { name: fieldName, type: filterType, value: value } });
  };

  setSearchKeyword = (e) => {
    this.setState({ searchKeyword: e.target.value });
  };

  render() {
    const { filter, searchKeyword } = this.state;
    return (
      <div className="container mx-auto">
        <Nav userInitial="JO" userId={100} newNotifications={2} />
        <div className="bg-gray-100 px-4 pb-8">
          <div className="pt-4 pb-4">
            <div className="p-4 flex items-center space-x-4 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text"
                     className="flex-1 focus:outline-none"
                     onChange={this.setSearchKeyword}
                     placeholder="Search for any job title, keywords, or company"
                     value={searchKeyword}
              />
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-4 pt-2 gap-4">
            <div className="lg:inline-block sm:hidden">
              {FILTER_FIELDS.map((field) => {
                if (filters[field.name]) {
                  return (
                    <div key={`filter-${field.name}`} className="pb-2">
                      <Filter
                        field_name={field.name}
                        options={filters[field.name]}
                        onFilter={this.setFilter(field.name, field.type)}
                        activeFilterValue={filter && filter.value}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className="lg:col-span-3">
              <HospitalJobList filter={filter} searchKeyword={searchKeyword} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
