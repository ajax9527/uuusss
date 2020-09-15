import  $axios from 'axios'

/**
 * 
 * 添加商品分类
 */
export function addCategory(data){
    return $axios.post('/cateadd',data)
}

/**
 * 
 * 获取商品分类列表
 */
export async function getCategory(){
    let  res = await $axios.get('catelist')
    if(res.code == 200 && res.list){
        return res.list
    }else{
        return []
    }
}

/**
 * 修改商品分类
 */

 export function eaitCategory(data){
     return $axios.post('cateeait',data)
 }

 /**
  * 删除商品分类
  */
export function delCategory(id){
    return $axios.post('catedelete',{id})
}
