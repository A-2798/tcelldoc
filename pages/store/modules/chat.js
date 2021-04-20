const state = {
	watchSate: false,
	ryNewState:null,
}

const mutations = {
	'CHANGE_WATCH_STATE': (state) => {
		state.watchSate = true
	},
	'SET_RYNEWSTATE':(state,content)=>{
		state.ryNewState = content
		console.log(state.ryNewState,'state.ryNewState')
	}
}

const actions = {
	watchRy: ({
		commit
	}) => {
		commit('CHANGE_WATCH_STATE')
	},
	setNewMessage:({commit},content)=>{
		commit('SET_RYNEWSTATE',content)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
