<template>
	<view>
		<view class="kang">
			<span class="zhi">上传身份证明</span>
		</view>

		<view class="jun">
			<view class="jia">
				<view class="ye">请上传</view>
				<view class="zi">执业证,资格证,医院工作证,胸牌均可作为</view>
				<view class="ping">凭证。</view>
			</view>
		</view>

		<!-- <view class="default" 　v-mode="chooseHead" 　@tap="chooseHeadUrl">上传图片</view> -->
		<image class="default" 　v-mode="chooseHead" 　@tap="chooseHeadUrl" :src="portraitUri" mode="">				
		</image>
		<button>跳转</button>
		<button v-mode="uploadImage" @tap="uploadImageUrl">上传</button>
	</view>
</template>

<script>
	
	import {
		uploadMessage
	} from 'API/message.js'
	// import {
	// 	getSTS
	// } from 'API/getSTS.js'
	import {
		getPolicyPrivate
	} from '../../API/OSS.js'

	export default {
		onLoad: function(option) {
			this.userData2 = JSON.parse(decodeURIComponent(option.userData1));
		},
		data() {
			return {
				chooseHead: '',
				uploadImage: '',
				portraitUri: '',
				userData2: {}
			}
		},
		methods: {  
			//选择图片
			chooseHeadUrl() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9 
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						// 这里上传网络图片路径，那个页面获取网络图片路径即可 
						console.log(JSON.stringify(res.tempFilePaths));
						that.portraitUri = res.tempFilePaths[0]
						console.log(that.portraitUri, '999');
						console.log(res);
						
					}
				})
			},
			//上传图片/音频/视频到OSS
			uploadImageUrl(msg) {
				let that = this
				if (this.portraitUri != '') {
					let that = this
				let reg = RegExp(/mp3/)
				let regVideo = RegExp(/mp4/)
				let format = '.jpg'
				let location = 'image' 
	           
				if (reg.test(msg.url)) {
					format = '.mp3'
					location = 'audio'
				}
				if (regVideo.test(msg.url)) {
					format = '.mp4'
					location = 'vedio'
				}
				let position = 'tcelldoc/' + 'image' + '/' 
				getPolicyPrivate(position).then((res) => {
					console.log(res,'creads')
					// 向后台发请求 拉取OSS相关配置
					const creds = res[1].data.data;
					//随机数
					let date = new Date()
					let d = date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : (
							'0' + (date.getMonth() + 1))) + '/image--' + date.getDate() + 'day' + date
						.getHours() + 'hours' +
						date.getMinutes() + 'minutes' + date.getSeconds() + 'seconds'
					function randomString(length) {
						var str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
						var result = "";
						for (var i = length; i > 0; --i) {
							result += str[Math.floor(Math.random() * str.length)];
						}
						return result + (new Date()).valueOf();
					}
					const SJS = d + randomString(6);
					uni.uploadFile({
						url: creds.host, // 开发者服务器的URL。  
						filePath: that.portraitUri,
						name: 'file', // 必须填file。	
						formData: {
							key: position + SJS + format,
							policy: creds.policy,
							OSSAccessKeyId: creds.accessid,
							signature: creds.signature,
						},
						success: (res) => {
							console.log(res,'这个是oss返回的')
							if (location == 'audio') {
								// signatureUrl(creds.host + '/' + position + SJS + format).then(r=> {
									
								// })
							} else if (location == 'image') {
								 // signatureUrl(creds.host + '/' + position + SJS + format).then(r => {
									
									let obj1 = {
										speciality: this.text,
										identificationPaper: creds.host + '/' + position + SJS + format,
										// portraitUri: that.portraitUri,
									};
									let obj2 = that.userData2;
									let obj3 = { 
										...obj1,
										...obj2 
									}; 
									
									console.log(obj3,'5556');
									uploadMessage(obj3).then(res => {
										console.log(res,'959595')
										// uni.setStorage({ //缓存后端名字
										// 	key:'name',
										// 	data:obj3.name
										// });
										uni.navigateTo({
											url: '../tabbar/index/index', //请求成功后跳转首页
										});
									})
								// })
							}  else if (location == 'vedio') {
								// signatureUrl(creds.host + '/' + position + SJS + format).then(r => {
									
								// })
								
							}
						},
						fail: err => {
							
						}
					})
				})
			}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.kang {
		width: 100%;
		height: 127.27rpx;
		background: #D8D8D8;
		line-height: 127.27rpx;
		text-align: center;

		.zhi {
			width: 229.09rpx;
			height: 52.72rpx;
			line-height: 52.72rpx;
			color: #000000;
			font-size: 38.18rpx;
		}
	}

	.jun {
		width: 100%;
		height: 254.54rpx;
		background: rgba(0, 0, 0, 0.10);

		padding-top: 30px;

		.jia {
			width: 654.54rpx;
			height: 172.72rpx;
			margin-left: 50.54rpx;
			margin: auto;

			.ye {

				width: 150.18rpx;
				height: 45.45rpx;
				color: #000000;
				margin-left: 54.54rpx;
				padding-top: 18.18rpx;
			}

			.ping {
				float: left;
				margin-left: 46rpx;
			}

			.zi {
				font-size: 32.72rpx;
				color: #000000;
				line-height: 45.45rpx;
				margin-left: 50.54rpx;
			}
		}
	}



	.default {
		width: 640rpx;
		height: 390.9rpx;
		border: 1px solid #979797;
		margin-top: 90.9rpx;
		margin-left: 54.54rpx;
	}

	button {
		width: 300rpx;
		float: left;
		margin-top: 100rpx;
		margin-left: 50rpx;

	}
</style>
