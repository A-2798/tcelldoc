<template>
    <view class="jihe">
		
       <!-- <view class="img-wrap">
          <span class="rizhi">密码登录</span>
		  
		  <view>
		  	<input class="rizhi" type="text" placeholder="手机号/用户名" v-model="userName">
		  	<view class="xian"></view>
		  </view>
		  
		  <view>
		  	<input class="rizhi" type="text" placeholder="密码" v-model="userPwd">
		  	<view class="xian"></view>
		  </view>
        </view>
		
		<view class="yanzheng">
		    <view class="input-forget">验证码登录</view>
			
			<view class="input-switch" @click="loginSwitch">{{loginWay}}</view>
		    <view class="input-forgets">忘记密码</view>
		</view> -->
		
		
    
              <view class="content">
                     <zzx @selected-change="datechange"></zzx>
              </view>
			  
         </view>
</template>
 <script>
	import zzx from "@/components/zzk/zhuzhe-login/pages/login/login.vue"
	
    export default {
		components: {
		    zzx
		},
		
        data() {
            return {
            }
        },
		
        methods:{
			
        }
    }
</script> 

<style lang="scss">
.jihe{
	width: 100%;
	height: 100%;
	background: #F8F8F8;
	margin-top: 90.9rpx;
	float: left;
.xian{
	width: 350px;
	height: 2px;
	background: #000000;
	margin-left: 3%;
}
.yanzheng{
	float: left;
	width: 800px;
	height: 20px;

	margin-left: 3%;
.input-forget{
	float: left;

}
.input-forgets{
	
	margin-left: 200px;
	float: left;

}
}
.rizhi{
	margin-left: 3%;

}
}


</style>
