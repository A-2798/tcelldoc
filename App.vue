<script>
	import {
		getToken,
		getUid,
		getName,
		getUrl
	} from 'util/auth.js'
	import {
		ryToken
	} from 'API/rongyun.js'
	export default {
		onLaunch: function() {
			let that = this
			// 判断是否登录
			const token = getToken()
			if (token) {
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/tabbar/tabbar'
					})
				}, 300)

			} else {
				setTimeout(() => {
					uni.redirectTo({
						url: "/pages/login/login"
					})
				}, 300)
			}
			var conversationList = []
			//融云监听
			this.$im.watch({
				// 监听会话列表变更事件
				conversation(event) {
					let updatedConversationList = event.updatedConversationList
					// 通过 im.Conversation.merge 计算最新的会话列表
					let latestConversationList = that.$im.Conversation.merge({
						conversationList,
						updatedConversationList
					})
					that.$store.dispatch('chat/setNewMessage',latestConversationList)
				},
				// 监听消息通知
				message(event) {
					// 新接收到的消息内容
					const message = event.message;
					console.log(message, '收到得消息通知')
				},
				// 监听 IM 连接状态变化
				status(event) {
					console.log('connection status:', event.status)
				},
			})
			/* 开发者后台获取或 Server API */
			let option = {
				uid: getUid(),
				name: getName(),
				portraitUri: getUrl()
			}
			let rytoken
			ryToken(option).then(res => {
				console.log(res, 'rytoken')
				rytoken = res[1].data.data.rc_token
				let user = {
					token: rytoken
				}
				//链接
				this.$im.connect(user).then((user) => {
					console.log('链接成功, 链接用户 id 为: ', user.id);
				}).catch(function(error) {
					console.log('链接失败: ', error.code, error.msg);
				});
			}).catch(err => {
				uni.showToast({
					title: err
				})
				console.log(err)
			})
			//字体设置未完待续
			// let outter = uni.createSelectorQuery().in(this).select(page);
			// outter.fields({size:true},data => {
			//   console.log(data.height);
			// }).exec()
			// console.log(outter)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	// @import url("/static/icon/iconfont.css");
	// @import url("/wxcomponents/vant/dist/common/index.wxss");

	// /*隐藏滚动条css */
	// ::-webkit-scrollbar {
	// 	display: none;
	// 	width: 0 !important;
	// 	height: 0 !important;
	// 	-webkit-appearance: none;
	// 	background: transparent;
	// 	color: transparent;
	// }

	// /* 	@font-face {
	// 	font-family:PingFangSC;
	// 	src: url('~@/static/iconfont/PingFang Bold.ttf');
	// 	src: url('~@/static/iconfont/PingFang Regular.ttf');
	// } */
	// //checkbox 样式 
	// checkbox .wx-checkbox-input {
	// 	box-sizing: border-box;
	// 	width: 28rpx;
	// 	height: 28rpx;
	// }

	// checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	// 	background-color: #3DCCA4;
	// 	border: 0;
	// }

	// //checkbox 对号样式 
	// checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
	// 	font-size: 28rpx;
	// 	color: #ffffff;
	// }

	//radio 样式
	// radio .wx-radio-input.wx-radio-input{
	// 	box-sizing: border-box;
	// 	border: 1px solid #D8D8D8;
	// 	width: 28rpx;
	// 	height: 28rpx;
	// }
	// radio .wx-radio-input.wx-radio-input-checked{
	// 	background-color: #3DCCA4;
	// 	border: 0;
	// }
	// radio .wx-radio-input.wx-radio-input-checked::before{
	// 	font-size: 26rpx;
	// 	color: #ffffff;
	// }
</style>
