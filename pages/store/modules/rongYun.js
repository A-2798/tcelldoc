const state = {
		answer: []
	}
	
const mutations = {
	'GET_ANSWER': (state, playload) => { //--------------重要
		let say = { //自定义消息组件所需参数
			type: 1,
			css: 'left',
			txt: playload.content,
			date: '',
			headImg: playload.extra
		}
		state.answer.push(say)
		console.log(playload)
	},
}

const actions = {
	
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
