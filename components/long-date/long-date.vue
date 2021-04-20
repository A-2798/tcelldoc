<template>
	<view>
		<view class="long-data-picker" >
			<picker-view :indicator-style="itemHeight" @change="bindDateChange">

				<picker-view-column>
					<view class="long-datetime-item" v-for="(item,index) in dates" :key="index">{{item}}</view>
				</picker-view-column>

				<picker-view-column>
					<view class="long-datetime-item" v-for="(item,index) in monthes" :key="index" >{{item}}</view>
				</picker-view-column>

				<picker-view-column>
					<view class="long-datetime-item" v-for="(item,index) in dayes" :key="index" >{{item}}</view>
				</picker-view-column>

			</picker-view>
		</view>
	</view>

</template>

<script>
	import moment from './moment.js'//导入文件
	moment.locale('zh-cn') 
	export default {
		name: "long-date",
		props: {
			
			chooseNum:{
				type:Number,
				default:30
			}

		},



		data() {
			return {
				monthes: ["23:55", "23:50", "23:45", "23:40", "23:35", "23:30", "23:25", "23:20", "23:15", "23:10", "23:05",
				"23:00", "22:55", "22:50", "22:45","22:40", "22:35", "22:30", "22:25", "22:20", "22:15", "22:10", "22:05",
				"22:00", "21:55", "21:45","21:40"  ,"21:35" , "21:30","21:25"  ,"21:20" ,"21:15" ,"21:10" ,"21:05" ,"21:00",
				"20:55", "20:50", "20:45", "20:40","20:35","20:30" ,"20:25" ,"20:20" ,"20:15" ,"20:10" ,"20:05" ,"20:00" ,
				"19:55","19:50" , "19:45","19:40" ,"19:35" , "19:30" , "19:25","19:20","19:15" ,"19:10" , "19:05","19:00",
				 "18:55", "18:50","18:45","18:35","18:30","18:25","18:20","18:15","18:10","18:05","18:00","17:55","17:50",
				"17:45","17:40" ,"17:35", "17:30", "17:25","17:20","17:15" , "17:10","17:05" ,"17:00" ,"16:55" ,"16:50" , 
				"16:45", "16:40", "16:35" , "16:30", "16:25", "16:20","16:10","16:05","16:00","15:55","15:50","15:45",
				 "15:40","15:35","15:30","15:25","15:20","15:15","15:10","15:05","15:00","14:55","14:50","14:45","14:40",
				"14:35","14:30","14:25","14:20","14:15","14:10","14:05","14:00","13:55","13:50","13:45","13:40","13:35",
				 "13:30","13:25","13:20","13:15","13:10","13:05","13:00","12:55","12:50","12:45","12:40","12:35","12:30",
				 "12:25","12:20","12:15","12:10","12:05","12:00","11:55","11:50","11:45","11:40","11:35","11:30","11:25",
				  "11:20","11:15","11:10","11:05","11:00","10:55","10:50","10:45","10:40","10:35","10:30","10:25","10:20",
				   "10:15","10:10", "10:05","10:00","09:55","09:50","09:45","09:40","09:35","09:30","09:25","09:20","09:15",
				   "09:10","09:05","09:00", "08:55","08:50","08:45","08:40","08:35","08:30","08:25","08:20","08:15","08:10","08:05",
				   "08:00","07:55","07:50","07:45","07:40","07:35","07:30","07:25", "07:20","07:15","07:10","07:05","07:00","06:55",
				   "06:50","06:45","06:40","06:35","06:30","06:25","06:20","06:15","06:10","06:05","06:00","05:55","05:50","05:45",
				   "05:40","05:35","05:30","05:25","05:20","05:15","05:10","05:05", "05:00" ,"04:55","04:50","04:45","04:40","04:35",
				   "04:30","04:25","04:20","04:15","04:10","04:05","04:00","03:55","03:50","03:45" ,"03:40","03:35","03:30","03:25",
				   "03:20","03:15","03:10","03:05", "03:00","02:55","02:50","02:45","02:40","02:35","02:30","02:25","02:20","02:15",
				   "02:10","02:05", "02:00", "01:55","01:50","01:45","01:40","01:35","01:30","01:25","01:20","01:15","01:10","01:05",
				   "01:00","00:55","00:50","00:45","00:40","00:35","00:30","00:25","00:20","00:15","00:10","00:05","00:00",], 
				              
				        dayes: ["23:55", "23:50", "23:45", "23:40", "23:35", "23:30", "23:25", "23:20", "23:15", "23:10", "23:05",
				        "23:00", "22:55", "22:50", "22:45","22:40", "22:35", "22:30", "22:25", "22:20", "22:15", "22:10", "22:05",
				        "22:00", "21:55", "21:45","21:40"  ,"21:35" , "21:30","21:25"  ,"21:20" ,"21:15" ,"21:10" ,"21:05" ,"21:00",
				        "20:55", "20:50", "20:45", "20:40","20:35","20:30" ,"20:25" ,"20:20" ,"20:15" ,"20:10" ,"20:05" ,"20:00" ,
				        "19:55","19:50" , "19:45","19:40" ,"19:35" , "19:30" , "19:25","19:20","19:15" ,"19:10" , "19:05","19:00",
				         "18:55", "18:50","18:45","18:35","18:30","18:25","18:20","18:15","18:10","18:05","18:00","17:55","17:50",
				        "17:45","17:40" ,"17:35", "17:30", "17:25","17:20","17:15" , "17:10","17:05" ,"17:00" ,"16:55" ,"16:50" , 
				        "16:45", "16:40", "16:35" , "16:30", "16:25", "16:20","16:10","16:05","16:00","15:55","15:50","15:45",
				         "15:40","15:35","15:30","15:25","15:20","15:15","15:10","15:05","15:00","14:55","14:50","14:45","14:40",
				        "14:35","14:30","14:25","14:20","14:15","14:10","14:05","14:00","13:55","13:50","13:45","13:40","13:35",
				         "13:30","13:25","13:20","13:15","13:10","13:05","13:00","12:55","12:50","12:45","12:40","12:35","12:30",
				         "12:25","12:20","12:15","12:10","12:05","12:00","11:55","11:50","11:45","11:40","11:35","11:30","11:25",
				          "11:20","11:15","11:10","11:05","11:00","10:55","10:50","10:45","10:40","10:35","10:30","10:25","10:20",
				           "10:15","10:10", "10:05","10:00","09:55","09:50","09:45","09:40","09:35","09:30","09:25","09:20","09:15",
				           "09:10","09:05","09:00", "08:55","08:50","08:45","08:40","08:35","08:30","08:25","08:20","08:15","08:10","08:05",
				           "08:00","07:55","07:50","07:45","07:40","07:35","07:30","07:25", "07:20","07:15","07:10","07:05","07:00","06:55",
				           "06:50","06:45","06:40","06:35","06:30","06:25","06:20","06:15","06:10","06:05","06:00","05:55","05:50","05:45",
				           "05:40","05:35","05:30","05:25","05:20","05:15","05:10","05:05", "05:00" ,"04:55","04:50","04:45","04:40","04:35",
				           "04:30","04:25","04:20","04:15","04:10","04:05","04:00","03:55","03:50","03:45" ,"03:40","03:35","03:30","03:25",
				           "03:20","03:15","03:10","03:05", "03:00","02:55","02:50","02:45","02:40","02:35","02:30","02:25","02:20","02:15",
				           "02:10","02:05", "02:00", "01:55","01:50","01:45","01:40","01:35","01:30","01:25","01:20","01:15","01:10","01:05",
				           "01:00","00:55","00:50","00:45","00:40","00:35","00:30","00:25","00:20","00:15","00:10","00:05","00:00",],           
				             
				itemHeight: `height: ${uni.upx2px(88)}px;`,
				dates: [],
				hours: [],
				minutes: [],
				formatdates:[]
			};
		},

		computed: {
			//自动计算当前时间
			currentdateindex:function(nv){
				console.log(nv)
				if(nv==0){
					let h = parseInt(moment().format("HH")) 
					this.hours = []
					for (let i = h; i < 24; i++) {
						let str = i;
						if (i < 10) {
							str = '0' + str;
						} else {
							str = '' + str;
						}
						this.hours.push(str);
					}
					
					this.minutes = []
					let m = parseInt(moment().format("mm")) 
					for (let i = m; i < 60; i++) {
						let str = i;
						if (i < 10) {
							str = '0' + str;
						} else {
							str = '' + str;
						}
						this.minutes.push(str);
					}
				}
			}
			
		},
		mounted() {
			this.initDate();
		},
		methods: {
			//初始化时间
			initDate() {
				let currentdate = moment().format("MMM Do");
				//设置日期数组
				this.dates = []
				//格式化日期数组
				this.formatdates = []
			
				
				for (let i = 0; i <= this.chooseNum; i++) {
					this.formatdates.push(moment().add(i, 'days').format("YYYY-MM-DD"))
					this.dates.push(moment().add(i, 'days').format("dddd"))
				}
				let h = parseInt(moment().format("HH"))
				this.hours = []
				for (let i = h; i < 24; i++) {
					let str = i;
					if (i < 10) {
						str = '0' + str;
					} else {
						str = '' + str;
					}
					this.hours.push(str);
				}
				this.minutes = []
				let m = parseInt(moment().format("mm")) 
				for (let i = m; i < 60; i++) {
					let str = i;
					if (i < 10) {
						str = '0' + str;
					} else {
						str = '' + str;
					}
					this.minutes.push(str);
				}
				console.log('=========', this.dates)
			},


			//滚动切换时间
			bindDateChange(e) { //有效日期的滚动日期时间方法
				let valueArr = e.detail.value
				this.hours = []
				this.minutes = []
				if(valueArr[0]!=0){
					for (let i = 0; i < 24; i++) {
						let str = i;
						if (i < 10) {
							str = '0' + str;
						} else {
							str = '' + str;
						}
						this.hours.push(str);
					}
					for (let i = 0; i < 60; i++) {
						let str = i;
						if (i < 10) {
							str = '0' + str;
						} else {
							str = '' + str;
						}
						this.minutes.push(str);
					}
				}else{
					let h = parseInt(moment().format("HH"))
					this.hours = []
					for (let i = h; i < 24; i++) {
						let str = i;
						if (i < 10) {
							str = '0' + str;
						} else {
							str = '' + str;
						}
						this.hours.push(str);
					}
					this.minutes = []
					let m = parseInt(moment().format("mm")) 
					for (let i = m; i < 60; i++) {
						let str = i;
						if (i < 10) {
							str = '0' + str;
						} else {
							str = '' + str;
						}
						this.minutes.push(str);
					}
				}
				
				let dateStr = this.formatdates[valueArr[0]];
				let hourStr = this.hours[valueArr[1]];
				let minuteStr = this.minutes[valueArr[2]];
				console.log(dateStr + ' ' + hourStr + ':' + minuteStr)
				console.log(valueArr);
				this.$emit("abc", {
					ttt: this.dates[valueArr[0]]
				});
			}

		},

	}
