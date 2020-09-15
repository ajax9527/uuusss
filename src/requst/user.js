import $axios from "../common/http"

/**
 * 添加管理员数据
 */
export function addUser(data){
     return $axios.post("/useradd",data)
}

/**
 * 获取管理员数据分页列表
 */
export async function getUser(page=1,size=10){
    let res = await $axios.get("/userlist",{
        params:{
            page,
            size,
        }
    })
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}

/**
 * 获取管理员总数
 */
export async function getUsers(){
    let res = await $axios.get("/usercount")
        return res.list[0].total
}

/**
 * 删除管理员数据
 */
export  function delUser(uid){
   return $axios.post("/userdelete",{uid})
  
}

/**
 * 修改管理员数据
 */
export  function eaitUser(data){
   return $axios.post("/useredit",data)
  
}

/**
 * 管理员登录
 */
export  function loginUser(data){
   return $axios.post("/userlogin",data)
  
}