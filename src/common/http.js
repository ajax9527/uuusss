import axios from "axios";
import router from "@/router";

// 创建一个axios实例
let $axios = axios.create({
    // baseURL: "http://localhost:3030/api",
    baseURL:"/api",
    timeout: 3000
})

//请求拦截器
$axios.interceptors.request.use(function (config) {
    if(config.url == '/userlogin'){
        //登录请求不用携带token直接返回、
        return config;
    }else{
        //不是登录的需要请求头携带token
        let userinfo = JSON.parse(localStorage.getItem("userinfo"))
        config.headers.authorization = userinfo.token;
        return config;
    }
   
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
$axios.interceptors.response.use(function (response) {
    if(response.data.code == 403){
        //登录token过期后，需要重新登录
        router.push("/login")
        return response.data;
    }else{
        return response.data;
    }

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



// 暴露axios实例！
export default $axios;