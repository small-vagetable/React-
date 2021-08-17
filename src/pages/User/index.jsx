import React, { Component } from 'react'
import {Card,Button,Table,Space, message,Popconfirm} from 'antd'
import {reqGetAllUser,reqRemoveUser} from '../../api'
import AddUpdateModel from './AddOrUpdate'
export default class User extends Component {
    constructor(props){
        super(props);
        this.initNode();
        this.state = {
            dataSource:[],
            user:{},
            viewModelStatus:0,

            //0 弹出框关闭  1:弹出框展开
        }
    }
    

    initRoleNameObject = (roles) => {
        const obj =  roles.reduce((pre,current) => {
            pre[current._id] = current.name
            return pre;
        },{})
        this.roleName_Id = obj;

    }
    getUserList = async() => {
        const result =await reqGetAllUser();
        if (result.status === 0) {
            // 用户数据保存打state中
            this.rolesArr = result.data.roles;
            this.initRoleNameObject(result.data.roles);
            this.setState({dataSource:result.data.users});
        }else{
            message.error('获取用户数据失败')
        }
    }

    addModel = () => {
        this.userdata ={};
        this.setState({viewModelStatus:1})
    }
    changeModel = (data)=>{
        this.userdata =data;
        this.setState({viewModelStatus:1})
    }
    // 删除用户
    removeUser =async (_id) => {
        let result =  await reqRemoveUser(_id);
        if (result.status === 0) {
            message.success('删除成功')
        }else{
            message.error('删除失败')
        }
    }
    removeConfirm = (e) => {
        this.removeUser(e._id)
        // 重新渲染数据
        this.getUserList()
    }
    

    initNode = () => {
        this.title =( <Space>
            <Button type= 'primary' onClick = {()=>this.addModel()}>添加用户</Button>
            </Space>)
        this.columns = [
            {
              title: '用户名',
              dataIndex: 'username',
            },
            {
              title: '电话号码',
              dataIndex: 'phone'
            },
            {
              title: '创建时间',
              dataIndex: 'create_time',
              render:(text)=> text? (new Date(text).toLocaleString()):''
              
            },
            {
              title: '邮箱',
              dataIndex: 'email',
            },
            {
              title: '权限角色',
              dataIndex: 'role_id',
              render:text=>this.roleName_Id[text]//没有获取到roleName_Id 发送请求得到数据之前
            },
            {
                title: '操作',
                width:150,
                render: (text, record) => {
                    return (
                              <Space size="middle">
                              <Button type='link' onClick = {() => {this.changeModel(text)}} > 更改</Button>
                              
                              <Popconfirm
                                title="你确定要删除吗"
                                onConfirm={()=>this.removeConfirm(text)}
                                okText="是的，我确定"
                                cancelText="我再想想"
                                >
                                    <Button type='link' onClick = {()=>{}}>删除</Button>
                                </Popconfirm>
                              
                              
                              </Space>
                              )
                }
                ,
              },

        ];
        
    }

    
    changeModelStatus = (viewModelStatus) => {
        this.setState({viewModelStatus})
    }

    componentDidMount(){
        this.getUserList()
    }
    render() {
        
        const {dataSource,viewModelStatus} = this.state

        return (
            <Card title ={this.title}
            >
                <Table 
                    dataSource={dataSource} columns={this.columns} 
                    bordered = {true}
                    rowKey = '_id'
                    onRow={this.onRow}
                    pagination = {{defaultPageSize:5}}
                />
                {
                    viewModelStatus === 0?null:
                            <AddUpdateModel viewModleStaus ={viewModelStatus} 
                                changeModelStatus = {this.changeModelStatus} 
                                userdata = {this.userdata}  
                                rolesArr = {this.rolesArr}
                                getUserList = {this.getUserList}
                            />
                    

                }
            </Card>    
        )
    }
}
