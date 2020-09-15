<template>
      <!-- 主框架目录 -->
     
     <el-container class="layout">
  <el-aside width="220px" class="left">
      <Left/>
  </el-aside>
  <el-container>
    <el-header class="headers">
        <tit/>
    </el-header>
    <el-main class="cont">
            <router-view class="right"></router-view>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import Left from "./left"
import Tit from "./tit"
export default {
    data(){
        return{
            shstems:false,  
            shops:false
        }
    },
    created(){},
    methods:{
    },
    components:{
        Tit,Left,
    }
}

</script>
<style scoped>

.headers{
     box-shadow:  0 0 4px 0 rgba(0,0,0,.3);
}
.layout{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
   
   height: 100vh;
    
}
.cont{
    height: 100%;
    background-color: #f7f7f7;
    
}
.left {
    background: #444;    
}
</style>