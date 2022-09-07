export enum CatActionTypes {
    REQUEST_CAT_LIST = 'Request cat list',
    CAT_LISTS_SUCCESS = 'Success cat list',
    CAT_ERROR = 'Cat Error Occured',
  }
export class CatActions {
   
    static CatListRequestAction = (params) => {
      return {
        type: CatActionTypes.REQUEST_CAT_LIST,
        payload: {
            page: params.pageNo,
        }
      };
    };
    static CatListSuccessAction = (diaryList: any,pageNo:Number) => {
      return {
        type: CatActionTypes.CAT_LISTS_SUCCESS,
        payload: diaryList,
        page : pageNo
      };
    };
    static CatErrorOccured = () => ({
      type: CatActionTypes.CAT_ERROR,
    });
  }