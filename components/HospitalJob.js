import React from 'react';
import HospitalJobItem from './HospitalJobItem';

export default class HospitalJob extends React.Component {
  state = {
    show: false,
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { hospital } = this.props;
    if (hospital.items.length > 0) {
      return (
        <React.Fragment>
          <div className="block mt-5 mb-5 flex items-center cursor-pointer" onClick={this.toggleShow}>
            <div className="hospital__icon bg-gray-300 border-gray-300 p-0.5 rounded-lg border-2 w-10 h-10 inline-block uppercase text-white text-xl flex items-center justify-center">
              <span>{hospital.name.substr(0, 2)}</span>
            </div>
            <span className="hospital__title ml-4">{hospital.items.length.toLocaleString()} jobs for {hospital.name}</span>
          </div>
          <div className={`hospital__items ${this.state.show ? '' : 'hidden'}`}>
            {hospital.items.map((item) => <HospitalJobItem key={`${item.hospital_id}-${item.job_id}`} item={item} />)}
          </div>

        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}
