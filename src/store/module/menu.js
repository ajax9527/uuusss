
import {getMenu} from "@/requst/menu"

export default {
    namespaced:true,
    state:{
        menulist:[]
    },
    getters:{
        menulist: state => state.menulist
    },
    mutations:{
        SETMENU(state,data){          
         state.menulist = data
        }
    },
    actions:{
      async setmenu({commit}){
            let res = await getMenu()
            commit('SETMENU',res)
           
        }
    },


}