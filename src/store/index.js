import Vuex from "vuex"
import Vue from "vue"
import menu from "./module/menu"
import role from "./module/role"
import user from "./module/user"
import category from "./module/category"


Vue.use(Vuex)

let store =new Vuex.Store({
    state:{},
    getters:{},
    mutations:{},
    actions:{},
    modules:{
        menu,role,user,category
    }
    
})

export default store
