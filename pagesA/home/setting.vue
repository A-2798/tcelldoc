<template>
	<view class="father">
		<view class="mask" v-show="maskShow" @click="setMaskShow"></view>
		<view class="mask" v-show="show1" @click="setMaskShow"></view>
		
		<view class="frame">
			<view style="width: 670rpx;height: 100%;margin: auto;">
				<span class="dredge">开通图文问诊</span>
				<span style="float: right; ">
				<switch class="switch" :checked="openOnlineinquiry" @tap="liberal" @change="openOnlineinquirysetting" />
				</span>
			</view>
		</view>
		<view class="bigBox" v-if="openOnlineinquiry">

			<view class="shelf">
				<view style="width: 640rpx;height: 100%;margin: auto;"> 
					<span class="terrace" >医生平台接诊规范事项</span>
					
					<span style="float: right; ">
						<span class="examine">查看</span>
						<image class="ico"  src="../../static/image/4.png" mode=""></image>
					</span>
				</view>

			</view>

	
			<view class="box">

				<view class="incontinence" >
				<span> 图文问诊</span>
					<view class="big" @tap=" this.model = !this.model">
						<input class="uni"  type="number"  v-model="synchronization1" />元
						<image class="icoo" src="../../static/image/4.png" mode="" @click="setMaskShow(1)"></image>
					</view>

				</view>

				<view class="sentence">- 超过3天未接诊,自动关闭;</view>
				<view class="sentence">- 接诊后开始计时;</view>
				<view class="sentence">- 给出结论问诊结束(限制48小时内),不限次数;</view>
				<view class="sentence">- 互动方式为图形形式,也可以发送语音快速回复;</view>
				<view class="sentence">- 问诊服务费用医生决定</view>

			</view>




			<view class="box">

				<view class="incontinence" >
					<span > 一问一答</span>
					<view class="big"   @tap=" this.model = !this.model">
						<input class="uni" style="display: inline-block;" v-model="synchronization2"  type="number" />元
						<image class="icoo" src="../../static/image/4.png" mode="" @click="setMaskShow(2)"></image>
					</view>

				</view>

				<view class="sentence">- 图文问诊方式之一,适合简单问题;</view>
				<view class="sentence">- 超过3天未接诊,自动关闭;</view>
				<view class="sentence">- 患者发出提问,医生回复提交即可;</view>
				<view class="sentence">- 互动方式为图形形式,也可以发送语音快速回复;</view>
				<view class="sentence">- 问诊服务费用医生决定</view>

			</view>

		</view>



	<!-- 底部弹出框 -->
	<view class="child" id="child" v-show="maskShow" > 
		<view class="character">设置图文问诊价格</view>
	
		<view style="line-height: 30vh;">
			<input class="money" type="text" style="text-align: right;" v-model="synchronization" value="" />
			<span class="unit">元</span>
		</view>
		<button style="position: fixed; bottom: 0;background-color:#ddd;width:100%;height:50px"  @click="setMaskShow1" type="default">确认</button>
	</view>
	
	<view class="child" id="child" v-show="show1">
		<view class="character">设置图文问诊价格</view>
	
		<view style="line-height: 30vh;">
			<input class="money" type="text" style="text-align: right;" v-model="synchronizationA" value="" />
			<span class="unit">元</span>
		</view>
		<button  style="position: fixed; bottom: 0;background-color:#ddd;width:100%;height:50px" @click="setMaskShow1" type="default">确认</button>
	</view>

		
	


	</view>
</template>

