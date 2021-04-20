<template>
	<view>
		<view style="height: 248rpx;background: #D8D8D8;display: flex;   flex-direction: column;">
			<span class="patient">患者</span>

			<!-- input -->
			<view class="uni-form-item uni-column">
				<input class="uni-input" />
				<i style="top: 170rpx;left: 50rpx;" class="iconfont">&#xe60e;</i>

				<view style="position: absolute;top: 140rpx;left: 630rpx;width: 100rpx;height: 100rpx;">
					<i class="iconfont" style="top: 10rpx;left: 30rpx;">&#xe600;</i>
					<span style="top: 50rpx;left: 18.18rpx;position: absolute;">统计</span>
				</view>
			</view>
		</view>
		<!-- 滑动选项 -->
		<view class="">
			<swiper-nav :height="height" :width="width" :current="current" :nav-list="list" :bg-color="bgColor" :border-bg-color="borderBgColor"
			 :active-color="activeColor" :color="color" @current-change="currentChange"></swiper-nav>
		</view>
		<!-- 筛选小图标 -->
		<span class="iconfont" style="top: 285rpx;left: 660rpx;">&#xe64d;</span>



		<!-- <view v-if="current === 0">
			选项卡1的内容
		</view>

		<view v-if="current === 1">
			选项卡2的内容
		</view> -->
		<view v-if="current === 2">
			<view style="margin-top: 36.36rpx;margin-bottom: 36.36rpx;">
				<span style="font-size: 29.09rpx;color: #6F6A6A;margin-left: 36.36rpx;">共有108位患者，膀胱癌患者有31位患者</span>
			</view>

			<!-- 线 -->
			<view style="border: 1px solid #979797;margin-bottom: 36.36rpx;"></view>

			<!-- 第一部分 -->
			<view style="display: flex;flex-direction: row;width: 100%;height:100% ;">
				<!-- 头像 -->
				<view style="width: 100rpx;height: 100rpx;background: rgba(0,0,0,0.10);border-radius: 7.27rpx;margin-left: 36.36rpx;"></view>
				<view style="">
					<span style="font-size: 32.72rpx;color: #000000;width: 120.18rpx;height: 45.45rpx;margin-left: 80rpx;">张某某</span>
					<span style="width: 350.9rpx;height: 40rpx;font-size: 29.09rpx;color: #6F6A6A;margin-left: 50rpx;">女 55岁
						ID:zx0025000</span>
					<view style="margin-top: 18.18rpx;width: 174.54rpx;height: 40rpx;font-size: 29.09rpx;color: #000000; display: flex; flex-direction: column;margin-left: 80rpx;">诊断:膀胱癌</view>
				</view>
			</view>
			<view style="border: 1px solid #979797;width: 680rpx;margin: auto;margin-top: 36.36rpx;margin-bottom: 36.36rpx;"></view>


			<!-- 第二部分 -->
			<view style="display: flex;width: 100%;height:100% ;">
				<!-- 头像 -->
				<view style="width: 100rpx;height: 100rpx;background: rgba(0,0,0,0.10);border-radius: 7.27rpx;margin-left: 36.36rpx;"></view>
				<view style="">
					<span style="font-size: 32.72rpx;color: #000000;width: 120.18rpx;height: 45.45rpx;margin-left: 80rpx;">张某某</span>
					<span style="width: 350.9rpx;height: 40rpx;font-size: 29.09rpx;color: #6F6A6A;margin-left: 50rpx;">女 55岁
						ID:zx0025000</span>
					<view style="margin-top: 18.18rpx;width: 174.54rpx;height: 40rpx;font-size: 29.09rpx;color: #000000; display: flex; flex-direction: column;margin-left: 80rpx;">诊断:膀胱癌</view>
				</view>
			</view>
			<view style="border: 1px solid #979797;width: 680rpx;margin: auto;margin-top: 36.36rpx;margin-bottom: 36.36rpx;"></view>

			<!-- 第三部分 -->
			<view style="display: flex;width: 100%;height:100% ;">
				<!-- 头像 -->
				<view style="width: 100rpx;height: 100rpx;background: rgba(0,0,0,0.10);border-radius: 7.27rpx;margin-left: 36.36rpx;"></view>
				<view style="">
					<span style="font-size: 32.72rpx;color: #000000;width: 120.18rpx;height: 45.45rpx;margin-left: 80rpx;">张某某</span>
					<span style="width: 350.9rpx;height: 40rpx;font-size: 29.09rpx;color: #6F6A6A;margin-left: 50rpx;">女 55岁
						ID:zx0025000</span>
					<view style="margin-top: 18.18rpx;width: 174.54rpx;height: 40rpx;font-size: 29.09rpx;color: #000000; display: flex; flex-direction: column;margin-left: 80rpx;">诊断:膀胱癌</view>
				</view>
			</view>
			<view style="border: 1px solid #979797;width: 680rpx;margin: auto;margin-top: 36.36rpx;margin-bottom: 36.36rpx;"></view>

			<!-- 第四部分 -->
			<view style="display: flex;width: 100%;height:100% ;">
				<!-- 头像 -->
				<view style="width: 100rpx;height: 100rpx;background: rgba(0,0,0,0.10);border-radius: 7.27rpx;margin-left: 36.36rpx;"></view>
				<view style="">
					<span style="font-size: 32.72rpx;color: #000000;width: 120.18rpx;height: 45.45rpx;margin-left: 80rpx;">张某某</span>
					<span style="width: 350.9rpx;height: 40rpx;font-size: 29.09rpx;color: #6F6A6A;margin-left: 50rpx;">女 55岁
						ID:zx0025000</span>
					<view style="margin-top: 18.18rpx;width: 174.54rpx;height: 40rpx;font-size: 29.09rpx;color: #000000; display: flex; flex-direction: column;margin-left: 80rpx;">诊断:膀胱癌</view>
				</view>
			</view>
			<view style="border: 1px solid #979797;width: 680rpx;margin: auto;margin-top: 36.36rpx;margin-bottom: 36.36rpx;"></view>

			<!-- 第五部分 -->
			<view style="display: flex;width: 100%;height:100% ;">
				<!-- 头像 -->
				<view style="width: 100rpx;height: 100rpx;background: rgba(0,0,0,0.10);border-radius: 7.27rpx;margin-left: 36.36rpx;"></view>
				<view style="">
					<span style="font-size: 32.72rpx;color: #000000;width: 120.18rpx;height: 45.45rpx;margin-left: 80rpx;">张某某</span>
					<span style="width: 350.9rpx;height: 40rpx;font-size: 29.09rpx;color: #6F6A6A;margin-left: 50rpx;">女 55岁
						ID:zx0025000</span>
					<view style="margin-top: 18.18rpx;width: 174.54rpx;height: 40rpx;font-size: 29.09rpx;color: #000000; display: flex; flex-direction: column;margin-left: 80rpx;">诊断:膀胱癌</view>
				</view>
			</view>
			<view style="border: 1px solid #979797;width: 680rpx;margin: auto;margin-top: 36.36rpx;margin-bottom: 36.36rpx;"></view>

			<!-- 第六部分 -->
			<view style="display: flex;width: 100%;height:100% ;">
				<!-- 头像 -->
				<view style="width: 100rpx;height: 100rpx;background: rgba(0,0,0,0.10);border-radius: 7.27rpx;margin-left: 36.36rpx;"></view>
				<view style="">
					<span style="font-size: 32.72rpx;color: #000000;width: 120.18rpx;height: 45.45rpx;margin-left: 80rpx;">张某某</span>
					<span style="width: 350.9rpx;height: 40rpx;font-size: 29.09rpx;color: #6F6A6A;margin-left: 50rpx;">女 55岁
						ID:zx0025000</span>
					<view style="margin-top: 18.18rpx;width: 174.54rpx;height: 40rpx;font-size: 29.09rpx;color: #000000; display: flex; flex-direction: column;margin-left: 80rpx;">诊断:膀胱癌</view>
				</view>
			</view>
			<view style="border: 1px solid #979797;width: 680rpx;margin: auto;margin-top: 36.36rpx;margin-bottom: 36.36rpx;"></view>

			<!-- 第七部分 -->
			<view style="display: flex;width: 100%;height:100% ;">
				<!-- 头像 -->
				<view style="width: 100rpx;height: 100rpx;background: rgba(0,0,0,0.10);border-radius: 7.27rpx;margin-left: 36.36rpx;"></view>
				<view style="">
					<span style="font-size: 32.72rpx;color: #000000;width: 120.18rpx;height: 45.45rpx;margin-left: 80rpx;">张某某</span>
					<span style="width: 350.9rpx;height: 40rpx;font-size: 29.09rpx;color: #6F6A6A;margin-left: 50rpx;">女 55岁
						ID:zx0025000</span>
					<view style="margin-top: 18.18rpx;width: 174.54rpx;height: 40rpx;font-size: 29.09rpx;color: #000000; display: flex; flex-direction: column;margin-left: 80rpx;">诊断:膀胱癌</view>
				</view>
			</view>
		</view>
		<!-- <view v-if="current === 3">
			选项卡4的内容
		</view>
		<view v-if="current === 4">
			选项卡5的内容
		</view>
		<view v-if="current === 5">
			选项卡6的内容
		</view>
		<view v-if="current === 6">
			选项卡7的内容
		</view> -->


	</view>



