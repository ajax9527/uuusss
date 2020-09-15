<template>
   <div>
      <el-row>
    <el-button type="danger" 
    @click="tzmenu">
        <i class="el-icon-circle-plus-outline"></i>
        添加</el-button>
      </el-row>

 <el-table
    :data="rolelist"
    style="width: 100%"
    row-key="id"
    :tree-props="{children: 'children'}"
    >
    <el-table-column
        prop="id"
      label="ID">
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
      
      <Tangk ref="tk"/>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
import {delRole} from "@/requst/role"
import Tangk from "./tangk" 


export default {
    data(){
        return{}
    },
        computed: {
      ...mapGetters({
        rolelist:"role/rolelist"
      })
    }
    ,
    async mounted() {
    await this.setrole()
      
    },
    created(){},
    methods:{
    
          ...mapActions({
          setrole:"role/setrole"
        }),
         //添加
        tzmenu(){
           
            this.$refs.tk.isshow=true
            this.$refs.tk.isadd=true
        },
        //修改传值
        eait(scope){
          this.$refs.tk.frominfo = scope.row
          this.$refs.tk.isshow = true
           this.$refs.tk.isadd=false
        //    this.$refs.tk.setCheckedKeys(scope.row.menus)
        },

        //删除
        del(scope){
           this.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                  delRole(scope.row.id).then(res=>{
            if(res.code==200){
              this.setrole()
               this.$message.success(res.msg)
            }
          }).catch(err=>{
            console.log(err)
          })
            })
        }
    },
    components:{Tangk,}
}

</script>
<style scoped>
</style>