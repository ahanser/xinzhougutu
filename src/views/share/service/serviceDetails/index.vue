<template>
  <div style="transform: none">
    <el-container>
      <el-header style="height:12vh">
        <div>
          <p class="h1">地理信息机构专题地图</p>
          <p>服务资源/地理信息机构专题地图</p>
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
                <span>{{formInline.serviceURL}}</span>
              </el-form-item>
              <el-form-item label="服务名称">
                <span>{{formInline.namech}}</span>
              </el-form-item>
              <el-form-item label="服务简介">
                <span>{{formInline.introduction}}</span>
              </el-form-item>
              <el-form-item label="关键字">
                <span>{{formInline.keyword}}</span>
              </el-form-item>
              <el-form-item label="服务类型">
                <span>{{formInline.formatId}}</span>
              </el-form-item>
              <el-form-item label="主题分类">
                <span>{{formInline.serverTypeId}}</span>
              </el-form-item>
              <el-form-item label="覆盖区域">
                <span>{{formInline.districtId}}</span>
              </el-form-item>
              <el-form-item label="坐标系">
                <span>{{formInline.coordinateSystemId}}</span>
              </el-form-item>
              <el-form-item label="投影类型">
                <span>{{formInline.projectionId}}</span>
              </el-form-item>
              <el-form-item label="使用权限">
                <span>{{formInline.limitsId}}</span>
              </el-form-item>
              <el-form-item label="服务预览">
                <span>{{formInline.serviceView}}</span>
              </el-form-item>
              <el-form-item label="更新周期">
                <span>{{formInline.upCycle}}</span>
              </el-form-item>
            </el-form>
          </section>
        </div>
        <div class="item">
          <header>图层基本信息</header>
          <section>
            <el-form
              :model="formInline"
              class="demo-form-inline"
              label-position="left"
              label-width="130px"
            >
              <el-form-item label="图层名称">
                <span>{{formInline.serviceURL}}</span>
              </el-form-item>
              <el-form-item label="图层简介">
                <span>{{formInline.namech}}</span>
              </el-form-item>
              <el-form-item label="覆盖区域">
                <span>{{formInline.districtId}}</span>
              </el-form-item>
              <el-form-item label="关键字">
                <span>{{formInline.keyword}}</span>
              </el-form-item>
              <el-form-item label="服务范围">
                <span>{{formInline.leftLat}}</span>
                <span>{{formInline.leftLon}}</span>
                <span>{{formInline.rightLon}}</span>
                <span>{{formInline.rightLat}}</span>
              </el-form-item>
              <el-form-item label="发布时间">
                <span>{{formInline.ctime}}</span>
              </el-form-item>

              <el-form-item label="坐标系">
                <span>{{formInline.coordinateSystemId}}</span>
              </el-form-item>
              <el-form-item label="投影类型">
                <span>{{formInline.projectionId}}</span>
              </el-form-item>
              <el-form-item label="上次更新时间">
                <span>{{formInline.mtime}}</span>
              </el-form-item>
              <el-form-item label="预览图">
                <span>{{formInline.serviceView}}</span>
              </el-form-item>
              <el-form-item label="更新周期">
                <span>{{formInline.upCycle}}</span>
              </el-form-item>
            </el-form>
          </section>
        </div>
        <div class="item">
          <header>服务联系信息</header>
          <section>
            <el-form
              :model="formInline"
              class="demo-form-inline"
              label-position="left"
              label-width="130px"
            >
              <el-form-item label="发布机构">
                <span>{{formInline.unit}}</span>
              </el-form-item>
              <el-form-item label="地址">
                <span>{{formInline.unitAdd}}</span>
              </el-form-item>
              <el-form-item label="网站">
                <span>{{formInline.introduction}}</span>
              </el-form-item>
              <el-form-item label="联系人">
                <span>{{formInline.linkman}}</span>
              </el-form-item>
              <el-form-item label="电话">
                <span>{{formInline.linkl}}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{formInline.linkEmail}}</span>
              </el-form-item>
            </el-form>
          </section>
        </div>
      </el-main>
      <el-footer>
        <div class="topInfo">
          <span>订单成果申请</span>
          <span @click="order">
            为了不影响成果申请，请如实填写信息
            <i class="el-icon-arrow-down"></i>
          </span>
          <span>
            <el-button type="primary" plain @click="postorder">提交订单</el-button>
          </span>
        </div>
        <el-form
          :model="formInline1"
          label-width="110px"
          v-show="fromorder"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="单位名称：" prop="unitName">
            <el-input v-model="formInline1.unitName" placeholder="单位名称"></el-input>
          </el-form-item>
          <el-form-item label="详细地址：" prop="receiverAddress">
            <el-input v-model="formInline1.receiverAddress" placeholder="详细地址"></el-input>
          </el-form-item>
          <el-form-item label="经办人姓名：" prop="receiverName">
            <el-input v-model="formInline1.receiverName" placeholder="经办人姓名"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码：" prop="receiverZip">
            <el-input v-model="formInline1.receiverZip" placeholder="邮政编码"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="receiverPhone">
            <el-input v-model="formInline1.receiverPhone" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱：" prop="receiverMobile">
            <el-input v-model="formInline1.receiverMobile" placeholder="电子邮箱"></el-input>
          </el-form-item>
        </el-form>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import esriLoader from 'esri-loader'
import url from '@/api/port'
import qs from 'qs'
export default {
  name: 'Layout',
  data() {
    return {
      formInline: {},
      fromorder: false,
      //提交的form表单数据
      formInline1: {
        unitName: '',
        receiverAddress: '',
        receiverName: '',
        receiverZip: '',
        receiverPhone: '',
        receiverMobile: ''
      },
      //对应图片id
      picId: '',
      //表单验证
      rules: {
        unitName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        receiverAddress: [
          { required: true, message: '请输入地址名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        receiverName: [
          { required: true, message: '请输入经办人姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        receiverZip: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        receiverPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        receiverMobile: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  computed: {},
  mounted() {
    this.getidinfo()
  },
  watch: {},
  methods: {
    getidinfo() {
      let that = this
      //console.log(this.$store.state.user)
      this.picId = this.$store.state.user.picId
      console.log('TCL: getidinfo -> this.picId', this.picId)
      console.log('http://192.168.5.61:9080/api/sys/open/service/')
      this.$service
        .get('http://192.168.5.61:9080/api/sys/open/service/' + this.picId)
        .then(function(res) {
          //console.log(res)
          that.formInline = res.data.result
          console.log(that.formInline)
        })
    },
    //申请表单展开事件
    order() {
      this.fromorder = !this.fromorder
    },
    //申请表单提交事件
    postorder() {
      let that = this
      this.$service
        .post(url.postformdata, this.formInline1)
        .then(function(res) {
          console.log(
            'http://192.168.5.61:9080/api/sys/order/create/' +
              res.data.result.shippingId +
              '?type=service&productIds=' +
              that.picId
          )

          that.$service
            .post(
              'http://192.168.5.61:9080/api/sys/order/create/' +
                res.data.result.shippingId +
                '?type=service&productIds=' +
                that.picId
            )
            .then(function(res) {
              console.log(res)
              that.$message({
                message: res.data.result,
                type: 'warning'
              })
            })
        })
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
      &:nth-of-type(3) {
        margin-bottom: 50px;
      }
    }
  }
  .el-footer {
    padding: 20px 130px;
    background-color: #eee;
    .topInfo {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .el-form {
      width: 80%;
      margin: 30px auto;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .el-form-item {
        width: 50%;
      }
    }
  }
}
</style>
