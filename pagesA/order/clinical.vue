<template>
	<view>
		<view style="width: 680rpx;height: 181.81rpx;border-radius: 14.54rpx;background: rgba(216,216,216,0.30);margin: auto;margin-top: 36.36rpx;display: flex;flex-direction: row;">
			<!-- 圆圈 -->
			<span style="background: #BABABA;border: 1.81rpx solid #979797;width: 109.09rpx;height: 109.09rpx;border-radius: 50%;margin-top: 36.36rpx;margin-left: 36.36rpx;margin-bottom:36.36rpx ;"></span>
			<!-- 第一部分 -->
			<view style="padding-top: 30rpx;">
				<span style="width: 167.27rpx;height: 52.72rpx;font-size: 38.18rpx;color: #000000;line-height: 52.72rpx;margin-left: 40rpx;">安某某</span>
				<span style="width: 130.9rpx;height: 52.72rpx;font-size: 25.45rpx;color: #000000;margin-left: 30rpx; ">膀胱癌 ll期</span> <br>
				<span style="width: 301.81rpx;height: 72.72rpx;font-size: 25.45rpx;color: #000000;margin-left: 40rpx;">基础情况: 女 55岁 70kg</span>
				<span style="width: 101.81rpx;height: 36.36rpx;font-size: 25.45rpx;color: #000000;text-align: center;margin-left: 120rpx;">查看全部</span>
			</view>
		</view>
		
		<!-- 第二部分 -->
		<view style="display: flex;  flex-direction: column;width: 680rpx;height: 712.72rpx;margin: auto;background: rgba(216,216,216,0.30);margin-top: 40rpx;border-radius: 14.54rpx;">
			<view style="background: #D8D8D8;border-radius: 36.36rpx;width: 680rpx;height: 109.09rpx;text-align: center;">
				<span style="font-size: 25.45rpx;color: #000000;text-align: center;line-height: 109.09rpx;">一问一答服务</span>
			</view>
			
			<view style="width: 572.72rpx;height: 129.09rpx;margin-left:36.36rpx ;margin-top: 36.36rpx;">
				<span style="width: 101.81rpx;height: 36.36rpx;font-size: 25.45rpx;color: #000000;">本次诉求</span></br>
				<span style="font-size: 25.45rpx;color: #000000;width: 280rpx;height: 36.36rpx;">病情有变化是否需要手术</span>
				
				<!-- 线 -->
				<view style="border: 1.81rpx solid #D8D8D8;width: 572.72rpx;margin: auto;    margin-top: 45rpx;"></view>
			</view>
			
			<view style="width: 572.72rpx;height: 129.09rpx;margin-left:36.36rpx ;margin-top: 36.36rpx;">
				<span style="width: 152.72rpx;height: 36.36rpx;font-size: 25.45rpx;color: #000000;">病情简要描述</span></br>
				<span style="font-size: 25.45rpx;color: #000000;width: 432.72rpx;height: 36.36rpx;">体重短时间内变化很大,有尿血的情况</span>
				
				<!-- 线 -->
				<view style="border: 1.81rpx solid #D8D8D8;width: 572.72rpx;margin: auto;    margin-top: 45rpx;"></view>
			</view>
				
			<view style="">
				<view style="width: 152.72rpx;height: 36.36rpx;font-size: 25.45rpx;color: #000000;margin-top: 36.36rpx;margin-left: 36.36rpx;">本次参考图片</view>
				<view style="width:145.45rpx;height: 145.45rpx;background: rgba(216,216,216,0.30);border: 1.81rpx solid #D8D8D8;margin-top: 18.18rpx;margin-left: 36.36rpx;margin-bottom: 36.36rpx;"></view>
			</view>
		</view>
		
		<!-- 第三部分 -->
		<view style="width: 643.63rpx;height: 80rpx;background: #D8D8D8;border-radius: 39.09rpx;margin: auto;margin-top: 72.72rpx;line-height: 80rpx;text-align: center;">
			<span style="font-size: 32.72rpx;color: #000000;width: 163.63rpx;height: 45.45rpx;" @tap="reply">回复该患者</span>
		</view>
		<view style="width: 643.63rpx;height: 80rpx;background: #D8D8D8;border-radius: 39.09rpx;margin: auto;margin-top: 54.54rpx;text-align: center;line-height: 80rpx;">
			<span style="width: 359.99rpx;height: 45.45rpx;font-size: 32.72rpx;color: #000000;">暂时没空,派发稍等关怀</span>
		</view>
		
	</view>
</template>

<script>  
	export default {
		data() {
			return {

			}
			},
			methods:{
				reply(){
					uni.navigateTo({
						url: '../../pagesB/HM-chat/HM-chat',
					})
				}
			
		}
	}
</script>

<style lang="scss"　scoped>

</style>
