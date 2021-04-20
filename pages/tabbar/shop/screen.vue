<template>
	<view>
		<!-- 头部 -->
		<view style="display: flex;  flex-direction: row;margin-top: 29.09rpx;">
			<view style="margin: auto;">
				<view class="options" @tap="alls(0)" @click="skip" :style="{backgroundColor:transform == 0?'#D8D8D8':''}">
					<span class="script">一般信息选项</span>
				</view>
				<view class="option" @tap="alls(1)" @click="ski" :style="{backgroundColor:transform == 1?'#D8D8D8':''}">
					<span class="script">医疗信息选项</span>
				</view>
			</view>
		</view>


		<view v-show="alt"> <!-- 第一页 -->
			<!-- 时间排序 -->
			<view style="width: 152.72rpx;height: 52.72rpx;margin-top: 54.54rpx;margin-left: 30rpx;font-size: 38.18rpx;color: #000000;">时间排序</view>
			<view style="display: flex;  flex-direction: row;text-align: center;margin-left: 30rpx;">
				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">不限</span>
				</view>

				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">手术时间</span>
				</view>

				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">出院时间</span>
				</view>
			</view>
			<!-- 性别 -->
			<view style="width: 152.72rpx;height: 52.72rpx;margin-top: 54.54rpx;margin-left: 30rpx;font-size: 38.18rpx;color: #000000;">性别</view>
			<view style="display: flex;  flex-direction: row;text-align: center;margin-left: 30rpx;">
				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">不限</span>
				</view>

				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">男</span>
				</view>

				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">女</span>
				</view>
			</view>
			<!-- 年龄 -->
			<view style="width: 152.72rpx;height: 52.72rpx;margin-top: 54.54rpx;margin-left: 30rpx;font-size: 38.18rpx;color: #000000;">年龄</view>
			<view style="flex-wrap:wrap; display:flex;text-align: center;margin-left: 30rpx;width: 100%;">
				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">不限</span>
				</view>

				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">≥70</span>
				</view>

				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">60-69</span>
				</view>
				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">35-59</span>
				</view>

				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">18-34</span>
				</view>

				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;"> ＜18</span>
				</view>
			</view>

			<view style="width: 152.72rpx;height: 52.72rpx;margin-top: 54.54rpx;margin-left: 30rpx;font-size: 38.18rpx;color: #000000;">是否会员</view>
			<view style="display: flex;  flex-direction: row;text-align: center;margin-left: 30rpx;">
				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">不限</span>
				</view>

				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">会员</span>
				</view>

				<view class="sort">
					<span style="font-size: 18px;color: #000000;text-align: center;">非会员</span>
				</view>
			</view>
			<!-- 随访 -->
			<view style="width: 152.72rpx;height: 52.72rpx;margin-top: 54.54rpx;margin-left: 30rpx;font-size: 38.18rpx;color: #000000;">随访</view>
			<view class="follow">
				<span class="strip">近一周月需要随访患者 <span style="margin-left: 181.81rpx;">(2)</span></span>
			</view>

			<view class="follow">
				<span class="strip">近一个月需要随访患者 <span style="margin-left: 181.81rpx;">(9)</span></span>
			</view>

			<button type="default">确认筛选</button>
		</view>




		<view class="" v-if="sk"> <!-- 第二页 -->
			<!-- 分期 -->
			<view style="width: 152.72rpx;height: 52.72rpx;margin-top: 54.54rpx;margin-left: 30rpx;font-size: 38.18rpx;color: #000000;">分期
			</view>
			<view style="display: flex;  flex-direction: row;text-align: center;margin-left: 30rpx;">
				<view class="sor">
					<span style="font-size: 18px;color: #000000;text-align: center;">非肌层浸润BC</span>
				</view>

				<view class="sor">
					<span style="font-size: 18px;color: #000000;text-align: center;">肌层浸润BC</span>
				</view>
			</view>
			<!-- 手术方式 -->
			<view style="width: 152.72rpx;height: 52.72rpx;margin-top: 54.54rpx;margin-left: 30rpx;font-size: 38.18rpx;color: #000000;">手术方式</view>
			<view style="display: flex;  flex-direction: row;text-align: center;margin-left: 30rpx;">
				<view class="sor">
					<span style="font-size: 18px;color: #000000;text-align: center;">TURB</span>
				</view>

				<view class="sor">
					<span style="font-size: 18px;color: #000000;text-align: center;">RC</span>
				</view>
			</view>
			<!-- BC灌注化疗 -->
			<view style="width: 207.27rpx;height: 52.72rpx;margin-top: 54.54rpx;margin-left: 30rpx;font-size: 38.18rpx;color: #000000;">BC灌注化疗</view>
			<view style="flex-wrap:wrap; display:flex;text-align: center;margin-left: 30rpx;width: 100%;">
				<view class="sor">
					<span style="font-size: 18px;color: #000000;text-align: center;">丝裂霉素</span>
				</view>

				<view class="sor">
					<span style="font-size: 18px;color: #000000;text-align: center;">比柔比星</span>
				</view>

				<view class="sor">
					<span style="font-size: 18px;color: #000000;text-align: center;">羟喜树碱</span>
				</view>
				<view class="sor">
					<span style="font-size: 18px;color: #000000;text-align: center;">表柔比星</span>
				</view>
			</view>
			<!-- BC灌注免疫治疗 -->
			<view style="width: 283.63rpx;height: 52.72rpx;margin-top: 54.54rpx;margin-left: 30rpx;font-size: 38.18rpx;color: #000000;">BC灌注免疫治疗</view>
			<view style="display: flex;  flex-direction: row;text-align: center;margin-left: 30rpx;">
				<view class="sor">
					<span style="font-size: 18px;color: #000000;text-align: center;">卡介苗</span>
				</view>

				<view class="sor">
					<span style="font-size: 18px;color: #000000;text-align: center;">干扰素</span>
				</view>
			</view>

			<button type="default" class="boolean">确认筛选</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				transform: 0,
				alt: true,
				sk: false
			}
		},
		methods: {
			alls(index) { // 第一个切换
				this.transform = index;
			},
			skip: function() {
				if (this.alt != true) {
					this.alt = true;
					this.sk = false
				}
			},
			ski: function() {
				if (this.sk != true) {
					this.sk = true;
					this.alt = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.options {
		width: 285.45rpx;
		height: 80rpx;
		display: inline-block;
		border-radius: 7.27rpx 0 0 7.27rpx;
		text-align: center;
		border: 1.81rpx solid #979797;
	}

	.option {
		width: 285.45rpx;
		height: 80rpx;
		display: inline-block;
		border: 1.81rpx solid #979797;
		border-radius: 0 7.27rpx 7.27rpx 0;
		text-align: center;
	}

	.script {
		line-height: 80rpx;
		width: 196.36rpx;
		height: 45.45rpx;
	}

	.sort {
		width: 192.72rpx;
		height: 81.81rpx;
		background: rgba(0, 0, 0, 0.10);
		border-radius: 7.27rpx;
		line-height: 81.81rpx;
		margin-right: 50.72rpx;
		margin-top: 29.09rpx;
	}

	.follow {
		width: 643.63rpx;
		height: 81.81rpx;
		background: rgba(0, 0, 0, 0.10);
		border-radius: 7.27rpx;
		margin-left: 30rpx;
		margin-top: 29.09rpx;
		text-align: center;
		margin-bottom: 32.72rpx;
	}

	.strip {
		font-size: 32.72rpx;
		color: #000000;
		width: 554.54rpx;
		height: 45.45rpx;
		line-height: 81.81rpx;
	}

	.sor{
		width: 307.27rpx;
		height: 81.81rpx;
		background: rgba(0,0,0,0.10);
		border-radius: 7.27rpx;
		line-height: 81.81rpx;
		margin-right:50.72rpx;
		margin-top: 29.09rpx;
	}
	.boolean{
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
