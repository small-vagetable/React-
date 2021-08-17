// import Base from 'antd/lib/typography/Base';
import myAxios from './axios'

//包含所有接口请求函数的模块

const BASE = ''

//登录请求
export const reqLogin = (username,password) => myAxios(BASE+'/api1/login',{username,password},'POST');


// 获取用户地址
export const reqGetLocation = (data) => myAxios(BASE+'https://restapi.amap.com/v5/ip?key=5054ae320e60bfdf4c03a21cb2efec52&type=4&ip=221.206.131.10',data,'GET');
// {
//     key:'5054ae320e60bfdf4c03a21cb2efec52',
//     type:4,
//     ip:'221.206.131.10'
// }

// 获取天气
export const reqGetWeather = (data) => myAxios(BASE+'https://restapi.amap.com/v3/weather/weatherInfo',data,'GET');
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
export const reqGetCotegory = (parentId)=>myAxios(BASE+'/api1/manage/category/list',{parentId},'GET')
export const reqAddCotegory = (parentId,categoryName)=>myAxios(BASE+'/api1/manage/category/add',{parentId,categoryName},'POST')
export const reqUpdataCotegory = (categoryId,categoryName)=>myAxios(BASE+'/api1/manage/category/update',{categoryId,categoryName},'POST')
//根据分类id获取的分类名
export const reqGetGoryNameWithId= (categoryId)=>myAxios(BASE+'/api1/manage/category/info',{categoryId})


// 商品 
// 获取分页列表
export const reqGetProduct = (pageNum,pageSize)=>myAxios(BASE+'/api1/manage/product/search',{pageNum,pageSize})
// 搜索分页列表
export const reqGetProductForSearch = (pageNum,pageSize,searchType,serachWord)=>myAxios(BASE+'/api1/manage/product/search',
        {
            pageNum,
            pageSize,
            // 第三格参数 可能时productDesc=描述搜索，也可能时productName名字搜索
            [searchType]:serachWord
        }
)
// 更改商品上架、下架
export const reqUpdateProductStatus = (_id,status)=>myAxios(BASE+'/api1/manage/product/update',{_id,status},'POST')

//添加或更新商品
export const reqAddOrUpdateProduct = (prouct)=>myAxios(BASE+'/api1/manage/product/'+(prouct._id?'update':'add'),prouct,'POST')

// /manage/product/add
// 删除商品图片
export const reqDeleteImg = (name)=>myAxios(BASE+'/api1/manage/img/delete',{name},'POST')


// 角色管理
export const reqRoles = ()=>myAxios(BASE + '/api1/manage/role/list');
// 添加角色
export const reqAddRole = (roleName)=>myAxios(BASE + '/api1/manage/role/add',{roleName},'POST');
// 修改角色
export const reqUpdateRole = (role)=>myAxios(BASE + '/api1/manage/role/update',role,'POST');


// 获取所有用户
export const reqGetAllUser = () => myAxios(BASE+'/api1/manage/user/list');
// 添加或更新用户
export const reqAddOrUpdateUser = data => myAxios(BASE+'/api1/manage/user/'+(data._id?'update':'add'),data,'POST');
// 删除用户
export const reqRemoveUser = userId => myAxios(BASE+'/api1/manage/user/delete',{userId},'POST');
// 修改用户信息
// export const reqUpdateUser = data => myAxios(BASE+'/api1/manage/user/update',data,'POST');


