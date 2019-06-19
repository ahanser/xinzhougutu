<template>
  <div class="wrapper">
    <el-header style="height:10vh;">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="8">
          <h4>忻州市第三次国土调查共享应用平台</h4>
        </el-col>
        <el-col :span="13">
          <Navbar/>
        </el-col>

        <el-col :span="3">
          <span style="color:#fff">{{ $t('header.wel')}} {{userName}}!</span>
          <span class="exit" @click="logout()">
            退出
            <i class="el-icon-circle-close"></i>
          </span>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>
<script>
import Navbar from '../navFiles/index'
export default {
  name: 'app',
  components: {
    Navbar
  },
  data() {
    return {}
  },
  computed: {
    themeColor() {
      return this.$store.state.app.primaryColor
    },
    userName() {
      return this.$store.state.user.user
    }
  },
  methods: {
    async logout() {
      let that = this
      let result = await this.$httpGet('user/exit')
      if (result.data.code == 0) {
        this.$store.dispatch('LogOut')
        that.$router.push({
          path: '/login'
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss"   >
.wrapper {
  position: fixed;
  width: 100%;
  height: 10vh;
  top: 0;
  bottom: calc(100vh - 10vh);
  line-height: 10vh;
  z-index: 1001;
  // overflow: hidden;
  Navbar {
    height: 100px;
  }
  /deep/ .el-header {
    height: 10vh;
    line-height: 10vh;

    // background: -webkit-linear-gradient(
    //   left,
    //   #020d29,
    //   #0f1c3f,
    //   #17264c,
    //   #0f1c3f,
    //   #020d29
    // );
    // background: transparent;
    background: rgba($color: #000000, $alpha: 0.7); //
  }
  .exit {
    color: #fff;
    margin-left: 10px;
  }
  .exit:hover {
    cursor: pointer;
  }
  .el-color-picker--small .el-color-picker__trigger {
    top: 10px;
  }
  .el-dropdown-link {
    color: #fff;
  }
  .thema {
    color: #fff;
  }

  h4 {
    font-size: 1.2rem;

    height: 10vh;

    line-height: 10vh;

    margin: 0;

    color: #fff;
  }

  .header-operations {
    margin: 0;
    position: absolute;
    right: 0;
    top: 5px;
    list-style: none;
    li {
      margin: 0;
      width: 200px;
    }
  }
  // ============
  .el-menu {
    background-color: transparent;
  }
  .el-menu-item {
    // background: red;
    margin-right: 1%;
    width: 21%;
    text-align: center;
    border-radius: 50px;
  }
  .el-menu-item:hover {
    border: 1px solid #f2f2ff;
    background-color: transparent !important;
  }
  .el-menu--horizontal {
    border-bottom: none;
    .el-menu-item {
      border-bottom: none;
    }
  }
}
</style>
