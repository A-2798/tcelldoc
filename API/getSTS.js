import axios from "util/request.js"
//获取阿里云上传通行证
export function getSTS() {
  return axios({
    url: '/ali/obtainPolicy',
    method: 'GET',
    data: { dir:'kz-resources/tcelldoc/image/' }
  })
 }
 
