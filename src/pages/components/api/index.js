import axios from "axios"

const BASE_URL = "http://localhost:3000";

const apiFetch = axios.create({
  baseURL: BASE_URL,
  method: 'get'
})

export default apiFetch;