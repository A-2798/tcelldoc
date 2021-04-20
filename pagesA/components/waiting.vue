<template>
	<view class="mask-layer" @tap="maskClick" @touchmove="maskMove" catchtouchmove="stopPageScroll" @touchmove.prevent v-if="showMod!=-1" :style="{backgroundColor:maskColor}">
		<view class="section" v-if="showMod==0">
			<view class='sk-rotating-plane'></view>
		</view>
		<view class="section" v-if="showMod==1">
			<view class='sk-double-bounce'>
				<view class='sk-child sk-double-bounce-1'></view>
				<view class='sk-child sk-double-bounce-2'></view>
			</view>
		</view>
		<view class="section" v-if="showMod==2">
			<view class='sk-wave'>
				<view class='sk-rect sk-rect-1'></view> 
				<view class='sk-rect sk-rect-2'></view>
				<view class='sk-rect sk-rect-3'></view>
				<view class='sk-rect sk-rect-4'></view>
				<view class='sk-rect sk-rect-5'></view>
			</view>
		</view>
		<view class="section" v-if="showMod==3">
			<view class='sk-wandering-cubes'>
				<view class='sk-cube sk-cube-1'></view>
				<view class='sk-cube sk-cube-2'></view>
			</view>
		</view>
		<view class="section" v-if="showMod==4">
			<view class='sk-spinner sk-spinner-pulse'></view>
		</view>
		<view class="section" v-if="showMod==5">
			<view class="shaft-w6">
				<view class="shaft1"></view>
				<view class="shaft2"></view>
				<view class="shaft3"></view>
				<view class="shaft4"></view>
				<view class="shaft5"></view>
				<view class="shaft6"></view>
				<view class="shaft7"></view>
				<view class="shaft8"></view>
				<view class="shaft9"></view>
				<view class="shaft10"></view>
			</view>
		</view>
		<view class="section" v-if="showMod==6">
			<view class="shaft-w7">
				<view class="shaft1"></view>
				<view class="shaft2"></view>
				<view class="shaft3"></view>
				<view class="shaft4"></view>
				<view class="shaft5"></view>
				<view class="shaft6"></view>
				<view class="shaft7"></view>
				<view class="shaft8"></view>
				<view class="shaft9"></view>
				<view class="shaft10"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showMod:-1,
				shadeClose:false,
				maskColor:'rgba(0,0,0,0)'
			}
		},
		mounted:function(){
			this.$emit('complete');
			//this.$parent.complete();
		},
		methods: {
			setTimeout:null,
			show: function(Setting) {
				//定义默认值
				var defaultSetting={
					style:0,	
					duration:0,
					maskColor:'rgba(0,0,0,0)',
					shadeClose:false
				}
				Setting = this.extend(defaultSetting,Setting);
				this.maskColor = Setting.maskColor;
				this.shadeClose = Setting.shadeClose;
				this.showMod = Setting.style;
				if(Setting.duration>0){
					this.setTimeout = setTimeout(()=>{
						this.close();
					},Setting.duration)
				}
			},
			close:function(){
				this.showMod=-1;
				this.setTimeout&&clearTimeout(this.setTimeout);//清除计时器
			},
			maskClick:function(){
				if(this.shadeClose)
				{
					this.close();
				}
			},
			maskMove:function(e){
				e.preventDefault();
				e.stopPropagation();
				return false
			},
			stopPageScroll:function(){
				return;
			},
			extend:function(destination,source) {
				for(var property in source) {
					destination[property] = source[property]
				}
				return destination
			}

		},
		props: {

		}
	}
</script>

