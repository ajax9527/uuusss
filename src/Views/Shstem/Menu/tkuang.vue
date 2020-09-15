<template>
  <el-dialog
  :title="isadd?'添加':'修改'"
  :visible.sync="isshow"
  width="30%">
 <el-form ref="form" :model="frominfo" :rules="rules" label-width="80px">
     <el-form-item label="类型" >
  <el-radio v-model="frominfo.type" label="1">目录</el-radio>
  <el-radio v-model="frominfo.type" label="2">菜单</el-radio>
     </el-form-item>
    <el-form-item v-if="frominfo.type==2" label="上级目录" prop="region">
            <el-select v-model="frominfo.pid"  placeholder="请选择">
                <el-option  v-for="item in menulist" v-if="item.type==1" :key="item.id" :label="item.title"  :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
  <el-form-item v-if="frominfo.type==1" key="ee" label="目录名称" prop="title" >
    <el-input v-model="frominfo.title"
    placeholder="请输入名称"></el-input>
  </el-form-item >
  <el-form-item v-if="frominfo.type==2" key="eee" label="菜单名称" prop="title" >
    <el-input v-model="frominfo.title"
    placeholder="请输入名称"></el-input>
  </el-form-item >
  <el-form-item label="图标" key="pp"  v-if="frominfo.type==1" prop="icon" >
    <el-input v-model="frominfo.icon" placeholder="请输入图标class"></el-input>
  </el-form-item>
  <el-form-item label="图标" key="ppp" v-if="frominfo.type==2"  >
    <el-input v-model="frominfo.icon" placeholder="请输入图标class"></el-input>
  </el-form-item>
  
  <el-form-item label="地址" v-if="frominfo.type==2">
    <el-input v-model="frominfo.url"></el-input>
  </el-form-item>

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
import { addMenu, getMenu, eaitMenu } from "@/requst/menu";
import { mapActions, mapGetters } from "vuex";
let defalutfrom = {
  type: "1",
  icon: "",
  title: "",
  url: "",
  pid: "",
  status: 1
};
let resfa = { ...defalutfrom };
export default {
  data() {
    return {
      isadd: false,
      isshow: false,
      frominfo: {
        ...defalutfrom
      },
      rules: {
        title: [{ required: true, message: "必填", trigger: "blur" }],
        icon: [{ required: true, message: "必填", trigger: "blur" }],
        pid: [{ required: true, message: "必填", trigger: "blur" }],
        region: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  created() {},
  watch: {
    isshow(val) {
      if (val) {
        if (!this.isadd) {
          defalutfrom = { ...this.frominfo };
        }
      } else {
        //弹框消失的时候都是完全重置
        this.frominfo = { ...resfa };
        // 弹框消失的时候重新获取数据
        this.setmenu();
      }
    }
  },
  computed: {
    ...mapGetters({
      menulist: "menu/menulist"
    })
  },
  mounted() {
    if (!this.menulist.length) {
      this.setmenu();
    }
  },
  methods: {
    ...mapActions({
      setmenu: "menu/setmenu"
    }),

    //提交
    deter() {
      this.isshow = false;
      if (this.isadd) {
        addMenu(this.frominfo)
          .then(res => {
            if (res.code == 200) {
              this.setmenu();
              this.$message.success(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        eaitMenu(this.frominfo)
          .then(res => {
            if (res.code == 200) {
              this.setmenu();
              this.$message.success(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    //重置
    cz() {
      if (this.isadd) {
        this.frominfo = { ...resfa };
      } else {
        this.frominfo = { ...defalutfrom };
      }
    }
  },
  components: {}
};
</script>
<style scoped>
</style>