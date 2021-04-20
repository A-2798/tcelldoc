import axios from "util/request.js"


export function ryToken(option) {
  return axios({
    url: '/rongcloud/getToken',
    method: 'POST',
    data:option
  })
}