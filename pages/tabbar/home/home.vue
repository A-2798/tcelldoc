<template>
	<!-- <view style="background: #F8F8F8;height: -webkit-fill-available;"> -->
	<view style="background: #F8F8F8;padding-bottom:209rpx;">

		<!-- 头部 -->
		<view style="height: 80rpx;background: #3dcca4;"></view>
		<!-- 背景图 -->
		<view class="header">
			<!-- 头像 --> 
			<view>
				<image style="position: absolute;width: 109.09rpx;height: 109.09rpx;border-radius: 50%;left: 43.63rpx;top:110rpx;" :src='portraitUri' mode="scaleToFill" @tap='uploadOss'>
			
				</image>
			</view>
			<!-- 文字 --> 
			<view class="characters">
				<view style="position: absolute;font-size: 38.18rpx;color: #FFFFFF;letter-spacing: 0.52rpx;line-height: 52.72rpx;width: 90.9rpx;height: 52.72rpx;right: 152.72rpx;bottom: 52.72rpx;">{{name}}</view>
				<span style="font-size: 25.45rpx;color: #FFFFFF;letter-spacing: 0.52rpx;line-height: 52.72rpx;width:52.72rpx;height: 52.72rpx;left: 90.9rpx;right:99.99rpx;bottom: 52.72rpx;position: absolute;">教授</span>
				<span style="font-size: 34.54rpx;color: #FFFFFF;letter-spacing: 0.52rpx;line-height: 52.72rpx;width:243.63rpx;height: 52.72rpx;top: 52.72rpx;position: absolute;">Tcell
					工作平台</span>
			</view>

			<!-- 轮播图 -->
			<view class="">
				<ls-swiper :list="base_lsit" imgKey="imgUrl" :loop="true" :dots='true' :autoplay='false' height='130' />
			</view>
		</view>

		<view style="clear: both;"></view>


		<!-- 第一块白板 -->

		<view style="position: relative;margin-top: 127.39rpx;margin-left:27rpx;width: 660rpx;height: 265.45rpx;border-radius: 18.18rpx;">
			<image style="width: 690rpx;height: 350rpx;border-radius: 18.18rpx;margin-left: 5rpx;" src="../../../static/image/3.png"
			 mode=""></image>

			<view style="position: absolute;left:61.81rpx;top: 25.45rpx;width: 100%;">
				<span  @tap="work" style="position: absolute;width: 138rpx;height: 48rpx;font-size: 34rpx;color: #2C2C2C;top: 25.45rpx; font-weight: bold;margin-left: 15rpx;">
					我的诊室
				</span>

				<span style="position: absolute;width: 120.09rpx;height: 30.9rpx;font-size: 24rpx;color: #979797;margin-left:430rpx ;top:32.72rpx;"
				 @tap="open">
					开通与定价
					<span style="position: absolute;margin-left: 3.63rpx;">
						<image style="width:25.45rpx;height: 25.45rpx;vertical-align:middle;" src="../../../static/image/4.png" mode=""></image>
					</span>
				</span>

				<view style="position: absolute;">
					<image style="position: absolute;vertical-align:middle;width: 25.45rpx;height: 25.45rpx;top: 107rpx;left: 112.72rpx;"
					 src="../../../static/image/5.png" mode=""></image>
					<span style="position: absolute;">
						<span style="color: #464646;position: absolute;width:160rpx;height: 36.36rpx;top: 101.81rpx;left: 149.09rpx;margin-right:10.9rpx;font-size: 25.45rpx;">待接诊
							2人</span>
					</span>

					<image style="position: absolute;vertical-align:middle;width: 25.45rpx;height: 25.45rpx;top: 107.27rpx;left: 344rpx;"
					 src="../../../static/image/6.png" mode=""></image>
					<span style="position: absolute;">
						<span style="position: absolute;width: 127.27rpx;height: 36.36rpx;font-size: 25.45rpx;color: #464646;left: 380rpx;top: 101.81rpx;">将超时
							2人</span>
					</span>

					<image style="position: absolute;width:327.27rpx;height: 72.72rpx;background: #3DCCA4;border-radius: 36.36rpx;top: 160rpx;left: 132.72rpx;bottom: 32.72rpx;margin-top: 21.81rpx;"
					 src="../../../static/image/7.png" mode=""></image>
					<span style="position: absolute;width: 87.27rpx;height: 40rpx;font-size: 29.09rpx;top: 200rpx;left: 252.72rpx;color: #FFFFFF;">去接诊</span>

				</view>
			</view>
		</view>
		　
		<!-- 中间部分 -->
		<view style="width: 690rpx;margin: auto;margin-top: 31.81rpx;">
			<view class="dahe">
				<view class="yihe" @tap="member">
					<image class="pian" src="../../../static/image/9.png"> </image>
					<span class="ming">我的会员</span>
				</view>
				<view class="cai">
					<image class="pian" src="../../../static/image/8.png"> </image>
					<span class="ming">患教材料</span>
				</view>
				<view class="de">
					<image class="pian" src="../../../static/image/10.png"> </image>
					<span class="ming" @tap="calling">我的名片</span>
				</view>
			</view>
		</view>


		<!-- 第二块白板 -->

		<view style="position: relative;margin-top: 16rpx;margin-left:27rpx;width: 660rpx;height: 265.45rpx;border-radius: 18.18rpx;">
			<image style="width: 690rpx;height: 350rpx;border-radius: 18.18rpx;margin-left: 5rpx;" src="../../../static/image/3.png"
			 mode=""></image>

			<view style="position: absolute;left:61.81rpx;top: 25.45rpx;width: 100%;">
				<span style="position: absolute;width: 138rpx;height: 48rpx;font-size: 34rpx;color: #2C2C2C;top: 25.45rpx; font-weight: bold;margin-left: 15rpx;">
					工作任务
				</span>

				<span style="position: absolute;width: 120.09rpx;height: 30.9rpx;font-size: 24rpx;color: #979797;margin-left:455rpx ;top:32.72rpx;">
					查看全部
					<span style="position: absolute;margin-left: 3.63rpx;">
						<image style="width:25.45rpx;height: 25.45rpx;vertical-align:middle;" src="../../../static/image/4.png" mode=""></image>
					</span>
				</span>


				<!-- 日历 -->
				<view style="margin-top: 80rpx;position: absolute;">
					<zzx-calendar @selected-change="datechange"></zzx-calendar>
				</view>

				<view style="position: absolute;top: 230rpx;left: 20rpx;">
					<image style="margin-right: 10.54rpx;vertical-align:middle;width: 16.54rpx;height: 16.54rpx;" src="../../../static/image/12.png"></image>
					<span style="width:68rpx;height:24rpx;font-size: 26.45rpx;color: #2C2C2C;">今日2项任务,给患者随诊,给...</span>
					<view style="width: 113rpx;height: 41rpx;border: 1.81rpx solid #979797;border-radius: 20rpx;text-align: center;display: inline-block;margin-left: 85rpx;font-size: 18.18rpx;color: #979797;line-height: 41rpx;">
						添加任务
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import zzxCalendar from "@/components/zzx-calendar/zzx-calendar.vue"
	// import {core} from 'API/message.js'//头像  保证接口响应成功 再走流程 async await 接口是异步的 所以用await保证响应完成 res回调有值 再走流程
	import api from '../../../API/index.js' //轮播图
	import container from '../../../components/container/index.vue' //轮播图
	import LsSwiper from '../../../components/ls-swiper/index.vue' //轮播图
	import {getPolicyCommon} from '@/API/OSS' //上传头像oss
	
	export default {
		components: {
			zzxCalendar,
			container,
			LsSwiper
		},
		data() { 
			return { //轮播图
				base_lsit: [{
						name: '1',
						imgUrl: '../../static/image/2.png',
						title: '最新欧洲泌尿    随访指南'
					},
					{
						name: '2',
						imgUrl: 'https://pic3.zhimg.com/80/v2-1deed0eca463f87f36d6e88363ae2693_720w.jpg?source=1940ef5c',
					},
				],
				portraitUri:"",
				name:""
			}
		},
		onLoad() {
			this.getBase()
			
		},
		onReady() {	//初次页面渲染
		this.uploadOss();
		console.log('111')
		}, 
		created() {
			this.portraitUri = uni.getStorageSync('userImg')
			console.log(this.portraitUri,'123') 
			
			this.name = uni.getStorageSync('name')
			console.log(this.name,'789') 
				},
	methods: {
		//轮播图
		getBase() {
			api.base(100).then(res => {
				this.base_lsit = res
			})
		},
	
	
		open() {
			uni.navigateTo({
				url: '../../../pagesA/home/open',
			})
		},
	
		calling() {
			uni.navigateTo({
				url: '../../../pagesA/calling/calling',
			})
		},
	
		work() {
			uni.navigateTo({
				url: '../../../pagesA/order/work',
			})
		},
		member() {
			uni.navigateTo({
				url: '/pages/enroll/enroll',
			})
		},
		// 封装上传图片方法 
		uploadImages(path,url,that){
			   let reg = RegExp(/mp3/)
			   let format = '.jpg'
			   let location = 'image'
			  
				console.log('data中得图片路径',this.$data.portraitUri);
				// console.log(d)
			   if (reg.test(path)) {
			    format = '.mp3'
			    location = 'audio'
			   }
			   let position = 'tcelldoc/' + location + '/'
			   getPolicyCommon(position).then((res) => {
			    // 向后台发请求 拉取OSS相关配置
			    const creds = res[1].data.data;
				console.log('图片路径',url);
			    //随机数
			    function randomString(length) {
			     var str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			     var result = "";
			     for (var i = length; i > 0; --i) {
			      result += str[Math.floor(Math.random() * str.length)];
			     }
			     return result + (new Date()).valueOf();
			    }
			    const SJS = randomString(6); 
			    uni.uploadFile({
			     url: creds.host, // 开发者服务器的URL。
			     filePath:url,
			     name: 'file', // 必须填file。 
			     formData: {
			      key: position + SJS + format,
			      policy: creds.policy,
			      OSSAccessKeyId: creds.accessid,
			      signature: creds.signature,
			     },
			     success: (res) => {
			      console.log(res,'55')
					console.log(that);
			      that.$data.portraitUri = creds.host + '/' + position + SJS + format
			      // resolve('提交成功')
			      console.log(that.$data.portraitUri + '666')
			     
			     },
			     fail: err => {
			      console.log('上传失败',err);
				  console.log(url,creds.host);
			      reject('未选择头像')
			     }
			    })
			   })
			// return new Promise(resolve){
				
			// }
		},
		
		uploadOss(path) { 	// 头像上传到oss
		    return new Promise((resolve, reject) => {
		     let that = this;
			 console.log(that.portraitUri);
			 // 将网络图片转为本地图片
			 uni.getImageInfo({
				 src: that.portraitUri,
				 success: function (image) {
					 console.log('本地图片路径',image);
					 that.uploadImages(path,image.path,that)
				 }
			 })
		    })
		   },
		
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		//背景图片
		background: url(../../../static/image/1.png) no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 398.05rpx;
		position: relative;
		margin-top: -2px;
	}

	.characters {
		//文字的盒子
		position: absolute;
		width: 243.63rpx;
		height: 105.45rpx;
		font-size: 38.18rpx;
		letter-spacing: 0.52rpx;
		color: #FFFFFF;
		left: 180.36rpx;
		top: 107.27rpx;
		right: 394.54rpx;
		bottom: 185.32rpx;
	}

	.dahe {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
		margin-top: 29.09rpx;

		.yihe {
			width: 190rpx;
			height: 160rpx;
			margin-left: 25rpx;
			background: #FFFFFF;
			box-shadow: 0 4px 10px 1px rgba(0, 0, 0, 0.05);
			border-radius: 14.54rpx;
			margin-top: 61.81rpx;
		}

		.cai {
			width: 190rpx;
			height: 160rpx;
			margin-left: 35rpx;
			margin-right: 38rpx;
			background: #FFFFFF;
			box-shadow: 0 4px 10px 1px rgba(0, 0, 0, 0.05);
			border-radius: 14.54rpx;
			margin-top: 61.81rpx;
		}

		.de {
			width: 190rpx;
			height: 160rpx;
			background: #FFFFFF;
			box-shadow: 0 4px 10px 1px rgba(0, 0, 0, 0.05);
			border-radius: 14.54rpx;
			margin-top: 61.81rpx;
		}

		//中间部分
		.pian {
			width: 58.18rpx;
			height: 58.18rpx;
			margin-left: 65rpx;
			margin-top: 27.27rpx;

			background: #FFFFFF;
			box-shadow: 0 4px 10px 1px rgba(0, 0, 0, 0.05);
			border-radius: 14.54rpx;
		}

		.ming {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
