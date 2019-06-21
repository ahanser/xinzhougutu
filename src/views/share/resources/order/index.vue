<template>
  <div class="order">
    <el-row class="order_header">
      <el-col :span="8">
        <h1>我的订单</h1>
      </el-col>
      <el-col :span="16" style="text-align:right">
        <el-button type="info" icon="el-icon-refresh"></el-button>
        <el-button type="primary">数据</el-button>
      </el-col>
    </el-row>
    <el-row class="search">
      <el-col :offset="1">
        <el-button type="primary" class="orderName">订单名称</el-button>
        <el-select v-model="item" placeholder="审批状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
        <el-select v-model="item" placeholder="审批状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker value-format="yyyy" v-model="yearstar" type="year" placeholder="选择年"></el-date-picker>至
        <el-date-picker value-format="yyyy" v-model="yearend" type="year" placeholder="选择年"></el-date-picker>
        <el-button type="primary" size="medium">查询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          border
          class="formstyle"
          ref="multipleTable"
          :data="orderinfo"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="订单号" prop="orderNo" align="center"></el-table-column>
          <el-table-column label="订购人" prop="receiverName" align="center"></el-table-column>
          <el-table-column label="数据量" prop="orderNum" align="center"></el-table-column>
          <el-table-column label="数据大小" prop="orderSize" align="center"></el-table-column>
          <el-table-column label="数据类型" prop="orderType" align="center"></el-table-column>
          <el-table-column prop="status" label="审批状态" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="createTime" label="下单时间" align="center"></el-table-column>
          <el-table-column label="操作" width="520" align="center">
            <template slot-scope="scope">
              <el-button type="info" @click="orderInfo">订单详情</el-button>
              <em class="lineBar">l</em>
              <el-button type="info">数据详情</el-button>
              <em class="lineBar">l</em>
              <el-button type="info">取消详情</el-button>
              <em class="lineBar">l</em>
              <el-button type="info" @click="approval">审批详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 审批状态对话框 -->
    <el-dialog title="审批处理" :visible.sync="approvalVisible" width="30%" top="30vh">
      <el-form label-position="right" label-width="80px" :model="formLabelAlign">
        <el-form-item label="审批处理:">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="说明:">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="approvalVisible = false">确 定</el-button>
        <el-button @click="approvalVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import esriLoader from 'esri-loader'
import url from '@/api/port'
import qs from 'qs'
export default {
  data() {
    return {
      yearstar: '',
      yearend: '',
      options: [
        {
          value: '选项1',
          label: '待审批'
        },
        {
          value: '选项2',
          label: '审批通过'
        }
      ],
      item: '审批状态',
      orderinfo: [],
      approvalVisible: false, //审批状态对话框
      textarea: '', //文本域输入内容
      formLabelAlign: {} //审核对话框表单
    }
  },
  name: 'Layout',
  components: {},
  computed: {},
  mounted() {
    this.getorderList()
  },
  watch: {},
  methods: {
    //获取表单数据
    getorderList() {
      let that = this
      this.$service.get(url.getorderList).then(function(res) {
        console.log(res)
        that.orderinfo = res.data.result.list
        for (var i = 0; i < that.orderinfo.length; i++) {
          if ((that.orderinfo[i].status = '20')) {
            that.orderinfo[i].status = '待审批'
          } else {
            that.orderinfo[i].status = '审批通过'
          }
        }
      })
      var scrollbarwrap = document.getElementsByClassName('el-scrollbar__wrap')
      //console.log(scrollbarwrap)
      for (var o = 0; o < scrollbarwrap.length; o++) {
        scrollbarwrap[o].style.marginBottom = 0
      }
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    //审批状态对话框
    approval() {
      this.approvalVisible = true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.order {
  margin-top: 10vh;
  padding: 30px 20px;
  .order_header {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    h1 {
      border-left: 3px solid #333;
      padding: 0 20px;
    }
  }
  .search {
    margin: 30px 0 50px;
    .orderName {
      background-color: #fff;
      color: black;
      border: 1px solid #ccc;
    }
  }
  .formstyle {
    .el-button {
      background-color: #fff;
      color: black;
      border: none;
    }
    .lineBar {
      width: 1px !important;
      height: 20px;
      background: #ccc;
      color: transparent;
      border-radius: 50px;
    }
  }
  /deep/.el-dialog__body {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
}
</style>
