import $axios from "../common/http"

/**
 * 添加角色数据
 */
export function addRole(data){
     return $axios.post("/roleadd",data)
}

/**
 * 获取角色列表
 */
export async function getRole(data){
    let res = await $axios.get("/rolelist")
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}

/**
 * 删除角色数据
 */
export  function delRole(id){
   return $axios.post("/roledelete",{id})
  
}

/**
 * 修改角色数据
 */
export  function eaitRole(data){
   return $axios.post("/roleedit",data)
  
}