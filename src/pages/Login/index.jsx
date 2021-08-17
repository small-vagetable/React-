import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { Redirect } from 'react-router-dom'
import './login.css'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import { saveUser } from '../../utils/storageUtils'
export default class Login extends Component {

    onFinish =async (values) => {
        console.log('提交登录请求的ajax', values);
        const {username,password} = values;
        //普通then语法
        // reqLogin(username,password)
        //     .then(res=>console.log('success',res.data))
        //     .catch((err) => {
        //         console.log('失败',err)
        //     })
        
        //未优化错误处理时=，用try catch处理
        // try {
        //     const response = await reqLogin(username,password)
        //     console.log('请求成功了',response.data)
        // } catch (error) {
        //     console.log('请求失败了',error)
        // }

        // 优化错误处理后，不需要trycatch
        const result = await reqLogin(username,password)
        console.log('请求成功了',result)
        if (result.status ===0) {
            //登录成功
            message.success('登录成功')
            // console.log(this.props)
            
            // 添加用户信息到memoryUtils中
            const user = result.data;//获取用户信息
            memoryUtils.user = user;
            saveUser(user);
            console.log(memoryUtils.user)

            // 跳转到admin页面
            this.props.history.replace('/')

        }else{
            // 登录失败
            message.error(result.msg)
        }

    };

    onFinishFailed = (values) =>{
        console.log('阻止提交');
        message.warn('请按正确要求输入用户名和密码');
    }
    
    showInitUser = () => {
        message.success(`
        用户名:admin
        密码:admin
        `)
    }

    render() {
        // 判断用户是否登录，如登录则跳转到admin界面
        const user = memoryUtils.user
        if(user&&user._id){
            message.success('当前已登录')
            return <Redirect to='/`'/>
            
        }
        return (
            <div className = 'login-bg'>
                <header></header>
                <div className="login">
                    <div className="message">档案管理系统——DMS</div>
                    <div id="darkbannerwrap"></div>

                    <Form name="normal_login" className="login-form"
                        initialValues={{ remember: true, }}
                        onFinish={this.onFinish}
                        onFinishFailed = {this.onFinishFailed}
                        >
                            {/* 
                                用户名输入框 
                                ● 用户名长度5-12个字符；
                            　　● 只能是字母数字和下划线 
                            */}
                        <Form.Item name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                                {
                                    type:'string',
                                },
                                {
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
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>

                            {/* .
                                密码输入框
                                ● 密码长度8－32个字符；
                            　　● 不能使用空格、中文；
                            　　● 至少含数字、字母、符号两种组合；
                            　　● 至少含三个不同的字符
                             */}
                        <Form.Item
                            name="password"
                            rules={[
                                
                                {
                                    required: true,
                                    message: '不能位空',
                                },
                                
                                {
                                    type:'string',
                                   
                                },
                                // {
                                //     pattern:/((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{5,16}$/g,
                                //     message:'密码必须由5-16位至少为字母、数字、符号两种组成，不包含空格,不能输入中文'
                                // }
                                {
                                    pattern:/\w{5,16}$/g,
                                    message:'密码必须由5-16位至少为字母、数字、符号两种组成，不包含空格,不能输入中文'
                                }
                            

                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                            
                        </Form.Item>
                        {/* 
                            是否记住我
                        */}
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Button onClick = {this.showInitUser} type="link">Forgot password</Button>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                            Or <a href="/register">现在注册!</a>
                        </Form.Item>
                        </Form>
                    
                </div>
                
            </div>
        )
    }
}
