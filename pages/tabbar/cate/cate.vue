<template>
	<view>
		<view style="width:100%;height: 181rpx;background-color: #14c145;">

		</view>
		<view class="header">
			<span class="jiben">完善基本信息</span>
		</view>

		<view class="wanshan">
			<span class="xinxi">请完善信息</span>
			<span class="xibao">T细胞将对您的个人信息保密</span>
		</view>

		<picker :range="nameArr" @change="picker1" :value='nameIdx' @tap="myFunction(nameIdx)">
			<view class="uni-input">
				姓名<image src="../../../static/logo.png" style="width: 25.45rpx;height: 25.45rpx;"></image>

				
			</view>
			<span style="margin-left: 180rpx;">{{nameArr[nameIdx]}}</span>
			<view class="xian"></view>
		</picker>

		<picker :range="sexArr" @change="picker2" :value='sexIdx' @tap="myFunction(sexIdx)">
			<view class="uni-input">
				性别<image src="../../../static/logo.png" style="width: 25.45rpx;height: 25.45rpx;"></image>

			</view>
			<span style="margin-left: 180rpx;">{{sexArr[sexIdx]}}</span>
			<view class="xian"></view>
		</picker>

		<picker mode="date" @change="picker3" :value="date">
			<view class="uni-input">
				出生日期

			</view>
			<span style="margin-left: 180rpx;"> {{date}}</span>
			<view class="xian"></view>
		</picker>

		<picker :range="statusArr" @change="picker4" :value='shenfenIdx'>
			<view class="uni-input">
				身份证号

			</view>
			<span style="margin-left: 180rpx;">{{statusArr[shenfenIdx]}}</span>
			<view class="xian"></view>
		</picker>

		<picker :range="hospitalArr" @change="picker5" :value='yiyuanIdx' @tap="myFunction(yiyuanIdx)">
			<view class="uni-input">
				执业医院<image src="../../../static/logo.png" style="width: 25.45rpx;height: 25.45rpx;"></image>

			</view>
			<span style="margin-left: 180rpx;">{{hospitalArr[yiyuanIdx]}}</span>
			<view class="xian"></view>
		</picker>

		<picker :range="administrativeArr" @change="picker6" :value="keshiIdx" @tap="myFunction(keshiIdx)">
			<view class="uni-input">
				科室<image src="../../../static/logo.png" style="width: 25.45rpx;height: 25.45rpx;"></image>

			</view>
			<span style="margin-left: 180rpx;"> {{ administrativeArr[keshiIdx] }}</span>
			<view class="xian"></view>
		</picker>


		<button @tap="hanld"> 下一步 </button>
	</view>
</template>

<script>
	// import {uploadMessage} from 'API/message.js'
	export default {
		data() {
			return {
				// token:'',

				nameIdx: 0,
				nameArr: ['', '张三', '李四', '王五'],

				sexIdx: 0,
				sexArr: ['', '女', '男'],

				date: new Date().toLocaleDateString(),

				shenfenIdx: 0,
				statusArr: ['', '210281199411012015', '210281199411012019'],

				yiyuanIdx: 0,
				hospitalArr: ['', '医大二院', '青山医院', '中山医院'],

				keshiIdx: 0,
				administrativeArr: ['', '肿瘤科室', '泌尿科室', '手术室'],

			}
		},
		methods: {
			picker1(e) {
				console.log(e, e.target)
				this.nameIdx = e.target.value
			},
			picker2(e) {
				this.sexIdx = e.target.value
			},
			picker3(e) {
				this.date = e.target.value
			},
			picker4(e) {
				this.shenfenIdx = e.target.value
			},
			picker5(e) {
				this.yiyuanIdx = e.target.value
			},
			picker6(e) {
				this.keshiIdx = e.target.value
			},

			hanld() {
				let obj = {
					name: this.nameArr[this.nameIdx],
					sex: this.sexArr[this.sexIdx],
					birthday: this.date,
					idNumber: this.statusArr[this.shenfenIdx],
					attendingHospital: this.hospitalArr[this.yiyuanIdx],
					administrativeOfficeId: this.administrativeArr[this.keshiIdx],
				}
				let userData = JSON.stringify(obj);
				uni.navigateTo({
					url: '/pagesA/index/message?userData=' + encodeURIComponent(userData), //请求成功后跳转注册页 
				});
			},

			myFunction(nameIdx) { //点击事件
				if (nameIdx == 0 || sexIdx == 0 || yiyuanIdx == 0 || keshiIdx == 0) {
					uni.showModal({
					    title: '提示',
					    content: '红色星号为必选项',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.header {
		background: #D8D8D8;
		text-align: center;
		width: 752.72rpx;
		height: 127.27rpx;
		line-height: 127.27rpx;

		.jiben {
			font-size: 21px;
			color: #000000;
			width: 229.09rpx;
			height: 52.72rpx;
		}
	}

	.wanshan {
		width: 752.72rpx;
		height: 127.27rpx;
		background: rgba(0, 0, 0, 0.10);

		.xinxi {
			float: left;

			margin-top: 23.63rpx;
			margin-left: 54.54rpx;
			margin-right: 534.54rpx;
			font-size: 18px;
			color: #000000;
			line-height: 25px;
			width: 90px;
			height: 45.45rpx;
		}

		.xibao {
			float: left;
			font-size: 25.45rpx;
			color: rgba(0, 0, 0, 0.50);
			line-height: 36.36rpx;
			width: 321.81rpx;
			height: 36.36rpx;
			margin-left: 54.54rpx;
			margin-right: 376.36rpx;
			margin-bottom: 21.81rpx;
		}
	}

	.xian {
		width: 640rpx;
		border: 1px solid #979797;
		margin: auto;
	}

	.uni-input {
		// margin-left: 54.54rpx;
		margin-bottom: 16.54rpx;
		margin-top: 36.36rpx;
		margin-left: 8%;
	}

	button {
		margin-top: 54.54rpx;
	}
</style>
