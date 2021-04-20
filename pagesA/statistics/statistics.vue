<template>
	<view>

		<view class="Statistics">
 
			<view class="carcinoma">
				<text class="">癌种占比统计</text>
			</view>
			<!-- 患癌指数 -->
			<view>
				<canvas canvas-id="ringCanvas" class="canva" @touchstart="touchHandler"></canvas>
			</view>

			<view class="branch">
				<view style="">
					<view class="part">
						<view class="bran"></view>
						<text style="position: absolute;left: 40rpx;">肾癌</text> 
						<text class="number">32</text>
					</view>

					<view class="part">
						<view class="bran"></view>
						<text style="position: absolute;left: 40rpx;">肾盂输尿管癌</text>
						<text class="number">9</text>
					</view>

					<view class="part">
						<view class="bran"></view>
						<text style="position: absolute;left: 40rpx;">膀胱癌</text>
						<text class="number">23</text>
					</view>
 
					<view class="part">
						<view class="bran"></view>
						<text style="position: absolute;left: 40rpx;">前列腺癌</text>
						<text class="number">44</text>
					</view>

					<view class="part">
						<view class="bran"></view>
						<text style="position: absolute;left: 40rpx;">其他</text>
						<text class="number">2</text> 
					</view>

				</view>
			</view>
		</view>

		<view style="margin-left: 36.36rpx;">
			<swiper-nav :height="height" :width="width" :current="current" :nav-list="list" :bg-color="bgColor" :border-bg-color="borderBgColor"
			 :active-color="activeColor" :color="color" @current-change="currentChange"></swiper-nav>
			<view class="content">
				<view v-if="current === 0">

					<view class="middle">
						<view class="">
							<view style="font-size: 36.36rpx;color: #000000;margin-bottom: 36.36rpx;margin-top: 27.27rpx;">男女比例</view>
						</view>	
						<!-- 男女比例 -->	
							<view style="width: 645.45rpx;position: relative;background: #18B566;">
								<view style="width: 223rpx;height: 199.99rpx;position: absolute;left: 54.54rpx;">
									<u-circle-progress active-color="#2979ff" :percent="80">
											<view class="u-progress-content">
												<view>{{}} %</view>
											</view>
									</u-circle-progress>
									<text style=""> 男性患病人数: 14</text>
								</view>
								
								<view style="width: 223rpx;height: 199.99rpx;position: absolute;right: 0;">
									<u-circle-progress active-color="#2979ff" :percent="80">
											<view class="u-progress-content">
												<view>{{}} %</view>
											</view>
									</u-circle-progress> 
									<text style=""> 女性患病人数: 9</text>
								</view>
							</view>
						 
					</view>
					<view style="width: 80%;height: 1.81rpx;margin-top:280rpx;"></view>
						
					
						<!-- 年龄比例 -->
					<view class="">
						<view style="font-size: 36.36rpx;color: #000000;margin-bottom: 36.36rpx;margin-top: 27.27rpx">年龄比例</view>
						<view class="lis" v-for="(item, index) in lis" :key="index">
							<view style="width:150rpx;">
								{{item.title}}
							</view>
								<view class="process">
									<view class="process_posi" :style="{ width: item.pronum + '%' }"></view>
								</view>
								<view class="percentNumber">
									{{item.pronum}}%
									<text style="margin-left:20upx">{{item.pronums}}人</text>
								</view>
						</view>
					</view>
					  
					<!-- 用药统计 -->
					<view class="">
						<view style="font-size: 36.36rpx;color: #000000;margin-bottom: 36.36rpx;margin-top: 27.27rpx">用药统计</view>
						
						<view class="">
							<uni-ec-canvas class="uni-ec-canvas" id="pie-chart" canvas-id="multi-charts-pie" :ec="ec" force-use-old-canvas="true" >
								
							</uni-ec-canvas>
						</view>
					</view>
					
					 
							
				</view>
				<view v-if="current === 1">
					选项卡2的内容 
				</view>
				<view v-if="current === 2">
					选项卡3的内容
				</view>

			</view>
		</view>

 
 
 
	</view>
