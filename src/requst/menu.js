import $axios from "../common/http"

/**
 * 添加菜单数据
 */
export function addMenu(data){
     return $axios.post("/menuadd",data)
}

/**
 * 获取菜单数据
 */
export async function getMenu(data){
    let res = await $axios.get("/menulist?istree=1")
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}

/**
 * 删除菜单数据
 */
export  function delMenu(id){
   return $axios.post("/menudelete",{id})
  
}

/**
 * 修改菜单数据
 */
export  function eaitMenu(data){
   return $axios.post("/menuedit",data)
  
}