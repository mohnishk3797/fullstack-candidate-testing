import React from 'react';
import Link from 'next/link';

export default class Nav extends React.Component {
  state = {
    showMenu: false,
  };

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    return (
      <nav className="uppercase font-bold bg-white flex flex-wrap justify-between lg:items-center sm:items-start p-6">
        <div className="hidden-menu-icon sm:place-self-start">
          <label htmlFor="menu-toggle" className="pointer-cursor block lg:hidden pr-4">
            <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>
          <input className="hidden" type="checkbox" id="menu-toggle" onClick={this.toggleMenu} />
        </div>

        <div className="left-side sm:w-5/6 flex-1 lg:flex lg:justify-between">
          <div className="flex-1 text-blue-400 font-extrabold">
            Health Explore
          </div>

          <div className={`${this.state.showMenu ? '' : 'hidden'} lg:flex lg:items-center lg:w-5/6`} id="menu">
            <nav>
              <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
                <li key="nav-profile" className="pr-2 pl-2">
                  <Link href="/profile"><a>Profile</a></Link>
                </li>
                <li key="nav-jobs" className="pr-2 pl-2">
                  <Link href="/jobs"><a>Jobs</a></Link>
                </li>
                <li key="nav-network" className="pr-2 pl-2">
                  <Link href="/network"><a>Professional Network</a></Link>
                </li>
                <li key="nav-lounge" className="pr-2 pl-2">
                  <Link href="/lounge"><a>Lounge</a></Link>
                </li>
                <li key="nav-salary" className="pr-2 pl-2">
                  <Link href="/salary"><a>Salary</a></Link>
                </li>
                <li key="nav-create-job-sm" className="pr-2 pl-2 lg:hidden">
                  <Link href="/jobs/create"><a>Create Job</a></Link>
                </li>
                <li key="nav-logout-sm" className="pr-2 pl-2 lg:hidden">
                  <Link href="/logout"><a>logout</a></Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="right-side flex justify-between items-center space-x-4">
          <div key="nav-profile" className="pt-1.5 pb-1.5 pr-3.5 pl-3.5 border-2 border-blue-400 text-blue-400 rounded-lg lg:inline sm:hidden">
            <Link href="/jobs/create"><a>Create Job</a></Link>
          </div>
          <div className="w-11 h-11 relative text-white">
            <span
              className="bg-red-500 p-0.5 w-6 h-6 rounded-full absolute top-0 right-0 z-10 text-center border-white border-2 text-xs">
              {this.props.newNotifications}
            </span>
            <Link href={`/users/${this.props.userId}`}>
              <a className="bg-blue-400 p-2 rounded-full absolute bottom-0">{this.props.userInitial}</a>
            </Link>
          </div>
          <div key="nav-logout" className="lg:inline sm:hidden">
            <Link href="/logout"><a>Logout</a></Link>
          </div>
        </div>
      </nav>
    );
  }
}
