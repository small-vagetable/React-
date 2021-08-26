import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
// reducers
import reducers from './reducers'
// 开发工具
import {composeWithDevTools} from 'redux-devtools-extension'
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))