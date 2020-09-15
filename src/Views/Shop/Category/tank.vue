<template>
   <el-dialog
  :title="isadd?'添加':'修改'"
  :visible.sync="isshow"
  width="40%">
 <el-form ref="form" :model="frominfo" label-width="100px">
   
    <el-form-item  label="上级分类" prop="roleid">
            <el-select v-model="frominfo.pid"  placeholder="请选择">
                <el-option  v-for="item in categorylist"  :key="item.id" :label="item.rolename"  :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
  <el-form-item label="分类名称" prop="username" >
    <el-input v-model="frominfo.catename"
    placeholder="请输入名称"></el-input>
  </el-form-item >

    <el-form-item label="状态" >
<el-switch
  v-model="frominfo.status" :active-value="1" :inactive-value="2"
 >
</el-switch>
    </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cz">重置</el-button>
    <el-button type="primary" @click="deter">确定</el-button>
  </span>
</el-dialog>
</template>

<script>
import {mapGetters,mapActions} from "vuex"

let defaultlist = {
    pid:"",
    catename:"",
    img:"",
    status:"1",

}
let eaitfff = {...defaultlist}
export default {
    data(){
        return{
            isadd:true,
            isshow:true,
            frominfo:{...defaultlist}
        }
    },
    computed: {
        ...mapGetters({
            categorylist:'category/categorylist',
        })
    },
    created(){},
    methods:{
        ...mapActions({
            setcategory:"category/setcategory"
        }),
        //点击传值
        cz(){},
        //点击删除
        deter(){},
    },
    components:{}
}

</script>
<style scoped>
</style>