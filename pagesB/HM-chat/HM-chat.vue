<template>
	<view>
		<Canvas canvas-id='mycanvas' disable-scroll="true" style="display: none;"></Canvas>
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation"
				:scroll-top="scrollTop" :scroll-into-view="scrollToView" @scrolltoupper="loadHistory"
				upper-threshold="50">
				<!-- 加载历史数据waitingUI -->
				<view class="loading" v-if="isHistoryLoading">
					<view class="spinner">
						<view class="rect1"></view> 
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view> 
					</view>
				</view>
				<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.msg.id">
					<!-- 系统消息 -->
					<block v-if="row.type=='system'">
						<view class="system">
							<!-- 文字消息 -->
							<view v-if="row.msg.type=='text'" class="text">
								{{row.msg.content.text}}
							</view>
						</view>
					</block>
					<!-- 用户消息 -->
					<block v-if="row.type=='user'">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.msg.userinfo.uid==myuid">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<!-- 语言消息 -->
								<view v-if="row.msg.type=='voice'" class="bubble voice" @tap="playVoice(row.msg)"
									:class="playMsgid == row.msg.id?'play':''">
									<view class="length">{{row.msg.content.msg.length}}</view>
									<view class="icon my-voice"></view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msg.type=='img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="row.msg.content.url"
										:style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}">
									</image>
								</view>
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image :src="row.msg.userinfo.face"></image>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-if="row.msg.userinfo.uid!=myuid">
							<!-- 左-头像 -->
							<view class="left">
								<image :src="row.msg.userinfo.face"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{row.msg.userinfo.username}}</view>
									<view class="time">{{row.msg.time}}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content"></rich-text>
								</view>
								<!-- 语音消息 -->
								<view v-if="row.msg.type=='voice'" class="bubble voice" @tap="playVoice(row.msg)"
									:class="playMsgid == row.msg.id?'play':''">
									<view class="icon other-voice"></view>
									<view class="length">{{row.msg.content.msg.length}}</view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msg.type=='img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="row.msg.content.url"
										:style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}">
									</image>
								</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view> 
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 -->
			<swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'./pagesB/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage">
						<view class="icon tupian2"></view>
					</view>
					<view class="box" @tap="camera">
						<view class="icon paizhao"></view>
					</view>
					<!-- <view class="box" @tap="handRedEnvelopes"><view class="icon hongbao"></view></view> -->
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']"
					@touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd"
					@touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode" :class="isVoice?'hidden':''">
					<view class="box">
						<textarea auto-height="true" v-model="textMsg" @focus="textareaFocus" :show-confirm-bar='false'
							adjust-position />
					</view>
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<view class="btn">发送</view>
			</view>
		</view>
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''">
				<view class="icon luyin2"></view>
			</view>
			<view class="cancel" :class="willStop?'':'hidden'">
				<view class="icon chehui"></view>
			</view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
	</view>
