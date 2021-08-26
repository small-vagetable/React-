// 引入自定义常量名称
import { RECEIVE_USER,RESET_USER,SHOW_ERROR_MSG } from '../contances'
import {getUser} from '../../utils/storageUtils'
console.log(RECEIVE_USER)
// user的reducer
let initUser =getUser();
export default function user(prestate = initUser,action){
    const {type,data} = action;
    switch (type) {
        case RECEIVE_USER:
            return data
        case RESET_USER:
            return {}
        case SHOW_ERROR_MSG:
            return {...prestate,msg:data}
        default:
            return prestate;
    }
}