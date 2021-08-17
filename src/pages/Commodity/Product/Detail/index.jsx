import React, { Component,Fragment } from 'react'
import { Card,Button,Divider, message,Image,PageHeader } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqGetGoryNameWithId } from '../../../../api'
export default class Detail extends Component {
    state = {
        categoryName:'',
    }

    getCategoryName =async () => {
        const {categoryId,pCategoryId} = this.props.location.state
        // 商品属于一级分类
        if(pCategoryId === '0'){
            const result = await reqGetGoryNameWithId(categoryId);
            if (result.status === 0) {
                this.setState({categoryName:result.data.name})
            } else{
                message.error('分类信息获取失败')
            }
        }else{
            // // 商品属于二级分类
            // const result1 = await reqGetGoryNameWithId(categoryId);
            // const result2 = await reqGetGoryNameWithId(pCategoryId);

            // 利用Promise.all实现发送多个请求
            const results =await Promise.all([reqGetGoryNameWithId(categoryId),reqGetGoryNameWithId(pCategoryId)]);
            console.log(results)

            if (results[0].status === 0&&results[1].status === 0) {
                this.setState({
                    categoryName:results[1].data.name+'-->'+results[0].data.name
                })
            } else{
                message.error('分类信息获取失败')
            }
        }
    }

    backHome = () => {
        const {pageNow,searchType,searchWord} = this.props.location.state
        this.props.history.replace('/commodity/product',{pageNow,searchType,searchWord})
    }
    componentDidMount(){
        // 发送获得商品分类的请求
        this.getCategoryName()
    }

    render() {
        const {desc,detail,imgs,name,price} = this.props.location.state
        this.title =(<Button type='primary'onClick ={this.backHome}  icon = {<ArrowLeftOutlined />}>返回</Button>)
        return (
            <Fragment>
                <Card title={this.title}  style={{ width: '100%' }}>
                    {/* <Divider orientation="商品名">Left Text</Divider> */}
                    <PageHeader
                            title="商品名"
                            subTitle={<span style = {{textAlign:'center',color:'#1DA57A'}}> {name}</span>}
                        />
                    

                    <Divider orientation="left"></Divider>
                        <PageHeader
                            title="商品描述"
                            subTitle={desc}
                        />

                    <Divider orientation="left"></Divider>
                    <PageHeader
                            title="商品详情"
                        />
                    <div dangerouslySetInnerHTML  = {{__html:detail}} style ={{padding:'0 25px'}}></div>
                    <Divider orientation="left"></Divider>
                    <PageHeader
                            title="图片"
                        />
                        <Image.PreviewGroup>
                            {imgs.map(imgstr=>(
                                 <Image key ={imgstr} width={200} src={'http://localhost:5000/upload/'+imgstr} />
                            ))}
                        </Image.PreviewGroup>
                        

                    <Divider orientation="left"></Divider>
                        <PageHeader
                            title="当前分类"
                            subTitle={this.state.categoryName}
                        />

                    <Divider orientation="left"> </Divider>
                    <PageHeader
                            title="价格"
                            subTitle={price}
                        />
                </Card>
            </Fragment>
        )
    }
}
