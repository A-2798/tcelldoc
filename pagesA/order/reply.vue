<template>
	<view>
<!-- <view class="" @tap="log">
	111111
</view> -->

		<view @tap="liao">
			<view class=""></view>
			<view class=""></view>
			<view class=""></view>
			融云聊天界面
		</view>
	</view>
</template>


<script>
// import {ryrong} from '../../API/message.js'
	export default {
		data() { 
			return {
				uid: "14",
				name: "小",
				portraitUri:"33"
			}
		},  
		methods: {    
		log(value) {
				ryrong({
					uid:this.uid,
					name:this.name,
					portraitUri:this.portraitUri
				}).then(res=>{
					console.log(res)
				})
		},
		
		liao() {
			uni.navigateTo({
				url: '/pages/HM-chat/HM-chat',
			})
		}
		
		}
	}
</script>

<style lang="scss" scoped>
</style>
