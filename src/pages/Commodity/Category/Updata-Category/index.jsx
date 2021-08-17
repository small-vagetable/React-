import React, { Component } from 'react'
import {Modal,Form, Input,Select, message} from 'antd'
import {reqUpdataCotegory} from '../../../../api'
const {Item} = Form;
const {Option} = Select
export default class Updata_Category extends Component {
    state = {
        visible:false,
        confirmLoading:false,
        modalText:'Content of the modal',
    }
    handleOk = async(e) => {
        // this.setState({
        //     modalText:'The modal will be closed after two seconds',
        //     confirmLoading:true,
        // })
        // setTimeout(() => {
        //     this.setState({
        //         confirmLoading:false,
        //     })
        //     this.handleCancel()
           
        // }, 2000);
        // console.log(this.form)

        // 获取输入的数据
        // console.log(this.formRef.getFieldValue()) 
        const {caregoryName}= this.formRef.getFieldValue()
        const {_id,parentId} = this.props.updataObj

        if(caregoryName===undefined||caregoryName===''){
            message.warning('内容不能为空')
            return
        }

        // 发送更新类名请求
        let result =  await reqUpdataCotegory(_id,caregoryName);
        if (result.status===0) {
            message.success('更新成功')
        }
        //  重新渲染目录
        if (parentId === '0') {
            this.props.showCategory()
        }else{
            this.props.showSonCategory(parentId,caregoryName)
        }
        
        // 关闭弹出框
        this.handleCancel()

    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        // this.form.setFieldsValue('')
        this.props.changeModelStatus(0)
        console.log('form',this.formRef)
        
        // console.log(form.setFieldsValue('sssss'))
    };
    onFinish = (values) => {
        console.log('Success:', values);
    };
    
    static getDerivedStateFromProps(props,state){
        // console.log(props,state)
        const {viewModleStaus,updataObj} = props
        // render之前 先获取 当前的category列表渲染到
        if (viewModleStaus===1) {
            console.log('sssssss=====1')
            return {
                visible:true,
                updataObj
            }
        }else{
            return {visible:false}
        }
    }
    
   componentDidMount(){
       console.log('componentDId')
        // 动态更新输入框中 的数据
        const {updataObj} =this.props
    //    this.formRef&&this.formRef.setFieldsValue(()=>({ caregoryName: updataObj.name }))
   }
    
    render() {
       
        const {visible,confirmLoading} = this.state
        const {updataObj} = this.props
        return (
            <Modal
                title="Title"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
            >
                {/* 表单 */}
                <Form ref = {c=>{this.formRef = c}}  name="basic" labelCol={{ pan: 8, }}
                    wrapperCol={{ span: 16, }}
                    initialValues={{ remember: false,caregoryName: updataObj.name }}
                    onFinish={this.onFinish}
                    
                    >
                    <Item  label={updataObj.name} name="caregoryName" 
                        rules={[
                            {
                                required: true,
                                message: '请输入新的非空类名',
                            },
                        ]}
                    >
                        
                        <Input   />
                    </Item>
                </Form>
            </Modal>
        )
    }
}



  
