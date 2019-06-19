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
      <el-button type="primary">订单</el-button>
      <el-button type="success">成功按钮</el-button>
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
      <el-button type="primary">查询</el-button>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          border
          ref="multipleTable"
          :data="orderinfo"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="订单号" prop="orderNo"></el-table-column>

          <el-table-column prop="status" label="审批状态" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="下单时间"></el-table-column>

          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="info">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
          label: '审批通过'
        },
        {
          value: '选项2',
          label: '审批未通过'
        }
      ],
      item: '审批状态',
      orderinfo: []
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
    },
    handleSelectionChange(val) {
      console.log(val)
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
  }
}
</style>
