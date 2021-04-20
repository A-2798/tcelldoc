<template>
	<view>
		<view v-show="Stat">
			<view v-show="alt">
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
						<view>
							<view class="rail"></view>
				
							<view style="position: absolute;top: 183rpx;left: 40rpx;">
								<image class="im" src="@/static/hint.svg">
									<text class="text">图文问诊超过三天未接诊自动取消，请留意倒计时!</text>
								</image>
							</view>
				
						</view>
						<!-- 图文问诊和预约问诊 -->
						<view style="display:flex; flex-direction: row;margin-top: 27.27rpx;">
							<view class="item" @tap="all(0)">
								<span :class="{active:isActive == 0}" @tap="alls(0)" @click="order" style="position: relative;">图文问诊</span>
								<text class="wire" :style="{backgroundColor:isActive == 0?'#3DCCA4':''}"></text>
							</view>
				
							<view class="itemmm" @tap="all(1)">
								<span :class="{active:isActive == 1}" @tap="alls(1)" @click="ord">预约问诊</span> <!-- @click="order" -->
								<text class="wir" :style="{backgroundColor:isActive == 1?'#3DCCA4':''}"></text>
							</view>
						</view>
						
						<!-- 带接诊患者 -->
						<view style="display:flex; flex-direction: row;margin-top: 28rpx;margin-bottom: 40rpx;" 　v-mode="questions">
						
							<view class="oval" 　@tap="getData(0,2)"  @click="sk" :style="{backgroundColor:transform == 2?'#d1f3e9':''}"> </view>
							<span class="treat" @tap="getData(0,2)"  @click="sk" :style="{color:transform == 2?'#3DCCA4':''}">待接诊</span>
				
				
							<view class="ovall" @tap="getData(1,3)" @click="ski" :style="{backgroundColor:transform == 3?'#d1f3e9':''}"></view>
							<view>  <!-- @tap="jump" -->
								<span class="treatt" @tap="getData(1,3)" @click="ski" :style="{color:transform == 3?'#3DCCA4':''}">接诊中</span>
							</view>
				
				
							<view class="ovalll" @tap="getData(2,4)" @click="si" :style="{backgroundColor:transform == 4?'#d1f3e9':''}"></view>
							<view > <!-- @tap="jmp" -->
								<span class="treattt" @tap="getData(2,4)" @click="si" :style="{color:transform == 4?'#3DCCA4':''}">接诊记录</span>
							</view>
						</view>
				
				
						<!-- 第一部分 -->
						<view style="height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-left: 40rpx;margin-bottom:38rpx;">
							<span style="width: 148rpx;height: 148rpx;border-radius: 7.27rpx;background: #D8D8D8;position: relative;">
								<view style="width: 100%;height: 34.54rpx;background: #6F6A6A;line-height: 34.54rpx;position:absolute;left;0;bottom:0;opacity: 0.65;background: #000000;">
									<span style="font-family: PingFang-SC-Regular;font-size: 26rpx;color: #FFFFFF;margin-left: 27.27rpx;width: 108rpx;height: 36rpx;">32:56:40</span>
								</view>
							</span>
				
							<view style="height:40rpx;width: auto;">
								<span style="width: 102rpx;height: 48rpx;margin-left:32rpx;margin-right:24rpx;font-weight: bold;font-size: 34rpx;color: #2C2C2C;" @tap="hit">张某某</span>
								<span style="width: 336rpx;height:40rpx;font-size: 28rpx;color: #6F6A6A;font-family: PingFang-SC-Regular;">女 &nbsp;
									55岁&nbsp;&nbsp;ID： zx0025000</span>
				
								<view style="width:490rpx;height:156rpx;margin-left:32rpx;" v-mode="type">
									<span class="boxes">诊断: &nbsp;膀胱癌</span><br>
									<span class="boxes">本次诉求: &nbsp;病情有变化是否需要手术</span><br>
									<span class="boxes">服务类型: &nbsp;图文问诊</span>
								</view>
				
								<view style="border: 1px solid #F1F2F3;margin-top: 24rpx;width:480rpx;margin-left: 34rpx;"></view>
				
							</view>
						</view>
						<!-- 第二部分 -->
						<view style="height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-left: 40rpx;margin-bottom:38rpx;">
							<span style="width: 148rpx;height: 148rpx;border-radius: 7.27rpx;background: #D8D8D8;position: relative;">
								<view style="width: 100%;height: 34.54rpx;background: #6F6A6A;line-height: 34.54rpx;position:absolute;left;0;bottom:0;opacity: 0.65;background: #000000;">
									<span style="font-family: PingFang-SC-Regular;font-size: 26rpx;color: #FFFFFF;margin-left: 27.27rpx;width: 108rpx;height: 36rpx;">64:50:00</span>
								</view>
							</span>
				
							<view style="height:40rpx;width: auto;">
								<span style="width: 102rpx;height: 48rpx;margin-left:32rpx;margin-right:24rpx;font-weight: bold;font-size: 34rpx;
						color: #2C2C2C;">于某某</span>
								<span style="width: 336rpx;height:40rpx;font-size: 28rpx;color: #6F6A6A;font-family: PingFang-SC-Regular;">男 &nbsp;
									72岁&nbsp;&nbsp;ID： zx0034000</span>
				
								<view style="width:490rpx;height:156rpx;margin-left:32rpx;" v-mode="type">
									<span class="boxes">诊断: &nbsp;肾癌</span><br>
									<span class="boxes">本次诉求: &nbsp;血尿, 做了彩超, 需要...</span><br>
									<span class="boxes">服务类型: &nbsp;一问一答</span>
								</view>
				
								<view style="border: 1px solid #F1F2F3;margin-top: 24rpx;width:480rpx;margin-left: 34rpx;"></view>
				
							</view>
						</view>
				
						<!-- 第三部分 -->
						<view style="opacity: 0.65;">
							<view style="height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-left: 40rpx;">
								<span style="width: 148rpx;height: 148rpx;border-radius: 7.27rpx;background: #D8D8D8;position: relative;">
									<view style="width: 100%;height: 34.54rpx;background: #6F6A6A;line-height: 34.54rpx;position:absolute;left;0;bottom:0;opacity: 0.65;background: #000000;">
										<span style="font-family: PingFang-SC-Regular;font-size: 26rpx;color: #FFFFFF;margin-left: 27.27rpx;width: 108rpx;height: 36rpx;">00:00:00</span>
									</view>
								</span>
				
								<view style="height:40rpx;width: auto;">
									<span style="width: 102rpx;height: 48rpx;margin-left:32rpx;margin-right:24rpx;font-weight: bold;font-size: 34rpx;
				color: #2C2C2C;">李某某</span>
									<span style="width: 336rpx;height:40rpx;font-size: 28rpx;color: #6F6A6A;font-family: PingFang-SC-Regular;">男
										&nbsp; 56岁&nbsp;&nbsp;ID： zx0011000</span>
				
									<view style="width:490rpx;height:156rpx;margin-left:32rpx;" v-mode="type">
										<span class="boxes">诊断: &nbsp;肾癌</span><br>
										<span class="boxes">本次诉求: &nbsp;肾囊肿怎么治疗, 和肾...</span><br>
										<span class="boxes">服务类型: &nbsp;图文问诊</span>
									</view>
				
									<view style="border: 1px solid #F1F2F3;margin-top: 24rpx;width:480rpx;margin-left: 34rpx;"></view>
				
								</view>
							</view>
						</view>
			</view>
			
			
			
			
			<!-- 第二页部分 顶部标题栏 -->
			<view class="" v-if="sl">
				<view style="width: 100%;height: 176rpx;background: #F1F2F3;">
					<view style="width: 100%;height: 88rpx;background: #F1F2F3;"></view>
					<view style="width: 100%;height: 88rpx;background: #F1F2F3;text-align: center;line-height: 88rpx;position: relative;">
			
						<image style="width: 28rpx;height: 48rpx;vertical-align:middle;position: absolute;right: 660rpx;top: 11px;left: 40rpx;"
						 src="@/static/back.svg" @tap="skip" mode=""></image>
			
			
						<text style="width: 136rpx;height: 48rpx;font-family: PingFangSC-Regular;font-size: 34rpx;color: #2C2C2C;">我的诊室</text>
					</view>
				</view>
				<!-- 图文问诊和预约问诊 -->
				<view style="display:flex; flex-direction: row;margin-top: 27.27rpx;">
					<view class="item" @tap="all(0)">
						<span :class="{active:isActive == 0}" @tap="alls(0)" style="position: relative;">图文问诊</span>
						<text style="width: 60rpx;height: 4rpx;position: absolute;top: 260rpx;left: 235rpx;" :style="{backgroundColor:isActive == 0?'#3DCCA4':''}"></text>
					</view>
			
					<view class="itemmm" @tap="all(1)">
						<span :class="{active:isActive == 1}" @tap="alls(1)" @click="order">预约问诊</span> <!-- @click="order" -->
						<text style="width: 60rpx;height: 4rpx;position: absolute;top: 260rpx;left:458rpx;" :style="{backgroundColor:isActive == 1?'#3DCCA4':''}"></text>
					</view>
				</view>
				<!-- 带接诊患者 -->
				<view style="display:flex; flex-direction: row;margin-top: 28rpx;margin-bottom: 40rpx;" 　v-mode="questions">
			
					<view class="oval" 　@tap="getData(0,2)"   @click="sk" :style="{backgroundColor:transform == 2?'#d1f3e9':''}"> </view>
					<span class="treat" @tap="getData(0,2)"   @click="sk" :style="{color:transform == 2?'#3DCCA4':''}">待接诊</span>
			
			
					<view class="ovall" @tap="getData(1,3)" @click="ski" :style="{backgroundColor:transform == 3?'#d1f3e9':''}"></view>
					<view>  <!-- @tap="jump" -->
						<span class="treatt" @tap="getData(1,3)" @click="ski" :style="{color:transform == 3?'#3DCCA4':''}">接诊中</span>
					</view>
			
			
					<view class="ovalll" @tap="getData(2,4)" @click="si" :style="{backgroundColor:transform == 4?'#d1f3e9':''}"></view>
					<view>  <!-- @tap="jmp" -->
						<span class="treattt" @tap="getData(2,4)" @click="si" :style="{color:transform == 4?'#3DCCA4':''}">接诊记录</span>
					</view>
				</view>
			
			
				<!-- 第一部分 -->
				<view style="height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-left: 40rpx;margin-bottom:38rpx;">
					<span style="width: 148rpx;height: 148rpx;border-radius: 7.27rpx;background: #D8D8D8;position: relative;">
						<view style="width: 100%;height: 34.54rpx;background: #6F6A6A;line-height: 34.54rpx;position:absolute;left;0;bottom:0;opacity: 0.65;background: #000000;">
							<span style="font-family: PingFang-SC-Regular;font-size: 26rpx;color: #FFFFFF;margin-left: 27.27rpx;width: 108rpx;height: 36rpx;">32:56:40</span>
						</view>
					</span>
			
					<view style="height:40rpx;width: auto;">
						<span style="width: 102rpx;height: 48rpx;margin-left:32rpx;margin-right:24rpx;font-weight: bold;font-size: 34rpx;
			color: #2C2C2C;">张某某</span>
						<span style="width: 336rpx;height:40rpx;font-size: 28rpx;color: #6F6A6A;font-family: PingFang-SC-Regular;">女
							&nbsp;
							55岁&nbsp;&nbsp;ID： zx0025000</span>
			
						<view style="width:490rpx;height:156rpx;margin-left:32rpx;" v-mode="type">
							<span class="boxes">诊断:&nbsp;膀胱癌</span><br>
							<span class="boxes">患者:&nbsp;医生麻烦你看一下我的CT单</span><br>
							<span class="boxes">服务类型:&nbsp;图文问诊</span>
						</view>
			
						<view style="border: 1px solid #F1F2F3;margin-top: 24rpx;width:480rpx;margin-left: 34rpx;"></view>
			
					</view>
				</view>
				<!-- 第二部分 -->
				<view style="height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-left: 40rpx;margin-bottom:38rpx;">
					<span style="width: 148rpx;height: 148rpx;border-radius: 7.27rpx;background: #D8D8D8;position: relative;">
						<view style="width: 100%;height: 34.54rpx;background: #6F6A6A;line-height: 34.54rpx;position:absolute;left;0;bottom:0;opacity: 0.65;background: #000000;">
							<span style="font-family: PingFang-SC-Regular;font-size: 26rpx;color: #FFFFFF;margin-left: 27.27rpx;width: 108rpx;height: 36rpx;">64:50:00</span>
						</view>
					</span>
			
					<view style="height:40rpx;width: auto;">
						<span style="width: 102rpx;height: 48rpx;margin-left:32rpx;margin-right:24rpx;font-weight: bold;font-size: 34rpx;
					color: #2C2C2C;">于某某</span>
						<span style="width: 336rpx;height:40rpx;font-size: 28rpx;color: #6F6A6A;font-family: PingFang-SC-Regular;">男
							&nbsp;
							72岁&nbsp;&nbsp;ID： zx0034000</span>
			
						<view style="width:490rpx;height:156rpx;margin-left:32rpx;" v-mode="type">
							<span class="boxes">诊断: &nbsp;肾癌</span><br>
							<span class="boxes">患者: &nbsp;血尿, 做了彩超, 请医生...</span><br>
							<span class="boxes">服务类型: &nbsp;附赠2次回复</span>
						</view>
			
						<view style="border: 1px solid #F1F2F3;margin-top: 24rpx;width:480rpx;margin-left: 34rpx;"></view>
			
					</view>
				</view>
			</view>
			
			
			
			
			
			<view class="" v-if="skll">
				<!-- 第三页部分 顶部标题栏 -->
				<view style="width: 100%;height: 176rpx;background: #F1F2F3;">
					<view style="width: 100%;height: 88rpx;background: #F1F2F3;"></view>
					<view style="width: 100%;height: 88rpx;background: #F1F2F3;text-align: center;line-height: 88rpx;position: relative;">
			
						<image style="width: 28rpx;height: 48rpx;vertical-align:middle;position: absolute;right: 660rpx;top: 11px;left: 40rpx;"
						 src="@/static/back.svg" @tap="skip" mode=""></image>
			
			
						<text style="width: 136rpx;height: 48rpx;font-family: PingFangSC-Regular;font-size: 34rpx;color: #2C2C2C;">我的诊室</text>
					</view>
				</view>
				<!-- 图文问诊和预约问诊 -->
				<view style="display:flex; flex-direction: row;margin-top: 27.27rpx;">
					<view class="item" @tap="all(0)">
						<span :class="{active:isActive == 0}" @tap="alls(0)" style="position: relative;">图文问诊</span>
						<text style="width: 60rpx;height: 4rpx;position: absolute;top: 260rpx;left: 235rpx;" :style="{backgroundColor:isActive == 0?'#3DCCA4':''}"></text>
					</view>
			
					<view class="itemmm" @tap="all(1)">
						<span :class="{active:isActive == 1}" @tap="alls(1)" @click="order">预约问诊</span> <!-- @click="order" -->
						<text style="width: 60rpx;height: 4rpx;position: absolute;top: 260rpx;left:458rpx;" :style="{backgroundColor:isActive == 1?'#3DCCA4':''}"></text>
					</view>
				</view>
				<!-- 带接诊患者 -->
				<view style="display:flex; flex-direction: row;margin-top: 28rpx;margin-bottom: 40rpx;" 　v-mode="questions">
			
					<view class="oval" 　@tap="getData(0,2)"  @click="sk" :style="{backgroundColor:transform == 2?'#d1f3e9':''}"> </view>
					<span class="treat" @tap="getData(0,2)"  @click="sk" :style="{color:transform == 2?'#3DCCA4':''}">待接诊</span>
			
			
					<view class="ovall" @tap="getData(1,3)" @click="ski" :style="{backgroundColor:transform == 3?'#d1f3e9':''}"></view>
					<view>  <!-- @tap="jump" -->
						<span class="treatt" @tap="getData(1,3)" @click="ski" :style="{color:transform == 3?'#3DCCA4':''}">接诊中</span>
					</view>
			
			
					<view class="ovalll" @tap="getData(2,4)" @click="si" :style="{backgroundColor:transform == 4?'#d1f3e9':''}"></view>
					<view> <!-- @tap="jmp" -->
						<span class="treattt" @tap="getData(2,4)" @click="si" :style="{color:transform == 4?'#3DCCA4':''}">接诊记录</span>
					</view>
				</view>
			
			
				<!-- 第一部分 -->
				<view style="height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-left: 40rpx;margin-bottom:38rpx;">
					<span style="width: 148rpx;height: 148rpx;border-radius: 7.27rpx;background: #D8D8D8;position: relative;">
						<view style="width: 100%;height: 34.54rpx;background: #6F6A6A;line-height: 34.54rpx;position:absolute;left;0;bottom:0;opacity: 0.65;background: #000000;">
							<span style="font-family: PingFang-SC-Regular;font-size: 26rpx;color: #FFFFFF;margin-left: 27.27rpx;width: 108rpx;height: 36rpx;">32:56:40</span>
						</view>
					</span>
			
					<view style="height:40rpx;width: auto;">
						<span style="width: 102rpx;height: 48rpx;margin-left:32rpx;margin-right:24rpx;font-weight: bold;font-size: 34rpx;
			color: #2C2C2C;">于某某</span>
						<span style="width: 336rpx;height:40rpx;font-size: 28rpx;color: #6F6A6A;font-family: PingFang-SC-Regular;">男
							&nbsp;
							72岁&nbsp;&nbsp;ID： zx0034000</span>
			
						<view style="width:490rpx;height:156rpx;margin-left:32rpx;" v-mode="type">
							<span class="boxes">诊断: &nbsp;肾癌</span><br>
							<span class="boxes">服务类型: &nbsp;附赠2次回复</span><br>
							<span class="boxes">下单时间: &nbsp;2020年8月11日</span>
						</view>
			
						<view style="border: 1px solid #F1F2F3;margin-top: 24rpx;width:480rpx;margin-left: 34rpx;"></view>
			
					</view>
				</view>
				<!-- 第二部分 -->
				<view style="height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-left: 40rpx;margin-bottom:38rpx;">
					<span style="width: 148rpx;height: 148rpx;border-radius: 7.27rpx;background: #D8D8D8;position: relative;">
						<view style="width: 100%;height: 34.54rpx;background: #6F6A6A;line-height: 34.54rpx;position:absolute;left;0;bottom:0;opacity: 0.65;background: #000000;">
							<span style="font-family: PingFang-SC-Regular;font-size: 26rpx;color: #FFFFFF;margin-left: 27.27rpx;width: 108rpx;height: 36rpx;">64:50:00</span>
						</view>
					</span>
			
					<view style="height:40rpx;width: auto;">
						<span style="width: 102rpx;height: 48rpx;margin-left:32rpx;margin-right:24rpx;font-weight: bold;font-size: 34rpx;
					color: #2C2C2C;">张某某</span>
						<span style="width: 336rpx;height:40rpx;font-size: 28rpx;color: #6F6A6A;font-family: PingFang-SC-Regular;">女
							&nbsp;
							55岁&nbsp;&nbsp;ID： zx0025000</span>
			
						<view style="width:490rpx;height:156rpx;margin-left:32rpx;" v-mode="type">
							<span class="boxes">诊断: &nbsp;膀胱癌</span><br>
							<span class="boxes">服务类型: &nbsp;图文问诊</span><br>
							<span class="boxes">下单时间: &nbsp;2020年8月9日</span>
						</view>
			
						<view style="border: 1px solid #F1F2F3;margin-top: 24rpx;width:480rpx;margin-left: 34rpx;"></view>
			
					</view>
				</view>
			
			</view>
		</view>
		
		
		
		<view v-show="zong">
			<!-- 预约问诊部分 -->
				<!-- 顶部标题栏 -->
			<view v-if="sp">
				<view style="width: 100%;height: 176rpx;background: #F1F2F3;">
					<view style="width: 100%;height: 88rpx;background: #F1F2F3;"></view>
					<view style="width: 100%;height: 88rpx;background: #F1F2F3;text-align: center;line-height: 88rpx;position: relative;">
						<text style="width: 136rpx;height: 48rpx;font-family: PingFangSC-Regular;font-size: 34rpx;color: #2C2C2C;">我的诊室</text>
					</view>
				</view> 
				<!-- 预约问诊 navbar部分 -->
				<view style="height:68rpx;opacity: 0.15;background: #438CD9; position: relative;"></view>
				<view style="position: absolute;left: 40rpx;top: 193rpx">
					<image style="width: 32rpx;height: 32rpx;margin-right: 14rpx; vertical-align:middle;backgroundColor:#438CD9 80%;" src="@/static/yuyin.svg" mode="">
						<text style="font-family: PingFang-SC-Regular;font-size: 28rpx;color: #639FE0;width:392rpx;height: 40rpx;">请安排对顺序接诊，由上至下!</text>
					</image>
				</view>
				<!-- 图文问诊和预约问诊 -->
				<view style="display:flex; flex-direction: row;margin-top: 27.27rpx;">
					<view class="item" @tap="all(0)">
						<span :class="{active:isActive == 0}" @tap="alls(0)" @click="order" style="position: relative;">图文问诊</span>
						<text class="wire" :style="{backgroundColor:isActive == 0?'#3DCCA4':''}"></text>
					</view>
								
					<view class="itemmm" @tap="all(1)">
						<span :class="{active:isActive == 1}" @tap="alls(1)" @click="ord">预约问诊</span> <!-- @click="order" -->
						<text class="wir" :style="{backgroundColor:isActive == 1?'#3DCCA4':''}"></text>
					</view>
				</view>
				<!-- 带接诊患者 -->
				<view style="display:flex; flex-direction: row;margin-top: 28rpx;margin-bottom: 40rpx;" 　v-mode="questions">
				
					<view class="oval" 　@tap="getData(0,2)"  @click="lk" :style="{backgroundColor:transform == 2?'#d1f3e9':''}"> </view>
					<span class="treat" @tap="getData(0,2)"  @click="lk" :style="{color:transform == 2?'#3DCCA4':''}">待接诊</span>
								
								
					<view class="ovall" @tap="getData(1,3)" @click="lki" :style="{backgroundColor:transform == 3?'#d1f3e9':''}"></view>
					<view>  <!-- @tap="jump" -->
						<span class="treatt" @tap="getData(1,3)" @click="lki" :style="{color:transform == 3?'#3DCCA4':''}">接诊中</span>
					</view>
								
								
					<view class="ovalll" @tap="getData(2,4)" @click="li" :style="{backgroundColor:transform == 4?'#d1f3e9':''}"></view>
					<view > <!-- @tap="jmp" -->
						<span class="treattt" @tap="getData(2,4)" @click="li" :style="{color:transform == 4?'#3DCCA4':''}">接诊记录</span>
					</view>
				</view>
				<!-- 待接诊患者列表 -->
				<!-- 第一人 -->
					<view style="height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-left: 40rpx;margin-bottom:38rpx;">
						<span style="width: 148rpx;height: 148rpx;border-radius: 7.27rpx;background: #D8D8D8;position: relative;">
							<text style="position: absolute;width: 90rpx;height: 34rpx;opacity: 0.65;background: #000000;border-radius: 0 8.5px 8.5px 0;top: 8rpx;line-height: 34rpx;">
								<text style="font-size: 12px;color: #FFFFFF;text-align: center;width:52rpx;height: 34rpx;">NO.1</text>
							</text>
						</span>
								
						<view style="height:40rpx;width: auto;">
							<span style="width: 102rpx;height: 48rpx;margin-left:32rpx;margin-right:24rpx;font-weight: bold;font-size: 34rpx;
						color: #2C2C2C;">张某某</span>
							<span style="width: 336rpx;height:40rpx;font-size: 28rpx;color: #6F6A6A;font-family: PingFang-SC-Regular;">女
								&nbsp;
								55岁&nbsp;&nbsp;ID： zx0025000</span>
								
							<view style="width:490rpx;height:156rpx;margin-left:32rpx;" v-mode="type">
								<span class="boxes">诊断: &nbsp;膀胱癌</span><br>
								<span class="boxes">本次诉求: &nbsp;病情有变化是否需要手术</span><br>
								<span class="boxes">约诊时间: &nbsp;2020-12-6</span>
							</view>
								
							<view style="border: 1px solid #F1F2F3;margin-top: 24rpx;width:480rpx;margin-left: 34rpx;"></view>
								
						</view>
					</view>
					<!-- 第二人 -->
					<view style="height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-left: 40rpx;margin-bottom:38rpx;">
						<span style="width: 148rpx;height: 148rpx;border-radius: 7.27rpx;background: #D8D8D8;position: relative;">
							<text style="position: absolute;width: 90rpx;height: 34rpx;opacity: 0.65;background: #000000;border-radius: 0 8.5px 8.5px 0;top: 8rpx;line-height: 34rpx;">
								<text style="font-size: 12px;color: #FFFFFF;text-align: center;width:52rpx;height: 34rpx;">NO.2</text>
							</text>
						</span>
								
						<view style="height:40rpx;width: auto;">
							<span style="width: 102rpx;height: 48rpx;margin-left:32rpx;margin-right:24rpx;font-weight: bold;font-size: 34rpx;
						color: #2C2C2C;">于某某</span>
							<span style="width: 336rpx;height:40rpx;font-size: 28rpx;color: #6F6A6A;font-family: PingFang-SC-Regular;">男
								&nbsp;
								72岁&nbsp;&nbsp;ID： zx0034000</span>
								
							<view style="width:490rpx;height:156rpx;margin-left:32rpx;" v-mode="type">
								<span class="boxes">诊断: &nbsp;肾癌</span><br>
								<span class="boxes">本次诉求: &nbsp;血尿, 做了彩超, 需要...</span><br>
								<span class="boxes">约诊时间: &nbsp;2020-12-6</span>
							</view>
								
							<view style="border: 1px solid #F1F2F3;margin-top: 24rpx;width:480rpx;margin-left: 34rpx;"></view>
								
						</view>
					</view>
					
					<view style="height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-left: 40rpx;margin-bottom:38rpx;">
						<span style="width: 148rpx;height: 148rpx;border-radius: 7.27rpx;background: #D8D8D8;position: relative;">
							<text style="position: absolute;width: 90rpx;height: 34rpx;opacity: 0.65;background: #000000;border-radius: 0 8.5px 8.5px 0;top: 8rpx;line-height: 34rpx;">
								<text style="font-size: 12px;color: #FFFFFF;text-align: center;width:52rpx;height: 34rpx;">NO.3</text>
							</text>
						</span>
					<!-- 第三人 -->	
						<view style="opacity: 0.65;">
							<view style="height:40rpx;width: auto;">
									<span style="width: 102rpx;height: 48rpx;margin-left:32rpx;margin-right:24rpx;font-weight: bold;font-size: 34rpx;
								color: #2C2C2C;">李某某</span>
									<span style="width: 336rpx;height:40rpx;font-size: 28rpx;color: #6F6A6A;font-family: PingFang-SC-Regular;">男
										&nbsp;
										56岁&nbsp;&nbsp;ID： zx0011000</span>
										
									<view style="width:490rpx;height:156rpx;margin-left:32rpx;" v-mode="type">
										<span class="boxes">诊断: &nbsp;肾癌</span><br>
										<span class="boxes">本次诉求: &nbsp;肾囊肿怎么治疗,和肾...</span><br>
										<span class="boxes">约诊时间: &nbsp;2020-12-6</span>
									</view>
										
									<view style="border: 1px solid #F1F2F3;margin-top: 24rpx;width:480rpx;margin-left: 34rpx;"></view>
										
								</view>
							</view>
						</view>		
						
			</view>
			
			<view v-if="dier">
				<view style="width: 100%;height: 176rpx;background: #F1F2F3;">
					<view style="width: 100%;height: 88rpx;background: #F1F2F3;"></view>
					<view style="width: 100%;height: 88rpx;background: #F1F2F3;text-align: center;line-height: 88rpx;position: relative;">
						<text style="width: 136rpx;height: 48rpx;font-family: PingFangSC-Regular;font-size: 34rpx;color: #2C2C2C;">我的诊室</text>
					</view>
				</view> 
				<!-- 图文问诊和预约问诊 -->
				<view style="display:flex; flex-direction: row;margin-top: 27.27rpx;">
					<view class="item" @tap="all(0)">
						<span :class="{active:isActive == 0}" @tap="alls(0)" @click="order" style="position: relative;">图文问诊</span>
						<text class="wire" :style="{backgroundColor:isActive == 0?'#3DCCA4':''}"></text>
					</view>
								
					<view class="itemmm" @tap="all(1)">
						<span :class="{active:isActive == 1}" @tap="alls(1)" @click="ord">预约问诊</span> <!-- @click="order" -->
						<text class="wirr" :style="{backgroundColor:isActive == 1?'#3DCCA4':''}"></text>
					</view>
				</view>
				<!-- 带接诊患者 -->
				<view style="display:flex; flex-direction: row;margin-top: 28rpx;margin-bottom: 40rpx;" 　v-mode="questions">
				
					<view class="oval" 　@tap="getData(0,2)"  @click="lk" :style="{backgroundColor:transform == 2?'#d1f3e9':''}"> </view>
					<span class="treat" @tap="getData(0,2)"  @click="lk" :style="{color:transform == 2?'#3DCCA4':''}">待接诊</span>
								
								
					<view class="ovall" @tap="getData(1,3)" @click="lki" :style="{backgroundColor:transform == 3?'#d1f3e9':''}"></view>
					<view>  <!-- @tap="jump" -->
						<span class="treatt" @tap="getData(1,3)" @click="lki" :style="{color:transform == 3?'#3DCCA4':''}">接诊中</span>
					</view>
								
								
					<view class="ovalll" @tap="getData(2,4)" @click="li" :style="{backgroundColor:transform == 4?'#d1f3e9':''}"></view>
					<view > <!-- @tap="jmp" -->
						<span class="treattt" @tap="getData(2,4)" @click="li" :style="{color:transform == 4?'#3DCCA4':''}">接诊记录</span>
					</view>
				</view>
				<view style="background-color: #ff55ff;width: 200px;height: 200px;"> 
					22
				</view>
			</view>
			<view v-if="disan">
				<view style="width: 100%;height: 176rpx;background: #F1F2F3;">
					<view style="width: 100%;height: 88rpx;background: #F1F2F3;"></view>
					<view style="width: 100%;height: 88rpx;background: #F1F2F3;text-align: center;line-height: 88rpx;position: relative;">
						<text style="width: 136rpx;height: 48rpx;font-family: PingFangSC-Regular;font-size: 34rpx;color: #2C2C2C;">我的诊室</text>
					</view>
				</view> 
				<!-- 图文问诊和预约问诊 -->
				<view style="display:flex; flex-direction: row;margin-top: 27.27rpx;"> 
					<view class="item" @tap="all(0)">
						<span :class="{active:isActive == 0}" @tap="alls(0)" @click="order" style="position: relative;">图文问诊</span>
						<text class="wire" :style="{backgroundColor:isActive == 0?'#3DCCA4':''}"></text>
					</view>
								
					<view class="itemmm" @tap="all(1)">
						<span :class="{active:isActive == 1}" @tap="alls(1)" @click="ord">预约问诊</span> <!-- @click="order" -->
						<text class="wirr" :style="{backgroundColor:isActive == 1?'#3DCCA4':''}"></text>
					</view>
				</view>
				<!-- 带接诊患者 -->
				<view style="display:flex; flex-direction: row;margin-top: 28rpx;margin-bottom: 40rpx;" 　v-mode="questions">
				
					<view class="oval" 　@tap="getData(0,2)"  @click="lk" :style="{backgroundColor:transform == 2?'#d1f3e9':''}"> </view>
					<span class="treat" @tap="getData(0,2)"  @click="lk" :style="{color:transform == 2?'#3DCCA4':''}">待接诊</span>
								
								
					<view class="ovall" @tap="getData(1,3)" @click="lki" :style="{backgroundColor:transform == 3?'#d1f3e9':''}"></view>
					<view>  <!-- @tap="jump" -->
						<span class="treatt" @tap="getData(1,3)" @click="lki" :style="{color:transform == 3?'#3DCCA4':''}">接诊中</span>
					</view>
								
								
					<view class="ovalll" @tap="getData(2,4)" @click="li" :style="{backgroundColor:transform == 4?'#d1f3e9':''}"></view>
					<view > <!-- @tap="jmp" -->
						<span class="treattt" @tap="getData(2,4)" @click="li" :style="{color:transform == 4?'#3DCCA4':''}">接诊记录</span>
					</view>
				</view>
				
				
					<!-- 第一人 -->
						<view style="height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-left: 40rpx;margin-bottom:38rpx;">
							<span style="width: 148rpx;height: 148rpx;border-radius: 7.27rpx;background: #D8D8D8;position: relative;"></span>
									
							<view style="height:40rpx;width: auto;">
								<span style="width: 102rpx;height: 48rpx;margin-left:32rpx;margin-right:24rpx;font-weight: bold;font-size: 34rpx;
							color: #2C2C2C;">张某某</span>
								<span style="width: 336rpx;height:40rpx;font-size: 28rpx;color: #6F6A6A;font-family: PingFang-SC-Regular;">女
									&nbsp;
									55岁&nbsp;&nbsp;ID： zx0025000</span>
									
								<view style="width:490rpx;height:156rpx;margin-left:32rpx;" v-mode="type">
									<span class="boxes">诊断: &nbsp;膀胱癌</span><br>
									<span class="boxes">服务类型: &nbsp;预约问诊</span><br>
									<span class="boxes">约诊时间: &nbsp;2020-12-6</span>
								</view>
									
								<view style="border: 1px solid #F1F2F3;margin-top: 24rpx;width:480rpx;margin-left: 34rpx;"></view>
									
							</view>
						</view>
					<!-- 第二人 -->
						<view style="height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-left: 40rpx;margin-bottom:38rpx;">
							<span style="width: 148rpx;height: 148rpx;border-radius: 7.27rpx;background: #D8D8D8;position: relative;"></span>
									
							<view style="height:40rpx;width: auto;">
								<span style="width: 102rpx;height: 48rpx;margin-left:32rpx;margin-right:24rpx;font-weight: bold;font-size: 34rpx;
							color: #2C2C2C;">于某某</span>
								<span style="width: 336rpx;height:40rpx;font-size: 28rpx;color: #6F6A6A;font-family: PingFang-SC-Regular;">男
									&nbsp;
									72岁&nbsp;&nbsp;ID： zx0034000</span>
									
								<view style="width:490rpx;height:156rpx;margin-left:32rpx;" v-mode="type">
									<span class="boxes">诊断: &nbsp;胃癌</span><br>
									<span class="boxes">服务类型: &nbsp;预约问诊</span><br>
									<span class="boxes">约诊时间: &nbsp;2020-12-6</span>
								</view>
									
								<view style="border: 1px solid #F1F2F3;margin-top: 24rpx;width:480rpx;margin-left: 34rpx;"></view>
									
							</view>
						</view>
				<!-- 第三人 -->
					<view style="height: 223.63rpx;display:flex; flex-direction: row;margin: auto;margin-left: 40rpx;margin-bottom:38rpx;">
						<span style="width: 148rpx;height: 148rpx;border-radius: 7.27rpx;background: #D8D8D8;position: relative;"></span>
								
						<view style="height:40rpx;width: auto;">
							<span style="width: 102rpx;height: 48rpx;margin-left:32rpx;margin-right:24rpx;font-weight: bold;font-size: 34rpx;
						color: #2C2C2C;">李某某</span>
							<span style="width: 336rpx;height:40rpx;font-size: 28rpx;color: #6F6A6A;font-family: PingFang-SC-Regular;">男
								&nbsp;
								56岁&nbsp;&nbsp;ID： zx0011000</span>
								
							<view style="width:490rpx;height:156rpx;margin-left:32rpx;" v-mode="type">
								<span class="boxes">诊断: &nbsp;肾癌</span><br>
								<span class="boxes">服务类型: &nbsp;预约问诊</span><br>
								<span class="boxes">约诊时间: &nbsp;2020-11-30</span>
							</view>
								
							<view style="border: 1px solid #F1F2F3;margin-top: 24rpx;width:480rpx;margin-left: 34rpx;"></view>
							
						</view>
					</view>
			</view>
		</view>
		
	</view>
