/**
 * 数据存储在localstorage中 
 */
const USER_KEY = 'user_key';
const TAG_ACTIVE_KEY = 'tag_active_key';
const TAGS_ARR_KEY = 'tags_arr_key';

// 保存User
const saveUser = (user)=>{
    localStorage.setItem(USER_KEY,JSON.stringify(user))
};

// 读取user
const getUser=()=>{
    return JSON.parse(localStorage.getItem(USER_KEY)||'{}') ;
};
// 删除user
const deleteUser=()=>{
    localStorage.removeItem(USER_KEY)
}
// 保存打开过的标签列表于local storage
const saveTagstoStorage = (activeKey,tagsArr)=>{
    localStorage.setItem(TAG_ACTIVE_KEY,activeKey);
    localStorage.setItem(TAGS_ARR_KEY,JSON.stringify(tagsArr))
}
// 读取 activeKey
const getActiveTagKey = () => {
    return localStorage.getItem(TAG_ACTIVE_KEY||'');
}

// 读取tagsarr
const getTagsArr = () => {
    return JSON.parse(localStorage.getItem(TAGS_ARR_KEY)||'[]');
}

export {
    saveUser,getUser,deleteUser,saveTagstoStorage,getActiveTagKey,getTagsArr
}