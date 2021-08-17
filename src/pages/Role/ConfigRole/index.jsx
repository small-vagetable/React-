/**
 * 角色管理 ----- 角色配置目录
 */
import React, { Component } from 'react'
import {Modal,Form, Input, message,Tree} from 'antd'
import {reqUpdateRole} from '../../../api'
import {withRouter} from 'react-router-dom'
import menuConfig from '../../../config/menuConfig'
import memoryUtils from '../../../utils/memoryUtils'
import {deleteUser} from '../../../utils/storageUtils'
const {Item} = Form;

const treeData = menuConfig
 class ConfigRole extends Component {
    constructor(props){
        // console.log(memoryUtils.user)
        super(props)
        let {menus} = this.props.role
        // console.log(menus)
        this.state = {
            visible:false,
            menus,
            user:memoryUtils.user
        }
    }
    

    onSelect = (selectedKeys, info) => {
        // console.log('selected', selectedKeys, info);
    };
    
    onCheck = (checkedKeys, info) => {
        // console.log('onCheck', checkedKeys, info);
        this.setState({menus:checkedKeys});
    };


    // 修改权限
    handleOk =async (e) => {
        const {_id} = this.props.role;
        const {menus} = this.state;
        const {username} = memoryUtils.user
        let auth_time = new Date();
        // 发送添加类名请求
        let result =await reqUpdateRole({_id,menus,auth_name:username,auth_time})
        if (result.status === 0) {
            
            
            // 关闭弹出框
            this.handleCancel()
            if(memoryUtils.user.role._id !== _id){
                // 更新父组件状态
                message.success('配置成功')
                this.props.getRoles();
                // return;
            }else{
                 // 退出登录
                 message.warning('当前用户的角色权限已更改！请重新登录')
                 // 清除内容中的用户信息
                 memoryUtils.user ={}
                 // 清除localstore中的用户信息
                 deleteUser()
                 // 跳转到Login界面
                 this.props.history.replace('/login')
            }
            
            
            
        }else{
            message.error(result.msg)
        }
        

    };
    // 关闭弹出框
    handleCancel = () => {
        // console.log('Clicked cancel button');
        this.props.changeModelStatus(0)
    };
    
   
    
    static getDerivedStateFromProps(props,state){
        // console.log(props,state)
        const {viewModleStaus} = props
        // render之前 先获取 当前的category列表渲染到
        if (viewModleStaus===1) {
            return {
                visible:true,
            }
        }else{
            return {visible:false}
        }
    }
    
    componentDidMount(){
    }
    
    
    
    render() {
        const {visible,menus} = this.state
        const {role} = this.props
        return (
            <Modal
                title="Title"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                {/* 表单 */}
                <Form ref = {c=>this.form = c}  name="basic" labelCol={{ pan: 8, }}
                    wrapperCol={{ span: 16, }}
                    initialValues={{ roleName: role.name}}
                    onFinish={this.onFinish}
                    >
                    
                    <Item  label="角色名" name="roleName" 
                        rules={[
                            {
                                required: true,
                                message: '类名不能为空',
                            },
                        ]}
                    >
                        <Input disabled={true}/>
                    </Item>

                    <Tree
                        checkable
                        // defaultExpandedKeys={['0-0-0', '0-0-1']} //默认展开指定的树节点
                        // defaultSelectedKeys={['0-0-0', '0-0-1']} //默认选中的树节点
                        defaultCheckedKeys={menus} //默认选中复选框的树节点
                        onSelect={this.onSelect}
                        onCheck={this.onCheck}
                        treeData={treeData}
                    />
                    
                </Form>
            
            </Modal>
        )
    }
}

export default withRouter(ConfigRole)


  
