import NavBar from '../container/NavBar';
import Footer from '../container/Footer';
import SearchBar from '../components/SearchBar';
import JobBoard from '../components/JobBoard';
export default function IndexPage({ filters }) {
  return (
    <div className="bg-gray-200">
      <NavBar />
      <SearchBar />
      <JobBoard filters={filters}/>
      <Footer />
    </div>
  )
}

export const getServerSideProps = async () => {
  const baseUrl = process.env.URL;
  const res = await fetch(`${baseUrl}/api/filters`);
  const filters = await res.json();
  if (!filters) {
    return {
      filters: {},
    };
  }
  return {
    props: { 
      filters 
    }
  };
};
