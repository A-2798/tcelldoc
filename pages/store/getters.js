const getters = {
  token: state => state.user.token,
  userStatus: state => state.user.userStatus,
  docterId:state=>state.boudDocter.docterId,
  ryNewState:state =>state.chat.ryNewState
}
export default getters
