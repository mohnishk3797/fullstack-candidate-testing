import { sortingElements } from '../constants';

import {useQueryFieldsContext } from '../contexts/queryContext';

const SortingItems = () => {
  const { fields, setFields } = useQueryFieldsContext();

  const handleClick = (element) => {

    if (fields.sort[element.key]) {
      if (fields.sort[element.key] === 'asc') {
        fields.sort[element.key] = 'desc';
      } else {
        delete fields.sort[element.key];
      }
    } else {
      fields.sort[element.key] = 'asc';
    }

    setFields({ ...fields });
  }
  return (
    <>
    {
      sortingElements.map((element, i) => {
        let sorting = fields.sort[element.key] ? fields.sort[element.key] === 'asc' ? 'up' : 'down' : '' 
        return (
          <p className={`capitalize cursor-pointer ${sorting ? 'text-blue-500' : ''}`} onClick={() => handleClick(element)} key={i}>
            {element.title} {sorting ? sorting === 'up' ? <span>&#x2B06;</span>: <span>&#x2B07;</span> : ''}
          </p>
        )
      })
    }
    </>
  )
}

export default SortingItems;