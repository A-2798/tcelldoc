<template>
	<view v-if="visibleSync" class="ei-calendar" :class="{ 'ei-calendar--drawer': drawer, 'is-active': active}">
		<view class="ei-calendar__mask" @tap="close" v-if="drawer"></view>
		<view class="ei-calendar__container">
			<view class="ei-calendar__container__header">
				<view class="ei-calendar__container__header__row">
				
					<view class="ei-calendar__container__header__title">{{title}}</view>
				</view>
				<view class="ei-calendar__container__header__date">
					<view class="ei-calendar__container__header__date__edge"></view>
					<!-- <view class="ei-calendar__container__header__date__btn" hover-class="is-hover" :hover-start-time="20"
					 :hover-stay-time="70" @click="toYear(-1)">
						<view class="ei ei-d-left"></view>
					</view> -->
					<view class="ei-calendar__container__header__date__show">
						{{currentDateShow}}
					</view>
				<!-- 	<view class="ei-calendar__container__header__date__btn" hover-class="is-hover" :hover-start-time="20"
					 :hover-stay-time="70" @click="toYear(1)">
						<view class="ei ei-d-right"></view>
					</view> -->
					
				</view>
			<!-- 	<view class="ei-calendar__container__header__week">
					<view class="ei-calendar__container__header__week__day" v-for="(day,index) in week" :key="index">
						{{day}}
					</view>
				</view> -->
			</view>
			<swiper class="ei-calendar__container__content" vertical :current="currentIndex" :duration="duration"
			 @animationfinish="animationfinish" skip-hidden-item-layout circular>
				<swiper-item v-model="ri" class="ei-calendar__container__content__item" v-for="(item, itemIndex) in showMonthList"
				 :key="itemIndex">
					<view class="ei-calendar__container__content__item__bg">{{item.month}}</view>
					<view v-for="(row, index) in item.days" :key="index" class="ei-calendar__container__content__item__row">
						<view class="ei-calendar__container__content__item__col" :class="{ 'is-range': type === 'range' }" v-for="day in row"
						 :key="day.format">
							<ei-calendar-item :day="day" :cell-class="cellClass" :type="type" :selected-value="selectedValue" :selection="selection"
							 @click="onDayClick">
							</ei-calendar-item>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="">
				<span class='kaishi'>开始时间</span> <span class="jieshu">结束时间</span>
				<picker-view :indicator-style="indicatorStyle" :value="values" @change="bindChange">
					<picker-view-column>
						<view>{{y}}</view>
					</picker-view-column>
					<picker-view-column>
						<view v-model="monthes" class="item" v-for="(item,index) in monthes" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view v-model="dayes" class="item" v-for="(item,index) in dayes" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>

			<view class="ei-calendar__container__footer" v-if="!disabled">
				<button class="ei-calendar__footer__btn" type="primary">继续选择</button>
				<button class="ei-calendar__container__footer__btn" style="position: relative;z-index: 999;" type="primary" @click="doSubmit">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import EiCalendarItem from './ei-calendar-item';
	import EDate from './EDate';
	let CustomDate = {};

	export default {

		name: 'ei-calendar',
		components: {
			EiCalendarItem
		},
		props: {
			visible: {
				type: Boolean
			},
			value: {
				type: [Array, String]
			},
			type: {
				validator(value) {
					return ['range', 'multiple', 'single'].indexOf(value) !== -1;
				},
				default: 'single'
			},
			disabled: {
				type: Boolean
			},
			cellClass: {
				type: Object,
				default: () => ({})
			},
			disabledDate: {
				type: [Array, Function],
				default: () => []
			},
			customDate: {
				type: [Array, Function],
				default: () => []
			},
			format: String,
			title: {
				type: String,
				default: '选择当月出诊 (可多选)'
			},
			drawer: {
				type: Boolean,
				default: true
			}
		},
		data() {
			//计算间隔5分钟
			// let tt = []
			// for (let i = 0; i < 24; i++) {
			// 	for (let j = 0; j <= 55; j += 5) {
			// 		let s = i;
			// 		let d = j;
			// 		if (s < 10) {
			// 			s = "0" + s
			// 		}
			// 		if (d < 10) {
			// 			d = "0" + d
			// 		}
			// 		let ti = s + ":" + d
			// 		tt.push(ti)
			// 	}
			// },
			// console.log(tt)
			
			return {
				ri: '',
				monthes: '',
				dayes: '',
				but: '',
				// tt,
				indicatorStyle: `height: 50px;`,
				values: [0, 1, 2],
				y:'',
				// yeares: ["5月12日"],
				monthes: [
					"23:55", "23:50", "23:45", "23:40", "23:35", "23:30", "23:25", "23:20", "23:15", "23:10", "23:05",
					"23:00", "22:55", "22:50", "22:45", "22:40", "22:35", "22:30", "22:25", "22:20", "22:15", "22:10", "22:05",
					"22:00", "21:55", "21:45", "21:40", "21:35", "21:30", "21:25", "21:20", "21:15", "21:10", "21:05", "21:00",
					"20:55", "20:50", "20:45", "20:40", "20:35", "20:30", "20:25", "20:20", "20:15", "20:10", "20:05", "20:00",
					"19:55", "19:50", "19:45", "19:40", "19:35", "19:30", "19:25", "19:20", "19:15", "19:10", "19:05", "19:00",
					"18:55", "18:50", "18:45", "18:35", "18:30", "18:25", "18:20", "18:15", "18:10", "18:05", "18:00", "17:55",
					"17:50",
					"17:45", "17:40", "17:35", "17:30", "17:25", "17:20", "17:15", "17:10", "17:05", "17:00", "16:55", "16:50",
					"16:45", "16:40", "16:35", "16:30", "16:25", "16:20", "16:10", "16:05", "16:00", "15:55", "15:50", "15:45",
					"15:40", "15:35", "15:30", "15:25", "15:20", "15:15", "15:10", "15:05", "15:00", "14:55", "14:50", "14:45",
					"14:40",
					"14:35", "14:30", "14:25", "14:20", "14:15", "14:10", "14:05", "14:00", "13:55", "13:50", "13:45", "13:40",
					"13:35",
					"13:30", "13:25", "13:20", "13:15", "13:10", "13:05", "13:00", "12:55", "12:50", "12:45", "12:40", "12:35",
					"12:30",
					"12:25", "12:20", "12:15", "12:10", "12:05", "12:00", "11:55", "11:50", "11:45", "11:40", "11:35", "11:30",
					"11:25",
					"11:20", "11:15", "11:10", "11:05", "11:00", "10:55", "10:50", "10:45", "10:40", "10:35", "10:30", "10:25",
					"10:20",
					"10:15", "10:10", "10:05", "10:00", "09:55", "09:50", "09:45", "09:40", "09:35", "09:30", "09:25", "09:20",
					"09:15",
					"09:10", "09:05", "09:00", "08:55", "08:50", "08:45", "08:40", "08:35", "08:30", "08:25", "08:20", "08:15",
					"08:10", "08:05",
					"08:00", "07:55", "07:50", "07:45", "07:40", "07:35", "07:30", "07:25", "07:20", "07:15", "07:10", "07:05",
					"07:00", "06:55",
					"06:50", "06:45", "06:40", "06:35", "06:30", "06:25", "06:20", "06:15", "06:10", "06:05", "06:00", "05:55",
					"05:50", "05:45",
					"05:40", "05:35", "05:30", "05:25", "05:20", "05:15", "05:10", "05:05", "05:00", "04:55", "04:50", "04:45",
					"04:40", "04:35",
					"04:30", "04:25", "04:20", "04:15", "04:10", "04:05", "04:00", "03:55", "03:50", "03:45", "03:40", "03:35",
					"03:30", "03:25",
					"03:20", "03:15", "03:10", "03:05", "03:00", "02:55", "02:50", "02:45", "02:40", "02:35", "02:30", "02:25",
					"02:20", "02:15",
					"02:10", "02:05", "02:00", "01:55", "01:50", "01:45", "01:40", "01:35", "01:30", "01:25", "01:20", "01:15",
					"01:10", "01:05",
					"01:00", "00:55", "00:50", "00:45", "00:40", "00:35", "00:30", "00:25", "00:20", "00:15", "00:10", "00:05",
					"00:00"
				],

				dayes: [
					"23:55", "23:50", "23:45", "23:40", "23:35", "23:30", "23:25", "23:20", "23:15", "23:10", "23:05",
					"23:00", "22:55", "22:50", "22:45", "22:40", "22:35", "22:30", "22:25", "22:20", "22:15", "22:10", "22:05",
					"22:00", "21:55", "21:45", "21:40", "21:35", "21:30", "21:25", "21:20", "21:15", "21:10", "21:05", "21:00",
					"20:55", "20:50", "20:45", "20:40", "20:35", "20:30", "20:25", "20:20", "20:15", "20:10", "20:05", "20:00",
					"19:55", "19:50", "19:45", "19:40", "19:35", "19:30", "19:25", "19:20", "19:15", "19:10", "19:05", "19:00",
					"18:55", "18:50", "18:45", "18:35", "18:30", "18:25", "18:20", "18:15", "18:10", "18:05", "18:00", "17:55",
					"17:50",
					"17:45", "17:40", "17:35", "17:30", "17:25", "17:20", "17:15", "17:10", "17:05", "17:00", "16:55", "16:50",
					"16:45", "16:40", "16:35", "16:30", "16:25", "16:20", "16:10", "16:05", "16:00", "15:55", "15:50", "15:45",
					"15:40", "15:35", "15:30", "15:25", "15:20", "15:15", "15:10", "15:05", "15:00", "14:55", "14:50", "14:45",
					"14:40",
					"14:35", "14:30", "14:25", "14:20", "14:15", "14:10", "14:05", "14:00", "13:55", "13:50", "13:45", "13:40",
					"13:35",
					"13:30", "13:25", "13:20", "13:15", "13:10", "13:05", "13:00", "12:55", "12:50", "12:45", "12:40", "12:35",
					"12:30",
					"12:25", "12:20", "12:15", "12:10", "12:05", "12:00", "11:55", "11:50", "11:45", "11:40", "11:35", "11:30",
					"11:25",
					"11:20", "11:15", "11:10", "11:05", "11:00", "10:55", "10:50", "10:45", "10:40", "10:35", "10:30", "10:25",
					"10:20",
					"10:15", "10:10", "10:05", "10:00", "09:55", "09:50", "09:45", "09:40", "09:35", "09:30", "09:25", "09:20",
					"09:15",
					"09:10", "09:05", "09:00", "08:55", "08:50", "08:45", "08:40", "08:35", "08:30", "08:25", "08:20", "08:15",
					"08:10", "08:05",
					"08:00", "07:55", "07:50", "07:45", "07:40", "07:35", "07:30", "07:25", "07:20", "07:15", "07:10", "07:05",
					"07:00", "06:55",
					"06:50", "06:45", "06:40", "06:35", "06:30", "06:25", "06:20", "06:15", "06:10", "06:05", "06:00", "05:55",
					"05:50", "05:45",
					"05:40", "05:35", "05:30", "05:25", "05:20", "05:15", "05:10", "05:05", "05:00", "04:55", "04:50", "04:45",
					"04:40", "04:35",
					"04:30", "04:25", "04:20", "04:15", "04:10", "04:05", "04:00", "03:55", "03:50", "03:45", "03:40", "03:35",
					"03:30", "03:25",
					"03:20", "03:15", "03:10", "03:05", "03:00", "02:55", "02:50", "02:45", "02:40", "02:35", "02:30", "02:25",
					"02:20", "02:15",
					"02:10", "02:05", "02:00", "01:55", "01:50", "01:45", "01:40", "01:35", "01:30", "01:25", "01:20", "01:15",
					"01:10", "01:05",
					"01:00", "00:55", "00:50", "00:45", "00:40", "00:35", "00:30", "00:25", "00:20", "00:15", "00:10", "00:05",
					"00:00"
				],

				visibleSync: false,
				active: false,
				closeTimer: null,
				watchTimer: null,
				week: ['日', '一', '二', '三', '四', '五', '六'],
				months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
				selectedValue: undefined,
				selection: [],
				currentDate: undefined,
				showMonthList: [],
				currentIndex: 1,
				duration: 200
			};
		},
		computed: {
			currentDateShow() {
				return this.currentDate ? `${this.currentDate.replace('/', '年')}月` : '';
			}
		},
		watch: {
			visible(val) {
				clearTimeout(this.watchTimer);
				setTimeout(() => {
					this.active = val
				}, 100);
				if (this.visibleSync) {
					clearTimeout(this.closeTimer)
				}
				if (val) {
					this.visibleSync = val;
					this.initValue();
				} else {
					this.watchTimer = setTimeout(() => {
						this.showMonthList = [];
						this.currentIndex = 1;
						this.visibleSync = val
					}, 300)
				}
			}
		},
		created() {
			this.initVisible();
			let date = new Date();
			this.y = (date.getMonth() + 1) + "月" + date.getDate()+ "日";
		},

		methods: {
			bindChange(e) {
				const val = e.detail.value
				this.month = this.months[val[1]]
				this.day = this.dayes[val[2]]
			},
			initVisible() {
				this.visibleSync = this.visible;
				if (this.visible) {
					this.initValue();
				}
				setTimeout(() => {
					this.active = this.visible;
				}, 100);
			},
			initCustomData() {
				if (Array.isArray(this.customDate)) {
					CustomDate = {};
					this.customDate.forEach((item) => {
						const date = typeof item === 'string' ? item : item.date;
						if (date) {
							const format = new EDate([date]).format('YYYY/MM/DD');
							CustomDate[format] = typeof item === 'string' ? {
								date,
								top: [{}]
							} : item;
						}
					});
				}
			},
			initValue() {
				this.initCustomData();
				if (this.type === 'single') {
					const selectedValue = new EDate([this.value], 'YYYY/MM/DD');
					this.selectedValue = selectedValue.getTime();
					this.currentDate = selectedValue.format('YYYY/MM');
				} else {
					const valueList = this.value || [];
					const selection = [];
					valueList.forEach((item) => {
						selection.push(new EDate([item], 'YYYY/MM/DD').getTime());
					});
					this.selection = selection.sort();
					this.currentDate = EDate.format(this.selection[0], 'YYYY/MM') || new EDate().format('YYYY/MM');
				}
				this.setShowMonthList(1);
			},
			setShowMonthList(index, refresh) {
				if (!this.currentDate) return;
				const currentDate = this.currentDate;
				const beforeDate = EDate.modify(`${this.currentDate}/01`, {
					m: -1
				}).format('YYYY/MM'); // ios 预览下 new Date('2019/02')返回null
				const afterDate = EDate.modify(`${this.currentDate}/01`, {
					m: +1
				}).format('YYYY/MM');
				if (!this.showMonthList.length || refresh) {
					const before = this.getMonthDays(beforeDate);
					const current = this.getMonthDays(currentDate);
					const after = this.getMonthDays(afterDate);
					this.showMonthList = [before, current, after];
				} else {
					this.currentIndex = index;
					const [beforeIndex, currentIndex, afterIndex] = [
						[2, 0, 1],
						[0, 1, 2],
						[1, 2, 0]
					][this.currentIndex];
					const before = this.showMonthList.find(item => item.id === beforeDate) || this.getMonthDays(beforeDate);
					const current = this.showMonthList.find(item => item.id === currentDate) || this.getMonthDays(currentDate);
					const after = this.showMonthList.find(item => item.id === afterDate) || this.getMonthDays(afterDate);
					this.showMonthList[beforeIndex] = before;
					this.showMonthList[currentIndex] = current;
					this.showMonthList[afterIndex] = after;
				}
			},
			close() {
				this.active = false;
				this.$emit('close');
				this.$emit('update:visible', false);
				this.closeTimer = setTimeout(() => {
					this.visibleSync = false
				}, 200)
			},
			animationfinish(e) {
				const oldDate = this.currentDate;
				const index = e.detail.current;
				this.currentIndex = index;
				this.currentDate = this.showMonthList[index].id;
				this.setShowMonthList(index);
				this.$emit('date-change', this.currentDate, oldDate);
			},
			getMonthDays(dateStr) { // 获取该年月的日期信息
				const [year, showMonth] = dateStr.split('/');
				const month = showMonth - 1;
				const firstDayOfMonth = new Date(year, month, 1).getDay(); //当月第一天是周几
				const lastDateOfMonth = new Date(year, month + 1, 0).getDate(); //当月最后一天是几号
				const lastDayOfLastMonth = new Date(year, month, 0).getDate(); //上一月的最后一天是周几
				const days = [];
				let line = 0;
				for (let i = 1; i <= lastDateOfMonth; i++) {
					let dow = new Date(year, month, i).getDay();
					let k;
					//第一行
					if (dow === 0) {
						days[line] = [];
					} else if (i === 1) {
						days[line] = [];
						k = lastDayOfLastMonth - firstDayOfMonth + 1;
						for (let j = 0; j < firstDayOfMonth; j++) {
							const nowYear = month === 0 ? year - 1 : year;
							const nowMonth = month === 0 ? 12 : month;
							const dayOption = this.getDayOption({
								year: nowYear,
								month: nowMonth - 1,
								day: k,
								virtual: true,
								isToday: false
							});
							days[line].push(dayOption);
							k++;
						}
					}
					//普通日期
					// 当天
					const isToday = i === new Date().getDate() && month === new Date().getMonth() && +year === new Date().getFullYear();
					const dayOption = this.getDayOption({
						year: year,
						month: month,
						day: i,
						virtual: false,
						isToday
					});
					days[line].push(dayOption);
					if (dow === 6) {
						line++; //一周最后一天加行
					} else if (i === lastDateOfMonth) { //最后一行
						let k = 1;
						for (dow; dow < 6; dow++) {
							const nowYear = month + 2 > 11 ? year + 1 : year;
							const nowMonth = month + 2 > 11 ? 1 : month + 2;
							const dayOption = this.getDayOption({
								year: nowYear,
								month: nowMonth - 1,
								day: k,
								virtual: true,
								isToday: false
							});
							days[line].push(dayOption);
							k++;
						}
					}
				}
				return {
					id: dateStr,
					year,
					month: +showMonth,
					days
				};
			},
			getDayOption({
				year,
				month,
				day,
				virtual,
				isToday
			}) {
				const date = new EDate([year, month, day], 'YYYY/MM/DD');
				const format = date.format();
				const time = date.getTime();
				let isDisabled = virtual;
				if (!virtual) {
					if (typeof this.disabledDate === 'function') {
						isDisabled = this.disabledDate.call(this.$parent, date);
					} else {
						isDisabled = this.disabledDate.includes(format);
					}
				}
				// 获取自定义日期
				const customDate = this.getCustomDate(format);
				return {
					isDisabled, // 日期禁用
					// isSelected, // 选中日期
					year,
					month: month + 1,
					day,
					date,
					time,
					format,
					virtual, // 虚拟日期
					isToday,
					customDate
				}
			},
			getCustomDate(dateStr) {
				if (typeof this.customDate === 'function') {
					return this.customDate(dateStr);
				}
				return CustomDate[dateStr] || {};
			},
			onDayClick(day, isDisabled, virtual) {
				this.$emit('click', day);
				if (isDisabled || virtual || this.disabled) return;
				this.y = day.month + "月" + day.day + "日"
				if (this.type === 'single') {
					this.selectedValue = day.time;
					this.$emit('change', this.getResultValue());
					return;
				}
				if (this.type === 'multiple') {
					const value = day.time;
					const index = this.selection.findIndex(item => item === value);
					if (index < 0) {
						this.selection.push(value);
					} else {
						this.selection.splice(index, 1);
					}
					this.$emit('change', this.getResultValue());
					return;
				}
				if (!this.selection.length) {
					this.selection.push(day.time);
				} else if (this.selection.length === 1) {
					const firstTime = this.selection[0];
					if (day.time !== firstTime) {
						const method = day.time > firstTime ? 'push' : 'unshift';
						this.selection[method](day.time);
					}
				} else {
					this.selection = [day.time];
				}
				this.$emit('change', this.getResultValue());
			},
			getResultValue() {
				if (this.type === 'single') {
					return this.format && this.selectedValue ? EDate.format(this.selectedValue, this.format) : new Date(this.selectedValue);
				} else {
					return this.format ? this.selection.map(item => EDate.format(item, this.format)) : this.selection.map(item => new Date(
						item));
				}
			},
			doSubmit() {
				const value = this.getResultValue();
				this.$emit('input', value);
				this.$emit('submit', value);
				this.close();
			},
			refresh() {
				this.$nextTick(() => {
					this.initCustomData();
					this.setShowMonthList(this.currentIndex, true);
				});
			},
			toYear(year) {
				if (!this.currentDate) return;
				let oldDate = this.currentDate;
				if (year === 0) {
					const currentDate = new EDate().format('YYYY/MM');
					if (currentDate === this.currentDate) return;
					this.currentDate = currentDate;
					this.setShowMonthList(this.currentIndex);
				} else {
					this.currentDate = EDate.modify(this.currentDate, {
						y: year
					}).format('YYYY/MM');
					this.setShowMonthList(this.currentIndex);
				}
				this.$emit('date-change', this.currentDate, oldDate);
			}
		}
	};
