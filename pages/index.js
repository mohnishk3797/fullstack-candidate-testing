import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import axios from 'axios'
import Jobs from '../components/jobs'
import Nav from '../components/nav'
import Filters from '../components/filters'
import Footer from '../components/footer'
import {useState, useEffect} from 'react'


export default function Home({ jobs, filters,  }) {


  const [allJobs, setallJobs] = useState(jobs);
  const [searchtext, setsearchtext] = useState('');
  const [filtertext, setfiltertext] = useState('')
  const [sortType, setsortType] = useState(false)


  const filterJobs=()=>{
    const filterCopy = jobs;
    const filtered = filterCopy.sort((a, b)=>{
      
      if(a[filtertext] > b[filtertext]){
        return 1
      }
      if(a[filtertext] < b[filtertext]){
        return -1
      }
      return 0

    })
    
    if(sortType){
      setallJobs(filtered)
    }else if(sortType ===false){
      setallJobs(filtered.reverse())
    }

      
  }

  const searchJobs = ()=> {
    const jobsCopy = jobs;
    const foundJobs = jobsCopy.filter(job=>{
      const nameCointains = (job.name.toLowerCase()).includes(searchtext.toLowerCase())
         
      const itemsContain = job.items.filter(item=> 
        (JSON.stringify(job.items)).includes(searchtext)
        )   
      return(
        nameCointains 
      )
    })

    setallJobs(foundJobs)

  }

  useEffect(()=>{
    if(searchtext.trim() === ''){
      setallJobs(jobs)
    }else{
      searchJobs()
    }

  }, [searchtext])

  useEffect(()=>{
      filterJobs()
  }, [filtertext, sortType])


  const handleChange = e =>{
    e.preventDefault();
    setsearchtext(e.target.value)
  }


  return (
    
    <Layout home>
      <>
      <Head>
        <title>Jobs</title>
      </Head>
      <div>
      <div className='top-nav-bar'>
      <Nav />
      </div>
      
      <div className='search'>
      <input 
      style={{
        height:'3.5rem',
        paddingLeft: '30px'
      }}
      placeholder='search for any keyword or company'
       name='searchtext' 
       type="text" 
       className="form-control" 
       id="searchtext"
       value={searchtext}
       onChange={(e)=>handleChange(e)}
       ></input>

      </div>
      <section >
      <div className="row" style={{margin:'10px 15px 10px 5px',}}>
        <div 
          className="col-3 ">
          <Filters filters={filters}/>
        </div>
        <div 
        style={{
          padding: '4rem 2rem 2rem 2rem'
        }}
        className="col-9 containing-card"
        >
          <Jobs jobs={allJobs} setfiltertext={setfiltertext} setsortType={setsortType} sortType={sortType} filtertext={filtertext}/>
        </div>
      </div>
      
      </section>
      <section>

      </section>
      </div>
      <Footer />
      </>
    </Layout>
  )
}

export async function getStaticProps() {
  
  
  const {PROTOCOL} = process.env|| 'http'
  const {HOST} = process.env||'localhost:3000'

 const res =  await axios.get(`${PROTOCOL}://${HOST}/api/jobs`)
 const filterResponse =  await axios.get(`${PROTOCOL}://${HOST}/api/filters`)
   
   return {
    props: {
      jobs: res.data.allJobs,
      filters: filterResponse.data.allFilters
    }
  }
}
