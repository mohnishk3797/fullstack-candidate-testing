import { footerElements } from '../constants';
const Footer = () => {
  return (
    <footer className="bg-white flex flex-wrap px-7 pb-10 pt-3">
      <div className="lg:w-1/2 w-full flex flex-col mb-2">
        <h3 className="text-lg">About us</h3>
        <p className="text-sm">We are a team of nurses, doctors, technologists and executives dedicated to help nurses find jobs that they love.</p>
        <p className="text-sm">All copyrights reserved &copy; 2020 - Health Explore</p>
      </div>
      <div className="lg:w-1/4 w-full flex flex-col mb-2">
        <h3 className="text-lg">Sitemap</h3>
        {
          footerElements.sitemap.map((element, i) => 
            <a href={element.link} key={i}>{element.title}</a>
          )
        }
      </div>
      <div className="lg:w-1/4 w-full flex flex-col mb-2">
        <h3 className="text-lg">Privacy Policy</h3>
        {
          footerElements.privacy.map((element, i) => 
            <a href={element.link} key={i}>{element.title}</a>
          )
        }
      </div>
    </footer>

  )
}

export default Footer;