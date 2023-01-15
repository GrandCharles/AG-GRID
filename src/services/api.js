import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU1JfSUQiOjIxNTEsIlVTUl9JRF9TQUlCV0VCIjoxNzQyOCwiVVNSX0xPR0lOIjoiQ0hBUkxFUy5TQUlCV0VCIiwiVVNSX1RJUE8iOjEsIkVNUF9JRCI6IjEwNSIsIkVNUF9TQUlCV0VCIjoxMzYyLCJFTVBfVUYiOiJHTyIsIkVNUF9SQVpBT19TT0NJQUwiOiIxMDUgLSBTQUlCV0VCIElNUExBTlRBQ0FPIiwiRU1QX0NOUEoiOiI3OTgxNzQ5OTAwMDE4NCIsIlBXRENFUlQiOiIxMjM0Iiwicm9sZXMiOltdLCJpYXQiOjE2NDE5ODk4MjIsImV4cCI6MTY0MjE2MjYyMn0.22OWEc7r76OiFh4KVWva8yccOAdBUXdiWRP1ub4sbzA"


const api = axios.create({
    //baseURL: "https://app.saibweb.com.br/apisaibweb",
    baseURL: "http://172.16.1.30:2007",
  });
  
  api.interceptors.request.use(async config => {
    if (token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default api;

