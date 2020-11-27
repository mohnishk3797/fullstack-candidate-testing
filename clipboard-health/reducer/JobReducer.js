import {
  sortResults,
  FilterByJob
} from '../utils/utils.functions';

export const JobReducer = (state, action) => {
  switch (action.type) {
    case "START_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "ERROR_REQUEST":
      return {
        ...state,
        isLoading: false,
          error: true,
      };
    case "RESPONSE_REQUEST":
      return {
        ...state,
        isLoading: false,
          jobs: action.jobs,
      };

    default:
      return {
        ...state
      };
  }
};

export const initialJobReducer = {
  jobs: [],
  isLoading: false,
  error: false,
};