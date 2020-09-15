import {getCategory} from "@/requst/category"
export default {
    namespaced: true,
    state:{
        categorylist:[]
    },
    getter:{
        categorylist:state=>state.categorylist,
    },
    mutations:{
        SETCATEGORY(state,data){
            state.categorylist = data
        }
    },
    actions:{
        setcategory({commit}){
           let res =  getCategory()
           commit("SETCATEGORY",res)
        }
    }
}