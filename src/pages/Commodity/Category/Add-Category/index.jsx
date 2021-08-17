import React, { Component } from 'react'
import {Modal,Form, Input,Select, message} from 'antd'
import {reqAddCotegory} from '../../../../api'
const {Item} = Form;
const {Option} = Select
export default class Add_Category extends Component {
    
    state = {
        visible:false,
        confirmLoading:false,
        modalText:'Content of the modal',
        optionsData : []
    }
    handleOk =async (e) => {
        
        // 获取输入的数据
        // console.log(this.form.getFieldValue()) 
        //          添加的类名  添加所在的父类
        const {caregoryName,parentCaregory} = this.form.getFieldValue()
        if(caregoryName===undefined||caregoryName===''){
            console.log('输入框有空值')
            message.warning('内容不能为空')
            return
        }
        console.log('caregoryName,parentCaregory',caregoryName,parentCaregory)
        // 发送添加类名请求
        let result =await reqAddCotegory(parentCaregory,caregoryName)
        if (result.status === 0) {
            message.success('添加成功')
        }else{
            message.error('添加失败')
        }
        //更新目录 
        // 如果当前展示的列表与更新要添加的列表无关，那不需要任何操作
        const {parentId} = this.props//当前展示的父类id
        // 当前展示的父类id 和要添加到的父类id想通过，那么更新本页
        if(parentId === parentCaregory){
            if(parentCaregory ==='0'){
                this.props.showCategory()
            }else{
                const title = this.props.title
                this.props.showSonCategory(parentCaregory,title)
            }
        }else{
            // 添加的类名与当前页无关  什么都不做
        }
        
        
        // 关闭弹出框
        this.handleCancel()

    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.props.changeModelStatus(0)
    };
    onFinish = (values) => {
        console.log('Success:', values);
    };
    // 下拉框改变时
    // handleChange = (value)=>{
    //     console.log(`selected ${value}`);
    // }
    onSearch = (val) =>{
        console.log('search:', val);
    }
    onFocus=()=> {
        console.log('focus');
    }
    onBlur=()=> {
        console.log('blur');
    }
    onChange=(value)=> {
        console.log(`selected ${value}`);
    }
    
    static getDerivedStateFromProps(props,state){
        // console.log(props,state)
        const {viewModleStaus,CateDataArr} = props
        // render之前 先获取 当前的category列表渲染到
        if (viewModleStaus===2) {
            console.log('sssssss=====2')
            return {
                visible:true,
                optionsData:CateDataArr
            }
        }else{
            return {visible:false}
        }
    }
    
    componentDidMount(){
        // console.log('DidMount',this.form)
        const {parentId} = this.state
        this.form&&this.form.setFieldsValue(()=>({ parentCaregory:parentId  }))
    }
    componentWillUnmount(){
        console.log('will mount')
    }
    
    
    render() {
        const {visible,confirmLoading,optionsData} = this.state
        const {parentId} = this.props
        return (
            <Modal
                title="Title"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
            >
                {/* 表单 */}
                <Form ref = {c=>this.form = c}  name="basic" labelCol={{ pan: 8, }}
                    wrapperCol={{ span: 16, }}
                    initialValues={{ parentCaregory:parentId  }}
                    onFinish={this.onFinish}
                    >
                    <Item label='父级' name='parentCaregory'>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onSearch={this.onSearch}
                            value ={parentId}
                            // defaultValue= {parentId||''}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                // console.log(option)
                            }
                        >
                            <Option value="0">一级目录</Option>
                            {optionsData.map((data) => {
                                return (
                                    <Option  value={data._id} key = {data._id}>{data.name}</Option>
                                )
                            })}
                        </Select>
                    </Item>
                    
                    <Item  label="请输入类名" name="caregoryName" 
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



  
