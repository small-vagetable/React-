import React, { Component } from 'react'
import {Modal,Form, Input,Select, message, Button} from 'antd'
import {reqAddOrUpdateUser} from '../../api'
const {Item} = Form;
const {Option} = Select
export default class AddUpdateModel extends Component {
    
    state = {
        visible:false,
        userdata :{},
        rolesArr : []
    }
    handleOk =async (e) => {
        let _id = this.state.userdata._id;
        // 获取数据
        let value = this.form.getFieldValue();

        value =_id? {...value,_id:this.props.userdata._id}:value
        // 更新或添加
        this.handleAddAndUpdateUser(value)
        // this.props.userdata._id?this.handleUpdateUser(value):this.handleAddUser(value)
        
        // 关闭弹出框
        this.handleCancel()

    };
    handleCancel = () => {
        // message.success('测试')
        this.props.changeModelStatus(0)
    };
    onFinish = (values) => {
        console.log('Success:', values);
    };
    onFinishFailed = (values) => {
        console.log('error:', values);
    }
    // 下拉框改变时
    // handleChange = (value)=>{
    //     console.log(`selected ${value}`);
    // }
    
    handleAddAndUpdateUser =async (data) => {
        let str = this.props.userdata._id?'更新':'添加'
        let result = await reqAddOrUpdateUser(data);
        if (result.status === 0) {
            message.success(str+'用户成功')
            // 重新获取列表
            this.props.getUserList();
        }else{
            message.error(result.msg)
        }
    }
    
    
    static getDerivedStateFromProps(props,state){
        // console.log(props,state)
        const {viewModleStaus,userdata,rolesData} = props
        // render之前 先获取 当前的category列表渲染到
        if (viewModleStaus===1) {
            return {
                visible:true,
                userdata,
            }
        }else{
            return {visible:false}
        }
    }
    
    componentDidMount(){
        // console.log('DidMount',this.form)
        // this.form&&this.form.setFieldsValue(()=>({ parentCaregory:parentId  }))
    }
    componentWillUnmount(){
        console.log('will mount')
    }
    
    
    render() {
        const {visible} = this.state
        const {parentId,rolesArr,userdata} = this.props
        const {email,password,phone,username,role_id,_id} = userdata;
        const initialValues = {
            username,
            email,
            password,
            phone,
            role_id
        }
        return (
            <Modal
                title={_id?'更新用户':'添加用户'}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                {/* 表单 */}
                <Form ref = {c=>this.form = c}  name="basic" labelCol={{ pan: 8, }}
                    wrapperCol={{ span: 16, }}
                    initialValues={initialValues}
                    onFinish={this.onFinish}
                    onFinishFailed = {this.onFinishFailed}
                    labelCol={{span:6}}
                    wrapperCol={{span:12}}
                    validateTrigger={['onBlur','']}
                >
                     <Item  label="用户名" name="username" placeholder='请输入用户名'
                        rules={[
                                {
                                    required: true,
                                    message: '用户名不能为空',
                                },
                                
                                {
                                    type:'string',
                                    min:5,
                                    message:'长度不能小于5'
                                },
                                {
                                    max:20,
                                    message:'长度不能大于20'
                                },
                                {
                                    pattern:/^[\w]+$/,
                                    message:'只能是字母、数字和下划线的组合'
                                }
                            ]}
                        >
                        <Input />
                    </Item>
                    {
                        _id?'':(
                            <Item  label="密码" name="password"  placeholder='请输入密码'
                                rules={[
                                        {
                                            required: true,
                                            message: '密码不能为空',
                                        },
                                        {
                                            min:6,
                                            message:'长度不能小于6'
                                        },
                                        {
                                            pattern:/^[\w]+$/,
                                            message:'只能是字母、数字和下划线的组合'
                                        }

                                    ]}
                                >
                                <Input type ='password' />
                            </Item>
                        )
                    }


                     <Item  label="手机号" name="phone" placeholder='请输入手机号'
                        rules={[
                                {
                                    required: true,
                                    message: '手机号不能为空',
                                },
                                {
                                    pattern:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                                    message:'请输入正确格式的手机号码'
                                }
                            ]}
                        >
                        <Input type='text' />
                    </Item>
                     <Item  label="邮箱" name="email" placeholder='请输入邮箱'
                        rules={[
                                {
                                    required: true,
                                    message: '邮箱不能为空',
                                },
                                {
                                    pattern:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                                    message:'请输入正确的邮箱格式'
                                }
                            ]}
                        >
                        <Input type = 'email'  />
                    </Item>
                


                    <Item label='权限角色' name='role_id'
                        rules={[
                            
                        ]}
                    >
                        <Select
                            showSearch
                            
                            placeholder="选择权限角色"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            
                            onSearch={this.onSearch}
                            value ={parentId}
                            // defaultValue= {parentId||''}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                // console.log(option)
                            }
                        >
                            
                            {rolesArr.map((data) => {
                                return (
                                    <Option  value={data._id} key = {data._id}>{data.name}</Option>
                                )
                            })}
                            
                        </Select>
                    </Item>
                    <Button ref={(e)=>this.submitBtnRef = e} type='primary' htmlType='submit'></Button>
                </Form>
            </Modal>
        )
    }
}



  
