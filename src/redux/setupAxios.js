const setupAxios = (axios, store) => {
  axios.interceptors.request.use(
    (config) => {
      const { auth } = store.getState();
      if (auth) {
        config.headers.AccessKey = process.env.REACT_APP_ACCESS_KEY;
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (err.response && err.response.status === 401) {
        window.location.href = "/";
        // store.dispatch(defaultLogout());
      }
      return err.response;
    }
  );
};

export default setupAxios;