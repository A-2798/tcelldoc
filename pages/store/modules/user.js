import {login,loginByPass} from 'API/login'
import {getToken,setToken,getUid,setUid,getName,setName,getUrl,setUrl} from "util/auth.js"

const getDefaultState = ()=>{
	return {
		token:getToken(),
		uid:getUid(),
		name:getName(),
		url:getUrl(),
		userStatus:1//0老用户  1新用户
	}
}

const state = getDefaultState()

const mutations = {
	//重置state数据
	RESET_STATE:(state)=>{
		Object.assign(state,getDefaultState())
	},
	//修改token
	SET_TOKEN:(state,token)=>{
		state.token = token
	},
	//修改uid
	SET_UID:(state,uid)=>{
		state.uid = uid
	},
	//修改name
	SET_NAME:(state,name)=>{
		state.name = name
	},
	//修改imgurl
	SET_URL:(state,url)=>{
		state.url = url
	},
	//修改用户基本信息状态
	CHANGE_USERSTATUS:(state,status)=>{
		state.userStatus = status
	}
}

const actions ={
	//user login  by code
	login({commit},userInfo){
		const phoneNumber = userInfo.phoneNumber
		const code = userInfo.code
		return new Promise((resolve,reject)=>{
			login({phoneNumber:phoneNumber.trim(),code:code}).then(res=>{
				console.log(res)
				const {data} = res[1]
				commit('SET_TOKEN',data.data.token)
				commit('SET_UID',data.data.uid)
				commit('SET_NAME',data.data.username)
				commit('SET_URL',data.data.portraituri)
				setToken(data.data.token)
				setUid(data.data.uid)
				setName(data.data.username)
				setUrl(data.data.portraituri)
				resolve(res)
 			}).catch(error=>{
				reject(error)
			})
		})
	},
	//user login by password
	loginByPass({commit},userInfo){
		const userName = userInfo.userName
		const password = userInfo.password
		return new Promise((resolve,reject)=>{
			loginByPass({userName:userName,password:password}).then(res=>{
				console.log(res)
				const {data} = res[1]
				commit('SET_TOKEN',data.data.token)
				commit('SET_UID',data.data.uid)
				commit('SET_NAME',data.data.username)
				commit('SET_URL',data.data.portraituri)
				setToken(data.data.token)
				setUid(data.data.uid)
				setName(data.data.username)
				setUrl(data.data.portraituri)
				resolve(res)
			}).catch(error=>{
				reject(error)
			})
		})
	},
	// user logout
	  logout({ commit, state }) {
	    return new Promise((resolve, reject) => {
	      Query.token = 'ckw' + state.token
	      logout(Query).then(() => {
	        removeToken() // must remove  token  first
	        uni.reLaunch({
	        	url:'pages/login/login'
	        })
	        commit('RESET_STATE')
	        resolve()
	      }).catch(error => {
	        reject(error)
	      })
	    })
	  },
	  // remove token
	  resetToken({ commit }) {
	    return new Promise(resolve => {
	      removeToken() // must remove  token  first
	      commit('RESET_STATE')
	      resolve()
	    })
	  },
	  //change status
	  changeStatus({commit},status){
		  return new Promise(resolve=>{
			  commit('CHANGE_USERSTATUS',status)
		  })
	  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}