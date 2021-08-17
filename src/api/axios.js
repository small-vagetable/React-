/*
1.优化：统一处理请求异常
*/
import axios from 'axios'
import { message } from 'antd'


export default function myAxios(url,data={},method='GET'){

    return new Promise((resolve,reject)=>{
        let promise;
        // 1.执行异步ajax请求
        if(method === 'GET'){
            promise = axios.get(url,{
                params:data
            })
        }else if(method === 'POST'){
            promise = axios.post(url,data)
        }
        // console.log('promise 的then开始执行')
        // 2.如果成功，调用resolve
        promise.then(response=>{resolve(response.data)})
        // 3.如果失败，不调用reject，而是提示异常信息
                .catch(error=>{
                    message.error('请求出错了'+error.message)
                })
        

    })

    
}