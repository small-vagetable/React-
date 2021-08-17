import React, { Component,Fragment } from 'react'
import {Menu} from 'antd'
import {Link,withRouter} from 'react-router-dom'
import PubSub from 'pubsub-js'
// import {FlagFilled, UserOutlined} from '@ant-design/icons';
import bgimg from '../../assets/images/glBg.jpg'
import './index.css'
// 导入Menu配置文件
import menuConfig from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
// 引入多级菜单
const { SubMenu } = Menu;
class LeftNav extends Component {
    
    // 检查当前用户的menu
    checkUserMenu = (item,user) => {
        // 一级判断
        if(user.username ==='admin'||item.isPublic||user.role.menus.indexOf(item.key)>=0){
            return true;
        }else if(item.children){
            return item.children.some((child)=>user.role.menus.indexOf(child.key)>=0)
        }
    }
    // subMenu展开或关闭的回调
    subMenuOpenChenge = (e) => {
        // 获取到当前有哪些sub属于打开中的，  返回值是数组
        this.saveOpenKeysInStore(e)
    }
    // 是否显示logo后面的文字
    showBgText = (Flag) =>{
        if(Flag){
            console.log(this.shpantextNode)
        }
    }
    // link点击事件
    linkClickHandle = (e) => {
        let key = e.target.pathname
        let title =e.target.textContent;
        const tagsData = {
            title,key
        }
        PubSub.publish('addTags',tagsData)
    }
    //获取目录列表的Node
    getMenuList = (menuConfig) => {
        const {user} = memoryUtils;
          return  menuConfig.map((item) => {

              let hasMenu = this.checkUserMenu(item,user)

            if(hasMenu){
                
                if(!item.children){
                    // 没有二级菜单
                    return (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.key} onClick = {this.linkClickHandle}>
                                {item.title}
                            </Link>
                            
                        </Menu.Item>
                    )
                }else{
                    return(
                        <SubMenu onTitleClick = {this.SubMenuClickHandle} key={item.key} icon={item.icon} title={item.title}>
                            {this.getMenuList(item.children)}
                        </SubMenu>
                    )
                    }
                
                }
          })

    }

    //
    SubMenuClickHandle = (e) => {
        console.log('subMenCLikhandle',e)
    }

    // 将打开过的多级菜单数组 保存到localstorage中
    saveOpenKeysInStore = (arr) => {
        localStorage.setItem('subMenu_OpenKeys',JSON.stringify(arr))
    }
    // 得到本地存储的多级菜单记忆
    getOpenKeysInStore = () => {
        let memoreOpenKeys =JSON.parse( localStorage.getItem('subMenu_OpenKeys'));
        return memoreOpenKeys||[];  
    }
    // 左边导航的选中栏
    setlectKeysPathname = ()=>{
        // 接受到路由中中的location中的pathname，也就是要去到的url  比如/home   //commodity/product/detail等
        let  {pathname} = this.props.location;
        if(pathname === '/none'){
            console.log('leftLev none')
        }
        // 又可能处于某一导航下的子路由，且这个子路由并没有出现在Menu的所有key中
       let pathArr = pathname.split('/');
       for(let i = pathArr.length+1;i>0;i--){
           pathArr.length = i-1;
           let findKeys = pathArr.join('/');
           let result = this.findMenuKeys(findKeys,menuConfig)
           if(result)return result.key
       }
    }
    // 通过key查找在目录中是否存在这个key，若存在，返回这个对象，不存在，返回null
        // 用于做导航的选中状态
    findMenuKeys = (key,menu)=>{
        console.log(key)
        let result = null;
        for (const obj of menu) {
            if(obj.key === key){
                result = obj;
                return result;
            }
            if(obj.children){
                result = this.findMenuKeys(key,obj.children)
                if(result) return result;
            }
        }
        return null;
    }
    render() {
        const {collapeseType} = this.props;
        // console.log('left nav props',this.props)
        const openKeys = this.getOpenKeysInStore()
        return (
            <Fragment>
                <div className="admin-logo" >
                    <img src={bgimg} alt="logo" />
                    <span className={collapeseType?'':'active'} >谷粒后台</span>
                </div>
                <Menu onOpenChange = {this.subMenuOpenChenge} theme="dark" mode="inline" selectedKeys={[this.setlectKeysPathname()]} defaultOpenKeys= {openKeys}>
                    {this.getMenuList(menuConfig)}
                </Menu>
            </Fragment>
        )
    }
}
export default withRouter(LeftNav ) 