</template>
<script>
	import {
		getPolicyPrivate,
		signatureUrl
	} from "API/OSS.js"
	import {
		ryToken
	} from 'API/rongyun.js'
	import {
		getUid,
		getName,
		getUrl
	} from 'util/auth.js'
	import upng from 'util/UPNG.js'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				//文字消息
				textMsg: '',
				//消息列表
				isHistoryLoading: false,
				scrollAnimation: false,
				scrollTop: 0,
				scrollToView: '',
				msgList: [],
				msgImgList: [],
				myuid: 0,
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER: uni.getRecorderManager(),
				// #endif
				isVoice: false,
				voiceTis: '按住 说话',
				recordTis: "手指上滑 取消发送",
				recording: false,
				willStop: false,
				initPoint: {
					identifier: 0,
					Y: 0
				},
				recordTimer: null,
				recordLength: 0,
				//播放语音相关参数
				AUDIO: uni.createInnerAudioContext(),
				playMsgid: null,
				VoiceTimer: null,
				// 抽屉参数
				popupLayerClass: '',
				// more参数
				hideMore: true,
				//表情定义
				hideEmoji: true,
				//图片64位压缩编码
				materialList: [],
				emojiList: [
					[{
						"url": "d_aini.png",
						alt: "[爱你]"
					}, {
						"url": "d_aoteman.png",
						alt: "[奥特曼]"
					}, {
						"url": "d_baibai.png",
						alt: "[拜拜]"
					}, {
						"url": "d_beishang.png",
						alt: "[悲伤]"
					}, {
						"url": "d_bishi.png",
						alt: "[鄙视]"
					}, {
						"url": "d_bizui.png",
						alt: "[闭嘴]"
					}, {
						"url": "d_chanzui.png",
						alt: "[馋嘴]"
					}, {
						"url": "d_chijing.png",
						alt: "[吃惊]"
					}, {
						"url": "d_dahaqi.png",
						alt: "[哈欠]"
					}, {
						"url": "d_dalian.png",
						alt: "[打脸]"
					}, {
						"url": "d_ding.png",
						alt: "[顶]"
					}, {
						"url": "d_doge.png",
						alt: "[doge]"
					}, {
						"url": "d_feizao.png",
						alt: "[肥皂]"
					}, {
						"url": "d_ganmao.png",
						alt: "[感冒]"
					}, {
						"url": "d_guzhang.png",
						alt: "[鼓掌]"
					}, {
						"url": "d_haha.png",
						alt: "[哈哈]"
					}, {
						"url": "d_haixiu.png",
						alt: "[害羞]"
					}, {
						"url": "d_han.png",
						alt: "[汗]"
					}, {
						"url": "d_hehe.png",
						alt: "[微笑]"
					}, {
						"url": "d_heixian.png",
						alt: "[黑线]"
					}, {
						"url": "d_heng.png",
						alt: "[哼]"
					}, {
						"url": "d_huaxin.png",
						alt: "[色]"
					}, {
						"url": "d_jiyan.png",
						alt: "[挤眼]"
					}, {
						"url": "d_keai.png",
						alt: "[可爱]"
					}],
					[{
						"url": "d_kelian.png",
						alt: "[可怜]"
					}, {
						"url": "d_ku.png",
						alt: "[酷]"
					}, {
						"url": "d_kun.png",
						alt: "[困]"
					}, {
						"url": "d_landelini.png",
						alt: "[白眼]"
					}, {
						"url": "d_lei.png",
						alt: "[泪]"
					}, {
						"url": "d_madaochenggong.png",
						alt: "[马到成功]"
					}, {
						"url": "d_miao.png",
						alt: "[喵喵]"
					}, {
						"url": "d_nanhaier.png",
						alt: "[男孩儿]"
					}, {
						"url": "d_nu.png",
						alt: "[怒]"
					}, {
						"url": "d_numa.png",
						alt: "[怒骂]"
					}, {
						"url": "d_nvhaier.png",
						alt: "[女孩儿]"
					}, {
						"url": "d_qian.png",
						alt: "[钱]"
					}, {
						"url": "d_qinqin.png",
						alt: "[亲亲]"
					}, {
						"url": "d_shayan.png",
						alt: "[傻眼]"
					}, {
						"url": "d_shengbing.png",
						alt: "[生病]"
					}, {
						"url": "d_shenshou.png",
						alt: "[草泥马]"
					}, {
						"url": "d_shiwang.png",
						alt: "[失望]"
					}, {
						"url": "d_shuai.png",
						alt: "[衰]"
					}, {
						"url": "d_shuijiao.png",
						alt: "[睡]"
					}, {
						"url": "d_sikao.png",
						alt: "[思考]"
					}, {
						"url": "d_taikaixin.png",
						alt: "[太开心]"
					}, {
						"url": "d_touxiao.png",
						alt: "[偷笑]"
					}, {
						"url": "d_tu.png",
						alt: "[吐]"
					}, {
						"url": "d_tuzi.png",
						alt: "[兔子]"
					}],
					[{
						"url": "d_wabishi.png",
						alt: "[挖鼻]"
					}, {
						"url": "d_weiqu.png",
						alt: "[委屈]"
					}, {
						"url": "d_xiaoku.png",
						alt: "[笑cry]"
					}, {
						"url": "d_xiongmao.png",
						alt: "[熊猫]"
					}, {
						"url": "d_xixi.png",
						alt: "[嘻嘻]"
					}, {
						"url": "d_xu.png",
						alt: "[嘘]"
					}, {
						"url": "d_yinxian.png",
						alt: "[阴险]"
					}, {
						"url": "d_yiwen.png",
						alt: "[疑问]"
					}, {
						"url": "d_youhengheng.png",
						alt: "[右哼哼]"
					}, {
						"url": "d_yun.png",
						alt: "[晕]"
					}, {
						"url": "d_zhajipijiu.png",
						alt: "[炸鸡啤酒]"
					}, {
						"url": "d_zhuakuang.png",
						alt: "[抓狂]"
					}, {
						"url": "d_zhutou.png",
						alt: "[猪头]"
					}, {
						"url": "d_zuiyou.png",
						alt: "[最右]"
					}, {
						"url": "d_zuohengheng.png",
						alt: "[左哼哼]"
					}, {
						"url": "f_geili.png",
						alt: "[给力]"
					}, {
						"url": "f_hufen.png",
						alt: "[互粉]"
					}, {
						"url": "f_jiong.png",
						alt: "[囧]"
					}, {
						"url": "f_meng.png",
						alt: "[萌]"
					}, {
						"url": "f_shenma.png",
						alt: "[神马]"
					}, {
						"url": "f_v5.png",
						alt: "[威武]"
					}, {
						"url": "f_xi.png",
						alt: "[喜]"
					}, {
						"url": "f_zhi.png",
						alt: "[织]"
					}, {
						"url": "h_buyao.png",
						alt: "[NO]"
					}],
					[{
						"url": "h_good.png",
						alt: "[good]"
					}, {
						"url": "h_haha.png",
						alt: "[haha]"
					}, {
						"url": "h_lai.png",
						alt: "[来]"
					}, {
						"url": "h_ok.png",
						alt: "[OK]"
					}, {
						"url": "h_quantou.png",
						alt: "[拳头]"
					}, {
						"url": "h_ruo.png",
						alt: "[弱]"
					}, {
						"url": "h_woshou.png",
						alt: "[握手]"
					}, {
						"url": "h_ye.png",
						alt: "[耶]"
					}, {
						"url": "h_zan.png",
						alt: "[赞]"
					}, {
						"url": "h_zuoyi.png",
						alt: "[作揖]"
					}, {
						"url": "l_shangxin.png",
						alt: "[伤心]"
					}, {
						"url": "l_xin.png",
						alt: "[心]"
					}, {
						"url": "o_dangao.png",
						alt: "[蛋糕]"
					}, {
						"url": "o_feiji.png",
						alt: "[飞机]"
					}, {
						"url": "o_ganbei.png",
						alt: "[干杯]"
					}, {
						"url": "o_huatong.png",
						alt: "[话筒]"
					}, {
						"url": "o_lazhu.png",
						alt: "[蜡烛]"
					}, {
						"url": "o_liwu.png",
						alt: "[礼物]"
					}, {
						"url": "o_lvsidai.png",
						alt: "[绿丝带]"
					}, {
						"url": "o_weibo.png",
						alt: "[围脖]"
					}, {
						"url": "o_weiguan.png",
						alt: "[围观]"
					}, {
						"url": "o_yinyue.png",
						alt: "[音乐]"
					}, {
						"url": "o_zhaoxiangji.png",
						alt: "[照相机]"
					}, {
						"url": "o_zhong.png",
						alt: "[钟]"
					}],
					[{
						"url": "w_fuyun.png",
						alt: "[浮云]"
					}, {
						"url": "w_shachenbao.png",
						alt: "[沙尘暴]"
					}, {
						"url": "w_taiyang.png",
						alt: "[太阳]"
					}, {
						"url": "w_weifeng.png",
						alt: "[微风]"
					}, {
						"url": "w_xianhua.png",
						alt: "[鲜花]"
					}, {
						"url": "w_xiayu.png",
						alt: "[下雨]"
					}, {
						"url": "w_yueliang.png",
						alt: "[月亮]"
					}]
				],
				//发送文字时给融云传的值
				replacedStr: ''
			};
		},
		onReady() {
			this.myuid = getUid()
		},
		onLoad(option) {
			this.getMsgList();
			//语音自然播放结束
			this.AUDIO.onEnded((res) => {
				this.playMsgid = null;
			});
			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e) => {
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e) => {
				this.recordEnd(e);
			})
			// #endif
		},
		onLoad() {
			this.scrollTop = 9999999;
		},
		//监听融云消息
		watch:{
			ryNewState(){
				let that = this
				if(this.ryNewState != null){
					this.messageType(this.ryNewState)
				}
			}
		},
		computed:{
			...mapGetters(['ryNewState'])
		},
		methods: {
			//判断监听得来的消息类型
			messageType(latestConversationList){
				let that = this
				let nowDate = new Date()
				let newMessage = latestConversationList[0]
				let typelei = ''
				let msg = {}
				if (newMessage.latestMessage.messageType == 'RC:TxtMsg') {
					let txt = that.replaceEmoji(newMessage.latestMessage.content.content)
					console.log(txt, '监听得到的经表情函数处理后的消息')
					typelei = 'text'
					msg = {
						type: 'user',
						msg: {
							id: newMessage.unreadMessageCount,
							time: nowDate.getHours() + ":" + nowDate.getMinutes(),
							type: typelei,
							userinfo: {
								uid: newMessage.latestMessage.senderUserId,
								username: "医生019号",
								face: "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3918800978,3848407993&fm=26&gp=0.jpg"
							},
							content: txt
						}
					}
				} else if (newMessage.latestMessage.messageType == 'RC:HQVCMsg') {
					typelei = 'voice'
					let min = parseInt(newMessage.latestMessage.content.duration / 60);
					let sec = newMessage.latestMessage.content.duration % 60;
					min = min < 10 ? '0' + min : min;
					sec = sec < 10 ? '0' + sec : sec;
					let msglength = min + ':' + sec;
				
					msg = {
						type: 'user',
						msg: {
							id: newMessage.unreadMessageCount,
							time: nowDate.getHours() + ":" + nowDate.getMinutes(),
							type: typelei,
							userinfo: {
								uid: newMessage.latestMessage.senderUserId,
								username: "医生019号",
								face: "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3918800978,3848407993&fm=26&gp=0.jpg",
							},
							content: {
								url: newMessage.latestMessage.content.remoteUrl,
								msg: {
									length: msglength
								}
							}
						}
					}
					console.log(msg, '监听得到的语音')
				} else if (newMessage.latestMessage.messageType == 'RC:ImgMsg') {
					typelei = 'img'
					console.log(newMessage.latestMessage, '监听得到的图片')
				}
				if (newMessage.latestMessage.messageDirection == 2) {
					that.screenMsg(msg, true);
				}
			},
			//通过融云发送消息
			sendmessageByRy(content, type) {
				let that = this
				// 获取指定会话的抽象实例，对于会话的操作基于此实例完成
				const conversation = this.$im.Conversation.get({
					// targetId
					targetId: '19',
					// 会话类型：RongIMLib.CONVERSATION_TYPE.PRIVATE | RongIMLib.CONVERSATION_TYPE.GROUP
					type: this.$ry.CONVERSATION_TYPE.PRIVATE
				});
				if (type == this.$ry.MESSAGE_TYPE.TEXT) {
					conversation.send({
						messageType: type,
						content: {
							content: that.replacedStr
						}
					}).then(function(message) {
						console.log('发送消息成功', message);
					}).catch(error => {
						console.log('发送消息失败', error.code, error.msg);
					});
				} else if (type == this.$ry.MESSAGE_TYPE.HQ_VOICE) {
					console.log(content, 'viocery')
					conversation.send({
						messageType: type, // 'RC:HQVCMsg'
						content: {
							remoteUrl: content.msg.content.url, // 音频 url, 建议格式: aac
							duration: content.msg.content.msg.time, // 音频时长
							type: 'aac'
						}
					}).then(function(message) {
						console.log('发送语音消息成功', message);
					});
				} else if (type == this.$ry.MESSAGE_TYPE.IMAGE) {
					console.log(content, '666666')
					conversation.send({
						messageType: type, // 'RC:ImgMsg'
						content: {
							content: content.base64_path, // // 压缩后的 base64 略缩图, 用来快速展示图片
							imageUri: content.url // 上传到服务器的 url. 用来展示高清图片
						}
					}).then(function(message) {
						console.log('发送图片消息成功', message);
					});
				}

			},
			// 接受消息(筛选处理)
			screenMsg(msg, watch = false) {
				let that = this
				//筛选处理
				if (msg.type == 'system') {
					// 系统消息
					switch (msg.msg.type) {
						case 'text':
							this.addSystemTextMsg(msg);
							break;
					}
				} else if (msg.type == 'user') {
					// 用户消息
					switch (msg.msg.type) {
						case 'text':
							// console.log(watch,'watch')
							if (!watch) {
								this.sendmessageByRy(msg.msg.content, that.$ry.MESSAGE_TYPE.TEXT)
							}
							// console.log(msg)
							this.addTextMsg(msg);
							break;
						case 'voice':
							if (!watch) {
								this.sendmessageByRy(msg, that.$ry.MESSAGE_TYPE.HQ_VOICE)
							}
							this.addVoiceMsg(msg);
							break;
						case 'img':
							if (!watch) {
								this.sendmessageByRy(msg.msg.content, that.$ry.MESSAGE_TYPE.IMAGE)
							}
							this.addImgMsg(msg);
							break;
					}
					console.log('用户消息');
					//非自己的消息震动
					if (msg.msg.userinfo.uid != this.myuid) {
						console.log('振动');
						uni.vibrateLong();
					}
				}
				this.$nextTick(function() {
					// 滚动到底
					this.scrollToView = 'msg' + msg.msg.id
				});
			},

			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e) {
				if (this.isHistoryLoading) {
					return;
				}
				this.isHistoryLoading = true; //参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false; //关闭滑动动画
				let Viewid = this.msgList[0].msg.id; //记住第一个信息ID
				//本地模拟请求历史记录效果
				// setTimeout(() => {
				// 	// 消息列表
				// 	let list = [{
				// 			type: "user",
				// 			msg: {
				// 				id: 1,
				// 				type: "text",
				// 				time: "12:56",
				// 				userinfo: {
				// 					uid: 0,
				// 					username: "大黑哥",
				// 					face: "/static/img/face.jpg"
				// 				},
				// 				content: {
				// 					text: "为什么温度会相差那么大？"
				// 				}
				// 			}
				// 		},
				// 		{
				// 			type: "user",
				// 			msg: {
				// 				id: 2,
				// 				type: "text",
				// 				time: "12:57",
				// 				userinfo: {
				// 					uid: 1,
				// 					username: "售后客服008",
				// 					face: "/static/img/im/face/face_2.jpg"
				// 				},
				// 				content: {
				// 					text: "这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。"
				// 				}
				// 			}
				// 		},
				// 		{
				// 			type: "user",
				// 			msg: {
				// 				id: 3,
				// 				type: "voice",
				// 				time: "12:59",
				// 				userinfo: {
				// 					uid: 1,
				// 					username: "售后客服008",
				// 					face: "/static/img/im/face/face_2.jpg"
				// 				},
				// 				content: {
				// 					url: "/static/voice/1.mp3",
				// 					length: "00:06"
				// 				}
				// 			}
				// 		},
				// 		{
				// 			type: "user",
				// 			msg: {
				// 				id: 4,
				// 				type: "voice",
				// 				time: "13:05",
				// 				userinfo: {
				// 					uid: 0,
				// 					username: "大黑哥",
				// 					face: "/static/img/face.jpg"
				// 				},
				// 				content: {
				// 					url: "/static/voice/2.mp3",
				// 					length: "00:06"
				// 				}
				// 			}
				// 		},
				// 	]
				// 	// 获取消息中的图片,并处理显示尺寸
				// 	for (let i = 0; i < list.length; i++) {
				// 		if (list[i].type == 'user' && list[i].msg.type == "img") {
				// 			list[i].msg.content = this.setPicSize(list[i].msg.content);
				// 			this.msgImgList.unshift(list[i].msg.content.url);
				// 		}
				// 		list[i].msg.id = Math.floor(Math.random() * 1000 + 1);
				// 		this.msgList.unshift(list[i]);
				// 	}

				// 	//这段代码很重要，不然每次加载历史数据都会跳到顶部
				// 	this.$nextTick(function() {
				// 		this.scrollToView = 'msg' + Viewid; //跳转上次的第一行信息位置
				// 		this.$nextTick(function() {
				// 			this.scrollAnimation = true; //恢复滚动动画
				// 		});
				// 	});
				// 	this.isHistoryLoading = false;

				// }, 1000)
			},
			// 加载初始页面消息
			getMsgList() {
				// 消息列表
				let list = [

				]
				// 获取消息中的图片,并处理显示尺寸
				for (let i = 0; i < list.length; i++) {
					if (list[i].type == 'user' && list[i].msg.type == "img") {
						list[i].msg.content = this.setPicSize(list[i].msg.content);
						this.msgImgList.push(list[i].msg.content.url);
					}
				}
				this.msgList = list;
				// 滚动到底部
				this.$nextTick(function() {
					//进入页面滚动到底部
					this.scrollTop = 9999;
					this.$nextTick(function() {
						this.scrollAnimation = true;
					});

				});
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content) {
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350); //350是定义消息图片最大宽度
				let maxH = uni.upx2px(350); //350是定义消息图片最大高度
				if (content.w > maxW || content.h > maxH) {
					let scale = content.w / content.h;
					content.w = scale > 1 ? maxW : maxH * scale;
					content.h = scale > 1 ? maxW / scale : maxH;
				}
				return content;
			},
			//更多功能(点击+弹出) 
			showMore() {
				this.isVoice = false;
				this.hideEmoji = true;
				if (this.hideMore) {
					this.hideMore = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer() {
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer() {
				this.popupLayerClass = '';
				setTimeout(() => {
					this.hideMore = true;
					this.hideEmoji = true;
				}, 150);
			},
			// 选择图片发送
			chooseImage() {
				this.getMedia('album');
			},
			//拍照发送
			camera() {
				this.getMedia('camera');
			},
			//选照片/视频 or 拍照/视频
			getMedia(type) {
				let that = this
				this.hideDrawer();
				uni.chooseMedia({
					mediaType: ['image', 'video'],
					sourceType: [type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						that.weixin_img(0, res).then(() => {
							setTimeout(() => {
								for (let i = 0; i < res.tempFiles.length; i++) {
									if (res.tempFiles[i]) {
										uni.getImageInfo({
											src: res.tempFiles[i].tempFilePath,
											success: (image) => {
												let msg = {
													url: res.tempFiles[i]
														.tempFilePath,
													w: res.width,
													h: res.height,
													base64_path: res.tempFiles[
														i].Base64_Path
												};
												this.sendMsg(msg, 'img');
											}
										});
									}
								}
							}, 100)
						})
					}
				});
			},
			//微信压缩
			weixin_img(num, rem) {
				return new Promise((resolve) => {
					let that = this
					uni.getImageInfo({ //获取这个图片 图片压缩
						src: rem.tempFiles[num].tempFilePath, //需要获取的图片 图片选择不用我说了吧
						success: function(res) {
							var ctx = wx.createCanvasContext('mycanvas', this); //使用一个canvas
							var canvasWidth = res.width //原图宽度 
							var canvasHeight = res.height; //原图高度
							var ratio = 2;
							// 保证宽高均在200以内
							while (canvasWidth > 200 || canvasHeight > 200) {
								//比例取整
								canvasWidth = Math.trunc(res.width / ratio)
								canvasHeight = Math.trunc(res.height / ratio)
								ratio++;
							}
							// 绘制新图
							ctx.drawImage(rem.tempFiles[num].tempFilePath, 0, 0, canvasWidth,
								canvasHeight)
							ctx.draw()
							//获取图像数据， API 1.9.0
							wx.canvasGetImageData({
								canvasId: 'mycanvas',
								x: 0,
								y: 0,
								width: canvasWidth,
								height: canvasHeight,
								success: (res) => {
									let platform = wx.getSystemInfoSync().platform
									if (platform == 'ios') {
										// 兼容处理：ios获取的图片上下颠倒
										res = that.reverseImgData(res)
									}
									// 3. png编码
									let pngData = upng.encode([res.data.buffer],
										canvasWidth, canvasHeight)
									// 4. base64编码
									let base64 = wx.arrayBufferToBase64(pngData)
									rem.tempFiles[num].Base64_Path = base64
									that.materialList = that.materialList.concat(rem
										.tempFiles[num]);
									console.log(rem.tempFiles[num].Base64_Path, 'wcl')
									//利用递归循环来实现多张图片压缩
									if (num == rem.tempFiles.length - 1) {
										return
									} else {
										that.weixin_img(num + 1, rem)
									}
								},
							}, this)
						},
					})
					resolve()
				})
			},
			// 兼容处理：ios获取的图片上下颠倒
			reverseImgData(res) {
				var w = res.width
				var h = res.height
				let con = 0
				for (var i = 0; i < h / 2; i++) {
					for (var j = 0; j < w * 4; j++) {
						con = res.data[i * w * 4 + j]
						res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j]
						res.data[(h - i - 1) * w * 4 + j] = con
					}
				}
				return res
			},
			// 选择表情
			chooseEmoji() {
				this.hideMore = true;
				if (this.hideEmoji) {
					this.hideEmoji = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em) {
				this.textMsg += em.alt;
			},

			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus() {
				if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
					this.hideDrawer();
				}
			},
			// 发送文字消息
			sendText() {
				this.hideDrawer(); //隐藏抽屉
				if (!this.textMsg) {
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {
					text: content
				}
				console.log(this.textMsg, '5255')
				this.replacedStr = this.textMsg
				this.sendMsg(msg, 'text');
				this.textMsg = ''; //清空输入框
			},
			//替换表情符号为图片
			replaceEmoji(str) {
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
					// console.log("item: " + item);
					for (let i = 0; i < this.emojiList.length; i++) {
						let row = this.emojiList[i];
						for (let j = 0; j < row.length; j++) {
							let EM = row[j];
							if (EM.alt == item) {
								let imgstr = '<img src="' +
									'https://kz-open-resources.oss-cn-beijing.aliyuncs.com/tcell/images/InternetmemeImages/' +
									EM.url + '" ' + 'width="' + '32px"' + ' height="' + '32px"' + '/>';
								console.log("imgstr: " + imgstr);
								return imgstr;
							}
						}
					}
				});
				return '<div style="display: flex;align-items: center;word-wrap:break-word;">' + replacedStr +
					'</div>';
			},

			// 发送消息
			sendMsg(content, type) {
				let that = this
				var nowDate = new Date();
				let lastid = 0;
				lastid++;
				// console.log(content)
				let msg = {
					type: 'user',
					msg: {
						id: lastid,
						time: nowDate.getHours() + ":" + nowDate.getMinutes(),
						type: type,
						userinfo: {
							uid: that.myuid,
							username: "大黑哥",
							face: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2146034403,1504718527&fm=26&gp=0.jpg"
						},
						content: content
					}
				}
				console.log(msg)
				// 发送消息
				this.screenMsg(msg);
			},

			// 添加文字消息到列表
			addTextMsg(msg) {
				console.log(msg, '新增加的消息')
				this.msgList.push(msg);
				console.log(this.msgList, '增加后的消息总表')
			},
			// 添加语音消息到列表
			addVoiceMsg(msg) {
				console.log(msg, '语音消息')
				console.log(msg.msg.content.url, 'ssss')
				this.msgList.push(msg);
			},
			// 添加图片消息到列表
			addImgMsg(msg) {
				msg.msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.msg.content.url);
				this.msgList.push(msg);
			},
			addRedEnvelopeMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg) {
				this.msgList.push(msg);
			},
			//上传图片/音频OSS
			uploadOss(msg) {
				console.log(msg.url, 'path')
				let that = this
				let reg = RegExp(/mp3/)
				let format = '.jpg'
				let location = 'image'
				if (reg.test(msg.url)) {
					format = '.mp3'
					location = 'audio'
				}
				let position = 'chat/' + location + '/'
				getPolicyPrivate(position).then((res) => {
					// 向后台发请求 拉取OSS相关配置
					const creds = res[1].data.data;
					//随机数
					let date = new Date()
					let d = date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : (
							'0' + (date.getMonth() + 1))) + '/patientVioce--' + date.getDate() + 'day' + date
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
						filePath: msg.url,
						name: 'file', // 必须填file。	
						formData: {
							key: position + SJS + format,
							policy: creds.policy,
							OSSAccessKeyId: creds.accessid,
							signature: creds.signature,
						},
						success: (res) => {
							signatureUrl(creds.host + '/' + position + SJS + format).then(r => {
								if (r[1].data.code == 201) {
									this.sendMsg({
										url: r[1].data.data,
										msg: msg
									}, 'voice');
								} else {
									uni.showToast({
										title: r[1].data.data
									})
								}
							}).catch(err => {
								uni.showToast({
									title: err
								})
							})
						},
						fail: err => {
							console.log(err);
						}
					});
				})
			},
			// 预览图片
			showPic(msg) {
				uni.previewImage({
					indicator: "none",
					current: msg.content.url,
					urls: this.msgImgList
				});
			},
			// 播放语音
			playVoice(msg) {
				console.log(msg)
				this.playMsgid = msg.id;
				this.AUDIO.src = msg.content.url;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			// 录音开始
			voiceBegin(e) {
				if (e.touches.length > 1) {
					return;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({
					format: "mp3"
				}); //录音开始,
			},
			//录音开始UI效果
			recordBegin(e) {
				this.recording = true;
				this.voiceTis = '松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(() => {
					this.recordLength++;
				}, 1000)
			},
			// 录音被打断
			voiceCancel() {
				this.recording = false;
				this.voiceTis = '按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true; //不发送录音
				this.RECORDER.stop(); //录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e) {
				if (!this.recording) {
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				} else {
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e) {
				if (!this.recording) {
					return;
				}
				this.recording = false;
				this.voiceTis = '按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop(); //录音结束
			},
			//录音结束(回调文件)
			recordEnd(e) {
				clearInterval(this.recordTimer);
				if (!this.willStop) {
					let msg = {
						length: 0,
						url: e.tempFilePath,
						time: this.recordLength
					}
					let min = parseInt(this.recordLength / 60);
					let sec = this.recordLength % 60;
					min = min < 10 ? '0' + min : min;
					sec = sec < 10 ? '0' + sec : sec;
					msg.length = min + ':' + sec;
					console.log(msg, 'msg.url')
					this.uploadOss(msg)

				} else {
					console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice() {
				this.hideDrawer();
				this.isVoice = this.isVoice ? false : true;
			},
			discard() {
				return;
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/static/HM-chat/css/style.scss"; 
	
</style> 
 