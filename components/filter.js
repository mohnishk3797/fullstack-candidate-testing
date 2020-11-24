import {useState} from 'react'

export default function Filtered({filter, title}){

  const AllFilters = title==='department'? filter.slice(0,10) : filter
  
  const [jobFilters, setjobFilters] = useState(AllFilters)
  

  const name = title==='job_type'? 
    'Job Type': title==='work_schedule'?
    'Work Schedule': title
  
    
  return(
    <div 
    style={{
      padding: '15px',
      marginBotton: '10px'
      
    }}
    className="containing-card"
    >
      <h6>{name.toUpperCase()} </h6>
      { jobFilters.map(jobType=>{

        return(
        <>
        <p key={jobType.key}>
          {jobType.key} 
          <span className ="filter-count">{jobType.doc_count}</span> 
        </p>
        </>
        )
      })

      } 
      { title==='department' &&
       
        <p
        className='clickable'
        onClick={()=>{
          jobFilters.length ===10? setjobFilters(filter): setjobFilters(AllFilters)
        }
        }
        > 
        {jobFilters.length ===10? 'show more': 'show less'}
        </p>
      }
      
    </div>
  )

}