<style>
	.mask-layer{
		width: 100%;
		height: 100%;
		position:fixed;
		left:0;
		top:0;
		z-index: 9998;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.section {
		position:fixed;
		background-color: rgba(0,0,0,0);
		width: 30vw;
		height: 30vw;
		border-radius: 3vw;
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.sk-rotating-plane {
		width: 15vw;
		height: 15vw;
		margin: auto;
		background-color: #337ab7;
		animation: sk-rotating-plane 1.2s infinite ease-in-out;
	}

	@keyframes sk-rotating-plane {
		0% {
			transform: perspective(120px) rotateX(0deg) rotateY(0deg);
		}

		50% {
			transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
		}

		100% {
			transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
		}
	}

	.sk-double-bounce {
		width: 15vw;
		height: 15vw;
		position: relative;
		margin: auto;
	}

	.sk-double-bounce .sk-child {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #337ab7;
		opacity: 0.6;
		position: absolute;
		top: 0;
		left: 0;
		animation: sk-double-bounce 2.0s infinite ease-in-out;
	}

	.sk-double-bounce .sk-double-bounce-2 {
		animation-delay: -1.0s;
	}

	@keyframes sk-double-bounce {

		0%,
		100% {
			transform: scale(0);
		}

		50% {
			transform: scale(1);
		}
	}

	.sk-wave {
		width: 15vw;
		height: 15vw;
		margin: auto;
		text-align: center;
		display: flex;
		justify-content: center;
	}

	.sk-wave .sk-rect {
		background-color: #337ab7;
		height: 66%;
		width: 8%;
		margin: 17% 2.5%;
		animation: sk-wave-stretch-delay 1.2s infinite ease-in-out;
	}

	.sk-wave .sk-rect-1 {
		animation-delay: -1.2s;
	}

	.sk-wave .sk-rect-2 {
		animation-delay: -1.1s;
	}

	.sk-wave .sk-rect-3 {
		animation-delay: -1s;
	}

	.sk-wave .sk-rect-4 {
		animation-delay: -0.9s;
	}

	.sk-wave .sk-rect-5 {
		animation-delay: -0.8s;
	}

	@keyframes sk-wave-stretch-delay {

		0%,
		40%,
		100% {
			transform: scaleY(0.4);
		}

		20% {
			transform: scaleY(1);
		}
	}

	.sk-wandering-cubes {
		width: 15vw;
		height: 15vw;
		position: relative;
		margin: auto;
	}

	.sk-wandering-cubes .sk-cube {
		background-color: #337ab7;
		width: 3.75vw;
		height: 3.75vw;
		position: absolute;
		top: 0;
		left: 0;
		animation: sk-wandering-cubes 1.8s ease-in-out -1.8s infinite both;
	}

	.sk-wandering-cubes .sk-cube-2 {
		animation-delay: -0.9s;
	}



	@keyframes sk-wandering-cubes {
		0% {
			transform: rotate(0deg);
		}

		25% {
			transform: translateX(2em) rotate(-90deg) scale(0.5);
		}

		50% {
			transform: translateX(2em) translateY(2em) rotate(-179deg);
		}

		50.1% {
			transform: translateX(2em) translateY(2em) rotate(-180deg);
		}

		75% {
			transform: translateX(0) translateY(2em) rotate(-270deg) scale(0.5);
		}

		100% {
			transform: rotate(-360deg);
		}
	}

	.sk-spinner-pulse {
		width: 15vw;
		height: 15vw;
		margin: auto;
		background-color: #337ab7;
		border-radius: 100%;
		animation: sk-spinner-pulse 1.0s infinite ease-in-out;
	}

	@-webkit-keyframes sk-spinner-pulse {
		0% {
			transform: scale(0);
		}

		100% {
			transform: scale(1);
			opacity: 0;
		}
	}

	@keyframes sk-spinner-pulse {
		0% {
			transform: scale(0);
		}

		100% {
			transform: scale(1);
			opacity: 0;
		}
	}

	.shaft-w6 {
		position: relative;
		width: 15vw;
		height: 15vw;

	}

	.shaft-w6>view {
		background: transparent;
		border: 4px solid transparent;
		border-color: #337ab7 transparent;
		border-radius: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate"("-50%, -50%")";
		transform: translate(-50%, -50%) rotate(0);
		animation: w6 2s infinite ease-in-out;
	}

	.shaft-w6 .shaft1 {
		animation-delay: 0.1s;
		width: calc(3.3vw - 8px);
		height: calc(3.3vw - 8px);
	}

	.shaft-w6 .shaft2 {
		animation-delay: 0.2s;
		width: calc(4.1vw - 8px);
		height: calc(4.1vw - 8px);
	}

	.shaft-w6 .shaft3 {
		animation-delay: 0.3s;
		width: calc(5.8vw - 8px);
		height: calc(5.8vw - 8px);
	}

	.shaft-w6 .shaft4 {
		animation-delay: 0.4s;
		width: calc(7.5vw - 8px);
		height: calc(7.5vw - 8px);
	}

	.shaft-w6 .shaft5 {
		animation-delay: 0.5s;
		width: calc(9.1vw - 8px);
		height: calc(9.1vw - 8px);
	}

	.shaft-w6 .shaft6 {
		animation-delay: 0.6s;
		width: calc(10.8vw - 8px);
		height: calc(10.8vw - 8px);
	}

	.shaft-w6 .shaft7 {
		animation-delay: 0.7s;
		width: calc(11.6vw - 8px);
		height: calc(11.6vw - 8px);
	}

	.shaft-w6 .shaft8 {
		animation-delay: 0.8s;
		width: calc(13.3vw - 8px);
		height: calc(13.3vw - 8px);
	}

	.shaft-w6 .shaft9 {
		animation-delay: 0.9s;
		width: calc(14.1vw - 8px);
		height: calc(14.1vw - 8px);
	}

	.shaft-w6 .shaft10 {
		animation-delay: 1s;
		width: calc(15vw - 8px);
		height: calc(15vw - 8px);
	}

	@keyframes w6 {
		50% {
			transform: translate(-50%, -50%) rotate(360deg);
			border-color: #48a9fc transparent;
		}
	}

	.shaft-w7 {
		width: 15vw;
		height: 15vw;
		display: flex;
		justify-content: center;
	}

	.shaft-w7>view {
		width: .8vw;
		height: 10vw;
		margin: 2.5vw .1vw;
		background-color: #48a9fc;
		animation: w7 1.5s infinite ease-in-out;
		transform: scaleY(0.05) translateX(-5px);
	}

	.shaft-w7 .shaft1 {
		animation-delay: 0.05s;
	}

	.shaft-w7 .shaft2 {
		animation-delay: 0.1s;
	}

	.shaft-w7 .shaft3 {
		animation-delay: 0.15s;
	}

	.shaft-w7 .shaft4 {
		animation-delay: 0.2s;
	}

	.shaft-w7 .shaft5 {
		animation-delay: 0.25s;
	}

	.shaft-w7 .shaft6 {
		animation-delay: 0.3s;
	}

	.shaft-w7 .shaft7 {
		animation-delay: 0.35s;
	}

	.shaft-w7 .shaft8 {
		animation-delay: 0.4s;
	}

	.shaft-w7 .shaft9 {
		animation-delay: 0.45s;
	}

	.shaft-w7 .shaft10 {
		animation-delay: 0.5s;
	}


	@keyframes w7 {
		10% {
			background: #48a9fc;
		}

		15% {
			transform: scaleY(1.2) translateX(10px);
			background: #337ab7;
		}

		90%,
		100% {
			transform: scaleY(0.05) translateX(-5px);
		}
	}
</style>
