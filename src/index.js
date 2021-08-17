import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import memoryUtils from './utils/memoryUtils'
import {getUser} from './utils/storageUtils'
// 读取local storage中User，将读取到的User保存在memory中
memoryUtils.user  = getUser();
// 

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ,
    document.getElementById('root')
)