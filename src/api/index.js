// import Base from 'antd/lib/typography/Base';
import myAxios from './axios'

//包含所有接口请求函数的模块
const BASE = '/api'  //与后端匹配
let proxy = ''
if(process.env.NODE_ENV === 'development'){
    // 开发环境
    proxy = '/api1'
    console.log('开发环境')
}else{
    // 生产环境
    console.log('生产环境')

}
//登录请求
export const reqLogin = (username,password) => myAxios(proxy+BASE+'/login',{username,password},'POST');


// 获取用户地址
export const reqGetLocation = (data) => myAxios('https://restapi.amap.com/v5/ip?key=5054ae320e60bfdf4c03a21cb2efec52&type=4&ip=221.206.131.10',data,'GET');
// {
//     key:'5054ae320e60bfdf4c03a21cb2efec52',
//     type:4,
//     ip:'221.206.131.10'
// }

// 获取天气
export const reqGetWeather = (data) => myAxios('https://restapi.amap.com/v3/weather/weatherInfo',data,'GET');
// {
//     key:'5054ae320e60bfdf4c03a21cb2efec52',
//     city:'110101',
//     extensions:'all',
//     output:'json'
// }


// jsonp
// jsonp('https://restapi.amap.com/v3/weather/weatherInfo?key=5054ae320e60bfdf4c03a21cb2efec52&city=110101&extensions=all&output=json',{
//     param :{
//         key:'5054ae320e60bfdf4c03a21cb2efec52',
//         type:4,
//         ip:'221.206.131.10'

//     }
// }, (err,data) => {
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(data)

// } )

// 分类 
// 获取/添加/更新/获取商品的分类名和父类分类名
export const reqGetCotegory = (parentId)=>myAxios(proxy+BASE+'/manage/category/list',{parentId},'GET')
export const reqAddCotegory = (parentId,categoryName)=>myAxios(proxy+BASE+'/manage/category/add',{parentId,categoryName},'POST')
export const reqUpdataCotegory = (categoryId,categoryName)=>myAxios(proxy+BASE+'/manage/category/update',{categoryId,categoryName},'POST')
//根据分类id获取的分类名
export const reqGetGoryNameWithId= (categoryId)=>myAxios(proxy+BASE+'/manage/category/info',{categoryId})


// 商品 
// 获取分页列表
export const reqGetProduct = (pageNum,pageSize)=>myAxios(proxy+BASE+'/manage/product/search',{pageNum,pageSize})
// 搜索分页列表
export const reqGetProductForSearch = (pageNum,pageSize,searchType,serachWord)=>myAxios(proxy+BASE+'/manage/product/search',
        {
            pageNum,
            pageSize,
            // 第三格参数 可能时productDesc=描述搜索，也可能时productName名字搜索
            [searchType]:serachWord
        }
)
// 更改商品上架、下架
export const reqUpdateProductStatus = (_id,status)=>myAxios(proxy+BASE+'/manage/product/update',{_id,status},'POST')

//添加或更新商品
export const reqAddOrUpdateProduct = (prouct)=>myAxios(proxy+BASE+'/manage/product/'+(prouct._id?'update':'add'),prouct,'POST')

// /manage/product/add
// 删除商品图片
export const reqDeleteImg = (name)=>myAxios(proxy+BASE+'/manage/img/delete',{name},'POST')


// 角色管理
export const reqRoles = ()=>myAxios(proxy+BASE+'/manage/role/list');
// 添加角色
export const reqAddRole = (roleName)=>myAxios(proxy+BASE+'/manage/role/add',{roleName},'POST');
// 修改角色
export const reqUpdateRole = (role)=>myAxios(proxy+BASE+'/manage/role/update',role,'POST');


// 获取所有用户
export const reqGetAllUser = () => myAxios(proxy+BASE+'/manage/user/list');
// 添加或更新用户
export const reqAddOrUpdateUser = data => myAxios(proxy+BASE+'/manage/user/'+(data._id?'update':'add'),data,'POST');
// 删除用户
export const reqRemoveUser = userId => myAxios(proxy+BASE+'/manage/user/delete',{userId},'POST');
// 修改用户信息
// export const reqUpdateUser = data => myAxios(BASE+'/api1/manage/user/update',data,'POST');


