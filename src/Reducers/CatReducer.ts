import { CatActionTypes } from "../redux/actions/CatActions";

export interface CatReducerState {
    catItems: any;
    loading: boolean;
    loaded: boolean;


  };

  const initialState: CatReducerState = {
    catItems: [],
    loaded: false,
    loading: false,

  };

  export const CatReducer = (
    state = initialState,
    action,
  ): CatReducerState => {
    switch (action.type) {
      
      case CatActionTypes.REQUEST_CAT_LIST: {
        
        return {...state, loading: true};
      }
      case CatActionTypes.CAT_LISTS_SUCCESS: {
         
        return {
          ...state,
          catItems: action.page === 0 ? action.payload : [...state.catItems,...action.payload],
          loading: false,
          loaded: true,
      
         
        };
      }
      case CatActionTypes.CAT_ERROR: {
        return {...initialState};
      }
  
     
      default: {
        return state;
      }
    }
  };
  