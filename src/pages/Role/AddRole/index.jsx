import React, { Component } from 'react'
import {Modal,Form, Input,Select, message} from 'antd'
import {reqAddRole} from '../../../api'
const {Item} = Form;
const {Option} = Select
export default class AddRole extends Component {
    
    state = {
        visible:false,
        confirmLoading:false,
        modalText:'Content of the modal',
        optionsData : []
    }
    // 添加
    handleOk =async (e) => {
        const {roleName} = this.form.getFieldValue()
        if(roleName===undefined||roleName===''){
            console.log('输入框有空值')
            message.warning('内容不能为空')
            return
        }
        // console.log('roleName,',roleName)
        // 发送添加类名请求
        let result =await reqAddRole(roleName)
        if (result.status === 0) {
            message.success('添加成功')
            // 更新父类，重新获取用户列表
            this.props.getRoles();

        }else{
            message.error('添加失败')
        }
        // 关闭弹出框
        this.handleCancel()

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
        if (viewModleStaus===2) {
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
        const {visible,} = this.state
        const {} = this.props
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
                    initialValues={{  }}
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

                        <Input />
                    </Item>
                    
                </Form>
            </Modal>
        )
    }
}



  
