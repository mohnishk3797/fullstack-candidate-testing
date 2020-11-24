import Head from 'next/head'
import styles from './jobs.module.css'
import {useState} from 'react'
import ta from 'time-ago'

function Job({joblist}){
  
  return(
    <>
    <ul className="list-group list-group-flush" style={{marginTop: '10px'}}>

      {
        joblist.map((job)=>{
          return(
          <li className="list-group-item">
            <h6> {job.job_title}</h6>
            <div className='row' style={{display: 'flex'}}>
            <p className='col'> {`${job.job_type} | ${job.salary_range.join(' - ')} | ${job.city}`}</p>
            <p className='col' style={{marginLeft: '60%'}}>{ta.ago(`${job.created}`)}</p>
            </div>
          
          </li>
          )
        })
      }

    </ul>
    </>
  )

}


export default function Jobs({ jobs, setfiltertext, setsortType, sortType, filtertext }) {
  
    const [showJob, setshowJob] = useState(false);
    const [showing, setshowing] = useState([])
    

    const toggleShow =(name)=>{
      const showingCopy = [...showing]
      const index = showingCopy.indexOf(name)

      if (index >= 0 ){
        showingCopy.splice(index, 1)
        
      }else{      
        showingCopy.push(name)   
      }
      setshowing(showingCopy)
    }

    const totalPosting =()=>{
      const total = jobs.reduce((acc, curr)=>{
        
        return( acc+ curr.total_jobs_in_hospital )
      }, 0)
     
      return total
    }


    const total =totalPosting()

    const filterNames=[
      {
        text:'Sort by',
        value: ''
      },
      {
        text:'Location',
        value:'name'
      }
      ,
      {
        text:'Role',
        value:'role'
      }
      ,
      {
        text:'Department',
        value:'department'
      }
      ,
      {
        text:'Education',
        value:'education'
      }
      ,
      {
        text:'Experience',
        value:'experience'
      }

    ]

  return (
    <>
      <Head>
        <title>Jobs</title>
      </Head>
      <div style={{color:'#486280'}}>
        <div style={{marginLeft:0}}className={`row ${''}`}>
        <p> <span style={{ fontWeight:"Bold", }} >{total}</span> Job postings</p>
        <ul className={`col ${styles.filterItems}`} style={{marginLeft: '45%'}}>
          

            {filterNames.map(name=>
            <div
            onClick={()=>{
              if(!name.value) return;

              if(name.value===filtertext){       
                setsortType(!(!!sortType))
              }else{
                setfiltertext(name.value)
                setsortType(!(!!sortType))
              }
            }}
            style={{cursor: name.value===''? "default" :'pointer'}}
            
            >
            <li className={`${filtertext && filtertext===name.value? 'active-filter': ''} ${styles.li}`}>{name.text}</li>
          
            </div>
            )
            }
                
        </ul>
        </div>
        
        <div className={``}>
        {jobs.length===0 &&
        (<h3>No search results Found !! </h3>)
        }
        { jobs.map(job=>{
          const initials =  (job.name.slice(0,2)).toUpperCase()
          
          return(
            <>
          <div 
            className = 'job-container'
            style={{display:'flex', cursor:'pointer'}}
            onClick={()=>toggleShow(job.name)}
            >
            <div className={styles.initials}>{`${initials}`}</div>
            <p > {`${job.total_jobs_in_hospital} jobs from ${job.name}`} </p>
          </div> 
          {showing.includes(job.name) &&<Job joblist={job.items}/>}
          </>  
          )
        }) 
        }
        </div>
        </div>
      
        <div >
    
   
  </div>
    </>
  )
}

