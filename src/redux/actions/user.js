/*
包含n个action creator函数的模块
同步action: 对象 {type: 'xxx', data: 数据值}
异步action: 函数  dispatch => {}
 */
import {
    RECEIVE_USER,
    RESET_USER,
    SHOW_ERROR_MSG
  } from '../contances'
  import {reqLogin} from '../../api'
  import {saveUser,deleteUser} from "../../utils/storageUtils";
  
  
  /*
  接收用户的同步action
   */
  export const receiveUser = (user) => ({type: RECEIVE_USER, data:user})
  
  /*
  显示错误信息同步action
   */
  export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, data:errorMsg})
  
  /*
  退出登陆的同步action
   */
  export const logout = () =>  {
    // 删除local中的user
    deleteUser()
    // 返回action对象
    return {type: RESET_USER}
  }
  
  /*
  登陆的异步action
   */
  export const login = (username, password) => {
    return async dispatch => {
      // 1. 执行异步ajax请求
      const result = await reqLogin(username, password)  // {status: 0, data: user} {status: 1, msg: 'xxx'}
      // 2.1. 如果成功, 分发成功的同步action
      if(result.status===0) {
        const user = result.data
        // 保存local中
        saveUser(user);
        // 分发接收用户的同步action
        dispatch(receiveUser(user))
      } else { // 2.2. 如果失败, 分发失败的同步action
        const msg = result.msg
        // message.error(msg)
        dispatch(showErrorMsg(msg))
      }
  
    }
  }
  