import React, { Component } from 'react'
import {Badge,Avatar,Tabs,Modal,Button} from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import {deleteUser,saveTagstoStorage,getActiveTagKey,getTagsArr} from '../../utils/storageUtils'
import {Link,withRouter} from 'react-router-dom'
import { UserOutlined,CloseCircleOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import PubSub from 'pubsub-js'
import './index.css'
import { reqGetWeather } from '../../api'
// 退出提示框
const { confirm } = Modal;



// 天气

const {TabPane } = Tabs
 class MyHeader extends Component {
    newTabIndex = 0;
    constructor(props){
        super(props)
        // 初始化tabs数据
        // 一开始加载的时候是只有home ，但是若打开过多个，再点击刷新，那么应该是存储在本地的
        let initialPanes = [];
        let activeKey = '';
        if (getTagsArr().length>0) {
            // 本地存储tags数据
            initialPanes = getTagsArr();
            activeKey = getActiveTagKey();
        }else{
            // 没有标签 处于none的状态
            // console.log('刷新后的状态',this.props.location)
            this.props.history.push('/home')
            initialPanes = [
                {   
                    title: '首页',    
                    key: '/home' 
                },
            ];
            activeKey = '/home';
            
        }

        this.state = {
            activeKey,
            panes: initialPanes,
            weather:{},
            time:''
        };
    }
    

    // 改变tags的active时
    onChange = activeKey => {
        saveTagstoStorage(activeKey,this.state.panes)
        this.setState({ activeKey });
    };
    
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    
    add = (paneObj) => {
        const { panes } = this.state;
        const activeKey = paneObj.key;
        const newPanes = [...panes];
        console.log(paneObj,)
        //判断新添加的pane是否已经存在，若存在 则不添加，但是activeKye要变成它
        function getKey(pane){
            return pane.key === paneObj.key
        }
        if(!newPanes.find(getKey)){
            //没有找到相关pane
            newPanes.push(paneObj);//添加打开的标签
        }
        //将新的tags数组保存到localstorage中
        saveTagstoStorage(activeKey,newPanes)
        // 更新状态
        this.setState({
            panes: newPanes,
            activeKey,
        });
    };
    
    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
            lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
                // 不是第一个，删除后，active往前进一
            } else {
                // 是第一个，往后退一
                newActiveKey = newPanes[0].key;
            }
            // 删除了当前页面标签，activeKey改为了新的，跳转到新的页面标签
            this.props.history.replace(newActiveKey)

        }else if(newPanes.length === 0){
            // 已经没有标签了
            console.log('meiyou biaoqianl')
            newActiveKey = '';
            this.props.history.replace('/none')
            
        }
        //将新的tags数组保存到localstorage中
        saveTagstoStorage(newActiveKey,newPanes)
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    };

    
// 退出登录
    logOut = () => {
        confirm({
            title: '您确定要退出吗?',
            icon: <ExclamationCircleOutlined />,
            onOk:()=> {
            //   确认退出

            // 清除内容中的用户信息
            memoryUtils.user ={}
            // 清除localstore中的用户信息
            deleteUser()
            // 跳转到Login界面
                this.props.history.replace('/login')
            },
        });
    }


     // 生命周期
    componentDidMount(){
        // 订阅sider发布的菜单消息
        PubSub.subscribe('addTags',(msg,data) => {
            // console.log('接收到来自sider的数据')
            // console.log(data)
            this.add(data)  //{key:'/home',title:'首页'}
        })
        // 获取天气
        let weather = {}
        let getWeather = async ()=>{
            weather = await reqGetWeather({
                key:'5054ae320e60bfdf4c03a21cb2efec52',
                city:'110101',
                extensions:'all',
                output:'json'
            })
            this.setState({weather})
            // console.log('异步函数调用了')
        }
        getWeather()

        // 设置定时器
        this.timer = setInterval(() => {
            let time = new Date().toLocaleTimeString();
            this.setState({time})
        }, 1000);
    }
   
    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render () {
        
        // 获取当前页与
        const { panes, activeKey,weather,time } = this.state;
        let  dayWeather ='未知'
        if (weather.forecasts) {
            dayWeather= weather.forecasts[0].casts[0].dayweather
        }
        // console.log(this.props)
        
        return (
            <div className = 'admin-header'>
                {/* 头部上部分 */}
                <div className="header-top">
                   
                     {/* 头像 */}
                     <span className="avatar-item">
                        <Badge size='small' count={99}>
                            <Avatar  shape="square" icon={<UserOutlined />} />
                        </Badge>
                    </span>
                    
                    {/* 用户名 */}
                    <span className='header-username'>{memoryUtils.user.username}</span>
                    {/* out */}
                    <span className = 'quite-login'>
                        <Button type="link" onClick = {this.logOut}>退出</Button>
                    </span>
                
                </div>
                {/* 头部下部分 */}
                <div className="header-bottom">
                    {/* tabs 展示打开过的标签页 */}
                    <div className="header-bottom-left">
                        <Tabs  hideAdd type="editable-card" size='small'
                            onChange={this.onChange}
                            activeKey={activeKey}
                            onEdit={this.onEdit}
                            
                        >
                            {panes.map(pane => (
                                    <TabPane  tab={
                                        // pane.title
                                        <Link to={pane.key}>{pane.title}</Link>
                                    } key={pane.key} closable={pane.closable} closeIcon ={<CloseCircleOutlined /> } />    
                            ))}
                        </Tabs>
                    </div>
                                {/*时间与天气 */}
                    <div className="header-bottom-right">
                        <div className = 'timeText'>
                            {new Date().toLocaleDateString()}
                            <br/>
                            {time}
                        </div>
                        <span className='wether'></span>
                        {dayWeather}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MyHeader);