</template>
<script>
	import {
		consulting
	} from 'API/message.js'
	import {
		setToken,
		setUid
	} from 'util/auth.js'

	export default {
		data() {
			return {
				type: "0",
				questions: "0",
				isActive: 0,
				transform: 2,
				alt:true,	//第一页面
				skll:false, //第三页面
				sl:false,//第二页面
				sp:false ,//预约问诊
				Stat:true,
				
				zong:false,
				dier:false,
				disan:false
			}
		},
		methods: {
			alls(index) { // 第一个切换
				this.isActive = index
			},
		order:function(){
			if (this.Stat != true) {
				this.Stat = true;
				this.sp = false;
				this.dier =false;
				this.disan = false;
				this.zong = false;
			}
		},
		ord:function(){
			if (this.zong != true) {
				this.zong = true;
				this.sp = true;
				this.Stat = false;
				this.dier =false;
				this.disan = false;
			}
		},
			
			lk: function() {	//待接诊 页面
					if (this.sp != true) {
						this.sp = true;
						this.dier = false
						this.disan = false;
					}
				},
				lki: function() {	//接诊中 页面
					if (this.dier != true) {
						this.dier = true;
						this.disan = false
						this.sp = false
					}
				},
				li:function(){ 	//接诊记录 页面
					if (this.disan != true) {
						this.disan = true;
						this.sp = false
						this.dier = false;
					}
				},
				
				
		sk: function() {	//待接诊 页面
				if (this.alt != true) {
					this.alt = true;
					this.skll = false
					this.sl = false;
				}
			},
			ski: function() {	//接诊中 页面
				if (this.sl != true) {
					this.sl = true;
					this.alt = false
					this.skll = false
				}
			},
			si:function(){ 	//接诊记录 页面
				if (this.skll != true) {
					this.skll = true;
					this.alt = false
					this.sl = false;
				}
			},
			getData(code, index) {
				this.questions = code;
				this.transform = index;
				console.log(arguments);
				consulting({
					interrogationType: this.type,
					interrogationStatus: this.questions,
				}).then(res => {
					console.log(res)
				})
			},
			// order() {
			// 	uni.navigateTo({
			// 		url: './order',
			// 	})
			// },

			all(cod) {
				this.type = cod;
				consulting({
					interrogationType: this.type,
					interrogationStatus: this.questions,
				}).then(res => {
					console.log(res)
				})
			},

			skip() {
				uni.navigateBack({ 	//关闭当前页面，返回上一页面或多级页面

				})
			},
			hit() {
				uni.navigateTo({
					url: './clinical',
				})
			},
		}
	}
