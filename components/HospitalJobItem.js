import React from 'react';
import Moment from 'react-moment';

export default class HospitalJobItem extends React.Component {
  state = {
    show: false,
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { item } = this.props;
    return (
      <React.Fragment>
        <div className="border-t flex justify-between items-center pt-4 pb-4 pl-2 pr-2" onClick={this.toggleShow}>
          <div>
            <div className="job-item__title font-bold">{item.job_title}</div>
            <div>
              {`${item.job_type} | $${item.salary_range[0].toLocaleString()} - $${item.salary_range[1].toLocaleString()} an hour | ${item.county}, ${item.state}`}
            </div>
          </div>
          <div><Moment date={item.created} fromNow /></div>
        </div>
        <div className={`job-item__description flex items-center pl-2 pr-2 ${this.state.show ? '' : 'hidden'}`}>
          <div className="w-4/5">
            <div className="flex pb-4">
              <div className="w-1/2 font-bold">Department:</div>
              <div className="w-1/2">{item.department.join(', ')}</div>
            </div>
            <div className="flex pb-4">
              <div className="w-1/2 font-bold">Hours / shifts:</div>
              <div className="w-1/2">{item.hours[0]} hours / {item.work_schedule}</div>
            </div>
            <div className="flex pb-4">
              <div className="w-1/2 font-bold">Summary:</div>
              <div className="w-1/2">{item.description}</div>
            </div>
          </div>
          <div className="w-1/5">
            <div className="flex justify-end pb-2">
              <button className="bg-blue-400 p-2 px-4 rounded-lg">Job details</button>
            </div>
            <div className="flex justify-end">
              <button className="block border-blue-400 border-2 p-2 px-4 rounded-lg">Save job</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
