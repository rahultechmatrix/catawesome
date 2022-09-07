import { CatActions } from '../redux/actions/CatActions';

import {Api} from './Api';



export class Repositry {
  static getCatItems(
    status: {loading: boolean; loaded: boolean;pageNo:Number;id:any},
    force = false ) 
    {
        console.log("status ",status) 
    return async dispatch => {
      try {
        
        if ((!status.loaded && !status.loading) || force) {
          dispatch(CatActions.CatListRequestAction(status));
          const data = await Api.getCatItems(status.pageNo,status.id);
          
          const catItems: any = data;
          
          dispatch(CatActions.CatListSuccessAction(catItems,status.pageNo));
        } else {
          return;
        }
      } catch (e) {
        dispatch(CatActions.CatErrorOccured());
        return Promise.reject(e);
      }
    };
  }
 
 

}
