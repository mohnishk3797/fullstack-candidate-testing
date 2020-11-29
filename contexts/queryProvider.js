import { useState, useEffect } from "react";

import QueryContext from './queryContext';

let previousController;

const QueryProvider = ({ children }) => {

  const [jobResult, setJobResult] = useState([]);

  const [queryFields, setQueryFields] = useState({
    search: '',
    filter: {},
    sort: {}
  });

  useEffect(async () => {

    //To support previous request abort
    const controller = new AbortController();
    const { signal } = controller;
    if (previousController) {
      previousController.abort();
    }
    previousController = controller;
    try {
      const res = await fetch('/api/jobs', {
        signal,
        method: 'POST',
        body: JSON.stringify(queryFields)
      })
      const data = await res.json();
      setJobResult(data);
    } catch (error) {
      if (error.name === "AbortError") {
        //ignore
      } else {
        throw error;
      }
    }
    
  }, [queryFields]);

  return (
    <QueryContext.Provider value={{ fields: queryFields, setFields: setQueryFields, jobs: jobResult}}>
      {children}
    </QueryContext.Provider>
  )
}

export default QueryProvider;