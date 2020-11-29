import FilterItem from './FilterItem';

const FilterList = ({ filters }) => {
  return (<>
    {Object.keys(filters).map((filter, i) => {
      return <FilterItem filters={filters} filter={filter} key={filter}/>;
    })}
    </>
  )
}

export default FilterList;