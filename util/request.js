	import {getToken,getUid} from 'util/auth.js'
	const token = getToken()
	let axios = null
	if(token === false) {
// 你把你登录的接口单独写 不要用这个 因为登录不需要token 这个封装的请求用来处理需要token的接口你来写跳转把 这一块是这样的逻辑return uni.request(options)
		uni.reLaunch({ // 如果没有token就跳转 我发现你有些接口还是这个 比如验证码 //跳转
			url:'/pages/user/user.vue'
		})
	} 
	else {
		const uid = getUid()
		console.log(token)
		axios = function(options) {
		options.url = "http://172.17.7.66:8803" + options.url;
		if(uni.getStorageSync('token')) {
			options.header = {
				'token': 'ckw' + uni.getStorageSync('token'),
				'uid': uni.getStorageSync('Uid')
			}
		} else {
			uni.reLaunch({ // 跳转
				url:'/pages/user/user.vue'
			})
		}
		console.log(options)
		// try {  
		// 	// 获取放入缓存的字段token
		// 	if (token) { // 如果存在token 配置请求头
		// 		options.header = {
		// 			'token': 'ckw' + token,
		// 			'uid': uid 
		// 		}
		// 	}
		// } catch (err) {
		// 	console.log(err)
		// }
		// 这里对response进行处理，
		// 401表示登录状态过期，需重新登录
		// options.complete = (response) => {
		// 	if (response.statusCode == 401) {
		// 		uni.navigateTo({
		// 			url: '/pages/login/login'
		// 		});
		// 		return;
		// 	}
		// }
		return uni.request(options);
	}
}
export default axios; // 这个地方