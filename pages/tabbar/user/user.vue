<template>
	<view class="">
		<view style="width:100%;height: 181rpx;background-color: #14c145;"></view>

		<view class="page_login">

			<!-- 登录form -->
			<view class="login_form">
				<view class="input">
					<input type="text" v-model="username" placeholder="请输入用户账号">
				</view>

				<view class="line" />
				<view class="input">
					<input v-model="shuru" placeholder="请输入密码">
				</view>
			</view>
			<!-- 登录提交 -->
			<button class="submit" type="primary" @tap="login">登录</button>

			<view class="opts">
				<navigator url="../../../pagesA/reg/reg" hover-class="navigator-hover">
					<text class="text">立即注册</text>
				</navigator>

				<navigator url="../../../pagesA/find-pwd/find-pwd" hover-class="navigator-hover">
					<text class="text">忘记密码</text>
				</navigator>
			</view>
		</view>
	</view> 
	</view>
</template>
<script>
	import {
		setToken,
		setUid,
		setName,
		setUrl
	} from 'util/auth.js'
	// > 手机号密码登录  
	export default {
		data() {
			return {
				username: "19969324187",
				shuru: "123456"
			}
		},
		   
		methods: {
			login() { 
				uni.showToast({  
				    title: '点击成功',
				    duration: 1000
				});
				uni.request({
					url: 'http://172.17.7.66:8803/doctor/loginByPassword',
					data: {
						userName: this.username,
						password: this.shuru,
					},
					method: 'POST',
					success: res => {
						console.log(res)
						setToken(res.data.data.token) 
						setUid(res.data.data.uid) 
						setName(res.data.data.username)
						setUrl(res.data.data.portraituri)
						uni.setStorageSync('userImg',res.data.data.portraituri) 	//缓存后端头像
						uni.reLaunch({  	//跳转
							url: '/pages/tabbar/index/index'
						})
						uni.showToast({	//提示
						    title: '成功',
						    duration: 1000
						});
						uni.setStorageSync('token',res.data.data.token)		//缓存后端的 token
					},
					fail(res) {
						uni.showToast({
						    title: '失败',
						    duration: 1000
						});
					}
			})
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