</script>


<style lang="scss" scoped>
	.wire {
		width: 60rpx;
		height: 4rpx;
		position: absolute;
		top: 320rpx;
		left: 235rpx;
	}
	.wirr{
		width: 60rpx;
		height: 4rpx;
		position: absolute;
		top: 260rpx;
		left: 458rpx;
	}

	.wir {
		width: 60rpx;
		height: 4rpx;
		position: absolute;
		top: 320rpx;
		left: 458rpx;
	}

	.active {
		font-family: PingFangSC-Semibold;
		font-size: 36rpx;
		color: #3DCCA4;
		width: 144rpx;
		height: 50rpx;
	}

	.item {
		width: 144rpx;
		height: 50rpx;
		font-size: 36rpx;
		margin-left: 194rpx;
	}



	.itemmm {
		width: 144rpx;
		height: 44rpx;
		margin-left: 77rpx;
		margin-top: 5rpx;
		font-family: PingFangSC-Regular;
		font-size: 32rpx;
		color: #2C2C2C;
	}

	.oval {
		width: 210rpx;
		height: 60rpx;
		margin: auto;
		text-align: center;
		opacity: 0.6;
		background: #F1F2F3;
		border-radius: 30rpx;
		position: relative;
		left: 15rpx;
	}

	.treat {
		font-family: PingFangSC-Regular;
		font-size: 30rpx;
		color: #929495;
		width: 90rpx;
		height: 42rpx;
		position: absolute;
		left: 92rpx;
		margin-top: 10rpx;
	}

	.ovall {
		width: 210rpx;
		height: 60rpx;
		margin: auto;
		text-align: center;
		margin-left: 16.36rpx;
		margin-right: 16.36rpx;

		background: #F1F2F3;
		border-radius: 30rpx;
		opacity: 0.6;
	}

	.treatt {
		width: 90rpx;
		height: 42rpx;
		position: absolute;
		font-family: PingFangSC-Regular;
		font-size: 30rpx;
		color: #929495;
		margin-top: 10rpx;
		left: 330rpx;
	}

	.ovalll {
		width: 210rpx;
		height: 60rpx;
		margin: auto;
		text-align: center;
		margin-right: 42rpx;
		background: #F1F2F3;
		border-radius: 30rpx;
		opacity: 0.6;
	}

	.treattt {
		width: 120rpx;
		height: 42rpx;
		position: absolute;
		font-family: PingFangSC-Regular;
		font-size: 30rpx;
		color: #929495;
		margin-top: 10rpx;
		left: 550rpx;
	}

	.boxes {
		font-family: PingFangSC-Regular;
		font-size: 30rpx;
		color: #464646;
		line-height: 26px;
	}

	.rail {
		width: 100%;
		height: 61.81rpx;
		opacity: 0.15;
		background-color: #DC7134;
		position: relative;
	}

	.im {
		width: 25.45rpx;
		height: 25.45rpx;
		vertical-align: middle;
	}

	.text {
		width: 644rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFang-SC-Regular;
		color: #E28957;
		margin-left: 20rpx;
		vertical-align: middle;
	}
</style>
