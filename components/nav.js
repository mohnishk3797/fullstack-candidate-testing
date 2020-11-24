import 'bootstrap/dist/css/bootstrap.min.css'

export default function Nav(){
  return(
    <nav className="navbar">
      
      <a className="navbar-brand" href="#">HEALTH EXPLORE</a>

      <ul className="nav middle-items">
          <li className="nav-item">
            <a className="nav-link" href="#">PROFILE</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">JOBS</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">PROFFESSIONAL NETWORK</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">LOUNGE</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">SALARY</a>
          </li>
      </ul>

      <ul className="nav nav-last">
          <li className="nav-item">
            <button className=" btn btn-light nav-link nav-button" href="#">CREATE JOB</button>
          </li>
          <li className="nav-item nav-profile">
            <div className=" bg-primary nav-profile" href="#">JO</div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">LOGOUT</a>
          </li>
      </ul>

    </nav>
  )
  

}