</script>

<style>
	/* .long-data {
		margin-top: 30rpx;
		height: 80rpx;
		background: #FFFFFF;
		line-height: 80rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		border-bottom: 1px solid #eee; */
		/* position: relative; */
		/* background: #0055B8;
	} */

	.long-data-check {
		height: 40rpx;
		width: 100%;
		background: #e54d42;
		position: absolute;
		left: 0;
		top: 18rpx;
		color: #fff;
		line-height: 45rpx;
		border-radius: 0rpx;
		padding: 0px 20rpx;
		font-size: 20rpx;
		text-align: center;
		border-radius: 20rpx;

	}

	.long-data-check-triangle {
		width: 0;
		height: 0;
		border-top: 12rpx solid transparent;
		border-left: 10rpx solid #e54d42;
		border-bottom: 12rpx solid transparent;
		position: absolute;
		right: 223rpx;
		top: 26rpx;
	}


	.long-data-fl {
		float: left;
	}

	.long-data-fr {
		float: right;
	}

	.long-data-changeTime {
		color: #888;
		font-size: 25rpx;
		position: relative;
		text-align: right;
		padding: 0rpx 20rpx;
		
	}

	.long-data-changeTimeIcon {
		color: #888;
		
	}

	.long-data-picker {
		width: 100%;
		height: 250rpx;
		overflow: hidden;
		background: #fff;
		transition: height 0.3s;
		
	}

	.long-datetime-item {
		text-align: center;
		width: 100%;
		height: 88upx;
		line-height: 88upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 30upx;
	}

	.long-data-picker picker-view {
		height: 100%;
	}
</style>
