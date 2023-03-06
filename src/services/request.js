import axios from "axios"
import { baseApiUrl } from "./config"

const client = axios.create({ baseURL: baseApiUrl })

export default function medusaRequest(method, path = "", payload = {}) {
  const options = {
    method,
    withCredentials: true,
    url: path,
    data: payload,
    json: true,
  }
  return client(options)
}
