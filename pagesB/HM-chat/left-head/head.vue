<template>
	<view class="header">
		
		<view style="display: flex; flex-direction:row;margin-bottom: 90.9rpx;margin-top: 36.36rpx;">
				<view v-model="add" style="margin-left: 90.9rpx;width: 90.9rpx;height: 90.9rpx;background: #D8D8D8;border-radius: 18.18rpx;display:inline-block;"></view>
			<view style="margin-left: 127.27rpx;" >	
				<span v-model="name">昵称:</span><br>
				<span>地域: 大连</span>
			</view>
		</view>
		<!-- 添加人员 -->
		<view style="width: 100%;height:72.72rpx;background:#D8D8D8; text-align: center;line-height:72.72rpx;">
			<view @tap="friend" v-model="addition">同意</view>
		</view>
	</view>
</template>

<script>
import {friends} from 'API/message.js'
import {setToken,setUid} from 'util/auth.js'
	
	export default {
		data() {
			return {
				addition:'',
				add:'',
				name:'',
			}
		}, 
		methods:{
			  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			        console.log(option.img); //打印出上个页面传递的参数。 这个是获取到的数据？ 
					console.log(option.id); 
					console.log(option.name);
					this.add = option.img; 
					this.name = option.name; 
					this.id = option.id; 
			    },
			friend(absolute) { 
				friends({
					whiteUserId: this.addition,
				}).then(res => {
					console.log(res)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.header{
	background: #ffffff;
	width: 100%;
	height: 100%;
}
</style>
