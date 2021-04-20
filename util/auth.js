const TokenKey = 'kz_token'
const Uid = 'kz_uid'
// const token = 'kz_token'
// const uid = 'kz_uid'
const Name = 'kz_name' //此name为用户手机号
const Url = 'kz_headurl'
const BoudDocter = 'kz_docter' //绑定医生
const Essential = 'kz-essential'
const QuestionCont = 'kz_questioncont'
const QuestionStatus = 'kz_questionstatus'
// const Name = "vue_name"
// const ImgUrl = "vue_imgurl"

//获取用户token，用作vuex引用
export function getToken() {
	let token = uni.getStorageSync('token')
	if (token) {
		return token
	} else {
		// 跳转
		return
	}
	// return uni.getStorageSync('') // 异步需要回调 同步就是返回值
	// 所以我们用同步把 免得 函数里面写逻辑
}
//设置用户token，用作vuex引用
export function setToken(token) {
	return uni.setStorage({
			key: 'token',
			data: token,
			success: function() {
				
			},
		})
}
//设置用户uid
export function setUid(uid) {
	return uni.setStorageSync('Uid',uid)
}
//获取用户uid，用作vuex引用
export function getUid() {
	return uni.getStorageSync('Uid')
}
//获取用户name，用作vuex引用
export function getName() {
	return uni.getStorageSync(Name)
}
//设置用户name，用作vuex引用
export function setName(name) {
	return uni.setStorage({
		key: Name,
		data: name
	})
}
//获取用户headurl，用作vuex引用
export function getUrl() {
	return uni.getStorageSync(Url)
}
//设置用户headurl，用作vuex引用
export function setUrl(url) {
	return uni.setStorage({
		key: Url,
		data: url
	})
}
//设置绑定医生id
export function setBoudDocter(id) {
	return uni.setStorage({
		key: BoudDocter,
		data: id
	})
}
//获取绑定医生id
export function getBoudDocter() {
	return uni.getStorageSync(BoudDocter)
}
//设置是否上传基本信息的判断条件
export function setEssential() {
	return uni.setStorage({
		key: Essential,
		data: 0 //0表示已上传
	})
}
//获取是否上传基本信息的判断条件
export function getEssential() {
	return uni.getStorageSync(Essential)
}
//设置问卷已完成内容
export function setQuestionCont(num) {
	return uni.setStorage({
		key: QuestionCont,
		data: num
	})
}
//获取问卷已完成内容
export function getQuestionCont() {
	return uni.getStorageSync(QuestionCont)
}
//设置问卷状态
export function setQuestionStatus(num) {
	return uni.setStorage({
		key: QuestionStatus,
		data: num //0未开始 1正在测评 2已完成测评测评
	})
}
//获取问卷状态
export function getQuestionStatus() {
	return uni.getStorageSync(QuestionStatus)
}
