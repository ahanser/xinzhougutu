<template>
  <div class="serve">
    <div class="datainfo">
      <header>服务基本信息</header>
      <section>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="服务URL" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="服务名称" prop="region">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="服务简介" required>
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="关键字" prop="date2">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="服务类型" prop="date2">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="主题分类" prop="date2">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="使用权限" prop="date2">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <div class="datainfo">
      <header>图层基本信息</header>
      <section>
        <el-form :model="ruleForm" :rules="rules" label-position="right">
          <el-form-item label="图层名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="图层简介" prop="region">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="关键字" prop="date2">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="覆盖区域" required>
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="坐标系" prop="date2">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="投影类型" prop="date2">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="发布时间" prop="date2">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="更新周期" prop="date2">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="预览图" prop="date2">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="服务范围" prop="date2">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <div class="datainfo">
      <header>服务联系信息</header>
      <section>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right">
          <el-form-item label="发布机构" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="region">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="date2">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" required>
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人邮箱" prop="date2">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <footer>
      <el-button>提交</el-button>
      <el-button>重置</el-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    }
  },
  components: {},
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.serve {
  margin-top: 12vh;

  width: 80vw;
  margin-left: 15vw;
  border: 1px solid #ccc;
  .datainfo {
    //background-color: #35a6ae;
    width: 50%;
    height: 80%;
    header {
      width: 100%;
      height: 60px;
      background-color: #999999;
      line-height: 60px;
      text-align: center;
      font-size: 20px;
      color: white;
    }
    section {
      .el-form {
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: center;
      }
      .el-form-item {
        width: 45%;
      }
    }
  }
  footer {
    width: 50%;
    text-align: center;
  }
}
</style>
