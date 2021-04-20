<template>
	<view class="background">
		<view class="header">开通预约问诊
			<switch class="option" @tap="iib" :checked="openOnlineinquirys" @change="openOnlineinquirysettings" />
		</view>
		
		<view class="display" v-if="openOnlineinquirys">
			
		
		<view class="characters">医生平台接诊规范事项
		  <span class="look">查看
			<image class="picture" src="../../static/image/4.png" mode=""></image>
		  </span>
			
		</view>
		 
		<view class="ask">
			预约问诊
			<span class="looks" @tap="check">查看
				<image class="pictures" src="../../static/image/4.png" mode=""></image>
			</span>
			
			<view class="sentences">- 图文问诊方式之一,适合简单问题;</view>
			<view class="sentences">- 超过3天未接诊,自动关闭;</view>
			<view class="sentences">- 患者发出提问,医生回复提交即可;</view>
			<view class="sentences">- 互动方式为图形形式,也可以发送语音快速回复;</view>
			<view class="sentences">- 问诊服务费用医生决定</view>
		</view>
		
		</view>
		
	</view>
</template>

<script>
	import {
		enlightened,
		turnoff
	} from 'API/message.js'
		export default {
	
			onLoad() {
				const openOnlineinquirys = uni.getStorageSync('openOnlineinquirys')
				this.openOnlineinquirys = openOnlineinquirys
			},
			data() {
				return {
					openOnlineinquirys: false,
					
				}
			},
			methods: {
				iib(){
					if (this.openOnlineinquirys) {
						//开通图文问诊、
						enlightened().then(res => {
							console.log(res)
						})
					}else{
						//关闭图文问诊、
						turnoff().then(res => {
							console.log(res)
						})
					} 
				},
				
			check(){
				uni.navigateTo({
					url: './data', 
				})
			},
	
				openOnlineinquirysettings() {
					this.openOnlineinquirys = !this.openOnlineinquirys
					uni.setStorageSync('openOnlineinquirys', this.openOnlineinquirys)
				},
	
			}
		}

</script>

<style lang="scss" scoped>
	.background{
		background:#f3f3f3;
	}
	
	.header {
		height: 109.09rpx;
		background: #ffffff;
		line-height: 109.09rpx;
		padding-left: 54.54rpx;
		width:auto;
		
	.option{
		margin-right: 5%;
		float: right;
	}
	}
	
	
	.characters{
		width: 752.72rpx;
		height: 109.09rpx;
		background: #ffffff;
		line-height: 109.09rpx;
		padding-left: 54.54rpx;
		margin-top: 18.18rpx;
	.look {
		margin-right: 14%;
		float: right;
	}
	.picture {
		width: 13.38rpx;
		height: 24.94rpx;
		vertical-align: middle;
		margin-left: 9.09rpx;
	}
	}
	
	.ask{
		width: 752.72rpx;
		height: 338.18rpx ;
		margin-top: 18.18rpx;
		padding-left: 54.54rpx;
		padding-top: 36.36rpx;
		background: #ffffff;
	.looks{
		    margin-right: 14%;
		    float: right;
	}
	.pictures {
			width: 13.38rpx;
			height: 24.94rpx;
			vertical-align: middle;
			margin-left: 9.09rpx;
		}
	.sentences{
		margin: 18.18rpx;
		font-size: 25.45rpx;
		color: #000000;
		
	}
	}
	
	
	
</style>