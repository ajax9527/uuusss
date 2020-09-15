
import {getRole} from "@/requst/role"

export default {
    namespaced:true,
    state:{
        rolelist:[]
    },
    getters:{
        rolelist: state => state.rolelist
    },
    mutations:{
        SETROLE(state,data){          
         state.rolelist = data
        }
    },
    actions:{
      async setrole({commit}){
            let res = await getRole()
            commit('SETROLE',res)
           
        }
    },


}