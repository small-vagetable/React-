import React, { Component } from 'react'
import {Card,Button,Table,Space} from 'antd'
import {reqRoles} from '../../api'
import AddRole from './AddRole'
import ConfigRole from './ConfigRole'
export default class Role extends Component {
    state = {
        dataSource:[],
        role:{},
        viewModelStatus:0//0 弹出框都关闭 1：设置角色权限 2：添加角色
    }

    getRoles = async() => {
        const result =await reqRoles();
        if (result.status === 0) {
            // 每次重新获取或是初始获取，都让role为空
            this.setState({dataSource:result.data,role:{}})
        }
    }

    onRow = record => {
        return {
          onClick: event => {
            //   console.log('onrow',record)
              this.setState({role:record})
          }, // 点击行
        };
      }
    initNode = () => {
        this.getRoles()
        
        this.columns = [
            {
              title: '角色名称',
              dataIndex: 'name',
            },
            {
              title: '创建时间',
              dataIndex: 'create_time',
              render:(text)=> new Date(text).toLocaleString()
            },
            {
              title: '授权时间',
              dataIndex: 'auth_time',
              render:(text)=> {
                  return text? (new Date(text).toLocaleString()):''
              }
            },
            {
              title: '授权人',
              dataIndex: 'auth_name',
            },
        ];
        
    }

    onChange = (selectedRowKeys, selectedRows) => {
        // console.log('onChange',selectedRowKeys,selectedRows)
    }

    changeModelStatus = (viewModelStatus) => {
        this.setState({viewModelStatus})
    }

    componentDidMount(){
        this.initNode()
        
    }
    render() {
        // console.log(this.state.role._id)
        const {dataSource,role,viewModelStatus} = this.state
        const title =( <Space>
            <Button type= 'primary' onClick = {()=>this.changeModelStatus(2)}>创建角色</Button>
            <Button type ='primary' onClick = {()=>this.changeModelStatus(1)} disabled ={!this.state.role._id}>设置角色权限</Button>
            </Space>)
        return (
            <Card title ={title}
            >
                <Table 
                    dataSource={dataSource} columns={this.columns} 
                    bordered = {true}
                    rowKey = '_id'
                    rowSelection = {{
                        type:'radio',
                        selectedRowKeys :[role._id],
                        onSelect:(record)=>{
                            // console.log('onselct',record)
                            this.setState({role:record})
                        },
                    }}
                    onRow={this.onRow}
                    pagination = {{defaultPageSize:5}}
                />
                {
                    viewModelStatus === 0?null:
                    viewModelStatus === 1?<ConfigRole viewModleStaus ={viewModelStatus} changeModelStatus = {this.changeModelStatus} role = {role} getRoles = {this.getRoles}/>:
                    viewModelStatus === 2?<AddRole viewModleStaus ={viewModelStatus} changeModelStatus = {this.changeModelStatus} getRoles = {this.getRoles} />:null

                }
            </Card>    
        )
    }
}
