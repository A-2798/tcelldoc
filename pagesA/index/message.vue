<template>
	<view>
		<view class="headers">
			<span class="jibens">完善基本信息</span>
		</view>
		 
		<view class="wanshans">
			<span class="xinxis">请完善信息</span>
		    <span class="xibaos">T细胞将对您的个人信息保密</span>
		</view>
		
		<picker :range="namesArr" @change="picker7" :value='namesIdx' @tap="myFunction(namesIdx)">
			<view class="uni-inputs">
				技术职称<image src="../../static/lee-search/logo.png" style="width: 25.45rpx;height: 25.45rpx;"></image> 
			
			</view>
			<span style="margin-left: 180rpx;">{{namesArr[namesIdx]}}</span>
			<view class="xians"></view>
		</picker>
		
		<picker :range="sexsArr" @change="picker8" :value='sexsIdx'>
			<view class="uni-inputs">
				教学职称 
			
			</view>
			<span style="margin-left: 180rpx;">{{sexsArr[sexsIdx]}}</span>
			<view class="xians"></view>
		</picker>
		
		<picker :range="administrativesArr" @change="picker9" :value="keshisIdx">
			<view class="uni-inputs">
				行政职称 
			
			</view>
			<span style="margin-left: 180rpx;">{{ administrativesArr[keshisIdx] }}</span>
			<view class="xians"></view>	
		</picker> 
		
		<picker :range="statussArr" @change="picker10" :value='shenfensIdx' @tap="myFunction(shenfensIdx)" >
			<view class="uni-inputs">
				收治疾病<image src="../../static/lee-search/logo.png" style="width: 25.45rpx;height: 25.45rpx;"></image> 
			
			</view>
			<span style="margin-left: 180rpx;">{{statussArr[shenfensIdx]}}</span>
			<view class="xians"></view>
		</picker>
		
		<picker :range="hospitalsArr" @change="picker11" :value='yiyuansIdx' @tap="myFunction(yiyuansIdx)">
			<view class="uni-inputs">
				专业领域<image src="../../static/lee-search/logo.png" style="width: 25.45rpx;height: 25.45rpx;"></image> 
			
			</view>
			<span style="margin-left: 180rpx;">{{hospitalsArr[yiyuansIdx]}}</span>
			<view class="xians"></view>	
		</picker>
		 
		<view class="section">
		  <textarea class="text" maxlength="-1" rows="3" cols="20" placeholder="请在这里书写..." auto-focus />
		</view>
		
		<button @tap="hanld"> 下一步 </button>
	</view> 
</template>

<!-- 信息填写使用滚动选择页面 -->

<script>
	// import {uploadMessage} from 'API/message.js'  这个是第二个页面
	export default {
		data() {
			return {
				text:"",
				
				
				namesIdx:0,
				namesArr: ['','挖掘机', '蓝翔', '仙术'],
				
				sexsIdx:0,
				sexsArr:  ['','教授','普工','小工'],
				
				keshisIdx:0,
				administrativesArr: ['','黑服' , '白服'],
				
				shenfensIdx:0,
				statussArr:['','牛皮癣' , '银屑病' , '糖尿病'],
				
				yiyuansIdx:0,
				hospitalsArr:['','肿瘤专业' , '泌尿专业' , '手术专业'],
				userData:{},

			}
		},
		onLoad: function (option) {
		    this.userData = JSON.parse(decodeURIComponent(option.userData));
		},
		methods: {
			picker7(e) {
				console.log(e,e.target)
				this.namesIdx = e.target.value
			},
			picker8(e) {
			    this.sexsIdx = e.target.value
			},
			picker9(e) {
			    this.keshisIdx = e.target.value
			},
			picker10(e) {
			    this.shenfensIdx = e.target.value
			},
			picker11(e) {
			    this.yiyuansIdx = e.target.value
			},
			
			hanld() {
				let userData1 = this.userData;
				userData1.technicalTitles = this.namesArr[this.namesIdx];
				userData1.teachingJobTitle = this.sexsArr[this.sexsIdx];
				userData1.administrAtivetitles = this.administrativesArr[this.keshisIdx];
				userData1.treatingDisease = this.statussArr[this.shenfensIdx];
				userData1.professionalField = this.hospitalsArr[this.yiyuansIdx];
				userData1 = JSON.stringify(userData1)
				uni.navigateTo({
					url: '/pagesA/index/identity?userData1='+encodeURIComponent(userData1),
						});
			},
			myFunction(namesIdx) { //点击事件
				if (namesIdx == 0 || shenfensIdx == 0 || yiyuansIdx == 0 ) {
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
	.headers {
		background: #D8D8D8;
		text-align: center;
		width: 752.72rpx;
		height: 127.27rpx;
		line-height: 127.27rpx;
	.jibens{
		font-size: 21px;
		color: #000000;
		width: 229.09rpx;
		height: 52.72rpx;
	}	
	}
	
	.wanshans{
		width: 752.72rpx;
		height: 127.27rpx;
		background: rgba(0,0,0,0.10);
		
	.xinxis{
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
	.xibaos{
		float: left;
		font-size: 25.45rpx;
		color: rgba(0,0,0,0.50);
		line-height: 36.36rpx;
		width: 321.81rpx;
		height: 36.36rpx;
		margin-left: 54.54rpx;
		margin-right: 376.36rpx;
		margin-bottom: 21.81rpx;
	}
	}
	
	.xians{
		width: 640rpx;
		border: 1px solid #979797;
		margin: auto;
	}
	.uni-inputs{
		margin-left: 54.54rpx;
		margin-top: 36.36rpx;
	}
	
	.text{
		width: 80%;
		height: 272.72rpx;
		border: 1.81rpx solid #808080;
		margin: auto;
		margin-top: 54.54rpx;
	}
	button{
		margin-top: 54.54rpx;
	}
</style>
