<template>
	<view>
		
			<view @tap="flex">
			             111
			            </view>
		<view @tap="fle">
		             222
		            </view>
	</view>
</template>

<script>

	export default { 
	
		data() {
			return {
				
			}
		}, 
		methods: {
			
		flex(){
			uni.setStorage({
			    key: 'storage_key',
			    data: 'hello',
			    success: function (res) {
			        console.log(res);
			    }
			})
		},
		
		fle(){
			uni.removeStorage({
			    key: 'storage_key',
			    success: function (res) {
			        console.log('success');
			    }
			})
		}
		

		}
	}
</script>

<style lang="scss" scoped>
	.box{
		background: red;
	}
</style>
