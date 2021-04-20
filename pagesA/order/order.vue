<template>
	<view>
		<!-- 顶部标题栏 -->
				<view style="width: 100%;height: 176rpx;background: #F1F2F3;">
					<view style="width: 100%;height: 88rpx;background: #F1F2F3;"></view>
					<view style="width: 100%;height: 88rpx;background: #F1F2F3;text-align: center;line-height: 88rpx;position: relative;">
		
						<image style="width: 28rpx;height: 48rpx;vertical-align:middle;position: absolute;right: 660rpx;top: 11px;left: 40rpx;"
						 src="@/static/back.svg" @tap="skip" mode=""></image>
		
		 
						<text style="width: 136rpx;height: 48rpx;font-family: PingFangSC-Regular;font-size: 34rpx;color: #2C2C2C;">我的诊室</text>
					</view>
				</view>
		<!-- navbar部分 -->
		<view style="height:68rpx;opacity: 0.15;background: #438CD9; position: relative;"></view>
		<view style="position: absolute;left: 40rpx;top: 193rpx">
			<image style="width: 32rpx;height: 32rpx;margin-right: 14rpx; vertical-align:middle;backgroundColor:#438CD9 80%;" src="@/static/yuyin.svg" mode="">
				<text style="font-family: PingFang-SC-Regular;font-size: 28rpx;color: #639FE0;width:392rpx;height: 40rpx;">请安排对顺序接诊，由上至下!</text>
			</image>
		</view>
				
		<!-- 图文问诊和预约问诊 -->
		<view style="display:flex; flex-direction: row;margin-top: 27.27rpx;">
			<view class="item">
				<span :class="{active:isActive == 0}" @tap="alls(0)">图文问诊</span>
				<text class="wire" :style="{backgroundColor:isActive == 0?'#3DCCA4':''}"></text>
			</view>
			
			<view class="itemmm">
				<span :class="{active:isActive == 1}" @tap="alls(1)" @click="order">预约问诊</span>
				<text class="wir" :style="{backgroundColor:isActive == 1?'#3DCCA4':''}"></text>
			</view>
		</view>
		 
		<view style="display:flex; flex-direction: row;margin-top: 27.27rpx;" >
			<view class="oval" 　@tap="getData(0,2)" :style="{backgroundColor:transform == 2?'#EECCCC':''}">
				<span style="width: 127.27rpx;height: 36.36rpx;font-size: 25.45rpx;backgroundColor: #000000; background-color: inherit;" >待接诊患者</span> 
			</view>
			
			<view class="ovall" @tap="getData(1,3)" :style="{backgroundColor:transform == 3?'#EECCCC':''}">
				<span style="width: 76.36rpx;height: 36.36rpx;font-size: 25.45rpx;backgroundColor: #000000; background-color: inherit;" >接诊中</span>
			</view>
			
			<view class="ovalll" @tap="getData(2,4)" :style="{backgroundColor:transform == 4?'#EECCCC':''}">
				<span style="width: 101.81rpx;height: 36.36rpx;font-size: 25.45rpx;backgroundColor: #000000; background-color: inherit;">接诊记录</span> 
			</view>
		</view>
		<!-- 线 -->
		<view style="height:3.63rpx;border: 1.81rpx solid #D8D8D8;margin-top: 37.27rpx;margin-bottom: 42.72rpx;"></view>
		<!-- 第一部分 -->
		<view style="width: 640rpx;height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-top: 37.27rpx;">
			<span style="width: 141.81rpx;height: 141.81rpx;border-radius: 7.27rpx;background: #D8D8D8;">
				<view style="width: 141.81rpx;height: 34.54rpx;background: #6F6A6A;line-height: 34.54rpx;">
					<span style="font-size: 12px;color: #FFFFFF;width: 90.9rpx;height: 30.9rpx;margin-left: 14.54rpx;">2020/12/4</span>
				</view>
			</span>

			<view style="height:40rpx;width: auto;float: right;" @tap="hit">
				<view style="width: 100%;display:flex; flex-direction: row;" >
					<span style="width: 87.27rpx;height: 40rpx;font-size: 29.09rpx;color: #000000;margin-left:  72.72rpx;">安某某</span>
					<span style="width: 260rpx;height: 36.36rpx;font-size: 25.45rpx;color: #6F6A6A;margin-left:  50rpx;">女 50岁 ID: zx0044000</span>
					
					<view style="width: 32.72rpx;height: 32.72rpx;background: #D8D8D8;border-radius: 50%;line-height: 25rpx;text-align: center;margin-left:  20rpx;">
						<span style="width: 21.81rpx;height: 30.9rpx;color: #ffaa7f;font-size: 21.81rpx;">会</span>
					</view>
				</view>
				

				<view style="width:407.27rpx;height: 141.81rpx;margin-left:  72.72rpx;">
					<span class="boxes">诊断: 膀胱癌</span><br>
					<span class="boxes">本次诉求:尿血,做了彩超,需要看一下</span><br>
					<span class="boxes">服务类型:图文问诊</span>
				</view>

				<view style="border: 1.81rpx solid #D8D8D8;margin-top: 37.27rpx;"></view>

			</view>
		</view>
		<!-- 第二部分 -->
		<view style="opacity: 0.5;">


			<view style="width: 640rpx;height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-top: 37.27rpx;">
				<span style="width: 141.81rpx;height: 141.81rpx;border-radius: 7.27rpx;background: #D8D8D8;">
					<view style="width: 141.81rpx;height: 34.54rpx;background: #6F6A6A;line-height: 34.54rpx;">
						<span style="font-size: 12px;color: #FFFFFF;width: 90.9rpx;height: 30.9rpx;margin-left: 7.27rpx;">2020/12/11</span>
					</view>
				</span>

				<view style="height:40rpx;width: auto;">
					<span style="width: 87.27rpx;height: 40rpx;font-size: 29.09rpx;color: #000000;margin-left:  72.72rpx;margin-right: 54.54rpx;">于某某</span>
					<span style="width: 305.45rpx;height: 36.36rpx;font-size: 25.45rpx;color: #6F6A6A;">男 72岁 ID: zx0034000</span>

					<view style="width:407.27rpx;height: 141.81rpx;margin-left:  72.72rpx;">
						<span class="boxes">诊断: 肺癌</span><br>
						<span class="boxes">本次诉求:下一步如何治疗</span><br>
						<span class="boxes">服务类型:一问一答</span>
					</view>
				</view>
			</view>
			<view style="border: 1.81rpx solid #D8D8D8;margin-top: 37.27rpx;width: 480rpx;float: right;margin-right: 10%;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			isActive: 0,
			transform:2
			}
		},
		methods: {
			alls(index) {       // 第一个切换
				this.isActive = index
			},
			getData(code,index) { // 第二个切换
				this.questions = code;
				this.transform = index;
			},
			hit() {
				uni.navigateTo({
					url: './clinical',
				})
			},
			skip() {
				uni.navigateBack({ //关闭当前页面，返回上一页面或多级页面
			
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.active {
		font-size: 36rpx;
		color: #3DCCA4;
	}
	.item {
		width: 128rpx;
		height: 44rpx;
		margin: auto;
		font-size:32rpx;
		color: #2C2C2C;
	}



	.itemmm {
		width: 116.36rpx;
		height: 40rpx;
		font-size: 29.09rpx;
		color: #000000;
		margin: auto;
	}

	.oval {
		width: 203.63rpx;
		height: 50.9rpx;
		background: #D8D8D8;
		border-radius: 27.27rpx;
		margin: auto;
		text-align: center;
	}

	.ovall {
		width: 203.63rpx;
		height: 50.9rpx;
		background: #D8D8D8;
		border-radius: 27.27rpx;
		margin: auto;
		text-align: center;
		margin-left: 16.36rpx;
		margin-right: 16.36rpx;
	}

	.ovalll {
		width: 203.63rpx;
		height: 50.9rpx;
		background: #D8D8D8;
		border-radius: 27.27rpx;
		margin: auto;
		text-align: center;
	}

	.boxes {
		font-size: 25.45rpx;
		color: #000000;
		line-height: 47.27rpx;
	}
	.wire {
		width: 60rpx;
		height: 4rpx;
		position: absolute;
		top: 320rpx;
		left: 235rpx;
	}
	
	
	.wir {
		width: 60rpx;
		height: 4rpx;
		position: absolute;
		top: 320rpx;
		left: 458rpx;
	}
</style>
