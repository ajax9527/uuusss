<template>
  <div>
           <el-row>
    <el-button type="danger" 
    @click="tzmenu">
        <i class="el-icon-circle-plus-outline"></i>
        添加</el-button>
      </el-row>

 <el-table
    :data="userlist"
    style="width: 100%"
    row-key="id"
    :tree-props="{children: 'children'}"
    >
    <el-table-column
        prop="uid"
      label="用户ID"
      width=320 >
    </el-table-column>
    <el-table-column 
     prop="username"
      label="用户名">
    </el-table-column>
    
    <el-table-column
     prop="rolename"
      label="角色名称">
    </el-table-column>

    <el-table-column
     prop="status"
      label="状态">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
                    <el-button type="primary" size="small"  circle icon="el-icon-edit"
                    @click="eait(scope)"></el-button>
                    <el-button type="danger" size="small"   circle icon="el-icon-delete" @click="del(scope)"></el-button>
                </template>
    </el-table-column>
  </el-table>
  <el-pagination
      v-if="total"
      @size-change="set_size"
      @current-change="set_page"
      :current-page="page"
      :page-sizes="[1, 2, 3, 4,5]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  <Tank ref="tk"/>
  </div>
</template>

<script>
import Tank from "./tank";
import { mapGetters, mapActions,mapMutations } from "vuex";
import { delUser } from "@/requst/user";
export default {
  data() {
    return {

    };
  },
  created() {},
  computed: {
    ...mapGetters({
      userlist: "user/userlist",
      total: "user/total",
      size: "user/size",
      page: "user/page",
    })
  },
  mounted() {
    if (!this.userlist.length) {
      this.setuser(1,3);
    }
  },
  methods: {
    ...mapActions({
      setuser: "user/setuser",
    }),
    ...mapMutations({
        SETSIZE:"user/SETSIZE",   
        SETPAGE:"user/SETPAGE",   

    }),
  //添加传值
    tzmenu() {
      this.$refs.tk.isshow = this.$refs.tk.isadd = true;
     
    },
    //删除
    del(scope) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delUser(scope.row.uid).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
         
            if(this.userlist.length==1&&this.page!=1){
              console.log(222)
              this.SETPAGE(this.page-1)
            }
             this.setuser()
          }
        });
      });
    },
    //修改传值
    eait(scope){
      this.$refs.tk.isshow = true;
      this.$refs.tk.isadd=false
      scope.row.password = "",
      this.$refs.tk.frominfo = scope.row;

    },
    set_size(val){
        this. SETSIZE(val)
           this.setuser()
    },
    set_page(val){
      this.SETPAGE(val) 
         this.setuser()
    }
  },
  components: { Tank }
};
</script>
<style scoped>
</style>