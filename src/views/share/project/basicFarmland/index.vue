<template>
  <div class="Service_resources">
    <el-container style="margin:10vh 10vw">
      <el-header class="header">
        <div class="serveTittle">
          <h1>服务资源</h1>
        </div>
        <div class="serveSearch">
          <el-input placeholder="搜索数据"></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          stripe
          :header-cell-style="{
       'background-color': '#AFB3D7','color': 'white',}"
          :show-header="false"
          :border="true"
        >
          <el-table-column prop="date" label="数据名称" min-width="25">
            <template slot-scope="scope">
              <span class="tips">*</span>
              <span>{{scope.row.namech}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数据名称" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.namech == '服务类型'">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox
                    :label="item.namech+'('+(item.count)+')'"
                    v-for="item in scope.row.children"
                    :key="item.id"
                    @change="checkname"
                  ></el-checkbox>
                </el-checkbox-group>
              </span>
              <span v-if="scope.row.namech == '主题分类'">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox
                    :label="item.namech+'('+(item.count)+')'"
                    v-for="item in scope.row.children"
                    :key="item.id"
                  ></el-checkbox>
                </el-checkbox-group>
              </span>
              <span v-if="scope.row.namech == '覆盖区域'">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox
                    :label="item.namech+'('+(item.count)+')'"
                    v-for="item in scope.row.children"
                    :key="item.id"
                  ></el-checkbox>
                </el-checkbox-group>
              </span>
              <span v-if="scope.row.namech == '坐标系'">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox
                    :label="item.namech+'('+(item.count)+')'"
                    v-for="item in scope.row.children"
                    :key="item.id"
                  ></el-checkbox>
                </el-checkbox-group>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="moreclass">
          <span>更多分类</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <!-- 总条数 -->
        <div class="totalline">
          <div class="totalleft">
            <span>显示：</span>
            <span>{{startpage}}-{{endpage}}条,</span>
            <span>共{{total}}条</span>
          </div>
          <div class="totalright">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <!-- 卡片视图 -->
        <div class="card">
          <el-card :body-style="{ padding: '0px' }" v-for="(p,index) in distlist" :key="index">
            <img
              src="http://192.168.5.88:9080/api/inputCatalogPic/140981/20430/browse.png"
              class="image"
            >
            <div style="padding: 37px 10px 10px;">
              <span style="font-size:20px;font-weight:400">{{p.unit}}</span>
              <div style="height:20px;margin-top:10px;margin-bottom:10px">
                <div class="left">
                  <span style="color:#D3D6DB">{{p.unit}}</span>
                </div>
                <div class="right">
                  <i class="el-icon-view"></i>
                  <span>{{p.pageView}}</span>
                </div>
              </div>
              <div style="border-bottom:1px solid #ccc;padding-bottom:10px">
                <el-tag v-for="tag in p.keyword.split('，')" :key="tag.name" type="info">{{tag}}</el-tag>
              </div>

              <div class="bottom clearfix">
                <span>{{p.unit}}</span>
                <time class="time">{{ p.createTime}}</time>
              </div>
            </div>
          </el-card>
        </div>
      </el-main>
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
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' }
      ],

      //显示查看获取所有数据
      result: [],
      ishow: false,
      gradResult: {}, // 分次显示的结果
      num: 0,
      startTime: '2019-05-12 00:15:00', //开始时间
      endTime: '2019-05-12 05:29:59', //结束时间
      dataformat: '', // 数据格式选择
      radioList: [], //数据格式获取
      resultedList: '',
      tableData: [
        {
          name: '服务类型：'
        },
        {
          name: '主题分类：'
        },
        {
          name: '覆盖区域：'
        },
        {
          name: '坐标系：'
        }
      ], //服务目录
      checkList: ['选中且禁用', '复选框 A'], //服务类型
      searchTypeList: [],
      searchType: '',
      variableType: '', // 选择变量绑定
      variableList: [], // 所有选择变量保存
      resultList: [],
      total: 0, //共有多少条数据
      startpage: 1, //开始页码
      endpage: 10, //结束页码
      distlist: [] //卡片视图数据
    }
  },
  components: {},
  computed: {},
  mounted() {
    this.getservedist()
    this.getdistresouce()
  },
  watch: {},
  methods: {
    //获取服务目录
    getservedist() {
      let that = this
      this.$service
        .post('http://192.168.5.61:9080/api/sys/open/service/category')
        .then(function(res) {
          // console.log(res.data.result)
          that.tableData = res.data.result
        })
    },
    getdistresouce() {
      let that = this
      this.$service
        .get('http://192.168.5.61:9080/api/sys/open/service/query_like')
        .then(function(res) {
          console.log(res.data.result)
          var total = res.data.result
          that.total = total.pageSize * total.size
          that.startpage = (total.pageNum - 1) * total.pageSize + 1
          that.endpage = total.pageSize * total.pageNum
          that.distlist = total.list

          console.log(
            "TCL: getdistresouce -> total.keyword.split(',')",
            total.list[0].keyword.split('，')
          )
        })
    },
    checkname(obj) {
      console.log(obj)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.Service_resources {
  .header {
    height: 67px;
    line-height: 67px;
    overflow: hidden;
    .serveTittle {
      h1 {
        font-size: 30px;
        float: left;
        color: black;
      }
    }
    .serveSearch {
      float: right;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      .el-input {
        width: 500px;
      }
      .el-button {
        margin-left: -3px;
        margin-top: -3px;
        height: 33px;
      }
    }
  }
  .moreclass {
    text-align: center;
    color: #ccc;
    margin-top: 10px;
  }
  .totalline {
    height: 30px;
    line-height: 30px;
    margin-top: 5vh;
    margin-bottom: 5vh;
    .totalleft {
      float: left;
    }
    .totalright {
      float: right;
    }
  }
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    .el-card {
      width: 21%;
      .left {
        float: left;
      }
      .right {
        float: right;
      }
      .el-tag {
        margin-left: 10px;
        &:nth-of-type(1) {
          margin-left: 0;
        }
      }
    }
    img {
      width: 100%;
      height: 90%;
    }
    .time {
      font-size: 13px;
      color: #999;
      width: 50%;
      text-align: right;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
      display: flex;
      justify-content: space-between;
      span {
        width: 50%;
      }
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: '';
    }

    .clearfix:after {
      clear: both;
    }
  }
}
</style>
