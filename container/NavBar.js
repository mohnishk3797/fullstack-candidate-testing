
import { Fragment, useState } from "react";
import Link from 'next/link';

import { navbarElements } from '../constants';

const MobileNavBar = () => {
  return (
    <ul className="flex lg:hidden flex-col bg-white items-center space-y-2 pb-4 uppercase ">
      {
        navbarElements.map((element, i) =>
          <li key={i} className="py-2 mx-4">
            {element.title}
          </li>
        )
      }
      <button className="py-1 mx-2 border border-blue-700 text-blue-500 rounded-md font-semibold my-2 px-2">CREATE JOB</button>
      <h4 className="py-2 mx-4">
        LOGOUT
      </h4>
    </ul>
  )
}

const NavBar = () => {

  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <Fragment>
      <nav className="bg-white flex items-center shadow text-gray-700 w-full h-16 z-20 px-6 justify-between uppercase font-bold text-xs">
      <button className="block lg:hidden" onClick={() => setNavOpen(!isNavOpen)}>
        <img src="/square.png" />
      </button>
        <Link href="/">
          <h4 className="text-blue-500 font-semibold text-lg">
            Health Explore
          </h4>
        </Link>

        <ul className="hidden lg:flex space-x-10">
          {
            navbarElements.map((element, i) =>
              <li key={i} className="font-semibold">{element.title}</li>
            )
          }
        </ul>

        <div className="flex space-x-6 items-center">
          <button className="hidden lg:flex text-blue-500 border border-blue-700 hover:border-blue-600 hover:text-blue-500 rounded-md px-2 py-1">
            CREATE JOB
        </button>
          <span className="inline-block relative">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm border-2">
              JO
          </div>
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-600 border border-white text-xs flex items-center justify-center text-white font-thin">
              2
          </span>
          </span>
          <h4 className="hidden lg:flex">Logout</h4>
        </div>
      </nav>
      {
        isNavOpen && <MobileNavBar />
      }
    </Fragment>
  )
}

export default NavBar;