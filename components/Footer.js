import React from 'react';
import Link from 'next/link';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="p-10 flex justify-between">
        <div className="w-1/2">
          <div className="font-bold text-2xl">About us</div>
          <p>
            We are a team of nurses, doctors, technologist, and executives dedicated to help nurses find jobs that they love.
          </p>
          <p>
            All copyrights reserved &copy; 2020 - Health Explore
          </p>
        </div>
        <div className="w-1/4">
          <div className="font-bold text-2xl">Sitemap</div>
          <ul>
            <li><Link href="/nurses"><a>Nurses</a></Link></li>
            <li><Link href="/employers"><a>Employers</a></Link></li>
            <li><Link href="/social"><a>Social Networking</a></Link></li>
            <li><Link href="/jobs"><a>Jobs</a></Link></li>
          </ul>
        </div>
        <div className="w-1/4">
          <div className="font-bold text-2xl">Privacy</div>
          <ul>
            <li><Link href="/tnc"><a>Terms of use</a></Link></li>
            <li><Link href="/pp"><a>Privacy policy</a></Link></li>
            <li><Link href="/cookie"><a>Cookie policy</a></Link></li>
          </ul>
        </div>
      </div>
    );
  }
}