</template>
<script>
	import uniEcCanvas from '../components/uni-ec-canvas/uni-ec-canvas.vue'//引用的这个
	import { pieOption } from "../../util/pie.js";
	
	import swiperNav from '@/components/wee-swiper-nav/wee-swiper-nav.vue'
	var uniCharts = require('../../static/js/uniCharts.js');  
	var ringChart = null;
	export default {
		
		components: {
			swiperNav,
			uniEcCanvas
		},
		data(){
			return{
				 list: ['导航导航到哈1', '导航2', '导航导航到哈3', '导航4', '导航5', '导航6', '导航7'],
				            current: 0,
				            height: 100,
				            width: 190,
				            bgColor: '#ffffff',
				            activeColor: '#000000',
				            borderBgColor: '#000000',
				            color: '#000000',
				lis: [{
						title: "<18",
						pronum: 0,
						pronums: 1
					},
					{
						title: "18-34",
						pronum: 0,
						pronums: 2
					},
					{
						title: "35-39",
						pronum: 0,
						pronums: 4
					},
					{
						title: "60-69",
						pronum: 0,
						pronums: 7
					},
					{
						title: "70-79",
						pronum: 0,
						pronums: 5
					},
					{
						title: "≥80",
						pronum: 0,
						pronums: 3
					},
				],
				nums: 0, //总人数
				
				ec: {
					option: {} //echart 配置项
				}
			}
		},
		
		onReady: function(e) {
			ringChart = new uniCharts({
				animation: true,
				canvasId: 'ringCanvas',
				type: 'ring',
				extra: {
					ringWidth: 20,
				},
				title: {
					name: '110',
					color: '#7cb5ec',
					fontSize: 16
				},
				subtitle: {
					name: '患癌指数',
					color: '#000000',
					fontSize: 11,
				},
				series: [{
					name: '成交量1',
					data: 15,
					stroke: false
				}, {
					name: '成交量2',
					data: 35,
					stroke: false
				}, {
					name: '成交量3',
					data: 78,
					stroke: false
				}, {
					name: '成交量4',
					data: 63,
					stroke: false
				}, {
					name: '成交量5',
					data: 23,
					stroke: false
				}],
				disablePieStroke: true,
				width: 150,
				height: 160,
				dataLabel: false,
				legend: false,
				background: '#ffff00',
				padding: 0
			});
			ringChart.addEventListener('renderComplete', () => {
				console.log('renderComplete');
			});
			setTimeout(() => {
				ringChart.stopAnimation();
			}, 500);  
			
			setTimeout(() => {
				//数组内的数据要$set哦
				this.ec.option = pieOption;
				console.log(pieOption);
			}, 500);
		},
		methods: {
			touchHandler: function(e) {
				console.log(ringChart.getCurrentDataIndex(e));
			},
			updateData: function() {
				ringChart.updateData({
					title: {
						name: '80%'
					},
					subtitle: {
						color: '#ffaaff'
					}
				}); 
			},
			currentChange(e) {
				console.log(e)
				this.current = e
			},
			},
		mounted() {
			this.currentChange(),
			
			// 计算总人数算比例
			this.lis.forEach((item, index) => {
				this.nums = parseInt(item.pronums) + this.nums
			})
			this.lis.forEach((item, index) => {
				this.lis[index].pronum = parseInt((parseInt(item.pronums) / this.nums * 100))
			})
		},
	
	
	}
</script>
<style lang="scss" scoped>
	.Statistics {
		width: 643.63rpx;
		height: 421.81rpx;
		margin: auto;
		margin-top: 17rpx;
		background: #f5f5f5;
		text-align: center;

		.carcinoma {
			width: 207.27rpx;
			height: 45.45rpx;
			font-size: 32.72rpx;
			color: #000000;
			margin: auto;
		}

		.branch {
			width: 312rpx;
			height: 235.63rpx;
			float: left;
			margin-top: 70.18rpx;
			margin-left: 9.09rpx;
			position: relative;
			.bran {
				    width: 21.81rpx;
				    height: 10.9rpx;
				    display: inline-block;
				    float: left;
				    background: #D8D8D8;
					margin-top: 15rpx;
			}

			.part {
				width: 400.72rpx;
				height: auto; 
				display: flex;
				flex-direction: row;
				display: inline-block;
			.number {
					position: absolute;
					right: 18.18rpx;
				}
			}
		}
	}

	.canva {
		float: left;
		width: 320.81rpx;
		height: 350.81rpx;
	}

	.middle {
		width: 100%;
		height: auto;
		margin-left: 18.18rpx;
	}
	
	.u-progress-content {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		
	/deep/ .progress{
		width: 70%;
		margin-left: 20%;
		background-color: red;
		display: inline-block;
	}
	
	.lis {
		display: flex;
		margin-bottom: 20rpx;
		margin-left: 50rpx;
	}
	
	.process {
		width: 90%;
		height: 36.36rpx;
		position: relative;
		background: #f3f3f3;
		border-radius: 0 100px 100px 0;
	}
	
	.process_posi {
		position: absolute;
		background: #D8D8D8;
		border-radius: 0 100px 100px 0;
		top: 0;
		left: 0;
		width: 0%;
		height: 100%;
	}
	
	.percentNumber{
			position: relative;
			right: 150rpx;
			width: 181.81rpx;
		}
	
	.uni-ec-canvas {
		width: 100%;
		height: 115px;
		display: block;
	}
</style>
