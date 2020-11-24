import 'bootstrap/dist/css/bootstrap.min.css'
import Filtered from './filter'


export default function Filters({filters}){
  
  const filterKeys = ['job_type', 'department', 'work_schedule', 'experience']
  return(
    <>
    { filterKeys.map((title )=>{
      return(
       
        <Filtered filter={filters[title]} title={title}/>
    
      )
    })

    }
    </>
  )

}