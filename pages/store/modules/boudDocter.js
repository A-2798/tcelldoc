import {
	setBoudDocter,
	getBoudDocter
} from 'util/auth.js'

const getDefaultState = () => {
	return {ifDocter: false}
}


const state = getDefaultState()

const mutations = {
	'SET_BOUDDOCTER': (state, a) => {
		state.ifDocter = a
	}
}

const actions = {
	setBoudDocter: ({
		commit
	}, a) => {
		commit('SET_BOUDDOCTER', a)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
