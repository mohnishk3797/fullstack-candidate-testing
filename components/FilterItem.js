import { useState } from 'react';
import {useQueryFieldsContext } from '../contexts/queryContext';

const FilterItem = ({ filters, filter}) => {
  const numberFormatter = new Intl.NumberFormat()

  const [isModalOpen, setModalOpen] = useState(false);
  const { fields, setFields } = useQueryFieldsContext();
  
  const handleChange = (filterValue) => {

    if (fields.filter[filter] === filterValue) {
      delete fields.filter[filter]
    } else {
      fields.filter[filter] = filterValue
    }

    setFields({...fields})
  }
  
  return (
    <div className="bg-white h-auto lg:p-6 p-4">
      <h3 className="font-bold capitalize mb-2">{filter.replace('_', ' ')}</h3>
      {
        filters[filter].slice(0, 10).map((item, i) => {
          return (
            <div 
              className={`flex space-x-2 mb-2 cursor-pointer ${fields.filter[filter] === item.key ? 'text-blue-500': ''}`}
              onClick={() => handleChange(item.key)}
              key={item.key}
              >
              <h4>{item.key}</h4>
              <p className="text-gray-600">{numberFormatter.format(item.doc_count)}</p>
            </div>
          )
        })
      }
      {
        filters[filter].length > 10 && (
          <button onClick={() => setModalOpen(true)} className="text-blue-500">Show more</button>
        )
      }
      {
        isModalOpen && (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 w-3/4">
          <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300">
              <h3 className="text-3xl font-semibold capitalize">
                {filter.replace('_', ' ')}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setModalOpen(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  X
                </span>
              </button>
            </div>
            <div className="flex flex-wrap p-6 max-h-96 overflow-x-auto">
              {
                filters[filter].map((item, i) => {
                  return (
                    <div 
                      className={`flex space-x-2 w-full lg:w-1/4 cursor-pointer p-2 ${fields.filter[filter] === item.key ? 'text-blue-500': ''}`}
                      onClick={() => handleChange(item.key)}
                      key={item.key}
                      >
                      <h4>{item.key}</h4>
                      <p className="text-gray-600">{numberFormatter.format(item.doc_count)}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div></>)
      }
    </div>
  )
}

export default FilterItem;