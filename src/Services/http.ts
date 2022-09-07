import _axios, {AxiosRequestConfig} from 'axios';
import {getEnvVariable} from '../environment';
import {ToastAndroid} from 'react-native';


export class Http {
  token : any;
  private static axios = _axios.create({
    baseURL: getEnvVariable().url,
    headers: {
      'x-api-key' : '9eb6a770-8957-4111-b49e-5de441fe42fe',
      'Content-Type' : 'application/json'

    },
  });
  static async get(url, config?: AxiosRequestConfig) {

    try {
    //  const token = await Http.getToken();
    
      const header = await Http.getHeader();
      const response = await Http.axios.get(url, header);
      if (response) {
      //  console.log(response.data);
        return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }
  static async post(url, body?: object, config?: AxiosRequestConfig) {
    try { 
     const header = await Http.getHeader();
      const response = await Http.axios.post(url, JSON.stringify(body), header);
      if (response) {
        //  console.log("Response ",response.data);
       return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      //console.log("Error ",e);
      return Promise.reject(e);
    }
  }

  static async postAuth(url, body?: object, config?: AxiosRequestConfig) {
    try { 
      const response = await Http.axios.post(url, JSON.stringify(body), config);
      if (response) {
        //  console.log("Response ",response.data);
       return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      //console.log("Error ",e);
      return Promise.reject(e);
    }
  }
  static async patch(url, body?: object, config?: AxiosRequestConfig) {
    try {
      const response = await Http.axios.patch(url, body, config);
      if (response) {
        return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }

  private static handleErrors(error) {
    console.log("Error is ",JSON.stringify(error));
    if (error.response) {
      const message = error.response.data.message;
      const errorMessage = message
        ? message
        : 'Something Went Wrong. Please Try Again';
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    } else {
      ToastAndroid.show(
        'Something Went Wrong.Please Try Again',
        ToastAndroid.LONG,
      );
    }
  }

  static async getHeader()
  {
      let header = {headers: {
        'x-api-key' : '9eb6a770-8957-4111-b49e-5de441fe42fe',
        'Content-Type' : 'application/json'
       }};

       return header;
  }
}
