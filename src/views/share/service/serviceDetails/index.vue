<template>
  <div>
    <el-container>
      <el-header style="height:12vh">
        <div>
          <p class="h1">地理信息机构专题地图</p>
          <p>服务资源/地理信息机构专题地图</p>
          {{this.$store.state.user.picId}}
        </div>
      </el-header>
      <el-main>
        <div class="item">
          <header>服务基本信息</header>
          <section>
            <el-form
              :model="formInline"
              class="demo-form-inline"
              label-position="left"
              label-width="130px"
            >
              <el-form-item label="服务url">
                <span>233</span>
              </el-form-item>
              <el-form-item label="服务名称">
                <span>233</span>
              </el-form-item>
              <el-form-item label="服务简介">
                <span>233</span>
              </el-form-item>
              <el-form-item label="关键字">
                <span>233</span>
              </el-form-item>
              <el-form-item label="服务类型">
                <span>233</span>
              </el-form-item>
              <el-form-item label="主题分类">
                <span>233</span>
              </el-form-item>
              <el-form-item label="覆盖区域">
                <span>233</span>
              </el-form-item>
              <el-form-item label="坐标系">
                <span>233</span>
              </el-form-item>
              <el-form-item label="投影类型">
                <span>233</span>
              </el-form-item>
              <el-form-item label="使用权限">
                <span>233</span>
              </el-form-item>
              <el-form-item label="服务预览">
                <span>233</span>
              </el-form-item>
              <el-form-item label="更新周期">
                <span>233</span>
              </el-form-item>
            </el-form>
          </section>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  components: {},
  computed: {},
  mounted() {
    this.getidinfo()
  },
  watch: {},
  methods: {
    getidinfo() {
      console.log(this.$store.state.user)
      var id = this.$store.state.user.picId
      console.log('http://192.168.5.61:9080/api/sys/open/service/' + id)
      this.$service
        .get('http://192.168.5.61:9080/api/sys/open/service/' + id)
        .then(function(res) {
          console.log(res)
        })
    }
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-container {
  margin-top: 10vh;
  .el-header {
    padding: 0 10vw;
    background-color: #020d2a;
    color: #fff;
    div {
      height: 100%;
      margin-top: 2.5vh;
      p {
        margin: 0;
        padding: 0;
      }
      .h1 {
        font-size: 22px;
      }
    }
  }
  .el-main {
    padding: 0 10vw;
    .item {
      margin-top: 30px;
      header {
        font-size: 20px;
        height: 70px;
        line-height: 70px;
        padding: 0 50px;
        border-bottom: 1px solid #ccc;
      }
      section {
        padding: 30px 50px;
        width: 100%;
        .el-form {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          .el-form-item {
            width: 50%;
          }
        }
      }
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 10px;
    }
  }
}
</style>
