import axios from "util/request.js"
//上传基本信息
export function uploadMessage(data) {
	return axios({
		url: '/doctorInfo/saveUpdateDoctorInfo',
		method: "POST",
		data:data
	})
}

//查询图文问诊
export function selInquirysetting() {
	return axios({
		url: '/Inquiry/selInquirysetting',
		method: "POST"
	})
}

//预约问诊
export function subscribe() {
	return axios({
		url: '/Inquiry/selInquirysetting',
		method: "POST"
	})
}

//开通图文问诊
export function education() {
	return axios({
		url: '/Inquiry/openOnlineinquirysetting',
		method: "POST"
		
	})
}

//关闭图文问诊
export function close() {
	return axios({
		url: '/Inquiry/closeOnlineinquirysetting',
		method: "POST"
	})
} 

//更新问答问诊
export function update(data) {
	return axios({
		url: '/Inquiry/updateQuestionCost',
		method: "POST",
		data:data
	})
} 

// 更新图文问诊 
export function renewal(data) {
	return axios({
		url: '/Inquiry/updateImgCost',
		method: "POST",
		data:data
	})
} 

//开通预约问诊 
export function enlightened() {
	return axios({
		url: '/Inquiry/openSubscribeInquirysetting',
		method: "POST"
	})
} 

//关闭预约问诊 
export function turnoff() {
	return axios({
		url: '/Inquiry/closeSubscribeInquirysetting',
		method: "POST"
	})
} 

//选择非固定出诊日 
export function unfixed(data) {
	return axios({
		url: '/Inquiry/updateNoneFixedVisitday',
		method: "POST",
		data:data
	})
} 

//提供我的卡片中的二维码信息（我的名片）
export function visiting() {
	return axios({
		url: '/doctorInfo/provideMyQRcode',
		method: "POST"
	})
} 

//查询等待的患者（我的诊室）
export function consulting(data) {
	return axios({
		url: '/Inquiry/findByInterrogationType',
		method: "POST",
		data:data
	})
} 

//查看医生基本信息（个人中心）
export function core() {
	return axios({
		url: '/doctorInfo/findDoctorInfo',
		method: "POST",
	})
} 

// 获取融云token
export function ryrong(data) {
	return axios({
		url: '/rongcloud/getToken',
		method: "POST",
		data:data
	})
} 

// 通过后加入好友
export function friends(data) {
	return axios({
		url: '/rongcloud/addAgreeWhiteList',  
		method: "POST",
		data:data
	})
} 