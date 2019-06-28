<template>
  <div class="serve">
    <div class="datainfo">
      <section>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="namech"
            label="服务名称"
            width="180"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="introduction" label="服务简介" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="keyword"
            label="关键字"
            width="250"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="formatId" label="服务类型" align="center"></el-table-column>
          <el-table-column prop="serverTypeId" label="主题分类" align="center"></el-table-column>
          <el-table-column prop="limitsId" label="使用权限" align="center"></el-table-column>
          <el-table-column prop="delFlag" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" width="400" align="center">
            <template class="temp" slot-scope="scope">
              <el-button
                class="btn"
                size="mini"
                @click="handleAdd(scope.$index, scope.row)"
                icon="el-icon-edit"
              >编辑</el-button>
              <el-button
                class="btn"
                size="mini"
                @click="handleAdd(scope.$index, scope.row)"
                icon="el-icon-document-delete"
              >删除</el-button>
              <el-button
                class="btn"
                size="mini"
                @click="handleAdd(scope.$index, scope.row)"
                icon="el-icon-info"
              >详情</el-button>
              <el-button
                class="btn"
                size="mini"
                @click="handleAdd(scope.$index, scope.row)"
                v-show="scope.delFlag==0?false:true"
                icon="el-icon-circle-close"
              >注销</el-button>
              <el-button
                class="btn"
                size="mini"
                @click="handleAdd(scope.$index, scope.row)"
                v-show="scope.delFlag==0?true:false"
              >恢复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <footer>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-smoking" @click="register">注册</el-button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  components: {},
  computed: {},
  mounted() {
    this.getTableInfo()
  },
  watch: {},
  methods: {
    getTableInfo() {
      let that = this
      this.$service
        .get('http://192.168.5.61:9080/api/sys/open/service/query_like')
        .then(function(res) {
          console.log(res)
          that.tableData = res.data.result.list
          that.tableData.forEach(element => {
            if (element.delFlag == 0) {
              element.delFlag = '正常'
            } else {
              element.delFlag = '注销'
            }
          })
        })
    }, //获取表格数据
    handleAdd() {},
    //注册
    register() {
      this.$router.push({ path: '/set/serveBaseInfo' })
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
    width: 100%;
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
    margin-top: 50px;
    width: 100%;
    text-align: center;
  }
}
</style>
