import React, { Component,Fragment } from 'react'
import {Route,Switch} from 'react-router-dom'

import Login from './pages/Login'
import Admin from './pages/Admin'
import Register from './pages/Register'

export default class App extends Component {
    
    render() {
        return (
            <Fragment>
                {/* 注册路由 */}
                <Switch>
                    <Route path='/login' component = {Login}/>
                    <Route path='/register' component = {Register}/>
                    <Route path='/' component = {Admin}/>
                    
                </Switch>
              
            </Fragment>
        )
    }
}
