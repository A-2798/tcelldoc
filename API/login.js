let axios = function (obj) {
	return uni.request(obj)
}
//获取验证码
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

