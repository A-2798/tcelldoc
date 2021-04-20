<template> 
	<view class="bottom">
		<view class="nav-box">
			<view class="nav-tab" :class="{'nav-tab-active':home===0}" @click="toIndex(0)">
				<view class="nav-icon">
					<view class="circle">
						<image v-if="home!=0" style="width:54.54rpx;height:54.54rpx;" src="../../static/image/18.svg" mode=""></image>
						<image v-if="home==0" style="width:54.54rpx;height:54.54rpx;" src="../../static/image/19.svg" mode=""></image>
					</view>
				</view>
				<view class="nav-text">
					首页 
				</view> 
			</view>
			<view class="nav-tab" :class="{'nav-tab-active':home===1}" @click="toIndex(1)">
				<view class="nav-icon" >
					<view class="circle">
						<image v-if="home!=1" style="width:54.54rpx;height:54.54rpx;" src="../../static/image/21.svg" mode=""></image>
						<image v-if="home==1" style="width:54.54rpx;height:54.54rpx;" src="../../static/image/20.svg" mode=""></image>
					</view>
				</view>
				<view class="nav-text">
					消息
				</view>
			</view>
			<!-- 跳转独立的搜索页 -->
			<!-- <view class="nav-tab" @click="toIndex(2)">
				<view class="nav-icon" >
					<view class="circle">
						<i class="iconfont search" />
					</view>
				</view>
				<view class="nav-text">
					搜索
				</view>
			</view> -->
			<view class="nav-tab" :class="{'nav-tab-active':home===2}" @click="toIndex(2)">
			<view class="nav-icon" >
				<view class="circle">
					<image v-if="home!=2" style="width:54.54rpx;height:54.54rpx;" src="../../static/image/17.svg" mode=""></image>
					<image v-if="home==2" style="width:54.54rpx;height:54.54rpx;" src="../../static/image/16.svg" mode=""></image>
				</view>
			</view> 
			<view class="nav-text">
				商城
			</view>
			</view>
			<view class="nav-tab" :class="{'nav-tab-active':home===3}" @click="toIndex(3)">
				<view class="nav-icon" >
					<view class="circle">
						<image v-if="home!=3"  style="width:54.54rpx;height:54.54rpx;" src="../../static/image/15.svg" mode=""></image>
						<image v-if="home==3" style="width:54.54rpx;height:54.54rpx;" src="../../static/image/14.svg" mode=""></image>
					</view>
				</view>
				<view class="nav-text">
					患者
				</view>
			</view>
			<view class="nav-tab" :class="{'nav-tab-active':home===4}" @click="toIndex(4)">
				<view class="nav-icon" >
					<view class="circle">
						<image v-if="home!=4"  style="width:54.54rpx;height:54.54rpx;" src="../../static/image/23.svg" mode=""></image>
						<image v-if="home==4" style="width:54.54rpx;height:54.54rpx;" src="../../static/image/22.svg" mode=""></image>
					</view>
				</view>
				<view class="nav-text">
					我的
				</view>
			</view>
		</view>
	</view> 
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				home: 0,
			}
		},
		onLoad() {

		},
		methods: {
			// toPage(url) {
			// 	uni.navigateTo({
			// 		url
			// 	})
			// },
			toIndex(index) {
				// if (index === 2) {
				// 	uni.navigateTo({
				// 		url: '../../pages/search/search'
				// 	});
				// } else {
				// 	this.$emit('toIndex', index)
				// 	this.home = index
				// }
				this.$emit('toIndex', index)
				this.home = index
			}
		}
	}
</script>

<style scoped lang="scss">
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		// height: $navHeight;
		box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.06);
		background: #fff;
		z-index: 99;
	}

	.nav-tab {
		fiex: 1;
		text-align: center;
		width: 100%;
		height: 100%;
		// height: $navHeight;
	}

	.nav-icon {
		height: 30px;
		box-sizing:border-box;
	}

	.nav-icon .iconfont {
		font-size: 20px;
	}

	.nav-text {
		font-size: 11px;
		height: 19px;
		color: #000000;
		font-weight: 400;
	}

	.nav-tab-active .circle {
		height: 38px;
		width: 38px;
		line-height: 38px;
		position: relative;
		left: calc(50% - 19px);
	}

	.nav-tab-active .iconfont {
		color: #00ffff;
	}

	.nav-tab-active .nav-text{
		color: #000000;
	}
	.nav-box{
		display: flex;
		width: 100%;
		box-sizing:border-box;
	}

	
</style>