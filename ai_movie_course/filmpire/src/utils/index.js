import axios from "axios";

export const moviesAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesAPI.get("/authentication/token/new");
    const token = data.request_token;

    if (data.success) {
      localStorage.setItem("request_token", token);

      // redirect user
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log("Your token could not be created, please try again.");
  }
};

export const createSessionID = async () => {
  const token = localStorage.getItem("request_token");

  if (token) {
    try {
        // destructure response to get data, destructure data to get
        // session id
      const { data: { session_id } } = await moviesAPI.post("/authentication/session/new", {
        request_token: token,
      });

      localStorage.setItem("session_id", session_id);

      return session_id;
    } catch (error) {
        console.log(error)
    }
  }
};
