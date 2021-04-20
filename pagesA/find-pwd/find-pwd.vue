<template>
	<view class="content">

		<view class="list">

			<view class="tishi">若您忘记了密码，可在此重新设置新密码。</view>

			<view class="list-call">
				<input class="sl-input" type="number" v-model="phone" maxlength="11" placeholder="请输入手机号" />
			</view>

			<view class="list-call">
				<input class="sl-input" type="text" v-model="password" maxlength="32" placeholder="请输入新密码" />
			</view>

			<view class="list-call">
				<input class="sl-input" type="text" v-model="passwords" maxlength="32" placeholder="确认新密码" />
			</view>

			<view class="list-call">
				<input class="sl-input" type="number" v-model="codes" maxlength="4" placeholder="验证码" />
				<view class="yzm" @tap="yan">发送验证码</view>
			</view>

		</view>

		<view class="button-login" hover-class="button-hover" @tap="bindLogin()">
			<text>找回密码</text>
		</view>

	</view>
</template>
<!-- > 忘记密码  -->
<script>

	export default {
		data() {
			return {
				phone: "",
				password: "",
				passwords: "",
				codes: "",
				
			}
		},
		methods: {
			yan() {
				uni.request({
					url: 'http://172.17.7.66:8803/user/sendSMSByPhone',
					data: {
						phoneNumber: this.phone,
					},
					method: 'POST',
					success: res => {
						console.log(res)
						console.log('请求完成')
					},
					fail: () => {
						console.log('请求失败')
					},
				})
			},
			
			bindLogin() {
				uni.request({
					url: 'http://172.17.7.66:8803/doctor/forgetPassword',
					data: {
						phoneNumber: this.phone,
						newPassword: this.password,
						retryPassword: this.passwords,
						code: this.codes
					},
					method: 'POST',
					success: (res) => {
						   
							console.log(res)
						if (res.data.info == "SUCCESS") {
							console.log('测试可以了')
							uni.navigateTo({
								url: '../../components/zzk/zhuzhe-login/pages/login/login', //请求成功后跳转注册页
								
							});
						}
					},
					//fail: (err) => {
					// 	console.log(err)
						// uni.navigateTo({
							// url: '/pages/enroll/enroll', //请求成功后跳转注册页
						// 	console.log('222')
						// }); 
					// }
				})
				
				// uni.setStorage({
				// 	key: 'token3',
				// 	data: {
				// 		phoneNumber: this.phone,
				// 		newPassword: this.password,
				// 		retryPassword: this.passwords,
				// 		code: this.codes
				// 	},
				// 	success: function() {
				// 		console.log('存储成功');
				// 	}
				// })
			
			},
			
		}
	}

						


	// 					uni.getStorage({
	// 						key: 'token',
	// 						success(res) {
	// 							console.log('获取成功', res.data);
	// 						}
	// 					});
</script>


<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.tishi {
		color: #999999;
		font-size: 28rpx;
		line-height: 50rpx;
		margin-bottom: 50rpx;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 34rpx;
		width: 470rpx;
		height: 100rpx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
		border-radius: 50rpx;
		line-height: 100rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100rpx;
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
	}

	.yzm {
		color: #FF7D13;
		font-size: 24rpx;
		line-height: 64rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: auto;
		height: 64rpx;
		border: 1rpx solid rgba(255, 131, 30, 1);
		border-radius: 50rpx;
	}

	.yzms {
		color: #999999 !important;
		border: 1rpx solid #999999;
	}
</style>