<script>
	import {
		education,
		close
	} from 'API/message.js'
	import {
		update,
		renewal
	} from 'API/message.js'


	export default {
		onLoad() {
			//从本地缓存中同步获取指定 key 对应的内容。uni.getStorageSync
			const openOnlineinquiry = uni.getStorageSync('openOnlineinquiry')
			this.openOnlineinquiry = openOnlineinquiry;
		},
		onShow() { // 	当 uni-app 启动，或从后台进入前台显示
			// 获取全局变量 getApp().globalData
			let synchronization1 = getApp().globalData.synchronization1;
			console.log(synchronization1);
			// 判断是否已有赋值且赋值大于等于0
			if(synchronization1 >= 0){
				// 将页面数据赋予到数据对象内
				this.synchronization1 = getApp().globalData.synchronization1;
			}else{
				console.log("第一次进入页面")
			}
			
			// 获取全局变量 getApp().globalData
			let synchronization2 = getApp().globalData.synchronization2;
			console.log(synchronization2);
			// 判断是否已有赋值且赋值大于等于0
			if(synchronization2 >= 0){
				// 将页面数据赋予到数据对象内
				this.synchronization2 = getApp().globalData.synchronization2;
			}else{
				console.log("第一次进入页面")
			}
		},
		onUnload() {	//onUnload 监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
			// 退出页面将变量存储进全局变量
			getApp().globalData.synchronization1 = this.synchronization1;
			console.log(getApp().globalData.synchronization1);
			
			// 退出页面将变量存储进全局变量
			getApp().globalData.synchronization2 = this.synchronization2;
			console.log(getApp().globalData.synchronization2);
		},
		data() {
			return {
				openOnlineinquiry: false,
				model: false,
				synchronization: '',
				synchronizationA: '',
				synchronization1: '',
				synchronization2: '',
				maskShow: false,
				show1: false,
				status: 1,
				is_img:'',
			}
		},
		methods: {
			//遮罩层
			setMaskShow1() {
				this.maskShow = false;
				this.show1 = false
				if (this.status == 1) {
					this.synchronization1 = this.synchronization;
				} else {
					this.synchronization2 = this.synchronizationA;
				}
				
				if(this.is_img){ // 发起axios
					if(this.is_img == 1){
						//更新图文问诊
						 renewal({
							imgCost:this.synchronization1,
						}).then(res => {
							console.log(res)
						})
					}else{
						//更新问答问诊
						update({
							questionCost:this.synchronization2
						}).then(res => {
							console.log(res)
						})
						} 
					}
				},
			
			setMaskShow(val) { // 金额
				this.status = val;
				this.is_img = val;
				if (val == 1) {
					this.synchronization1 = this.synchronization;
					this.maskShow = true;

				} else {
					this.synchronization2 = this.synchronizationA;
					this.show1 = true;
				}
			},

			changeisShow: function() {
				this.model = !this.model; //取反       
			},


			liberal() {
				if (this.openOnlineinquiry) {
					//开通图文问诊、
					education().then(res => {
						console.log(res)
					})
				} else {
					//关闭图文问诊、
					close().then(res => {
						console.log(res)
					})
				}
			},
			openOnlineinquirysetting() {
				this.openOnlineinquiry = !this.openOnlineinquiry
				uni.setStorageSync('openOnlineinquiry', this.openOnlineinquiry)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.frame {
		width: 100%;
		height: 109.09rpx;
		background: #ffffff;
		line-height: 109.09rpx;
	}
	
	.shelf {
		width: 100%;
		height: 109.09rpx;
		background: #ffffff;
		line-height: 109.09rpx;
		margin-top: 36.36rpx;
	}

	.terrace { 
		width: 174.54rpx;
		height: 40rpx;
		font-size: 29.09rpx;
		color: #000000;
	}

	// .examine {
	// 	margin-left: 281.81rpx;
	// 	background: #55ff7f;
	// }

	.ico { 
		width: 13.38rpx;
		height: 24.94rpx;
		vertical-align: middle;
		margin-left: 9.09rpx;
	}
	
	.icoo {
		width: 13.38rpx;
		height: 24.94rpx;
		vertical-align: middle;
		margin-left: 9.09rpx;
	}
	.box {
		width: 100%;
		height: 410.9rpx;
		margin-top: 36.36rpx;
		background: #ffffff;
	}

	.incontinence {
		// display: inline-block;
		// height: 45.45rpx;
		// // display: flex;
		// padding-top: 36.36rpx;
		// font-size: 32.72rpx;
		// color: #000000;
		// width: 100%;
		
		
		width: 640rpx;
		height: 60rpx;
		margin: auto;
	}

	picker {
		margin-left: 200px;
	}

	.sentence {
		margin-top: 25.18rpx;
		margin-left: 54.54rpx;
		font-size: 25.45rpx;
		color: #000000;

	}

	.model {
		height: auto;
		border-top-left-radius: 25px;
		border-top-right-radius: 25px;
		background: #ffffff;
	}

	.big {
		color: #ff0000;
		
		float: right;
	}
 
	.uni {
		width: 350rpx;
		height: 36.36rpx;
		vertical-align: middle;
		display: inline-block;
		text-align: right;
		margin-right: 10rpx;
	}

	.character {
		font-size: 32.72rpx;
		color: #000000;
		height: 50px;
		margin-left: 54.54rpx;
		line-height: 90.9rpx; 
	}

	.unit {
		margin-left: 54.54rpx;
	}

	.money {
		width: 150px;
		height: 50px;
		margin-left: 30%;
		display: inline-block;
		border: 1.81rpx #333333 solid;
	}

	.father {
		width: 100%;
		height: 100%;
		background: #F3F3F3;
	}

	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		opacity: 0.3;
	}

	.child {
			border-radius: 30px 30px 0 0;
			width: 100%;
			height:40vh;
			background: #00aaff;
			border: 1px solid #ccc;
			background: #fff;
			position: fixed;
			bottom: 0px;
			left: 0px;
		} 
	// .bigBox{
	// 	height: 700rpx; 
	// }
	// .confirm_btn{
	// 	position: relative;
	// }

</style>
 