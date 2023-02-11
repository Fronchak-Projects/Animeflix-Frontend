import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { redirect } from 'react-router-dom';
import { CategoryName } from '../types/domain/CategoryName';
import { InvalidEntityError } from '../types/domain/InvalidEntityError';
import { getAuthData } from "./storage";

export const BASE_URL = 'http://localhost:8080';

const CLIENT_ID = "myclientid";
const CLIENT_SECRET = "myclientsecret";

const basicHeader = () => {
  return `Basic ${ window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`) }`;
}

type LoginData = {
  username: string;
  password: string;
}

export const requestBackendLogin = (loginData: LoginData) => {

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: basicHeader()
  }

  const data = qs.stringify({
    username: loginData.username,
    password: loginData.password,
    grant_type: 'password'
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers
  });

}

export const requestBackend = (config: AxiosRequestConfig) => {

  const headers = config.withCredentials ? {
    Authorization: 'Bearer ' + getAuthData().access_token
  } : config.headers;

  const newConfig: AxiosRequestConfig = { ...config, headers, baseURL: BASE_URL };

  return axios(newConfig);
}

export const requestAllCategoryNames = (filter: string = '') => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    url: '/categories/all',
    method: 'get',
    params: {
      filter
    }
  }
  return axios(config);
}

export const getParamsToAnimePageFromRequest = (request: Request) => {
  const url = new URL(request.url);
  const filter = url.searchParams.get("filter") || "";
  const categoryId = url.searchParams.get("categoryId") || 0;
  const page = url.searchParams.get("page") || 0;
  return {
    filter,
    categoryId,
    page,
    size: 3
  }
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  //console.log('Interceptors antes da requisição');
  return config;
}, function (error) {
  // Do something with request error
  //console.log('Interceptors erro na requisição');
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  //console.log('Interceptors da resposta com sucesso');
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  //console.log('Interceptors do erro na resposta');
  return Promise.reject(error);
});



export const isInvalidEntityError = (e: any): [boolean, InvalidEntityError | null] => {
  const status = e?.response?.data?.status;
  if(status && (status === 422 || status === 404)) {
    return [true, e.response.data as  InvalidEntityError];
  }

  return [false, null];
}
