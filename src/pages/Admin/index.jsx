import React, { Component } from 'react'
import { Layout } from 'antd';
import {Switch,Route,Redirect} from 'react-router-dom'
import LeftNav from '../LeftNav'
import './index.css'
// 引入内容展示区域的组件
import Category from '../Commodity/Category'
import Bar from '../Charts/Bar'
import Line from '../Charts/Line'
import Pie from '../Charts/Pie'
import Home from '../Home'
import Product from '../Commodity/Product'
import Role from '../Role'
import User from '../User'
import MyHeader from '../MyHeader'
import MyFooter from '../MyFooter'
import NonePage from '../NonePage'
import {connect} from 'react-redux'
const { Header, Footer, Sider, Content } = Layout;

class Admin extends Component {
    state = {
        collapeseType:false,
    }
    // 展开-收起时的回调函数
    collapeseHanlde = (collapsed, type) => {
        // console.log(collapsed, type);
        if (collapsed) {
            // console.log(this.menu)
        }
        this.setState({collapeseType:collapsed})
    }
    
    render() {
        // 渲染前查看是否登录
        const user  = this.props.user
        // console.log(user)
        if(!user||!user._id){
            //跳转到登录页面
            return <Redirect to='/login'/>
        }

        return (
            
            <Layout className = 'adminBg'>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="50"
                    onBreakpoint={broken => {
                        // console.log(broken);
                        
                    }}
                    // sider是否关闭
                    onCollapse={this.collapeseHanlde}
                    >

                    {/* 左边导航栏 */}
                    <LeftNav collapeseType = {this.state.collapeseType} />
                </Sider>

                <Layout>
                    {/* 头部展示区域 */}
                    <Header style = {{ height:'80px',padding:0}}>
                        <MyHeader/>
                    </Header>

                    {/* 内容展示区域 */}
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 14, minHeight: 500 }}>
                         
                            {/* 注册路由 */}
                            <Switch>
                                <Redirect exact from='/' to='/home' />
                                <Route path='/home' component={Home}/>
                                <Route path='/commodity/category' component={Category}/>
                                <Route path='/commodity/product' component={Product}/>
                                <Route path='/role' component={Role}/>
                                <Route path='/user' component={User}/>
                                <Route path='/charts/bar' component={Bar}/>
                                <Route path='/charts/line' component={Line}/>
                                <Route path='/charts/pie' component={Pie}/>
                                <Route  component={NonePage}/> 
                               
                            </Switch>

                        </div>
                    </Content>
                    {/* 底部展示区域 */}
                    <Footer style={{ textAlign: 'center' ,backgroundColor:'#ddd'}}>
                        <MyFooter/>
                    </Footer>
                </Layout>
            </Layout>
            
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {}
)(Admin)