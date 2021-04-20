<template>
	<view>
		<view class="image">

			<view class="image-text">
				<span class="inquiry">图文问诊</span>
				<span class="switch-button">{{openOnlineinquiry == false ? '未开启' : '已开启'}}</span>
			</view>

			<view class="set"  @tap="ifOpen">
				<span class="go-set" @tap="setting">去设置</span>
				<image class="icon" src="../../static/image/4.png" mode=""></image>
			</view>

			<view>
				<span class="text">利用闲暇时间接诊,灵活接诊</span>
			</view>
			
		</view>




		<view class="image">

			<view class="image-text">
				<span class="inquiry">预约问诊</span>
				<span class="switch-button">{{openOnlineinquirys == false ? '未开启' : '已开启'}}</span>
			</view>

			<view class="set" @tap="opened">
				<span class="go-set" @tap="settings">去设置</span>
				<image class="icon" src="../../static/image/4.png" mode=""></image>
			</view>

			<view>
				<span class="text">固定接诊时间,效率高</span>
			</view>
		</view>
	</view>
</template>

<script>
import {selInquirysetting,subscribe} from 'API/message.js'
	export default {
		onLoad() {
			const openOnlineinquiry = uni.getStorageSync('openOnlineinquiry')
			this.openOnlineinquiry = openOnlineinquiry
			
			const openOnlineinquirys = uni.getStorageSync('openOnlineinquirys')
			this.openOnlineinquirys = openOnlineinquirys
		},
		onShow() {
			// 当从设置页面返回需要获取值 设置
			const openOnlineinquiry = uni.getStorageSync('openOnlineinquiry')
			this.openOnlineinquiry = openOnlineinquiry
			
			const openOnlineinquirys = uni.getStorageSync('openOnlineinquirys')
			this.openOnlineinquirys = openOnlineinquirys
		},
		data() {
			return {
				openOnlineinquiry: false,
				openOnlineinquirys: false
			};
		},
		methods: {
			
			setting() { //setting 去设置按钮
				uni.navigateTo({
					url: './setting',
				})
			},
			
			settings(){ //settings 去设置按钮
				uni.navigateTo({
					url: './settings',
				})
			},
			

			//查询图文问诊、
			ifOpen(){
				selInquirysetting().then(res=>{
					res[1].data.data.onlineinquiryStatus
					console.log(res[1].data.data.onlineinquiryStatus)
					console.log(res)
				}) 
			},
			//预约问诊是否开启
			opened(){
				subscribe().then(res=>{
					res[1].data.data.onlineinquiryStatus
					console.log(res[1].data.data.onlineinquiryStatus)
					console.log(res)
				})
			}
		}, 

	}
</script>

<style lang="scss" scoped>
	.image {
		width: 643.63rpx;
		height: 183.63rpx;
		background: rgba(216, 216, 216, 0.30);
		border-radius: 27.27rpx;
		margin: 0 auto;
		margin-top: 36.36rpx;
	}

	.image-text {
		display: flex;
	}

	.inquiry {
		margin-top: 36.36rpx;
		margin-left: 36.36rpx;
		font-size: 32.72rpx;
		color: #000000;
		width: 130.9rpx;
		height: 45.45rpx;
	}

	.switch-button {
		width: 127.27rpx;
		height: 40rpx;
		margin-top: 36.36rpx;
		margin-left: 90.9rpx;
		background: rgba(85, 170, 255, 0.3);
		background: #D8D8D8;
		border-radius: 27.27rpx;
		line-height: 40rpx;
		text-align: center;
	}

	.icon {
		width: 13.38rpx;
		height: 24.94rpx;
	}

	.go-set {
		width: 76.36rpx;
		height: 36.36rpx;
		font-size: 25.45rpx;
		color: #6F6A6A;
		margin-left: 472.72rpx;
	}

	.icon {
		vertical-align: middle;
		margin-left: 9.09rpx;
	}

	.text {
		font-size: 25.45rpx;
		color: #000000;
		width: 330.9rpx;
		height: 36.36rpx;
		margin-left: 36.36rpx;
	}
</style>
