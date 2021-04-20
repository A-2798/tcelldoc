<template>
	<view class="page_login">
		<!-- 登录form -->
		<view class="login_form">
			<view class="input">
				<view class="img">
					<image style="width:27px;height: 27px;" :src="imgInfo.icon_user" />
				</view>
				<input type="text" v-model="username" placeholder="请输入用户账号">
				<view class="img">
					<image @tap="delUser" class="img_del" :src="imgInfo.icon_del" />
				</view>
			</view>
			<view class="line" />
			<view class="input">
				<view class="img">
					<image style="width:20px;height: 25px;" :src="imgInfo.icon_pwd" />
				</view>
				<input :type="pwdType" :value="userpwd" @input="inputPwd" placeholder="请输入密码">
				<view class="img" @tap="switchPwd">
					<image class="img_pwd_switch" :src="imgInfo.icon_pwd_switch" />
				</view>
			</view>
		</view>
		<!-- 登录提交 -->
		<button class="submit" type="primary" @tap="login">登录</button>
		<view class="opts">
			<navigator url="../pages/reg/reg" hover-class="navigator-hover" >
			   <text class="text">立即注册</text>
			</navigator> 
			
			<navigator url="../pages/find-pwd/find-pwd" hover-class="navigator-hover" >
			   <text  class="text">忘记密码</text>
			</navigator>
			<!-- 
			<text @tap="goReg" class="text">立即注册</text>
			<text @tap="findPwd" class="text">忘记密码？</text> -->
		</view>
		
      
	</view>
</template>
<script>
	export default {
		data() {
			const isUni = typeof(uni) !== 'undefined'
			return {
				username: '',
				userpwd: '',
				pwdType: 'password',
				// imgInfo: {
				// 	head: isUni ? '/static/head.png' : require('./images/head.png'),
				// 	icon_user: isUni ? '/static/icon_user.png' : require('./images/icon_user.png'),
				// 	icon_del: isUni ? '/static/icon_del.png' : require('./images/icon_del.png'),
				// 	icon_pwd: isUni ? '/static/icon_pwd.png' : require('./images/icon_pwd.png'),
				// 	icon_pwd_switch: isUni ? '/static/icon_pwd_switch.png' : require('./images/icon_pwd_switch.png'),
				// 	qq: isUni ? '/static/qq.png' : require('./images/qq.png'),
				// 	wechat: isUni ? '/static/wechat.png' : require('./images/wechat.png'),
				// 	weibo: isUni ? '/static/weibo.png' : require('./images/weibo.png')
				// }
			}
		},
		methods: {
			inputUsername(e) {
				this.username = e.target.value
			},
			inputPwd(e) {
				this.userpwd = e.target.value
			},
			delUser() {
				this.username = ''
			},
			switchPwd() {
				this.pwdType = this.pwdType === 'text' ? 'password' : 'text'
			},
			login() {
				console.log('username:' + this.username + ',pwd:' + this.userpwd)
				
				uni.request({
				url:"http://172.17.7.66:8803/phoneNumber",
				}).then(res=>{
				
				if(res.code===200){
				   this.code=res.data;
				   console.log("carouselData");
				};
				if(res.code===404){
				   console.log("请求的接口没有找到");
				  }
				})	
				
			},
			// findPwd() {
			// 	uni.navigateTo({
			// 		url:'/pages/find-pwd/find-pwd'
			// 	})
			// },
			// goReg() {
			// 	uni.navigateTo({
			// 		url:'/pages/reg/reg',
			// 	})
			// },
			thirdLogin(type) {
				console.log(type)
			}
		}
	}
</script>
<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f5f6f8;
	}
</style>
<style lang="scss" scoped>
	$logo-padding: 60px;
	$form-border-color: rgba(214, 214, 214, 1);
	$text-color: #B6B6B6;

	.page_login {
		padding: 10px;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: $logo-padding;
		padding-bottom: $logo-padding;

		.head_bg {
			border: 1px solid #fbecf1;
			border-radius: 50px;
			width: 100px;
			height: 100px;
			display: flex;
			align-items: center;
			justify-content: center;

			.head_inner_bg {
				border-radius: 40px;
				width: 80px;
				height: 80px;
				display: flex;
				background-color: #fc2c5d;
				align-items: flex-end;
				justify-content: center;
				overflow: hidden;
			}
		}
	}

	.login_form {
		display: flex;
		margin: 20px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid $form-border-color;
		border-radius: 10px;

		.line {
			width: 100%;
			height: 1px;
			background-color: $form-border-color;
		}

		.input {
			width: 100%;
			max-height: 45px;
			display: flex;
			padding: 3px;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			.img {
				min-width: 40px;
				min-height: 40px;
				margin: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.img_del {
				width: 21px;
				height: 21px;
			}

			.img_pwd_switch {
				width: 28px;
				height: 12px;
			}

			input {
				outline: none;
				height: 30px;
				width: 100%;

				&:focus {
					outline: none;
				}
			}
		}
	}

	.submit {
		margin-top: 30px;
		margin-left: 20px;
		margin-right: 20px;
		color: white;
		background-color: rgba(252, 44, 93, 1.0);
		-webkit-tap-highlight-color: rgba(252, 44, 93, 1.0);

		&:active {
			color: #B6B6B6;
			background-color: rgba(252, 44, 93, 0.8);
		}
	}

	.opts {
		margin-top: 5px;
		margin-left: 25px;
		margin-right: 25px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.text {
			font-size: 13px;
			color: $text-color;
		}
	}

	

	
</style>
