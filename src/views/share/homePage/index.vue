<template>
  <div class="mainhome">
    <!-- banner -->
    <el-carousel trigger="click" height="700px" @change="change">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <!-- 基础数据服务 -->
    <el-row :span="24" class="dataSever">
      <h1>{{titleOne}}</h1>
      <p>{{detailText}}</p>
    </el-row>
    <!-- tab切换 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <el-row class="el-row-card">
          <el-col :span="7" v-for="(o, index) in 8" :key="o" :offset="index > 0 ? 1 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="#" class="image">
              <div class="content" style="padding: 30px;">
                <span>图片名称</span>
                <p>文字描述</p>
                <dl>
                  <dd>Map Serveice</dd>
                  <dt>
                    <em>
                      <i class="el-icon-view"></i>
                    </em>6
                    <em>
                      <i class="el-icon-edit"></i>0
                    </em>
                  </dt>
                </dl>
                <div class="bottom">
                  <span>贵州省测绘资源</span>
                  <time class="time">{{ currentDate }}</time>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      <el-tab-pane label="配置管理" name="five">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="six">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="seven">定时任务补偿</el-tab-pane>
    </el-tabs>
    <el-row class="moreLook">
      <el-button type="primary" round>
        查看更多
        <i class="el-icon-back"></i>
      </el-button>
    </el-row>
    <!-- 平台应用 -->
    <el-row :span="24" class="platSever">
      <h1>{{titleTwo}}</h1>
      <p>{{detailTwo}}</p>
    </el-row>
    <el-tabs class="platTab" v-model="activeName2" @tab-click="handleClick2">
      <el-tab-pane label="贵州省地图云平台" name="first">
        <el-row>
          <el-col :span="8">
            <span></span>
          </el-col>
          <el-col :span="16">
            <h1>贵州省地图云平台</h1>
            <p>提供了贵州省电子地图集，以丰富的电子图、图片资料、视频资料为用户展示多元化的贵州旅游动态，主要有以下特点：</p>
            <ul>
              <li v-for="(site,index) in sites" :key="index">{{site.name}}</li>
            </ul>
            <el-button type="primary" round>查看详情</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="贵州省空气质量实时监测系统" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="贵州省旅游资源普查展示系统" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="贵州省地质灾害预警系统" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <!-- 友情链接 -->
    <el-row :span="24" class="friendHref">
      <h1>{{titleThree}}</h1>
    </el-row>
    <el-tabs class="friendTab" v-model="activeName3" @tab-click="handleClick3">
      <el-tab-pane label="忻州市地方网站" name="first">
        <ul>
          <li v-for="(item,index) in items" :key="index">{{item.name}}</li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="省内网站" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="省外网站" name="third">角色管理</el-tab-pane>
    </el-tabs>
    <!-- footer -->
    <el-row class="footer">
      <ul>
        <li>关于我们</li>
        <span></span>
        <li>服务条款</li>
        <span></span>
        <li>版权声明</li>
        <span></span>
        <li>联系我们</li>
        <span></span>
        <li>意见反馈</li>
        <span></span>
        <li>帮助中心</li>
      </ul>
      <div class="info">
        <span>主 营：自然资源部</span>
        <span>运营维护：国家基础地理信息中心</span>
        <span>地 址：北京海淀区莲花池西路28号</span>
        <span>邮 编： 1 0 0 8 3 0</span>
      </div>
      <p>备案号： 京ICP12031976号-1&nbsp;&nbsp;审图号： GS（2016）2556号</p>
      <p>为保证系统正常运行请使用Chrome、360极速模式或IE9以上浏览器</p>
    </el-row>

    <!--jq tab -->
    <!-- <el-row class="TABPUB">
      <ul id="TABPUBBox">
        <span id="sliderBar"></span>
        <li index="0">用户管理1</li>
        <li index="1">用户管理1</li>
        <li index="2">用户管理1</li>
        <li index="3">用户管理1</li>
        <li index="4">用户管理1</li>
        <li index="5">用户管理1</li>
      </ul>
    </el-row>-->
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
// import Navbar from './navFiles/index'
export default {
  data() {
    return {
      titleOne: '基础数据服务',
      detailText:
        '一体化公共服务平台遵循开放地理空间联盟（OGC）服务标准，提供了包括WMS（Web地图服务）、WFS(Web要素服务)、WFS-G（地名地址服务）等，以及KML、街景数据服务、全景数据服务和与平台对接系统的相关专题服务。',
      titleTwo: '平台应用',
      detailTwo:
        'GeoPlat一体化应用中心由在线应用模板、行业应用支撑、智能地图应用、Office集成应用以及Web Mapping API等几部分组成',
      titleThree: '友情链接',
      activeName: 'first', //默认tab项
      activeName2: 'first',
      activeName3: 'first',
      currentDate: '2019-5-24', //card日期
      sites: [
        { name: '旅游热点空间位置信息' },
        { name: '旅游热点的地图集' },
        { name: '旅游景点的视频、照片、全景信息' }
      ],
      items: [
        { name: '忻州市人民政府' },
        { name: '忻州市国土资源局' },
        { name: '文化和旅游局' },
        { name: '应急管理局' },
        { name: '财政局' },
        { name: '统计局' },
        { name: '生态环境局' },
        { name: '忻州市人民政府' },
        { name: '忻州市国土资源局' },
        { name: '文化和旅游局' },
        { name: '应急管理局' },
        { name: '财政局' },
        { name: '统计局' },
        { name: '生态环境局' }
      ]
    }
  },
  methods: {
    loginFn() {
      console.log('我要登录')
    },
    ResigerFn() {
      console.log('注册')
    },
    // banner---@star
    change(index) {
      //banner切换索引
      // console.log(index)
    },
    // tab切换
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // tab切换
    handleClick2(tab, event) {
      console.log(tab, event)
    },
    handleClick3(tab, event) {
      console.log(tab, event)
    }

    // ---jq tab-----
    // tabFn() {
    //   var ul = document.getElementById('TABPUBBox')
    //   var liArry = ul.getElementsByTagName('li')
    //   var span = document.getElementById('sliderBar')
    //   console.log(liArry)
    //   for (var i = 0; i < liArry.length; i++) {
    //     liArry[i].onclick = function(e) {
    //       console.log(this.getAttribute('index'))

    //       span.style.left =
    //         this.getAttribute('index') * '16.66666666666667' + '%'
    //       console.log($('#sliderBar'))
    //     }
    //   }
    // }
  },
  mounted() {
    // this.tabFn()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.mainhome {
  width: 100%;
  // height: 500px;
  // height: calc(100vh - 0px);
  background: #f5f7fa;
  position: relative;
  // overflow: hidden;
  .headerbar {
    width: 100%;
    padding: 20px 0px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    background: -webkit-linear-gradient(
      left,
      #020d29,
      #0f1c3f,
      #17264c,
      #0f1c3f,
      #020d29
    );
    .side-nav {
      width: 80%;
      background: transparent !important;
    }
    span {
      color: #ffffff;
    }
    .resiger {
      margin-left: 20px;
    }
  }
  // banner----@star
  .el-carousel__item:nth-child(2n) {
    background: -webkit-linear-gradient(
      left,
      #020d29,
      #0f1c3f,
      #17264c,
      #0f1c3f,
      #020d29
    );
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #17264c;
  }

  // ---banner--@end
  // --基础数据服务
  .dataSever,
  .platSever,
  .friendHref {
    h1 {
      margin-top: 100px;
      text-align: center;
      color: #0e1a2d;
      font-size: 2em;
    }
    p {
      width: 60%;
      margin: 0 auto;
      text-align: center;
      color: #0cb3e4;
      font-size: 1.1em;
      margin-bottom: 100px;
    }
  }
  // ---tab切换
  .el-tabs {
    width: 80%;
    margin: 0 auto;
    .el-tabs__item {
      padding: 0 16%;
      text-align: center;
      color: #7e899a;
    }
    /deep/ .el-tabs__item:nth-child(2) {
      padding-left: 16%;
    }
    /deep/ .el-tabs__item:nth-child(8) {
      padding-right: 16%;
    }
    .el-row-card {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      padding-top: 50px;
      .el-col {
        padding-bottom: 55px;
        margin: 0px;
        margin: 0px 2%;
        .el-card {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0px 0px 110px -24px #7e899a;
          img {
            width: 100%;
            height: 400px;
            background: #32b0cf;
          }
          .content {
            span {
              display: block;
              margin-top: 20px;
              font-size: 1.5em;
              font-weight: 500;
              color: #0e1a2d;
            }
            p {
              font-size: 1em;
              color: #7e899a;
              margin-top: 10px;
            }
            dl {
              display: flex;
              justify-content: space-between;
              font-size: 1.1em;
              color: #7e899a;
              padding: 25px 0px;
              border-bottom: 2px solid #f6f6f8;
              dd {
                margin: 0px;
              }
              dt {
                em {
                  font-style: normal;
                  i {
                    font-size: 1.5em;
                    margin-right: 10px;
                  }
                }
                em:last-child {
                  margin-left: 20px;
                }
              }
            }
            .bottom {
              padding-top: 10px;
              color: #7e899a;
              display: flex;
              justify-content: space-between;
              align-content: center;
              align-items: center;
              span {
                margin: 0px;
                padding: 0px;
                font-size: 1em;
                color: #7e899a;
              }
              time {
                font-size: 1em;
              }
            }
          }
        }
      }
      // .el-card:nth-child(3n + 3) {
      //   background: #ccc !important;
      // }
      //card
    }
  }
  .moreLook {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    margin-top: 80px;
    .el-button {
      background: #0bb3e4;
      border: 1px solid #0bb3e4;
      font-size: 1.1em;
      padding: 15px 50px;
      border-radius: 50px;
      box-shadow: 5px 4px 23px -1px #a9b3bd;
      i {
        margin-left: 40px;
      }
    }
    .el-button:hover {
      background: #28c7f4;
      border: 1px solid #28c7f4;
    }
  }

  // 平台应用
  .platTab {
    .el-row {
      display: flex;
      align-content: center;
      align-items: center;
      .el-col-8 {
        padding: 20px 0px;
        span {
          display: block;
          width: 300px;
          height: 300px;
          background: #05a8b7;
          border-radius: 10px;
          box-shadow: 5px 4px 23px -1px #a9b3bd;
        }
      }
      .el-col-16 {
        padding: 20px 0px;
        h1 {
          margin-top: 20px;
          font-size: 1.5em;
          font-weight: 500;
          color: #0e1a2d;
        }
        p {
          width: 60%;
          font-size: 1em;
          color: #7e899a;
          margin-top: 10px;
        }
        ul {
          margin: 0px;
          padding: 0px;
          margin-top: 50px;
          li {
            font-size: 1em;
          }
        }
        .el-button {
          background: #0bb3e4;
          border: 1px solid #0bb3e4;
          font-size: 1.1em;
          padding: 15px 50px;
          border-radius: 50px;
          margin-top: 40px;
          box-shadow: 5px 4px 23px -1px #a9b3bd;
        }
        .el-button:hover {
          background: #28c7f4;
          border: 1px solid #28c7f4;
        }
      }
    }
  }
  // 友情链接
  .friendTab {
    width: 80%;
    ul {
      width: 100%;
      margin: 0px;
      padding: 0px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap-reverse;
      li {
        width: 14%;
        margin-top: 50px;
        font-size: 1em;
        color: #7e899a;
        text-align: center;
        list-style: none;
        cursor: pointer;
      }
      li:hover {
        color: #454d58;
      }
    }
  }
  // ==footer
  .footer {
    margin-top: 100px;
    ul {
      width: 40%;
      margin: 0px;
      padding: 0px;
      margin: 0 auto;
      display: flex;
      justify-content: space-evenly;
      align-content: center;
      align-items: center;
      li {
        list-style: none;
      }
      span {
        width: 2px;
        height: 20px;
        background: #313c4c;
      }
    }
    .info {
      width: 80%;
      margin: 0 auto;
      margin-top: 30px;
      text-align: center;
      color: #7e899a;
      span {
        margin-right: 20px;
      }
    }
    p {
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 0;
      margin-top: 10px;
      color: #7e899a;
    }
  }
  // ============
  .TABPUB {
    margin-top: 50px;
    ul {
      width: 80%;
      overflow: hidden;
      margin: 0px;
      padding: 0px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-content: center;
      align-items: center;
      position: relative;
      li {
        list-style: none;
        padding-bottom: 30px;
        font-size: 1em;
        color: #7e899a;
        cursor: pointer;
      }
      span {
        position: absolute;
        bottom: 0px;
        left: -16.66666666666667%;
        display: block;
        width: 16.66666666666667%;
        height: 4px;
        border-radius: 50px;
        background: #32b0cf;
      }
    }
  }
}
</style>
