<template>
	<view style="background: #f4f4f4;height: 100%;">
		<!-- 遮罩层 -->
		<span class='popContainer' v-show="isShow"> </span>

		<!-- 设置1 -->
		<view class="boxes">
			<span class="outcall">选择固定出诊日</span>
			<span class="install">
				<text>{{opent == week ? '设置' : week}}</text>
				<image class="format" @tap="isShow = !isShow" src="../../static/image/4.png" mode=""></image>
			</span>
		</view>


 

		<!-- 设置2 -->
		<view class="bag">
			<span class="monthly">选择非固定出诊日 (需要按月设置)</span>
			<span class="dictionaries">设置
				<image @click="show = true" class="format" src="../../static/image/4.png" mode=""></image>
			</span>
			

			<!-- 日历组件 -->
			<ei-calendar :visible.sync="show" type="multiple" @submit="doSubmit" :disabledDate="disabledDate" v-model="date" :custom-date="customDate"
			 format="YYYY-MM-DD">
			</ei-calendar>
		</view>



		<!-- 设置3 -->
		<view class="numbers">
			<span>设置接诊人数上限</span>
			<span class="cow">设置
				<image class="format" src="../../static/image/4.png" mode=""></image>
			</span>
			
		</view>
		<!-- 设置4 -->
		<view class="sum">
			<span>设置接诊时间</span>
			<span class="reception">设置
				<image class="format" src="../../static/image/4.png" mode=""></image>
			</span>
			
		</view>
		<!-- 设置5 -->
		<view class="upper" @click="aaa">
			<span>设置接诊费用</span>
			<span class="cost">设置
				<image class="format" src="../../static/image/4.png" mode=""></image>
			</span>
		</view>


		<!-- 底部弹出框 -->
		<view v-if="isShow" class="long" >	
		
		<view style="display: flex;flex-direction: row;background: #ffffff;border-radius: 30px 30px 0 0;margin-top: 420rpx;">
		
			<span class="itemw">日期</span>
			<span class="itemw">开始时间</span>
			<span class="itemw">结束时间</span>
		</view>
			
			<long-date @abc="abc"></long-date>
			
			<button @tap="affirm" >确认</button>
		</view>
			
		 


	</view>
</template>
<script>
	
	import longDate from "@/components/long-date/long-date.vue" // 固定日出诊日历
	import EiCalendar from '@/components/ei-calendar/ei-calendar'; // 非固定日 日历

	import { unfixed } from 'API/message.js' 
	export default {


		components: {
			EiCalendar,
			longDate
		},
		data() {

			return {
				isShow: false,
				// 周几
				week: '',
				temp: {},
				opent: false,
				time: '',
				show: false,
				date: ['2021-02-10'],
				customDate: [{
					cellClass: 'custom-cell',
					date: '2023-05-23',
					top: [{
							class: 'custom-cell-top-1',
							text: '①'
						},
						{
							class: 'custom-cell-top-2',
							text: '×'
						}
					]
				}],
				
			};
		},
		onLoad() {},
		onShow() {
			this.time = this.yearTime()
		},
		methods: {
			abc(data){
				console.log('==========', data);
				this.temp = data;
			},
			affirm(){
				this.isShow = !this.isShow;
				this.week = this.temp.ttt;
			},
			doSubmit(value) {
				console.log('doSubmit')
				unfixed({
					reqJson: this.date.toString(),
				}).then(res => {
					console.log(res)
				})
			},

			onSelectTime(val) {
				console.log(val);
			},
			
			bindTimeChange: function(e) {
				this.time = e.detail.value
			},
			
			yearTime(e) {
				var a = new Date();
				var y = a.getFullYear();
				var m = a.getMonth() + 1;
				m = m < 10 ? "0" + m : m;
				var d = a.getDate();
				d = d < 10 ? "0" + d : d;

				var h = a.getHours();
				h = h < 10 ? "0" + h : h;
				var mm = a.getMinutes();
				mm = mm < 10 ? "0" + mm : mm;
				var s = a.getSeconds();
				s = s < 10 ? "0" + s : s;

				if (e == 'year') {
					return y + '/' + m + '/' + d;
				}
				if (e == 'time') {
					return h + ':' + mm + ':' + s;
				}
				if (e == 'yearTime') {
					return y + '/' + m + '/' + d + '  ' + h + ':' + mm + ':' + s;
				}
				return h + ':' + mm;
			},
			
			disabledDate(date) {
				const start = new Date('2021/02/10').getTime();
				const end = new Date('2023/6/21').getTime();
				return date.getTime() <= start || date.getTime() >= end;
			},

			showMask() {
				this.isShow = true;
				console.log(this.isShow);
			},

			handelClose(dateObj) {
				this.isShow = false;
				// 关闭获取值设置
				console.log(dateObj.date);
				this.week = dateObj.date
			},
		},
		

	}
</script>

        

<style lang="scss" scoped>
	.itemw{
		width: 100%;
		text-align: center;
		height: 50px;
		line-height: 50px;
		font-size: 12px;
		color: #6F6A6A;
	}
	
	.popContainer {
	 position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: rgba(0,0,0,0.3);
	}

	 .long{
		opacity: 0.9;
	}
	

	.page {
		background: #f8f8f8;
		height: 100vh;
		font-size: 28upx;
	}

	.custom-cell {
		color: #4cd964;
	}

	.custom-cell-top-1 {
		color: #007aff;
	}

	.custom-cell-top-2 {
		color: red;
	}
	
	
	.boxes {
		height: 109.09rpx;
		background: #ffffff;
		line-height: 109.09rpx;
		padding-left: 50.54rpx;
		
		.install {
			margin-right: 6%;
			float: right;
		}

		.format {
			width: 13.38rpx;
			height: 24.94rpx;
			vertical-align: middle;
			margin-left: 9.09rpx;
		}
	}

	.bag {
		height: 109.09rpx;
		background: #ffffff;
		line-height: 109.09rpx;
		padding-left: 50.54rpx;
		margin-top: 18.18rpx;

		.dictionaries {
			margin-right: 6%;
			float: right;
			
		}
		.monthly{
			width: 240px;
			height: 22px;
			font-size: 16px;
			color: #000;
		}
		.format {
			width: 13.38rpx;
			height: 24.94rpx;
			vertical-align: middle;
			margin-left: 9.09rpx;
		}
	}

	.numbers {
		height: 109.09rpx;
		background: #ffffff;
		line-height: 109.09rpx;
		padding-left: 50.54rpx;
		margin-top: 18.18rpx;

		.cow {
			margin-right: 6%;
			float: right;
		}

		.format {
			width: 13.38rpx;
			height: 24.94rpx;
			vertical-align: middle;
			margin-left: 9.09rpx;
		}
	}

	.sum {
		height: 109.09rpx;
		background: #ffffff;
		line-height: 109.09rpx;
		padding-left: 50.54rpx;
		margin-top: 18.18rpx;

		.reception {
			margin-right: 6%;
			float: right;
		}

		.format {
			width: 13.38rpx;
			height: 24.94rpx;
			vertical-align: middle;
			margin-left: 9.09rpx;
		}
	}

	.upper {
		height: 109.09rpx;
		background: #ffffff;
		line-height: 109.09rpx;
		padding-left: 50.54rpx;
		margin-top: 18.18rpx;
		margin-bottom: 18.18rpx;
		.cost {
			margin-right: 6%;
			float: right;
		}

		.format {
			width: 13.38rpx;
			height: 24.94rpx;
			vertical-align: middle;
			margin-left: 9.09rpx;
		}
	}
</style>