</template>

<script>
	import iconfont from '@/fonts/index/iconfont.css' // 阿里巴巴矢量图
	import swiperNav from '@/components/wee-swiper-nav/wee-swiper-nav.vue' //滑动选项
	export default {
		components: {
			swiperNav
		},
		data() {
			return {
				list: ['肾肿瘤1', '尿道癌', '膀胱癌', '肾盂输尿管癌'],
				current: 0,
				height: 100,
				width: 195,
				bgColor: '#ffffff',
				activeColor: 'black',
				borderBgColor: 'black',
				color: '#000000'
			}
		},
		methods: {
			currentChange(e) {
				console.log(e)
				this.current = e
			}
		},
		mounted() {
			this.currentChange()
		}
	}
</script>

<style lang="scss" scoped>
	.patient {
		font-size: 38.18rpx;
		color: #000000;
		width: 76.36rpx;
		height: 52.72rpx;
		margin: auto;
		margin-top: 60rpx;
		margin-bottom: 30.9rpx;

	}

	.uni-input {
		background: rgba(0, 0, 0, 0.10);
		border-radius: 45.45rpx;
		width: 596.36rpx;
		height: 90.9rpx;
		margin-left: 30rpx;
		position: relative;
		padding-left: 70rpx;
		box-sizing: border-box;
	}

	.data {
		height: 1.4rem;
		text-overflow: clip;
		overflow: hidden;
		white-space: nowrap;
		font-family: UICTFontTextStyleBody;
		min-height: 10px;
	}
</style>
