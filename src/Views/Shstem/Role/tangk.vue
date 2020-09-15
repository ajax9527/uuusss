<template>
    <el-dialog
  :title="isadd?'添加角色':'修改角色'"
  :visible.sync="isshow"
  width="30%">
 <el-form ref="form" :model="frominfo" :rules="rules" label-width="140px">
   
  <el-form-item  label="角色名称" prop="rolename" >
    <el-input v-model="frominfo.rolename"
    placeholder="请输入角色名称"></el-input>
  </el-form-item >
  <el-form-item label="角色权限" >
  <el-tree
  default-expand-all
  :data="menulist"
  show-checkbox
  node-key="id"
  ref="tree" 
  :props="{children:'children',label:'title'}"
  :check-strictly="checkStrictly"

   >
</el-tree>
 </el-form-item>
<el-form-item label="状态" >
    <el-switch
    v-model="frominfo.status" :active-value="1" :inactive-value="2">
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
import { addRole, eaitRole } from "@/requst/role";
import { mapActions, mapGetters } from "vuex";
let defalutfrom = {
  rolename: "",
  menus: "",
  status: 1
};
let resfa = { ...defalutfrom };
export default {
  data() {
    return {
      checkStrictly: false,
      isadd: false,
      isshow: false,
      frominfo: {
        ...defalutfrom
      },
      rules: {
        // 验证规则对象！
        rolename: [{ required: true, message: "必填！", trigger: "blur" }]
      }
    };
  },
  watch: {
    isshow(val) {
      if (val) {
        if (!this.isadd) {
          defalutfrom = { ...this.frominfo };

          this.checkStrictly = true;
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(this.frominfo.menus.split(","));
            this.checkStrictly = false;
            this.frominfo = { ...defalutfrom };
          });
        }
      } else {
        //弹框消失的时候都是完全重置
        this.frominfo = { ...resfa };
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.frominfo.menus.split(","));
        });
        // 弹框消失的时候重新获取数据
        this.setrole();
      }
    }
  },
  mounted() {
    if (!this.menulist.length) {
      this.setmenu();
    }
  },
  computed: {
    ...mapGetters({
      menulist: "menu/menulist"
    })
  },
  created() {},
  methods: {
    ...mapActions({
      setmenu: "menu/setmenu",
      setrole: "role/setrole"
    }),
    //提交
    deter() {
      let idarr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      if (idarr.length) {
        this.frominfo.menus = idarr;
      } else {
        this.$message.warning("请选择权限");
        return;
      }
      this.isshow = false;
      if (this.isadd) {
        addRole(this.frominfo)
          .then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        eaitRole(this.frominfo)
          .then(res => {
            if (res.code == 200) {
              this.setrole();
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
        this.$refs.tree.setCheckedKeys([]);
      } else {
        this.frominfo = { ...defalutfrom };

        this.checkStrictly = true;
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(defalutfrom.menus.split(","));
          this.checkStrictly = false;
        });
      }
    }
  },
  components: {}
};
</script>
<style scoped>
</style>