</script>




<style scoped lang="scss">
	@import "../../uni";
	@import "icon.css";

	.kaishi {
		width: 50%;
		margin-left: 40%;
	}

	.jieshu {
		width: 50%;
		margin-left: 18%;
	}

	.ei-calendar {
		color: $uni-text-color;
	
		&--drawer {
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			overflow: hidden;
			z-index: 998;
			visibility: hidden;

			&.is-active {
				visibility: visible;

				.ei-calendar__mask {
					opacity: 1;
				}

				.ei-calendar__container {
					transform: translateY(0);
					
				}
			}

			.ei-calendar__mask {
				// 遮罩层
				opacity: 0;
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 100%;
				background: $uni-bg-color-mask;
				transition: opacity 0.3s;
			}

			.ei-calendar__container {
				// 日历
				position: absolute;
				transform: translateY(100%);
				bottom: 0;
				transition: all 0.3s ease-in;
			}
		}

		&__container {
			// 日历
			box-sizing: border-box;
			width: 100%;
			background: #fff;
			border-top-left-radius: $uni-border-radius-lg;
			border-top-right-radius: $uni-border-radius-lg;

			&__header {
				// 头部
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				position: relative;
				box-shadow: 0 2upx 5upx $uni-bg-color-hover;
				line-height: 1.5;

				&__row {
					width: 100%;
				}

				&__title {
					// 标题
					margin: 20upx 70upx;
					text-align: center;
				}

				&__cancel {
					// 取消按钮
					float: right;
					font-size: 24upx;
					color: $uni-text-color-grey;
					margin: 20upx 10upx;
				}

				&__date {
					// 表头日期
					margin-bottom: 20upx;
					font-weight: 700;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					&__show {}

					&__btn {
						font-size: 32upx;
						padding: 0 50upx;

						&.is-hover {
							color: #bbb;
						}
					}

					&__edge {
						width: 84upx;

						&.today {
							border: 1px rgba(253, 46, 50, .5) solid;
							border-right: 0;
							font-size: 24upx;
							border-top-left-radius: 50rpx;
							border-bottom-left-radius: 50rpx;
							color: rgba(253, 46, 50, .7);
							background: rgba(241, 233, 233, .4);
							text-align: center;

							&.is-hover {
								color: rgba(253, 46, 50, .5);
							}
						}
					}
				}

				&__week {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;

					&__day {
						padding: 10upx;
						width: percentage(100 / 7);
						text-align: center;
					}
				}
			}

			&__content {
				padding: 20rpx;
				height: 520rpx;
				box-sizing: border-box;
				background: #f3f3f3;
				&__item {
					box-sizing: border-box;
					position: relative;

					&__bg {
						z-index: 1;
						width: 100%;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						opacity: 0.1;
						position: absolute;
						font-size: 240upx;
						font-weight: bold;
					}

					&__row {

						z-index: 10;
						position: relative;
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
					}

					&__col {
						width: percentage(100 / 7);
						margin: 1upx;

						&.is-range {
							margin: 1upx 0;
						}
					}
				}
			}

			&__footer {
				width: 100%;
				box-sizing: border-box;

				.ei-calendar__footer__btn {
					width: 50%;
					float: left;
					font-size: 28rpx;
					background: #d8d8d8;
				}

				&__btn {
					width: 50%;
					margin-left: 50%;
					font-size: 28upx;
					background: #d8d8d8;
				}
			}
		}
	}

	picker-view {
		width: 100%;
		height: 100rpx;
		margin-top: 20rpx;
	}

	.item {
		line-height: 100rpx;
		text-align: center;
	}
	
	.ei-calendar__container__header__title{
		float: left;
	}
	.ei-calendar__container__header__date__show{
		float: left;
	}
	.ei-calendar__container__header__date{
		       width: 200px;
		       margin-right: 35%;
	}
	.ei-calendar__container{
		border-radius: 90.9rpx;
	}
	.ei-calendar__container__content__item__bg{
		    opacity: 0;
	}
	
</style>
