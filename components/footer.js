export default function Footer({filters}){
  
  return(
    <>
      <div className='row' 
      style={{
        boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
        padding: '3rem'
      }}
      >
        <div className='col-5'>
          <h4> About us</h4>
          <p> We are a team of nurses doctors technolgists, and executives dedicated to help nurses find jobs thatthey love</p>
          <p>All copyrights reserved &copy;2020 -Health Explore </p>

        </div>
        <div className='col-4'>
        <h4> About us</h4>
          <p>Nurses</p>
          <p>Employees</p>
          <p>Social Networking</p>
          <p>Jobs</p>
        </div>
        <div className='col-3'>
        <h4> Privacy</h4>
          <p>Terms of use</p>
          <p>Privacy policy </p>
          <p>Cookies policy </p>
        </div>
      </div>
    </>
  )

}