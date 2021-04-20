<template>
	<view>
		<view style="width: 80%;height: 100%;background: #ffaa00;margin: auto;">
			<view style="width: 100%;background: #00ffff;margin: auto;height: 40%;display: flex;flex-direction: row;">
				<image style="width: 40%;border-radius: 50%;margin-left: 8%;margin-top: 15%;margin-right: 8%;" src="../../static/logo.png"
				 mode="widthFix"></image>

				<view style="width:100%;height:100%;">
					<span style="width:100%;height:20px;line-height: 200rpx;">王大夫</span>
					<span style="width:100%;height:20px;margin-left: 20%;">主任医生</span>
					<span style="width:100%;height:20px;float: left;">大连医科大学第一医院</span>
					<!-- font-size 没有写所以字体没有适配 -->
				</view>

			</view>

			<view>
				<canvas canvas-id="qrcode" @tap="click" style="width: 354px;height: 354px;" />
				<view style="text-align: center;">qrcodeText</view>
			</view>
		</view>

	</view>
</template>

<script>
	import { visiting } from 'API/message.js'
	import uQRCode from '../../components/common/uqrcod.js'
	import { setToken,setUid } from 'util/auth.js'

	export default {
		data() {
			return {
				qrcodeText: '', //这里绑定你从后端获取到的uniqueId
			}
		}, 
		onLoad() { //  事件会在页面或图像加载完成后立即发生。
			this.click();
		},
		methods: {
			click() {
				visiting().then(res => {
					console.log(res);
					console.log(res[1].data.data.uniqueId);
					this.qrcodeText = res[1].data.data.uniqueId;
					this.make();
				})
			},
			async make() {
				this.toJSON = JSON;
				// 回调方式 
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: JSON.stringify({
						hospital: '医院10',
						name: '吴彦祖',
						portraitUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2279509116,4176825480&fm=26&gp=0.jpg', //头像路径
						title: '老教授',
						uid: this.qrcodeText
					}),
					size: 110,
					margin: 5,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: res => {

					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.canvas {
		width: 100px;
		height: 100px;
		margin: auto;
		margin-top: 10%;
		margin-bottom: 10%;
	}
</style>
