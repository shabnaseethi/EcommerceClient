import axios from "axios";
const CustomAxios = axios.create();
CustomAxios.interceptors.request.use(
  (req) => {

    req.headers["authorization"] = localStorage.getItem("accessToken");
    return req;
  },
  (err) => {
    return Promise.resolve(err);
  }
);

CustomAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const status = err.response ? err.response.status : null;
    const originalReq = err.config;
    if (status === 403) {
      const token =  localStorage.getItem("refreshToken");
      axios
        .post("/refreshtoken", {
          token:token
          
        })
        .then((response) => {
         
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          CustomAxios(originalReq);
        })

        .then((err) => {
          throw err;
        });
    }
    return Promise.resolve(err);
  }
);

export default CustomAxios;
