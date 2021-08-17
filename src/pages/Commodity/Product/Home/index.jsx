import React, { Component } from 'react'

import {Card,Table,Button,Select,Form,Space,Input, message,} from 'antd'
import {InfoCircleOutlined,ToolOutlined,PlusSquareOutlined,SearchOutlined} from '@ant-design/icons'
import {reqGetProduct,reqGetProductForSearch,reqUpdateProductStatus} from '../../../../api'
import { PAGE_SIZE } from '../../../../utils/constances'
const {Option} = Select
export default class Home extends Component {
    constructor(props){
        super(props)
        // 组件不是从详情页过来的
        if (this.props.location.state=== undefined) {
            this.pageNow = 1;
            this.state = {
                dataSource:[],
                total:0,
                pageNum:1,
                loading:false,
                searchType:'productName',
                searchWord:''
            }
            console.log('这是第一次')
        }else{
            const {pageNow,searchType,searchWord} = this.props.location.state
            this.pageNow = pageNow;
            this.state = {
                dataSource:[],
                total:0,
                pageNum:pageNow,
                loading:false,
                searchType,
                searchWord,
            }
            console.log('这是返回来的 ',this.pageNow)
        }

        this.initDataNode();
    }
    
    // 点击搜索
    onFinish = (value) => {
        console.log('submit',value)
        this.setState({
            searchType:value.selectValue,
            searchWord:value.keyword
        },()=>{
            this.getProductForPage(1)
        })
        
    }

    // 更新上下架状态
    updateProductStatus=async (_id,status) => {
        const newStatus = status === 1?2:1;
        const result= await reqUpdateProductStatus(_id,newStatus);
        if (result.status === 0) {
            message.success(newStatus === 1?'已上架':'已下架');
            // 更新当前页
            this.getProductForPage(this.pageNow)

        }else{
            message.error('操作失败，请重试')
        }
    }

    //跳转到详情页
    gotoDetail = (context)=>{
        const {searchType,searchWord} = this.state;
        const pageNow = this.pageNow
        this.props.history.replace('/commodity/product/detail',{...context,pageNow,searchType,searchWord})
    }

    // 当文本框为空时
    searchNoneWord = (e) => {
        let value = e.target.value
        // 输入框为空时 修改state中的searchWord调用搜索 ,
        if(value !=='') return;
        // 为空
        this.pageNow=1
        this.setState({
            searchWord:'',
            pageNum:1
        },()=>{
            
            this.getProductForPage(1)
        })
        

    }
    // 初始化node数据
    initDataNode = ()=>{
        const {searchType,searchWord} = this.state
        // 初始化数据
        this.columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'price',
              render:(text)=>{
                return '￥'+text
              }
            },
            {
              title: '状态',
              dataIndex: 'status',
              render:(status,context)=>{
                  return  (
                      <Space>
                        <span style={{color:status===1?'#1DA57A':'#ef9f2e'}}>
                                {status === 1?'在售':'已下架'} 
                        </span>
                        <Button danger={status===1} onClick ={()=>this.updateProductStatus(context._id,status)} type='primary'>
                            {status === 1?'下架':'上架'}
                        </Button>
                      </Space>
                     
                  
                        )
                }
            },
            {
              title: '操作',
              render:(text,context) =>
              {
                return (
                    <Space size="middle">
                      <Button type='primary' 
                      onClick = {()=>{this.gotoDetail(context)}} 
                      icon={<InfoCircleOutlined />}
                    >
                          详情
                     </Button>
                      <Button type='primary' onClick = {()=> this.props.history.push('/commodity/product/addupdate',context)} icon ={<ToolOutlined />}>修改</Button>
                    </Space>
                  )
              } 
            },
          ];

        // 搜索框
          this.titleNode = (
              <Form name="customized_form_controls" layout="inline"
                    onFinish={this.onFinish}
                    initialValues = {{selectValue:searchType,keyword:searchWord}}
              >
                  {/* 下拉框 */}
                  <Form.Item name="selectValue" >
                        <Select  style={{ width: 150, }} onChange={this.handleChange}>
                            <Option value="productName">按名称搜索</Option>
                            <Option value="productDesc">按描述搜索</Option>
                        </Select>
                  </Form.Item>

                    {/*  搜索框 */}
                   <Form.Item name='keyword' >
                        <Input placeholder="关键字"prefix = {<SearchOutlined style={{ fontSize: '20px', color: '#1DA57A' }} />} onChange = {this.searchNoneWord}
                                style = {{}} 
                        />
                   </Form.Item>

                  <Form.Item  >
                        <Button type="primary"  htmlType="submit" >搜索</Button>
                  </Form.Item>
                  
              </Form>
          )
        // 添加按钮
        this.extraNode =(
            <Button type="primary" onClick = {()=>{this.props.history.push('/commodity/product/addupdate')}} icon={<PlusSquareOutlined  style ={{fontSize : '18px'}}/>} size='large'>
                添加
            </Button>
        )
    }

    // 翻页
    getProductForPage =async (pageNum) => {
        // 更改loading为true
        this.setState({
            loading:true
        })

        // 发送请求   =>请求有两个，一个时获取所有，一个时获取搜索的数据
            // 因为翻页功能绑定的是一个函数，那么这个函数就得包含多种情况
        const {searchType,searchWord} = this.state;
        let result =null;
        // 是属于获取全部类
        if (searchWord ==='') {
            console.log('输入框为空')
            result =await reqGetProduct(pageNum,PAGE_SIZE);
        }else{
            console.log('输入框不为空')
            result =await reqGetProductForSearch(pageNum,PAGE_SIZE,searchType,searchWord)
        }
        
        if (result.status===0) {
            // 更新数据
            this.setState({
                loading:false,
                dataSource :result.data.list,
                pageNum,
                total:result.data.total,
                
            })
            // 当前页添加到this中
            this.pageNow = pageNum;
        }else{
            message.error('获取数据失败')
        }
    } 

    handleChange = ()=>{

    }
   
    componentDidMount(){
        // 一开始打开时this。pageNow为1，若为从详情页跳转过来则回到原来页面

        this.getProductForPage(this.pageNow)
    }
    render() {
        console.log('render this.pageNow',this.pageNow)

        const {dataSource,total,loading,pageNum} = this.state
        return (
            <Card title={this.titleNode} extra={this.extraNode} style={{ width: '100%' }}>

               <Table dataSource={dataSource} 
                        columns={this.columns} 
                        rowKey = '_id'
                        loading={loading}
                        pagination = {{
                            pageSize:PAGE_SIZE,
                            total:total,
                            onChange:this.getProductForPage,
                            current:pageNum

                        }}
               />;
            </Card>
        )
    }
}
