import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {receiveUser} from './redux/actions/user'
import {getUser} from './utils/storageUtils'
// react-redux
import {Provider} from 'react-redux'
// store
import store from './redux/store'
// 读取local storage中User，将读取到的User保存在memory中
receiveUser (getUser());

// 

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
)