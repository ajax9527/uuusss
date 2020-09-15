
import {getUser,getUsers,loginUser} from "@/requst/user"
//element ui 里的提示消息弹框
import {Message} from "element-ui"
//引入路由跳转
import router from "@/router"


let userinfo = localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")):{}
export default {
    namespaced:true,
    state:{
        userlist:[],
        page:1,
        size:1,
        total:1,
        userinfo:userinfo

    },
    getters:{
        userlist: state => state.userlist,
        page: state => state.page,
        size: state => state.size,
        total: state => state.total,
        userinfo: state => state.userinfo,
        menus_url: state => state.userinfo.menus_url,
        menus: state => state.userinfo.menus,
        username: state => state.userinfo.username
    },
    mutations:{
        SETUSER(state,data){          
         state.userlist = data
        },
        SETAOTAL(state,data){          
         state.total = data
        },
        SETSIZE(state,data){          
         state.size = data
        },
        SETPAGE(state,data){          
         state.page = data
        },
        //登录数据存储
        SET_USERINFO(state,data){
            // 存入本地存储是为了实现持久化！
            localStorage.setItem("userinfo",JSON.stringify(data))
            // 存入vuex是为了各组件方便直接拿取数据
            state.userinfo = data;
        },
        //退出登录直接清除本地存储并跳转到登录页
        QUIT(state){
            localStorage.removeItem('userinfo');
            state.userinfo = {};
            router.push("/login")
        }
    },
    actions:{
      async setuser({commit,dispatch,state}){
            let res = await getUser(state.page,state.size)
            commit('SETUSER',res) 
            dispatch('setusers') 
        },
      async setusers({commit}){
            let res = await getUsers()
            commit('SETAOTAL',res)  
        },
        //登录请求
        async loginuser({commit},data){
            let res = await loginUser(data);
            if(res.code==200){
                commit('SET_USERINFO',res.list)
                Message.success('登录成功') 
                router.push("/") // 跳转到后台首页
            }else{
                Message.error(res.msg) 
            }
        }
    },


}