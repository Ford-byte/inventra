import axios from "axios";
import rateLimit from "axios-rate-limit";

const apiClient = rateLimit(
  axios.create({
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  {
    maxRequests: 10,
    perMilliseconds: 1000,
    maxRPS: 10,
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default apiClient;