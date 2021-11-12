import axios from "axios";

const HTTP = axios.create({
   baseURL: "https://ibsns.ddns.net/api/",
   // baseURL: "/api/",
   headers: {
      "Content-Type": "application/json",
      "Accept-Language": "en",
   },
   // withCredentials: true,
});

export default HTTP;
