<template>
<div class="header">
    <div class="lt">
            <el-button type="primary" size="small" class="toggle-btn" icon="el-icon-s-unfold"></el-button>
  <el-breadcrumb separator-class="el-icon-arrow-right" >
  <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
 
</el-breadcrumb>
 <el-button size="small" icon="el-icon-back" circle class="jt" @click="$router.back()"></el-button>
</div>
<div>
        <el-dropdown>
          <span class="el-dropdown-link">
              {{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item> <i class="el-icon-full-screen"></i> 全屏操作</el-dropdown-item>
            <el-dropdown-item @click.native="QUIT"> <i class="el-icon-switch-button"></i> 退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
     </div>
     </div>
</template>

<script>
import {mapMutations,mapGetters} from "vuex"
export default {
    data(){
        return{}
    },
    created(){
        
    },
    computed: {
        ...mapGetters({
           username:"user/username"
        })
    },
    methods:{
        ...mapMutations({
                QUIT:"user/QUIT",
        }),
    
    },
    components:{}
}

</script>
<style scoped>
.header{
    width: 100%;
 
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.lt{
      display: flex;
  align-items: center;
}
.toggle-btn{
    margin-right: 20px;
}
.jt{
    margin-left: 20px;
}
</style>