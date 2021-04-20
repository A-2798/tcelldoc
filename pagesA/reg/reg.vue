<template>
	<view class="page_reg">
		<input class="phone" type="text" placeholder="手机号" v-model="text" value="" />

		<view style="display: flex;flex-direction: row;justify-content: flex-start; margin-top: 20rpx; width: 100%;">
			<input class="phones" type="text" placeholder="验证码" v-model="teet" value="" />
			<button type="primary" class="yanzheng" @tap="numberst">获取验证码</button>
		</view>

		<button class="submit" type="primary" @tap="nextPage">登录</button>
	</view>
</template>

<script>
	import {
		setToken,
		setUid
	} from 'util/auth.js'
	// > 发送验证码  
	export default {
		data() {
			return {
				text: "",
				teet: "",
				token: '',
			}
		},
		methods: {
			numberst() {
				uni.request({
					url: 'http://172.17.7.66:8803/user/sendSMSByPhone',
					data: {
						phoneNumber: this.text
					},
					method: 'POST',
					success: res => {
						console.log(res)

					},
					fail: () => {
						console.log('请求失败')
					},
					complete: () => {
						console.log('请求完成')
					}
				})

			},

			nextPage() {
				uni.request({
					url: 'http://172.17.7.66:8803/doctor/loginByPhone',
					data: {
						code: this.teet,
						phoneNumber: this.text,
					},
					method: 'POST',
					success: (res) => {
						console.log(res)
						setToken(res.data.data.token)
						setUid(res.data.data.uid)
						// if(kz_uid == 23){
						// 	this.status = val;
						// 	uni.navigateTo({
						// 		url: '../tabbar/cate/cate', //请求成功后跳转首页
						// 	});
						// }
						if (res.data.data.userStatus == 0) { //老用户
						  uni.navigateTo({
						  	 url: '../../pages/tabbar/index/index', //请求成功后跳转首页
						  });
							return;
						} else {  							//新用户
								uni.navigateTo({
									url: '../tabbar/cate/cate', //信息编辑页
								});
							return;
						} 
					}
				})
			}
		},
	}
</script>


<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f5f6f8;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
<style lang="scss" scoped>
	$form-border-color: rgba(214, 214, 214, 1);
	$text-color: #B6B6B6;

	.page_reg {
		width: 90%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.phone {
		width: 100%;
		border-bottom: 1.81rpx solid #ccc;
	}

	.phones {
		width: 35%;
		border-bottom: 1px solid #ccc;
		margin-right: auto;
	}

	.submit {
		width: 100%;
		margin-top: 54.54rpx;
		color: white;
		background-color: rgba(252, 44, 93, 1.0);
		-webkit-tap-highlight-color: rgba(252, 44, 93, 1.0);

		&:active {
			color: #B6B6B6;
			background-color: rgba(252, 44, 93, 0.8);
		}
	}

	.yanzheng {
		// position: absolute;
		// top: 500rpx;
		// right: 54.54rpx;
	}
</style>
