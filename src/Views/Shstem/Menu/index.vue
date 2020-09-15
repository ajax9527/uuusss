<template>
  <div>
      <el-row>
    <el-button type="danger" 
    @click="tzmenu">
        <i class="el-icon-circle-plus-outline"></i>
        添加</el-button>
      </el-row>

 <el-table
    :data="menulist"
    style="width: 100%"
    row-key="id"
    :tree-props="{children: 'children'}"
    >
    <el-table-column
        prop="id"
      label="ID">
    </el-table-column>
    <el-table-column 
     prop="title"
      label="标题">
    </el-table-column>
    <el-table-column
      label="类型">
      <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.type==1">目录</el-tag>
                  <el-tag type="warning" v-if="scope.row.type==2">菜单</el-tag>
      </template>
    </el-table-column>
    <el-table-column
     prop="icon"
      label="图标">
         <template slot-scope="scope">
                  <i :class="scope.row.icon"></i>
              </template>
    </el-table-column>
    <el-table-column
     prop="url"
      label="地址">
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
      
      <Tkuang ref="tk"/>
  </div>
</template>


<script>
import {mapActions,mapGetters} from "vuex"
import {delMenu,eaitMenu} from "@/requst/menu"
import Tkuang from "./tkuang"
export default {
    data(){
        return{
        }
    },
    created(){
    },
       async mounted() {
         await this.setmenu()
     
    },
       computed: {
      ...mapGetters({
        menulist:"menu/menulist"
      })
    }
    ,
    methods:{
      ...mapActions({
          setmenu:"menu/setmenu"
        }),
        //添加
        tzmenu(){
            this.$refs.tk.isshow=true,
            this.$refs.tk.isadd=true
        },
        //修改传值
        eait(scope){
          scope.row.type =  String(scope.row.type)
          this.$refs.tk.frominfo = scope.row
          this.$refs.tk.isshow = true
           this.$refs.tk.isadd=false
        },

        //删除
        del(scope){
           this.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                  delMenu(scope.row.id).then(res=>{
            if(res.code==200){
              this.setmenu()
               this.$message.success(res.msg)
            }
          }).catch(err=>{
            console.log(err)
          })
            }).catch(() => {
            });
      
        }
     
    },
      computed: {
      ...mapGetters({
        menulist:"menu/menulist"
      })
    }
    ,
    components:{
        Tkuang,
    }
}

</script>
<style scoped>
</style>