import axios from "util/request.js"
//获取阿里云OSSPolicy权限（公开读私写）
export function getPolicyCommon(url) {
 return axios({
  url: '/ali/obtainPolicy',
  method: 'GET',
  data: {
   dir: url
  }
 })
}
//获取私有OSSPolicy权限（私有读写）
export function getPolicyPrivate(url) {
 return axios({
  url: '/ali/privateObtainPolicy',
  method: 'GET',
  data: {
   dir:url
  }
 })
}
//将私有url签名后公开化
export function signatureUrl(url) {
 return axios({
  url: '/ali/signatureUrl',
  method: 'GET',
  data: {
   fileUrl:url
  }
 })
}