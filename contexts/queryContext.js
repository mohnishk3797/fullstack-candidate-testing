import { useContext, createContext } from "react";

const QueryContext = createContext({
  fields: {
    search: '',
    filter: {},
    sort: {}
  },
  jobs: [],
  setFields: () => {}
})

export default QueryContext;

export const useQueryFieldsContext = () => useContext(QueryContext);