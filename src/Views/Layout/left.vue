<template>
<el-row class="tac" >
  <el-col :span="24">
    <h2>小U商城后台</h2>
    <el-menu
    router
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#444"
      text-color="#dddddd"
      active-text-color="#ffd04b">
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span slot="title">首页
        </span>
      </el-menu-item>
      <template v-for="(item,index) in menus">
          <el-submenu :index=" index +''" v-if ="item.title!='首页'">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <template v-for="a in menus[index].children" v-if="menus[index].children">
         <el-menu-item :index="a.url">
           {{a.title}}</el-menu-item>
        </template>
      </el-submenu>
      </template>

    </el-menu>
  </el-col>
</el-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
  },
  computed: {
    ...mapGetters({
      menus: "user/menus"
    })
  },
  methods: {},
  components: {}
};
</script>
<style scoped>
.tac {
  margin: 10px 0;
}
.tac h2 {
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  margin: 10px 0 20px 0;
  font-weight: normal;
  font-size: 20px;
  color: #eee;
}
.tac ul {
  border: none;
}
.tac .el-menu-vertical-demo {
  font-size: 12px;
}
.tac ul .el-menu-item {
  height: 35px;
  line-height: 35px;
}
</style>