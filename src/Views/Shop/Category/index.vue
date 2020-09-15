<template>
  <div>
      <el-row>
    <el-button type="danger" 
    @click="tzmenu">
        <i class="el-icon-circle-plus-outline"></i>
        添加</el-button>
      </el-row>

 <el-table
    :data="categorylist"
    style="width: 100%"
    row-key="id"
    :tree-props="{children: 'children'}"
    >
    <el-table-column
        prop="id"
      label="ID">
    </el-table-column>
    <el-table-column 
     prop="catename"
      label="分类名称">
    </el-table-column>
    <el-table-column
     prop="icon"
      label="分类图片">
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
  <Tank ref="tk"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import Tank from "./tank"
export default {
    data(){
        return{}
    },
    created(){},
    computed: {
        ...mapGetters({
            categorylist:'category/categorylist',
        })
    },
    methods:{
        tzmenu(){}
    },
    components:{Tank,}
}

</script>
<style scoped>
</style>