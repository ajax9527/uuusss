<template>
    <el-dialog
  :title="isadd?'添加':'修改'"
  :visible.sync="isshow"
  width="40%">
 <el-form ref="form" :model="frominfo" :rules="rules" label-width="100px">
   
    <el-form-item  label="上级目录" prop="roleid">
            <el-select v-model="frominfo.roleid"  placeholder="请选择">
                <el-option  v-for="item in rolelist"  :key="item.id" :label="item.rolename"  :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
  <el-form-item label="管理员名称" prop="username" >
    <el-input v-model="frominfo.username"
    placeholder="请输入名称"></el-input>
  </el-form-item >
 
  <el-form-item label="管理员密码">
    <el-input v-model="frominfo.password" type="password" placeholder="请输入密码"></el-input>
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
import { mapGetters, mapActions } from "vuex";
import { addUser, eaitUser } from "@/requst/user";
let defaultinfo = {
  roleid: "",
  username: "",
  password: "",
  status: "1"
};
let userfff = { ...defaultinfo };
export default {
  data() {
    return {
      isadd: false,
      isshow: false,
      frominfo: { ...defaultinfo },
      rules: {
        // 验证规则对象！
        username: [{ required: true, message: "必填！", trigger: "blur" }],
        roleid: [{ required: true, message: "必填！", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters({
      rolelist: "role/rolelist"
    })
  },
  mounted() {
    if (!this.rolelist.length) {
      this.setrole();
    }
  },
  watch: {
    isshow(val) {
      if (val) {
        if (!this.isadd) {
          defaultinfo = { ...this.frominfo };
        }
      } else {
        this.frominfo = { ...userfff };
        this.setuser;
      }
    }
  },
  created() {},
  methods: {
    ...mapActions({
      setrole: "role/setrole",
      setuser: "user/setuser"
    }),
    //重置按钮
    cz() {
      if (this.isadd) {
        this.frominfo = { ...userfff };
      } else {
        this.frominfo = { ...defaultinfo };
      }
    },
    //确定提交按钮
    deter() {
      this.isshow = false;
      if (this.isadd) {
        addUser(this.frominfo).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
              this.setuser()
          }
        });
      } else {
        this.isshow = false;
        eaitUser(this.frominfo).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
              this.setuser()
          }
        });
      }
    }
  },
  components: {}
};
</script>
<style scoped>
</style>