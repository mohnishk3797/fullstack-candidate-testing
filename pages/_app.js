import NextHead from 'next/head'
import '../public/styles/globals.css';
function MyApp({ Component, pageProps }) {
  return (
    <div className=" bg-gray-100">
      <NextHead>
        <title>Clipboard Health</title>
        <link rel="icon" href="/icons/favicon.png" />
      </NextHead>

      <div className="container md:mx-auto  flex flex-col justify-center py-6 bg-white">
        <Header />
      </div>

      <div className="container md:mx-auto  flex flex-col justify-center py-6">
        <Component {...pageProps} />
      </div>

      <div className="container md:mx-auto  flex flex-col justify-center py-6">
        <Footer />
      </div>
    </div >
  )
}

function Footer() {
  return (
    <div className="flex flex-row border-t border-gray-200 sticky bg-white p-3">
      <div className="flex-1 items-center justify-center w-4/12 py-3">
        <p className="text-xl font-medium text-black">
          About Us
        </p>
        <div className="p-px text-sm" >
          <div>We are a team of nurses, doctors, technologists and executives dedicated to help nurses
          find jobs that they love
          </div>
          <div>
            All copyrights reserved @ 2020 - Health Explorer
          </div>
        </div>
      </div>
      <div className="flex-1 w-4/12">
        <p className="text-xl font-medium text-black">
          Site Map
        </p>
        <ul className="p-px text-sm" >
          <li>Nurses</li>
          <li>Employers</li>
          <li>Social Networking</li>
          <li>Jobs</li>
        </ul>

      </div>
      <div className="flex-1 w-4/12">
        <p className="text-xl font-medium text-black">
          Privacy
        </p>
        <ul className="p-px text-sm" >
          <li>Terms of use</li>
          <li>Privacy Policy</li>
          <li>Cookies Policy</li>
        </ul>
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="flex w-auto mx-3">
      <div className="text-left px-6 text-blue-500 font-bold w-4/12">
        Health Explorer
      </div>
      <div className="text-left flex-col font-medium w-1/12">
        Profile
      </div>
      <div className="text-left flex-col font-medium w-1/12">
        Jobs
      </div>
      <div className="text-left flex-col font-medium w-1/12">
        Professional Network
      </div>
      <div className="text-left flex-col font-medium w-1/12">
        Lounge
      </div>
      <div className="text-left flex-col font-medium w-1/12">
        Salary
      </div>
      <div className="container flex justify-start flex-col w-1/12 ">
        <button className="flex-initial w-auto bg-white text-blue-500 border-blue-500 border p-1 rounded-md font-medium">
          Create Jobs
        </button>
      </div>
      <div className="text-right font-medium w-2/12">
        Log Out
      </div>
    </div>
  )
}

export default MyApp
