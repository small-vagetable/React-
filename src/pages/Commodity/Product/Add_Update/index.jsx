import React, { Component } from 'react'
import {Card,Form,Input,Button,Space,Cascader, message } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import PictureWall from './picture-wall'
import EditorConvertToHTML from './RichTextEditor'
import {reqGetCotegory,reqAddOrUpdateProduct} from '../../../../api'
const {Item} = Form ;
const { TextArea } = Input;//文本域

export default class Add_Uptate extends Component {
    constructor(props){
        super(props);
        this.isUpdate = !!this.props.location.state;
        // 更新时
        if (this.isUpdate) {
            this.updateValue = this.props.location.state;//更新时一定有值
            this.initUpdate();
        }

        // ref
        this.EditorRef = React.createRef();
        
    }

    state = {
        options:[],//分类,
        imgs:[],
    }

    // 表单提交成功
    onFinish =async (values) => {
        const {name,desc,price,category} = values;
        // 分类

        const pCategoryId = category.length>1?category[0]:'0'
        const categoryId = category.length>1?category[1]:category[0]
        //图片
        const {imgs} = this.state;
        // 描述
        let detail =this.EditorRef.current.getDetail()
        // 获取数据
        const data = {
            name,desc,price,pCategoryId,categoryId,
            imgs ,
            detail,
        }
        
        // 是否属于更新
        if(this.isUpdate){
            data._id = this.props.location.state._id;
        }

        // 发送更新/添加请求
        const result = await reqAddOrUpdateProduct(data);
        if (result.status === 0) {
            message.success(this.isUpdate?'更新成功':'添加成功')
        }else{
            message.error('操作失败')
        }

    };
    // 表单提交失败
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
         // 图片数据的更新呢  => 通过this.state.imgs获取
         console.log(this.state.imgs)
         //描述数据
         console.log('detail',this.EditorRef.current.getDetail()) 

    };

    // 获取子组件的imgs数据
    getImgDataToForm = (imgs)=>{
        this.setState({imgs})
    }
    // 文本框的改变
    TextAreaonChange = (e) => {
        console.log('Change:', e.target.value);
    }
    // ====================================================价格====================
    // 价格的验证 大于0
    checkPrice = (_,value) => {
        console.log(Number(value))
        if (Number(value) > 0) {
            return Promise.resolve();
        }
    
        return Promise.reject(new Error('价格必须大于0'));
    }
    // 
    selectOnChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };

    // ====================================================分类====================

    // 初始化options   更改state中的options
    initOptions =async optionsData=>{
        // optionsData是拥有多个属性的对象数组
        const options = optionsData.map((categgory) => {
            const {_id,name} = categgory
            return {value:_id,label:name,isLeaf:false}
        })
         this.setState({options})

        if (this.isUpdate) {
            const {pCategoryId} = this.props.location.state;
            // 一级更新
            if(pCategoryId === '0') return;
            // 二级更新
            const subCategoryData =await this.getCotegorys(pCategoryId);

            let selectOptions =  options.find(obj=>obj.value === pCategoryId);
            const childrenData = subCategoryData.map((categgory) => {
                const {_id,name} = categgory
                return {value:_id,label:name,isLeaf:true}
            })
            // 设置选中option的子级
            selectOptions.children = childrenData
            // 更新options
            this.setState({options:[...options]})

        }
        
       
    }

    // 发送获取分类请求  根据父类id
    getCotegorys =async (parent_id)=>{
        const result = await reqGetCotegory(parent_id);

        // 是否请求成功
        if(result&&result.status === 0){//成功 
            // 发送的是请求一级还是二级
            if(parent_id === '0'){//一级
                this.initOptions(result.data)
            }else{
                // 二级 返回subCategory
                return result.data
            }

        }
    }
    
    // 加载父类拥有的子类
    loadData =async selectedOptions => {
        // 获取当前父类数据
        const {options} =this.state
        // console.log('selectedOptions,',selectedOptions)
        const targetOption = selectedOptions[selectedOptions.length - 1];// 选中的option 拥有childer， isLeaf,lableloading,value
        // 正在加载
        targetOption.loading = true;
        // 发送请求获取subCategory数据 
        const subCategoryData = await this.getCotegorys(targetOption.value)  //因为getCotegorys是一个async函数，它的返回值是一个promise
        // 如果没有子类
        if(subCategoryData.length === 0){
            targetOption.isLeaf = true
        }
        // 处理数据
        const childrenData = subCategoryData.map((categgory) => {
            const {_id,name} = categgory
            return {value:_id,label:name,isLeaf:true}
        })
        // 加载完成
        targetOption.loading = false;
        
        // 设置选中option的子级
        targetOption.children = childrenData
        // 更新options
        this.setState({options:[...options]})
    };
    

    // 初始化更新的数据 
    initUpdate = () => {
         const {name,desc,price,detail,pCategoryId,categoryId,imgs} =this.props.location.state

        //  不同分类级别的商品
        let categgory = pCategoryId === '0'?[categoryId]:[pCategoryId,categoryId]
        /**
         * 可以先把值设置好，之后再去获取数据让select框去选中，没必要先让数据出来之后再去设置值
         */
        // 二级商品得提前获取当前父类的全部子类
        this.initiaValues ={
            name:name,
            desc:desc,
            price:price,
            category:categgory,//根据多种情况决定不同数组
            detail:detail,
            imgs,
        }
    }

    componentDidMount(){
        // 获取一级分类
        this.getCotegorys('0')
        // 
        // console.log(this.EditorRef.current)

    }

    render() {

        const formItemLayout = {
            labelCol: { //左侧文字包裹的宽度
              xs: { span: 24, },
              sm: { span: 4, },
            },
            wrapperCol: { // 右侧包裹的宽度
              xs: {  span: 24, },
              sm: { span: 8, },
            },
          };

          const title = (
              <Button type='link' onClick = { this.props.history.goBack} icon ={<ArrowLeftOutlined />} size ='large'>返回</Button>
          )
        const {options} = this.state;
        let imgs = [];
        // 如果不是更新
        if (!this.isUpdate) {
            this.initiaValues = {}
        }
        
       

        return (
            <Card title = {title} >
                <Form {...formItemLayout} onFinish = {this.onFinish} onFinishFailed = {this.onFinishFailed} 
                    initialValues = {
                        this.initiaValues
                    }
                >
                    <Item label = '商品名称' name='name' 
                        rules ={[
                            {
                                required: true,
                                message: '商品名称不能为空',
                            },
                            {
                                type:'string',
                                whitespace: true,
                                message: '商品名称不能全为空格',
                            },
                        ]} 
                    >
                        <Input placeholder = '请输入商品名称'/>
                    </Item>

                    <Item label = '商品描述' name='desc'  
                        rules ={[
                            {
                                type:'string',
                                required: true,
                                message: '商品描述不能为空',
                            },
                            {
                                type:'string',
                                whitespace: true,
                                message: '商品描述不能为空格',
                            },
                        ]} 
                     >
                        <TextArea showCount maxLength={100} onChange={this.TextAreaonChange} placeholder = '请输入商品描述' />
                    </Item>

                    <Item label = '商品价格' name='price'  type='number'
                        rules ={[
                            {
                                required: true,
                                message: '商品价格不能为空',
                            },
                            {
                                validator:this.checkPrice
                            }
                        ]} 
                    >
                        <Input type='number'  addonAfter="元" value={0} placeholder = '请输入价格' />
                    </Item>
                    
                    <Item label = '商品分类' name='category' 
                        rules = {[
                            {
                                required:true,
                                message:'请选择商品分类'
                            }
                        ]}
                     >
                        <Cascader options={options} loadData={this.loadData} onChange={this.selectOnChange} changeOnSelect />
                    </Item>
                   
                    <Item label = '商品图片' name='imgs' 
                        labelCol= { {//左侧文字包裹的宽度
                            sm: { span: 4, },
                        }}

                        wrapperCol= { {// 右侧包裹的宽度
                            sm: { span: 12, },
                        }} 
                     >
                        <PictureWall images = { this.initiaValues.imgs||[]} getImgDataToForm= {this.getImgDataToForm} isUpdate = {this.isUpdate}/>
                    </Item>
                   
                    <Item label = '商品详情' name='detail' 
                        labelCol= { {//左侧文字包裹的宽度
                            sm: { span: 4, },
                        }}

                        wrapperCol= { {// 右侧包裹的宽度
                            sm: { span: 15, },
                        }} 
                    >

                        <EditorConvertToHTML detail ={this.initiaValues.detail||''} ref = {this.EditorRef} />
                    </Item>
                   
                    <Item label = ' ' colon = {false}>
                        <Button htmlType ='submit' type='primary'>{this.isUpdate?'更新':'添加'}</Button>
                    </Item>
                </Form>
            </Card>   
        )
    }
}
