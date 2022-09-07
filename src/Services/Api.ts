import {getEnvVariable} from '../environment';
import {Http} from './http';

export class Api {
 
  static getCatItems(pageNo,id) {
    console.log("page no ",pageNo);
    console.log(getEnvVariable().url + 'images/search?breed_ids=' + id  + '&limit=10&page=' + pageNo);
    return Http.get(getEnvVariable().url + 'images/search?&limit=10&page=' + pageNo);
  }
}
