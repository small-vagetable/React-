import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Add_upDate from './Add_Update'
import Detail from './Detail'
import Home from './Home'
export default class Product extends Component {
    render() {
        return (
               <Switch>
                   <Route path='/commodity/product' component = {Home} exact />
                   <Route path='/commodity/product/detail' component = {Detail}  />
                   <Route path='/commodity/product/addupdate' component = {Add_upDate}  />
                   <Redirect to='/commodity/product' />
               </Switch>
        )
    }
}
