let axios = function(obj) {
	return uni.request(obj)
} //这样就好了
//登录/注册 导入的request.js 初始化是没有token的 所以axios是不存在的
export function log(pn) {
	return axios({
		url: '/user/sendSMSByPhone',
		method: "POST",
		data: {
			phoneNumber:pn
		}
	})
}
//手机号验证码登录
export function login(data){
	return axios({
		url:'/patient/patientLoginByPhone',
		method:'POST',
		data:data
	})
}
//手机号密码登录
export function loginByPass(data){
	return axios({
		url:'/patient/patientLoginByPassword',
		method:'POST',
		data:data
	})
}
//找回密码
export function loginFindPass(data){
	return axios({
		url:'/patient/patientForgetPassword',
		method:'POST',
		data:data
	})
}

