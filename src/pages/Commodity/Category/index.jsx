import React, { Component } from 'react'
import {Card,Table, Space,message,Button} from 'antd'
import {ArrowRightOutlined,PlusOutlined} from '@ant-design/icons'
import {reqGetCotegory} from '../../../api'
import Add_Category from './Add-Category'
import Updata_Category from './Updata-Category'
export default class Category extends Component {

    state = {
        CateDataArr : [],
        loading:true,
        scendCateDataArr:[],
        parentId:'0',
        title:'',
        result:[],
        viewModleStaus:0,//0：两个谈话框都关闭，1：更新弹出, 2：add弹出，
        updataObj:{}
    }

    // 获取数据
    getAllCategory = async (parentId,callback)=>{
        // 开始获取必定要更改loading的属性
        this.setState({loading:true})
        //获取一级目录
        const result = await reqGetCotegory(parentId);
        if (result && result.status===0) {
            this.setState({
                result:result.data,
            },callback)
        }else{
            console.log(result)
            message.error('获取数据出错')
        }
    }
    // 展示二级类名
    showSonCategory = (_id,name)=>{
        this.getAllCategory(_id,()=>{
            const {scendCateDataArr,result} = this.state
            // 保存到category中
            const newSonCategory =[...result];
            this.setState({
                scendCateDataArr:newSonCategory,
                loading:false,
                parentId:_id,//
                title:name,
            },()=>{
                // console.log(this.state)
            })
            
        });
        
    }
    // 展示一级类名
    showCategory = ()=>{
        this.getAllCategory('0',()=>{
            let {result,title} = this.state
            console.log(result)
            // 保存到category中
            const newCategory =[...result];
            this.setState({
                CateDataArr:newCategory,
                loading:false,
                parentId:'0'
                // parentId默认是0
            },(params) => {
                // console.log(this.state.CateDataArr)
            })
        });//result 
        
    }

    //   改变类名
    changeCategoryName = (_id,name,parentId)=>{
        
        // 弹出输入框
        // 获取内容
        // 发送更改请求
        this.changeModelStatus(1)
        this.setState({updataObj:{_id,name,parentId}})
    }

    // 改变Model状态
    changeModelStatus = (status) => {
        this.setState({
            viewModleStaus:status
        })
    }
    
    
    // 添加数据
    addCategory =async (params) => {
        // let result = await reqAddCotegory()
        this.changeModelStatus(2);
    }

    componentDidMount(){
        // send  req for get data
        this.showCategory();

        // 初始化列,并把它挂在class上
        this.columns =[
            {
              title: '类名',
              dataIndex: 'name',
              key: 'name',
              
            },
            {
              title: '操作',
              key: 'action',
              width:300,
              render: (text, record) => {
                  const {_id,name,parentId} =text
                  return (
                            <Space size="middle">
                            {this.state.parentId==='0'?<Button type='link' onClick = {()=>this.showSonCategory(_id,name)}>查看子类</Button>:''}
                            <Button type='link' onClick = {()=>this.changeCategoryName(_id,name,parentId)} > 更改类名</Button>
                            </Space>
                            )
              }
              ,
            },
          ];
    }
    render() {
        const {CateDataArr,loading,title,parentId,scendCateDataArr,viewModleStaus,updataObj} = this.state
        console.log('gengxin',viewModleStaus)
        return (
            <div>
                <Card title={parentId ==='0'?'一级类名':<Space size="middle"> <Button type='link' onClick = {this.showCategory}>一级类名</Button> <ArrowRightOutlined /> {title} </Space>} 
                extra={<Button type="primary" shape="round" size='large' icon ={<PlusOutlined />} onClick = {this.addCategory}/>} >
                    <Table columns={this.columns} dataSource={parentId==='0'?CateDataArr:scendCateDataArr} 
                         bordered={true} size = 'small' 
                         loading ={loading}
                         pagination = {{ position: ['bottomCenter '],showQuickJumper:true }}
                         rowKey = {record => record._id}
                         
                    />
                    {
                        viewModleStaus ===0?null:
                        viewModleStaus ===1?<Updata_Category showSonCategory = {this.showSonCategory} showCategory = {this.showCategory} updataObj = {updataObj}  changeModelStatus ={this.changeModelStatus} viewModleStaus = {viewModleStaus}  />:
                        viewModleStaus ===2?<Add_Category {...this.state}  showCategory={this.showCategory} showSonCategory = {this.showSonCategory}  changeModelStatus ={this.changeModelStatus}  />:null
                    }
                
                
                
                </Card>
            </div>
        )
    }
}
