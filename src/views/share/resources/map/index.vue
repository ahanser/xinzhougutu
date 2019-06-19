<template>
  <div class="mapIndex">
    <div id="viewDiv"></div>
    <!-- 搜索条件 -->
    <el-row id="searchBox">
      <el-col :span="4" class="SearchIn">
        <el-input placeholder="在已有成果目录里面查询" v-model="searchInput">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="16">
        <el-select v-model="treechild" placeholder="目录名称" @change="chooseResult">
          <el-option
            v-for="treechild in treeTab"
            :key="treechild.sort"
            :label="treechild.name"
            :value="treechild.name"
          ></el-option>
        </el-select>
        <el-select v-model="typeValue" placeholder="文件名称">
          <el-option
            v-for="typeValue in options"
            :key="typeValue.sort"
            :label="typeValue.name"
            :value="typeValue.name"
          ></el-option>
        </el-select>

        <el-select v-model="areaValue" placeholder="行政区划名称">
          <el-option
            v-for="areaValue in area"
            :key="areaValue.value"
            :label="areaValue.name"
            :value="areaValue.name"
          ></el-option>
        </el-select>

        <label for="生产年份">生产年份</label>
        <el-date-picker value-format="yyyy" v-model="yearstar" type="year" placeholder="选择年"></el-date-picker>至
        <el-date-picker value-format="yyyy" v-model="yearend" type="year" placeholder="选择年"></el-date-picker>
        <el-button id="SearchBtn" size="small" round @click="searchFn">查 询</el-button>
        <el-button size="small" round>重 置</el-button>
      </el-col>
      <el-col :span="4">
        <i class="el-icon-location"></i>
        <span @click="resultcar()">
          成果车
          <i>{{ItemNum}}</i>
        </span>
      </el-col>
    </el-row>
    <!-- 左侧树形tab -->
    <div id="treeTab">
      <el-collapse v-model="activeName1" accordion>
        <el-collapse-item
          v-for="(liTab,index) in treeTab"
          :key="index"
          :title="liTab.name"
          :name="liTab.id"
        >
          <div class="Lbar" v-for="(bar,index) in liTab.children" :key="index">
            <el-checkbox name="checkedF" v-model="bar.checked" @change="checkedFn(bar)">{{bar.name}}</el-checkbox>
            <!-- <el-switch
              style="display: block"
              v-model="bar.valueSwitch"
              active-color="#1D5DBB"
              inactive-color="#05a8b7"
              active-text="图"
              inactive-text="区"
              @change="switchFn(bar)"
            ></el-switch>-->
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 右侧信息栏 -->
    <span id="flexBtn" class="el-icon-arrow-right"></span>
    <div id="rightDetail">
      <el-row :span="24">
        <el-col class="resultTit" :span="24">
          结果展示
          <span class="resultNum">共{{totalInfo}}条</span>
        </el-col>
        <el-col :span="24">
          <span>已选: {{checkedNum}}条</span>
          <el-button type="primary" round @click="addresult1()">加入成果车</el-button>
        </el-col>
        <el-col :span="24">
          <el-table
            ref="multipleTable"
            :data="tableDatachild"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="catalogName" label="快视图">
              <template slot-scope="scope">
                <img :src="scope.row.quickViewURLPath" alt>
              </template>
            </el-table-column>
            <el-table-column prop="catalogName" label="目录名称"></el-table-column>
            <el-table-column prop="fileClass" label="文件类别"></el-table-column>
            <el-table-column prop="xzqhmc" label="行政区划名称" width="100%"></el-table-column>
            <el-table-column prop="year" label="生产年份"></el-table-column>

            <el-table-column prop="edit" label="操作">
              <template class="temp" slot-scope="scope">
                <el-button class="btn" size="mini" @click="handleZoom(scope.$index, scope.row)">
                  <i class="el-icon-search" style="font-size:17px"></i>
                </el-button>
                <el-button class="btn" size="mini" @click="addresult(scope.$index, scope.row)">
                  <i class="el-icon-goods" style="font-size:17px"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalInfo"
            v-model="pageNum"
            :current-page.sync="pageNum"
            @current-change="page()"
            :page-size="7"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
    <!-- 地图工具条 -->
    <div id="mapTool">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          定位工具
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">工具一</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">工具二</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <em class="lineBar"></em>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          范围查询
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">工具一</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">工具二</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <em class="lineBar"></em>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          测量工具
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">工具一</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">工具二</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <em class="lineBar"></em>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          清楚图形
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">工具一</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">工具二</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 地图切换 -->
    <div id="mapTrag" @click="toggleMap">
      <img :src="mapIcon" alt>
      <span id="mapName">{{mapType}}</span>
      <!-- <el-radio-group v-model="radio3" @change="radioFn">
        <el-radio-button label="矢量图"></el-radio-button>
        <el-radio-button label="影像图"></el-radio-button>
        <el-radio-button label="其他"></el-radio-button>
      </el-radio-group>-->
    </div>
    <!-- 模态框 -->
    <el-dialog id="tableDialog" title :visible.sync="dialogTableVisible">
      <el-table :data="tableDialog" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-button class="tag" size="mini" round>概要</el-button>
            <el-button class="tag" size="mini" round>详情</el-button>
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="一级类别">
                <span>{{ props.row.classtype }}</span>
              </el-form-item>

              <el-form-item label="数据名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="数据类型">
                <span>{{ props.row.type }}</span>
              </el-form-item>
              <el-form-item label="生产年份">
                <span>{{ props.row.date }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="一级类别" prop="classtype"></el-table-column>
        <el-table-column label="数据名称" prop="name"></el-table-column>
        <el-table-column label="数据类型" prop="type"></el-table-column>
        <el-table-column label="生产年份" prop="date"></el-table-column>
        <el-table-column label="操 作" prop="edit">
          <template class="temp" slot-scope="scope">
            <el-button class="btn" size="mini" @click="handleAdd(scope.$index, scope.row)">
              <i class="el-icon-location"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 成果车 -->
    <el-dialog id="resultDialog" title :visible.sync="dialogResultVisible" width="75%" top="3vh">
      <h2 style="margin:0;margin-left:100px">成果车</h2>
      <div style="text-align:right">
        <el-input placeholder="请输入数据" style="width:15%"></el-input>
        <el-button type="primary" icon="el-icon-search" style="margin:0 110px 0 -9px;height:33px"></el-button>
      </div>

      <el-tabs v-model="activeName">
        <el-tab-pane :label="uerallData" name="first" style="width:100%;padding: 0 100px">
          <div v-for="(dataObj,index) in tableDataall" :key="index">
            <div class="datatype">
              <div class="left">
                <span>数据类型：</span>
                <span>{{dataObj.groupName}}</span>
              </div>
              <div class="right" @click="showtable">
                <span>{{showText}}</span>
                <i :class="iconType"></i>
              </div>
            </div>
            <el-table
              ref="multipleTable1"
              :data="dataObj.cartProductVoList"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="rusultSelectionChange"
              :header-cell-style="{background:'#eee',color:'#000000',height:'50px'}"
              v-show="tableInfo"
            >
              <el-table-column type="selection"></el-table-column>
              <el-table-column label="日期" align="center" prop="year"></el-table-column>
              <el-table-column prop="catalogName" label="目录名称" align="center"></el-table-column>
              <el-table-column prop="fileClass" label="文件名称" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="xzqhmc" label="地址" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="remove(scope.$index, scope.row)">移除</el-button>
                  <el-button>详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- </div> -->
            <!-- <div class="moredata" @click="moredata()">
            更多数据
            <i class="el-icon-arrow-down"></i>
          </div>
          <div class="datatype">
            <div class="left">
              <span>数据类型：</span>
              <span>第三次国土调查统一时点数据</span>
            </div>
            <div class="right" @click="showtable1">
              <span>{{showText1}}</span>
              <i :class="iconType1"></i>
            </div>
          </div>
          <el-table
            ref="multipleTable2"
            :data="tableData4"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{background:'#eee',color:'#000000',height:'50px'}"
            v-show="tableInfo1"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="日期" align="center" prop="year"></el-table-column>
            <el-table-column prop="catalogName" label="目录名称" align="center"></el-table-column>
            <el-table-column prop="fileClass" label="文件名称" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="xzqhmc" label="地址" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="remove(scope.$index, scope.row)">移除</el-button>
                <el-button>详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="moredata" @click="moredata()">
            更多数据
            <i class="el-icon-arrow-down"></i>
          </div>
          
            </div>-->
          </div>
          <div class="foots" style="margin-top:50px;">
            <div>
              <el-checkbox @change="allcheck" :checked="false">全选</el-checkbox>
            </div>
            <div style="text-align:right">
              已选成果数
              <span class="resultNum">{{resultSettlement}}</span>个
              <el-button type="primary" @click="settle" :disabled="openorder">结算</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="矢量地图数据33" name="second"></el-tab-pane>
        <el-tab-pane label="模拟地形图148" name="third"></el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!-- 地图对话框 -->
    <el-dialog id="tableDialog" title :visible.sync="dialogMapVisible" width="50%">
      <div style="overflow-y:auto;height:400px">
        <el-table :data="tableData5" style="width: 100%">
          <el-table-column type="expand" style="margin:0 auto">
            <template slot-scope="props">
              <el-switch
                v-model="value3"
                active-text="概要"
                inactive-text="详情"
                inactive-color="#13ce66"
                style="margin-bottom:15px"
              ></el-switch>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="行政区划名称:">
                  <span>{{ props.row.xzqhmc }}</span>
                </el-form-item>
                <el-form-item label="行政区划代码:">
                  <span>{{ props.row.xzqhdm }}</span>
                </el-form-item>
                <el-form-item label="目录名称:">
                  <span>{{ props.row.catalogName }}</span>
                </el-form-item>
                <el-form-item label="文件类别:">
                  <span>{{ props.row.fileClass }}</span>
                </el-form-item>
                <el-form-item label>
                  <img
                    :src="props.row.browseURLPath"
                    alt
                    style="width:150px;height:150px"
                    class="browseURL"
                  >
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="目录名称" prop="catalogName" width="350" align="center"></el-table-column>
          <el-table-column label="文件类别" prop="fileClass" align="center"></el-table-column>
          <el-table-column label="行政区划名称" prop="xzqhmc" align="center" width="200"></el-table-column>
          <el-table-column label="数据年份" prop="year" align="center"></el-table-column>
          <el-table-column label="操作" prop="desc" align="center">
            <template slot-scope="scoped">
              <i class="el-icon-goods"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!--结算页面 -->
    <el-dialog id="settleDialog" title :visible.sync="dialogSettleVisible" width="80%">
      <el-container style="padding:30px 130px 0">
        <el-header>
          <h1 style="font-size:40px">核对订单信息</h1>
        </el-header>
        <el-main>
          <div class="datafrom">
            数据来源：
            <span>第三次国土调查统一时点数据</span>
          </div>
          <el-card style="margin-bottom:30px">
            <!-- <header style class="productHeader">
              产品类别：
              <span>{{cartlist.catalogName}}</span>
            </header>-->
            <div class="cardContent">
              <div class="leftContent">
                <div class="top" v-for="card in cartlist" :key="card.fileId">
                  <img :src="card.browseURLPath" alt>
                  <div class="text">
                    <p>
                      目录名称：
                      <span>{{card.fileClass}}</span>
                    </p>
                    <p>
                      行政区划名称：
                      <span>{{card.xzqhmc}}</span>
                    </p>
                    <p>
                      生产年份：
                      <span>{{card.year}}</span>
                    </p>
                  </div>
                </div>
                <!-- <div class="top" style="border-bottom:none">
                  <img :src="card.browseURLPath" alt>
                  <div class="text">
                    <p>
                      新图号：
                      <span>{{card.fileClass}}</span>
                    </p>
                    <p>
                      新图号：
                      <span>{{card.xzqhmc}}</span>
                    </p>
                    <p>
                      新图号：
                      <span>{{card.year}}</span>
                    </p>
                  </div>
                </div>-->
              </div>
              <div class="rightContent">
                <h3>服务推荐</h3>
                <div style="margin-bottom:30px">
                  <p>增值电信业务经营许可证：浙B2-20080224</p>
                  <p>网络文化经营许可证：浙网文[2016]0268-0</p>
                  <p>增值电信业务经营许可证：浙B2-20080224</p>
                </div>
                <div style="margin-bottom:30px">
                  <p>增值电信业务经营许可证：浙B2-20080224</p>
                  <p>网络文化经营许可证：浙网文[2016]0268-0</p>
                  <p>增值电信业务经营许可证：浙B2-20080224</p>
                </div>
                <el-button type="primary" plain>点击展开</el-button>
              </div>
            </div>
          </el-card>
          <!-- <el-card style="margin-bottom:30px">
            <header style class="productHeader">
              产品类别：
              <span>矢量地图数据</span>
            </header>
            <div class="cardContent">
              <div class="leftContent">
                <div class="top">
                  <img
                    src="http://192.168.5.88:9080/api/inputCatalogPic/140981/20430/browse.png"
                    alt
                  >
                  <div class="text">
                    <p>
                      新图号：
                      <span>111</span>
                    </p>
                    <p>
                      新图号：
                      <span>111</span>
                    </p>
                    <p>
                      新图号：
                      <span>111</span>
                    </p>
                  </div>
                </div>
                <div class="top" style="border-bottom:none">
                  <img
                    src="http://192.168.5.88:9080/api/inputCatalogPic/140981/20430/browse.png"
                    alt
                  >
                  <div class="text">
                    <p>
                      新图号：
                      <span>111</span>
                    </p>
                    <p>
                      新图号：
                      <span>111</span>
                    </p>
                    <p>
                      新图号：
                      <span>111</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="rightContent">
                <h3>服务推荐</h3>
                <div style="margin-bottom:30px">
                  <p>增值电信业务经营许可证：浙B2-20080224</p>
                  <p>网络文化经营许可证：浙网文[2016]0268-0</p>
                  <p>增值电信业务经营许可证：浙B2-20080224</p>
                </div>
                <div style="margin-bottom:30px">
                  <p>增值电信业务经营许可证：浙B2-20080224</p>
                  <p>网络文化经营许可证：浙网文[2016]0268-0</p>
                  <p>增值电信业务经营许可证：浙B2-20080224</p>
                </div>
                <el-button type="primary" plain>点击展开</el-button>
              </div>
            </div>
          </el-card>-->
          <div style="border-top: 1px solid #eee;height:50px;line-height:50px" class="datafrom">
            数据来源：
            <span>第三次国土调查统一时点数据</span>
          </div>
          <el-card style="margin-bottom:30px">
            <div class="cardContent">
              <div class="leftContent">
                <div class="top">
                  <img
                    src="http://192.168.5.88:9080/api/inputCatalogPic/140981/20430/browse.png"
                    alt
                  >
                  <div class="text">
                    <p>
                      新图号：
                      <span>111</span>
                    </p>
                    <p>
                      新图号：
                      <span>111</span>
                    </p>
                    <p>
                      新图号：
                      <span>111</span>
                    </p>
                  </div>
                </div>
                <div class="top" style="border-bottom:none">
                  <img
                    src="http://192.168.5.88:9080/api/inputCatalogPic/140981/20430/browse.png"
                    alt
                  >
                  <div class="text">
                    <p>
                      新图号：
                      <span>111</span>
                    </p>
                    <p>
                      新图号：
                      <span>111</span>
                    </p>
                    <p>
                      新图号：
                      <span>111</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="rightContent">
                <h3>服务推荐</h3>
                <div style="margin-bottom:30px">
                  <p>增值电信业务经营许可证：浙B2-20080224</p>
                  <p>网络文化经营许可证：浙网文[2016]0268-0</p>
                  <p>增值电信业务经营许可证：浙B2-20080224</p>
                </div>
                <div style="margin-bottom:30px">
                  <p>增值电信业务经营许可证：浙B2-20080224</p>
                  <p>网络文化经营许可证：浙网文[2016]0268-0</p>
                  <p>增值电信业务经营许可证：浙B2-20080224</p>
                </div>
                <el-button type="primary" plain>点击展开</el-button>
              </div>
            </div>
          </el-card>
        </el-main>
      </el-container>
      <div class="footer">
        <div class="topInfo">
          <span>订单成果申请</span>
          <span @click="order">
            为了不影响成果申请，请如实填写信息
            <i class="el-icon-arrow-down"></i>
          </span>
          <span>
            成果数
            <span style="font-size:40px">{{resultorderNum}}</span>个
            <el-button type="primary" plain @click="postorder">提交订单</el-button>
          </span>
        </div>

        <el-form :model="formInline" label-width="100px" v-show="fromorder">
          <el-form-item label="单位名称：">
            <el-input v-model="formInline.unitName" placeholder="单位名称"></el-input>
          </el-form-item>
          <el-form-item label="详细地址：">
            <el-input v-model="formInline.receiverAddress" placeholder="详细地址"></el-input>
          </el-form-item>
          <el-form-item label="经办人姓名：">
            <el-input v-model="formInline.receiverName" placeholder="经办人姓名"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码：">
            <el-input v-model="formInline.receiverZip" placeholder="邮政编码"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input v-model="formInline.receiverPhone" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱：">
            <el-input v-model="formInline.receiverMobile" placeholder="电子邮箱"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import esriLoader from 'esri-loader'
import url from '@/api/port'
import qs from 'qs'
export default {
  name: 'Layout',
  components: {},
  computed: {},
  data() {
    return {
      areaValue: '', //搜索栏行政区域
      fromorder: false,
      formInline: {
        unitName: '',
        receiverAddress: '',
        receiverMobile: '',
        receiverPhone: '',
        receiverZip: '',
        receiverName: ''
      }, //表单数据
      dialogSettleVisible: false,
      dialogMapVisible: false, //矩形对话框
      showText: '展开',
      iconType: 'el-icon-arrow-down',
      showText1: '展开',
      iconType1: 'el-icon-arrow-down',
      tableInfo: true, //收起展开
      tableInfo1: true,
      uerallData: '',
      tableDataall: [],
      dataObj: {},
      tableData3: [], //成果车表格数据
      tableData4: [],
      resultSettlement: 0,
      resultSettlearr: [],
      pageNum: 1,
      totalInfo: 0,
      multipleSelection: [],
      mapOptions: '', //全局arcgis.js
      map: '',
      mapType: '卫星图像',
      mapIcon: require('../../../../assets/yingxaingtu.png'),
      mapObject: {
        map: '', //实例对象
        ZOOM: '8',
        CENTER: [108, 34],
        housingLayer: '', //底层地图
        Ext: '', //可视范围
        mapview: '', //视图容器
        scale: '2000000'
      },
      dialogResultVisible: false, //成果车显示
      layer: '',
      layer_anno: '',
      layer_yingxiang: '',
      layer_yingxiangLabel: '',
      radio3: '矢量图',
      searchInput: '', //搜索框
      typeValue: '文件名称', //类别下拉框
      typeValue1: '', //类别下拉框
      options: [],
      openorder: true,
      dateVal: '',
      ItemNum: 566,
      resultNum: 323,
      checkedNum: 0,
      // tabel---表头
      classType: '一级类别',
      tableData: [],
      treeTabs: [{ id: 1, tab: '三次调查成果' }, { id: 2, tab: '其他' }],
      treeTab: [
        {
          id: 0,
          name: '三次调查成果',
          children: [
            { id: '0-1', name: '数据库成果', checked: true, valueSwitch: true },
            { id: '0-2', name: '成果统计', checked: false, valueSwitch: false }
          ]
        },
        {
          id: 1,
          title: '其他数据成果',
          bars: [
            {
              id: '1',
              name: '未知'
            }
          ]
        }
      ],
      dataId: '',
      tableData5: [], //矩形表格数据
      value3: true,
      dataI: '',
      dataRes: [],
      checked: true,
      checkedF: false,
      tableDatachild: [],
      //模态框
      tableDialog: [
        {
          classtype: '三次调查成果',
          name: '数据库成果',
          type: '矢量',
          date: '2019'
        },
        {
          classtype: '三次调查成果',
          name: '数据库成果',
          type: '矢量',
          date: '2019'
        }
      ],
      dialogTableVisible: false,
      activeName1: '1',
      flag: true,
      flexFlag: true,
      command1: '',
      command2: '',
      command3: '',
      yearstar: '',
      yearend: '',
      verArry: [],
      mapId: [],
      rigthdata: [],
      objlargearry: [],
      regExes: {},
      area: [],
      filetype: [],
      cartlist: [],
      card: {},
      shippingId: '',
      resultorderNum: 1, //结算订单数量
      treechild: '目录名称',
      polygondata: [], //多边形的数据
      activeName: 'first',
      pokygonId: '', //区分绘制图层id
      polygonGraphic: [], //多边形
      realParent: '', //左侧勾选框的名字
      filename: '', //左侧勾选框的filename
      xzqhdmonly: '' //发送请求的地区保存
    }
  },
  mounted() {
    this.mapFn()
    this.heightFn()
    this.initTreeFn()
    this.getarea()
    this.getcatLIst()
    //this.getuserInfo()
  },
  watch: {},
  methods: {
    mapFn() {
      let that = this
      const mapURL = {
        url: 'http://192.168.5.88:8080/arcgis_js_api/library/4.9/init.js'
      }
      esriLoader
        .loadModules(
          [
            'esri/Map',
            'esri/views/MapView',
            'esri/layers/WebTileLayer',
            'esri/layers/support/TileInfo',
            'esri/core/urlUtils',
            'esri/Graphic',
            'esri/geometry/Point',
            'dojo/domReady!'
          ],
          mapURL
        )
        .then(
          ([
            Map,
            MapView,
            WebTileLayer,
            TileInfo,
            urlUtils,
            Graphic,
            Point
          ]) => {
            urlUtils.addProxyRule({
              urlPrefix: 'http://192.168.5.88:6080',
              proxyUrl: 'http://192.168.5.88:8080/Java/proxy.jsp'
            })
            var tileInfo = new TileInfo({
              dpi: 90.71428571427429,
              rows: 256,
              cols: 256,
              compressionQuality: 0,
              origin: {
                x: -180,
                y: 90
              },
              spatialReference: {
                wkid: 4326
              },
              lods: [
                {
                  level: 2,
                  levelValue: 2,
                  resolution: 0.3515625,
                  scale: 147748796.52937502
                },
                {
                  level: 3,
                  levelValue: 3,
                  resolution: 0.17578125,
                  scale: 73874398.264687508
                },
                {
                  level: 4,
                  levelValue: 4,
                  resolution: 0.087890625,
                  scale: 36937199.132343754
                },
                {
                  level: 5,
                  levelValue: 5,
                  resolution: 0.0439453125,
                  scale: 18468599.566171877
                },
                {
                  level: 6,
                  levelValue: 6,
                  resolution: 0.02197265625,
                  scale: 9234299.7830859385
                },
                {
                  level: 7,
                  levelValue: 7,
                  resolution: 0.010986328125,
                  scale: 4617149.8915429693
                },
                {
                  level: 8,
                  levelValue: 8,
                  resolution: 0.0054931640625,
                  scale: 2308574.9457714846
                },
                {
                  level: 9,
                  levelValue: 9,
                  resolution: 0.00274658203125,
                  scale: 1154287.4728857423
                },
                {
                  level: 10,
                  levelValue: 10,
                  resolution: 0.001373291015625,
                  scale: 577143.73644287116
                },
                {
                  level: 11,
                  levelValue: 11,
                  resolution: 0.0006866455078125,
                  scale: 288571.86822143558
                },
                {
                  level: 12,
                  levelValue: 12,
                  resolution: 0.00034332275390625,
                  scale: 144285.93411071779
                },
                {
                  level: 13,
                  levelValue: 13,
                  resolution: 0.000171661376953125,
                  scale: 72142.967055358895
                },
                {
                  level: 14,
                  levelValue: 14,
                  resolution: 8.58306884765625e-5,
                  scale: 36071.483527679447
                },
                {
                  level: 15,
                  levelValue: 15,
                  resolution: 4.291534423828125e-5,
                  scale: 18035.741763839724
                },
                {
                  level: 16,
                  levelValue: 16,
                  resolution: 2.1457672119140625e-5,
                  scale: 9017.8708819198619
                },
                {
                  level: 17,
                  levelValue: 17,
                  resolution: 1.0728836059570313e-5,
                  scale: 4508.9354409599309
                },
                {
                  level: 18,
                  levelValue: 18,
                  resolution: 5.3644180297851563e-6,
                  scale: 2254.4677204799655
                },
                {
                  level: 19,
                  levelValue: 19,
                  resolution: 2.68220901489257815e-6,
                  scale: 1127.23386023998275
                },
                {
                  level: 20,
                  levelValue: 2,
                  resolution: 1.341104507446289075e-6,
                  scale: 563.616930119991375
                }
              ]
            })
            // 根据现有信息新建 WebTiledLayer 如下

            this.layer = new WebTileLayer(
              'http://{subDomain}.tianditu.com/DataServer?T=vec_c&x={col}&y={row}&l={level}&tk=4496625d338e0c78e8d76d097b2293aa',
              {
                // subDomains: ['t0','t1','t2','t3','t4','t5','t6','t7'],
                subDomains: ['t0'],
                tileInfo: tileInfo
              }
            )
            this.layer_anno = new WebTileLayer(
              'http://{subDomain}.tianditu.com/DataServer?T=cva_c&x={col}&y={row}&l={level}&tk=4496625d338e0c78e8d76d097b2293aa',
              {
                //subDomains: ['t0','t1','t2','t3','t4','t5','t6','t7'],
                subDomains: ['t0'],
                tileInfo: tileInfo
              }
            )
            this.layer_yingxiang = new WebTileLayer(
              'http://{subDomain}.tianditu.com/DataServer?T=img_c&x={col}&y={row}&l={level}&tk=4496625d338e0c78e8d76d097b2293aa',
              {
                // subDomains: ['t0','t1','t2','t3','t4','t5','t6','t7'],
                subDomains: ['t0'],
                tileInfo: tileInfo
              }
            )
            this.layer_yingxiangLabel = new WebTileLayer(
              'http://{subDomain}.tianditu.com/DataServer?T=cia_c&x={col}&y={row}&l={level}&tk=4496625d338e0c78e8d76d097b2293aa',
              {
                //subDomains: ['t0','t1','t2','t3','t4','t5','t6','t7'],
                subDomains: ['t0'],
                tileInfo: tileInfo
              }
            )
            // 创建地图，不设置底图，如果设置底图会造成坐标系无法被转换成 ESPG:4326 (WGS1984)
            this.mapObject.map = new Map({
              spatialReference: {
                wkid: 4326
              },
              basemap: {
                baseLayers: [this.layer, this.layer_anno]
              }
            })

            // 创建MapView
            this.mapObject.mapview = new MapView({
              container: 'viewDiv',
              spatialReference: {
                wkid: 4326
              },
              map: this.mapObject.map,
              center: this.mapObject.CENTER,
              //1:scale的图
              scale: this.mapObject.scale
            })
            //创建MapView后的点击事件
            this.mapObject.mapview.on('click', function(e) {
              console.log(e)

              var point = new Point({
                x: e.mapPoint.x,
                y: e.mapPoint.y,
                spatialReference: { wkid: 4326 }
              })
              that.polygonGraphic.forEach(element => {
                if (element.geometry.contains(point)) {
                  console.log('我被点击了')
                  //弹窗显示
                  that.dialogMapVisible = true
                  that.xzqhdmomly = element.xzqhdm
                  //获取弹窗数据
                  that.$service
                    .post(
                      url.getareaPointinfo +
                        'catalogName=' +
                        that.realParent +
                        '&fileClass=' +
                        that.filename +
                        '&xzqhmc=' +
                        element.xzqhdm +
                        '&pageNum=1&pageSize=7'
                    )
                    .then(function(res) {
                      console.log(res)
                      that.totalInfo = 0
                      that.tableData5 = []
                      that.tableData = []
                      that.tableDatachild = []
                      that.totalInfo = res.data.total
                      that.tableData5 = res.data.list
                      that.tableData = res.data.list
                      //第一次将数据渲染到右侧列表
                      if (res.data.total >= 7) {
                        for (var j = 0; j < 7; j++) {
                          that.tableDatachild.push(that.tableData[j])
                        }
                      } else {
                        for (var j = 0; j < res.data.total; j++) {
                          that.tableDatachild.push(that.tableData[j])
                        }
                      }
                    })
                }
              })
            })
          }
        )
    },
    heightFn() {
      // 右侧伸缩栏动态附高度；
      var rightDetail = document.getElementById('rightDetail')
      var searchBox = document.getElementById('searchBox')
      var viewDiv = document.getElementById('viewDiv')
      var header = document.getElementsByClassName('el-header')[0]
      rightDetail.style.height = viewDiv.offsetHeight - searchBox.offsetHeight
      rightDetail.style.top =
        header.offsetHeight + searchBox.offsetHeight + 'px'
      // 给mapTool动态定位
      var mapTool = document.getElementById('mapTool')
      console.log(header.offsetHeight + searchBox.offsetHeight + 50 + 'px')
      console.log(rightDetail.offsetWidth + 50 + 'px')
      mapTool.style.top =
        header.offsetHeight + searchBox.offsetHeight + 10 + 'px'
      mapTool.style.right = rightDetail.offsetWidth + 10 + 'px'
    },
    handleSelectionChange(val) {
      //tabel中check框
      console.log(val)
      this.multipleSelection = val
      this.checkedNum = val.length
    },
    handleZoom(index, row) {
      //tabel中的放大
      // /console.log(index, row)
      this.dialogTableVisible = true
    },
    handleAdd(index, row) {
      //tabel中的添加购物车
      console.log(row)
      console.log(index)
      row.fileId
    },
    toggleMap() {
      //切换底图
      var mapName = document.getElementById('mapName')
      if (this.mapType == '卫星图像') {
        this.mapType = '矢量图'
        this.mapIcon = require('../../../../assets/shiliangtu.png')
        mapName.style.color = '#000000'
        this.mapObject.map.basemap.baseLayers = [
          this.layer_yingxiang,
          this.layer_yingxiangLabel
        ]
      } else {
        this.mapType = '卫星图像'
        this.mapIcon = require('../../../../assets/yingxaingtu.png')
        mapName.style.color = '#ffffff'
        this.mapObject.map.basemap.baseLayers = [this.layer, this.layer_anno]
      }
    },
    // 伸缩操作；
    FlexFn() {
      var rightDetail = document.getElementById('rightDetail')
      this.flexFlag = !this.flexFlag
      if (this.flexFlag) {
        rightDetail.style.right = '0px'
      } else {
        rightDetail.style.right = '-29%'
      }
    },
    // 开关方法
    switchFn(evt) {
      console.log(evt)
    },
    DropdownFn1(command) {
      //下拉框触发
      console.log(command)
      this.command1 = command
    },
    DropdownFn2(command) {
      //下拉框触发
      console.log(command)
      this.command2 = command
    },
    DropdownFn3(command) {
      //下拉框触发
      console.log(command)
      this.command3 = command
    },
    //行政区划调用
    getarea() {
      let that = this
      this.$service.get(url.getarea).then(function(res) {
        that.area = res.data
        console.log(that.area)
      })
      //下拉框样式
      var scrollbarwrap = document.getElementsByClassName('el-scrollbar__wrap')
      console.log(scrollbarwrap)
      for (var o = 0; o < scrollbarwrap.length; o++) {
        scrollbarwrap[o].style.marginBottom = 0
      }
    },
    // 搜索
    searchFn() {
      console.log('搜索')
      console.log(this.treechild)
      console.log(this.typeValue)
      console.log(this.yearstar)
      let that = this
      this.$service
        .post(
          url.searchResult +
            '第三次国土调查统一时点数据' +
            '&fileClass=' +
            this.typeValue +
            '&xzqhmc=' +
            this.areaValue +
            '&pageNum=1&pageSize=7' +
            '&startYear=' +
            this.yearstar +
            '&endYear=' +
            this.yearend
        )
        .then(function(response) {
          //console.log(response)

          var res = response.data.list
          that.tableDatachild = []
          that.tableDatachild = res
          that.totalInfo = response.data.total
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    initTreeFn() {
      //初始化树形
      let that = this
      this.$service
        .get('http://192.168.5.88:9080/api/sys/catalogs/0')
        .then(function(response) {
          console.log(response)
          console.log('TCL: initTreeFn -> response', response)

          var res = response.data.result

          that.treeTab = res
          that.options = res[0].children
          // for(var i=0;i<that.treeTab.length;i++){
          //     that.treeTab
          // }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    //左侧多选框变化
    checkedFn(obj) {
      //tree中的checkbox
      console.log('选中该行')
      //console.log(obj)
      let that = this
      that.objlargearry = []
      //console.log(that.objlargearry)
      if (obj.checked) {
        this.realParent = obj.realParent
        this.filename = obj.name
        this.$service
          .post(
            url.getareaName +
              'catalogName=' +
              obj.realParent +
              '&fileClass=' +
              obj.name
          )
          .then(function(response) {
            //查询fileid的数量
            console.log(response)
            that.polygondata = response.data
            that.getpolygondata(response.data, obj.realParent, obj.name)
            that.mapObject.mapview.goTo([112.74292, 38.430297], {
              duration: 2000
            })
            //that.mapObject.mapview.center =
            that.mapObject.mapview.scale = '1000000'
          })
          .catch(function(error) {
            console.log(error)
          })
      } else {
        that.objlargearry = []
      }
    },

    //查询结果选择
    chooseResult() {
      console.log('选择框发生变化了')
      console.log(this.treechild)
      console.log(this.treeTab)
      if (this.treechild == 0) {
        this.options = this.treeTab[0].children
      } else if (this.treechild == 1) {
        this.typeValue = ''
        this.options = this.treeTab[1].children
      }
    },
    //获取多边形数据
    getpolygondata(data, catalogName, fileClass) {
      let that = this
      var index = 0
      var timer

      var filenum
      clearInterval(timer)
      timer = setInterval(function() {
        console.log(data[index])
        that.$service
          .post(
            url.getfilenum +
              'xzqhmc=' +
              data[index] +
              '&catalogName=' +
              catalogName +
              '&fileClass=' +
              fileClass +
              ''
          )
          .then(function(res) {
            filenum = res.data
            that.filenum(
              data[index - 1],
              catalogName,
              fileClass,
              filenum,
              index
            )
            console.log('TCL: timer -> data[index]', data[index - 1])
          })

        index++
        if (index == data.length) {
          clearInterval(timer)
        }
      }, 1000)
    },
    //绘制矩形
    draw(xzqhdm, index, filenum) {
      console.log('我被执行了')
      console.log(filenum)
      console.log(xzqhdm)
      console.log(index)

      var that = this
      const mapURL = {
        url: 'http://192.168.5.88:8080/arcgis_js_api/library/4.9/init.js'
      }
      esriLoader
        .loadModules(
          [
            'esri/Map',
            'esri/views/MapView',
            'esri/layers/WebTileLayer',
            'esri/layers/support/TileInfo',
            'esri/core/urlUtils',
            'esri/Graphic',
            'esri/geometry/Point',
            'esri/symbols/TextSymbol',
            'dojo/domReady!'
          ],
          mapURL
        )
        .then(
          ([
            Map,
            MapView,
            WebTileLayer,
            TileInfo,
            urlUtils,
            Graphic,
            Point,
            TextSymbol
          ]) => {
            // Create a polygon geometry
            var polygon = {
              type: 'polygon', // autocasts as new Polygon()
              rings: that.objlargearry[index]
            }

            // Create a symbol for rendering the graphic
            var fillSymbol = {
              type: 'simple-fill', // autocasts as new SimpleFillSymbol()
              color: [227, 139, 79, 0.3],
              outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 1
              }
            }
            var textSymbol = new TextSymbol({
              type: 'text', // autocasts as new TextSymbol()
              color: 'white',
              haloColor: 'black',
              haloSize: '1px',
              text: '行政区划：' + xzqhdm + '文件数量：' + filenum,
              xoffset: 1,
              yoffset: 1,
              font: {
                // autocast as new Font()
                size: 12,
                family: 'sans-serif',
                weight: 'normal'
              }
            })

            // Add the geometry and symbol to a new graphic
            var polygonGraphic1 = new Graphic({
              geometry: polygon,
              symbol: fillSymbol,
              xzqhdm: xzqhdm
              // popupTemplate: {
              //   // autocasts as new PopupTemplate()
              //   content:
              //     '<p>所属单位:' +
              //     1 +
              //     '</p>' +
              //     '<p>建设内容:' +
              //     2 +
              //     '</p>' +
              //     '<p>建设过程:' +
              //     2 +
              //     '</p>' +
              //     '<p>任务状态:' +
              //     3 +
              //     '</p>'
              // }
            })
            var point = new Point({
              type: 'point',
              longitude: polygonGraphic1.geometry.centroid.longitude,
              latitude: polygonGraphic1.geometry.centroid.latitude,
              spatialReference: { wkid: 4326 }
            })
            var text = new Graphic({
              geometry: point,
              symbol: textSymbol
            })

            that.polygonGraphic.push(polygonGraphic1)
            // Add the graphics to the view's graphics layer
            that.mapObject.mapview.graphics.addMany([polygonGraphic1, text])
          }
        )
    },
    //获取file数量
    filenum(data1, catalogName, fileClass, filenum, index) {
      var objBigarry = []
      let that = this
      that.$service
        .post(
          url.getareaPoint +
            'xzqhmc=' +
            data1 +
            '&catalogName=' +
            catalogName +
            '&fileClass=' +
            fileClass +
            ''
        )
        .then(function(res) {
          console.log(res)

          var obj = res.data[0].clobdata
            .split('((')[1]
            .split('))')[0]
            .split(',')
          // console.log(obj)
          var objSmallarry = []
          objBigarry = []
          // /that.objlargearry = []
          for (let k = 0; k < obj.length; k++) {
            if (k == 0) {
              objSmallarry = [
                Number(obj[k].split(' ')[0]),
                Number(obj[k].split(' ')[1])
              ]
            } else {
              objSmallarry = [
                Number(obj[k].split(' ')[1]),
                Number(obj[k].split(' ')[2])
              ]
            }
            objBigarry.push(objSmallarry)
          }
          that.objlargearry.push(objBigarry)

          that.draw(data1, index - 1, filenum)
        })
    },
    //成果车
    resultcar() {
      this.dialogResultVisible = true
    },
    //加入成果车单独
    addresult(index, rows) {
      console.log(rows)
      let that = this
      //console.log('http://192.168.5.61:9080/api/sys/cart/add/' + rows.fileId)
      this.$service.post(url.addresult + rows.fileId).then(function(res) {
        console.log(res.data)
        that.$alert(res.data.result, {
          confirmButtonText: '确定'
        })
        that.getcatLIst()
      })
    },
    //加入成果车
    addresult1() {
      if (this.multipleSelection.length > 0) {
        var arr = ''
        for (var k = 0; k < this.multipleSelection.length; k++) {
          // arr.push(this.multipleSelection[k].fileId)
          arr += this.multipleSelection[k].fileId + ','
        }

        arr = arr.substring(0, arr.length - 1)
        let that = this
        console.log('http://192.168.5.61:9080/api/sys/cart/add/' + arr)

        this.$service.post(url.addresult + arr).then(function(res) {
          console.log(res.data)
          that.$alert(res.data.result, {
            confirmButtonText: '确定'
          })
          that.getcatLIst()
        })
      } else {
        this.$alert('请选择成果', {
          confirmButtonText: '确定'
        })
      }

      console.log(arr)
    },
    //成果车表格展示
    showtable() {
      this.tableInfo = !this.tableInfo
      if (this.iconType == 'el-icon-arrow-down') {
        this.iconType = 'el-icon-arrow-up'
        this.showText = '收起'
        return
      }
      if ((this.iconType = 'el-icon-arrow-up')) {
        this.iconType = 'el-icon-arrow-down'
        this.showText = '展开'
      }
    },
    //成果车表格展示
    showtable1() {
      this.tableInfo1 = !this.tableInfo1
      if (this.iconType1 == 'el-icon-arrow-down') {
        this.iconType1 = 'el-icon-arrow-up'
        this.showText1 = '收起'
        return
      }
      if ((this.iconType1 = 'el-icon-arrow-up')) {
        this.iconType1 = 'el-icon-arrow-down'
        this.showText1 = '展开'
      }
    },
    //获取成果车页面
    getcatLIst() {
      let that = this
      that.$service
        .get('http://192.168.5.61:9080/api/sys/cart/list')
        .then(function(res) {
          console.log('--------------------')

          console.log(res.data.result)
          that.tableDataall = res.data.result
        })
      that.$service
        .get('http://192.168.5.61:9080/api/sys/cart/get_count')
        .then(function(res) {
          console.log(res.data.result)
          that.uerallData = '用户全部数据' + res.data.result
          that.ItemNum = res.data.result
        })
    },
    //更新信息
    moredata() {
      var zz = {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
      this.tableData3.push(zz)
    },
    //点击分页
    page() {
      let that = this
      this.tableDatachild = []
      console.log(this.pageNum)
      if (this.typeValue != '文件名称') {
        this.$service
          .post(
            url.searchResult +
              '第三次国土调查统一时点数据' +
              '&fileClass=' +
              this.typeValue +
              '&xzqhmc=' +
              this.command3 +
              '&pageNum=' +
              this.pageNum +
              '&pageSize=7' +
              '&startYear=' +
              this.yearstar +
              '&endYear=' +
              this.yearend
          )
          .then(function(response) {
            console.log('TCL: page -> response', response)

            var res = response.data.list
            that.tableDatachild = []
            that.tableDatachild = res
            that.totalInfo = response.data.total
          })
      } else {
        this.$service
          .post(
            url.getareaPointinfo +
              'catalogName=' +
              that.realParent +
              '&fileClass=' +
              that.filename +
              '&xzqhmc=' +
              that.xzqhdmomly +
              '&pageNum=' +
              that.pageNum +
              '&pageSize=7'
          )
          .then(function(res) {
            console.log(res.data.list)
            that.tableDatachild = []
            that.tableDatachild = res.data.list
          })
      }
    },
    //成果车全选
    allcheck(e) {
      console.log('我要全选')
      console.log(e)
      if (e) {
        this.$refs.multipleTable2.toggleAllSelection()
        this.$refs.multipleTable1.toggleAllSelection()
      } else {
        this.$refs.multipleTable1.clearSelection()
        this.$refs.multipleTable2.clearSelection()
      }
    },
    //获取用户名
    getuserInfo() {
      console.log(qs)
      console.log(this.$service())
      this.$service({
        method: 'post',
        url: 'http://192.168.5.61:9080/api/oauth/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          Username: 'app',
          Password: 'app'
        },
        data: qs.stringify({
          grant_type: 'password',
          password: '123456',
          username: 'admin'
        })
      }).then(function(res) {
        console.log('获取了用户名')
        console.log(res)
      })
    },
    //成果车删除
    remove(index, row) {
      console.log(row)
      let that = this
      this.$service.delete(url.deleteTable + row.fileId).then(function(res) {
        that.getcatLIst()
      })
    },
    //结算跳转
    settle() {
      this.rusultorder()
      this.dialogSettleVisible = true
    },
    //结算表单显隐
    order() {
      this.fromorder = !this.fromorder
    },
    //获取结算页面信息
    getsettlelist() {
      let that = this
      this.$service.get(url.getsettlelist).then(function(res) {
        console.log(res)

        that.cartlist = res.data.result[0].orderItemVoList
        console.log(that.cartlist)
        that.resultorderNum = that.cartlist.length
      })
    },
    //成果车表格变化
    rusultSelectionChange(val) {
      console.log(val)
      this.resultSettlearr = val
      this.resultSettlement = val.length
      if (this.resultSettlement == 0) {
        this.openorder = true
      } else {
        this.openorder = false
      }
    },
    //成果车结算提交
    rusultorder() {
      console.log('222222222222222222')

      var arr = ''
      for (var z = 0; z < this.resultSettlearr.length; z++) {
        // arr.push(this.multipleSelection[k].fileId)
        arr += this.resultSettlearr[z].fileId + ','
      }
      arr = arr.substring(0, arr.length - 1)

      let that = this
      console.log(url.getorder + arr)

      this.$service.post(url.getorder + arr).then(function(res) {
        //that.getcatLIst()
        that.getsettlelist()
      })
    },
    //提交订单
    postorder() {
      let that = this
      console.log(this.formInline)
      this.$service.post(url.postformdata, this.formInline).then(function(res) {
        //console.log(res.data.result.shippingId)
        //that.shippingId = res.data.result.shippingId
        that.$service
          .post(url.postshipid + res.data.result.shippingId)
          .then(function(res) {
            console.log(res)
          })
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import url('https://js.arcgis.com/4.9/esri/css/main.css');
.mapIndex {
  #searchBox {
    position: absolute;
    top: 10vh;
    left: 0px;
    right: 0px;
    z-index: 3;
    background: #f7f7f7;
    box-shadow: 1px 1px 10px 1px #e5e5e5;
    padding: 6px 20px;
    display: flex;
    align-content: center;
    align-items: center;
    .el-col-16 {
      text-align: center;
      .el-dropdown {
        margin-left: 1%;
      }
      label {
        margin: 0px 1%;
        font-style: normal;
        font-weight: normal;
      }
      .el-button {
        padding: 8px 10px;
      }
      #SearchBtn {
        margin-left: 1%;
      }
    }
    .el-col-4 {
      text-align: center;
      span {
      }
      i {
        display: inline-block;
        color: #08abe2;
        width: 20px;
        height: 20px;
      }
    }
    .SearchIn {
    }
  }
  #treeTab {
    position: absolute;
    left: 10px;
    width: 15%;
    box-sizing: border-box;
    padding: 0px 10px;
    top: 20vh;
    background: #ffffff;
    border-radius: 6px;
    .Lbar {
      width: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #e5e5e5;
      background: #f7f7f7;
    }
  }
  #viewDiv {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 10vh;
    bottom: 0px;
    .esri-view-root {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .esri-view-surface {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        .esri-display-object {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  #rightDetail {
    width: 29%;
    // height: calc(100vh - 10vh);
    position: absolute;
    z-index: 2;
    right: 0px;
    bottom: 0px;
    // top: calc(10vh + 44px);
    background: #ffffff;
    box-shadow: -4px 1px 10px 1px #e5e5e5;
    #flexBtn {
      position: absolute;
      z-index: 5;
      background: red;
      left: -3%;
      top: 50%;
      margin-top: -50px;
      // width: 20px;
      padding: 50px 0.25%;
      // height: 100px;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
      border-right: 1px solid #f7f7f7;
      box-shadow: -4px 1px 10px 1px #e5e5e5;
      cursor: pointer;
    }
    .el-row {
      .el-col-24 {
        width: 98%;
        border-bottom: 1px solid #e6e6e6;
        margin: 10px auto;
        padding: 10px 0px;
        margin-left: 1%;
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        .el-button {
          background: #0bb3e4;
          border: 1px solid #0bb3e4;
          font-size: 1.1em;
          padding: 10px 50px;
          border-radius: 50px;
          box-shadow: 5px 4px 23px -1px #a9b3bd;
        }
        .el-button:hover {
          background: #28c7f4;
          border: 1px solid #28c7f4;
        }
        .el-table {
          .el-table-column {
          }
          .btn {
            padding: 0px;
            margin: 0px;
            box-shadow: none;
            background: transparent;
            border: none;
            i {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
      .resultTit {
        justify-content: flex-start;
        font-size: 16px;
        .resultNum {
          font-size: 14px;
          margin-left: 2%;
          font-style: normal;
        }
      }
    }
  }
  #mapTool {
    position: absolute;
    z-index: 2;
    width: 25%;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    background: #ffffff;
    box-shadow: 1px 1px 10px 1px #e5e5e5;
    border-radius: 4px;
    // top: 200px;
    // right: 500px;
    .lineBar {
      width: 1px;
      height: 20px;
      background: #e5e5e5;
      border-radius: 50px;
    }
  }
  #mapTrag {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 99;
    border-radius: 4px;
    border: 1px solid #ffffff;
    box-shadow: 1px 1px 8px 1px #e5e5e5;
    cursor: pointer;
    img {
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 4px;
    }
    span {
      position: absolute;
      bottom: 10px;
      width: 100%;
      text-align: center;
      color: #ffffff;
    }
  }
  #tableDialog {
    .tag {
      margin-bottom: 20px;
    }
  }
  .el-dropdown {
    cursor: pointer;
  }
}
#resultDialog {
  h2 {
    font-size: 35px;
  }
}
/deep/.el-tabs__item {
  width: 90%;
  text-align: center;
  margin-top: 30px;
  font-size: 15px;
  height: 64px;
}
.datatype {
  margin: 15px 0;
  overflow: hidden;
  .left {
    float: left;
  }
  .right {
    float: right;
    color: #08abe2;
  }
  span {
    &:nth-child(2) {
      font-weight: 900;
      font-size: 20px;
    }
  }
}
.moredata {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #333;
  border-bottom: 1px solid #eee;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.foots {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 40px;
  line-height: 40px;
  //box-shadow: 0px 0px 15px 5px #888888;
  > div {
    width: 50%;
  }
  .resultNum {
    font-size: 35px;
    font-weight: 700;
  }
  .el-button {
    width: 30%;
    height: 47px;

    font-size: 17px;
  }
}
.cell {
  img {
    height: 50px;
    width: 50px;
  }
}
/deep/.el-scrollbar {
  div {
    &:nth-child(1) {
      margin-bottom: 10px !important;
    }
  }
}
/deep/.el-card__body {
  padding: 0;
}
#settleDialog {
  /deep/.el-dialog__body {
    padding: 0;
  }
}

.productHeader {
  margin: 0 50px;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #eee;
}
.cardContent {
  display: flex;
  justify-content: space-between;
  .leftContent {
    margin: 30px 0 30px 50px;
    width: 50%;
    border-right: 1px solid #ccc;
    .top {
      padding: 10px 0 20px;
      overflow: hidden;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      img {
        display: block;
        float: left;
        width: 150px;
        height: 150px;
      }
      .text {
        margin-left: 30px;
        float: left;
      }
    }
  }
  .rightContent {
    padding: 30px 50px;
    box-sizing: border-box;
    width: 50%;
  }
}
.datafrom {
  margin-bottom: 30px;
  font-size: 19px;
}
.footer {
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
</style>
