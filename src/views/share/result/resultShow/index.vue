<template>
  <div class="mapIndex">
    <!-- <treeEle/> -->
    <div id="viewDiv"></div>
    <div id="screenshotDiv" class="hide">
      <img class="js-screenshot-image">
      <div>
        <label>请为图片设置名称:</label>
        <input type="text" placeholder="请输入" id="textInput" autofocus>
      </div>
      <button
        id="downloadBtn"
        class="action-button"
        aria-label="Download image"
        title="Download image"
      >下载图片</button>

      <button
        id="closeBtn"
        class="action-button"
        aria-label="Back to webscene"
        title="Back to webscene"
      >返回</button>
    </div>
    <div id="maskDiv" class="hide screenshotCursor"></div>
    <!-- 左侧树形结构 -->
    <div class="leftbox">
      <el-collapse v-model="activeNames" @change="handleChange" accordion>
        <el-collapse-item
          v-for="liTab in treeTab"
          :key="liTab.id"
          :title="liTab.layername"
          :name="liTab.id"
        >
          <el-collapse>
            <el-collapse-item
              v-for="(tudi,index) in liTab.children"
              :key="index"
              :title="tudi.layername"
              :name="tudi.id"
            >
              <div>
                <div class="Lbar" v-for="bar in tudi.children" :key="bar.id">
                  <el-checkbox
                    name="checkedF"
                    v-model="bar.checked"
                    @change="checkedFn(bar)"
                  >{{bar.layername}}</el-checkbox>
                  <i
                    class="el-icon-edit-outline"
                    @click="opacity"
                    style="cursor:pointer"
                    :data-id="bar.id"
                  ></i>
                </div>
                <!-- <el-tree
              :data="liTab.children"
              :props="defaultProps"
              show-checkbox
              @check-change="handleCheckChange"
            >
              <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
                </el-tree>-->
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>
      </el-collapse>
      <!-- 透明度遮罩层 -->
      <el-dialog
        title="透明度设置"
        :visible.sync="opacityVisible"
        width="10%"
        :modal="false"
        class="opacitys"
      >
        <div class="opacityValue">
          <span>不透明度:</span>
          <span>{{opacityValue}}%</span>
        </div>

        <el-slider v-model="opacityValue" @change="show"></el-slider>
        <span slot="footer" class="dialog-footer">
          <el-button @click="opacityVisible = false">取 消</el-button>
          <el-button type="primary" @click="opacityVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 中间选择框 -->
    <div class="middlebox">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <!-- 右侧列表 -->
    <div class="rightbox">
      <el-cascader
        v-model="area"
        :options="areaoptions"
        clearable
        placeholder="区域选择"
        @change="location"
      ></el-cascader>
      <el-select v-model="tool" placeholder="工具">
        <el-option v-for="tool in tools" :key="tool.value" :label="tool.label" :value="tool.value"></el-option>
      </el-select>
      <el-button type="primary" class="work">清除图形</el-button>
      <el-button type="primary" class="work" @click="screenShot" id="screenshotBtn">截图打印</el-button>
      <el-button type="primary" class="work">分屏预览</el-button>
    </div>
    <!-- 卫星图像 -->
    <div id="mapTrag" @click="toggleMap">
      <img :src="mapIcon" alt>
      <span id="mapName">{{mapType}}</span>
    </div>
  </div>
</template>

<script>
import treeEle from '../../../tree/tree'
import esriLoader from 'esri-loader'
import url from '@/api/port'
import qs from 'qs'
export default {
  name: 'Layout',
  data() {
    return {
      mapObject: {
        map: '', //实例对象
        ZOOM: '8',
        CENTER: [108, 34], //底层中心
        housingLayer: '', //底层地图
        Ext: '', //可视范围
        mapview: '', //视图容器
        scale: '2000000'
      },
      layer: '',
      layer_anno: '',
      layer_yingxiang: '',
      layer_yingxiangLabel: '',
      multipleSelection: [],
      mapOptions: '', //全局arcgis.js
      map: '',
      mapType: '卫星图像',
      mapIcon: require('../../../../assets/yingxaingtu.png'),
      radio3: '矢量图',
      activeNames: ['0'],
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
      checkedF: false,
      options: [
        {
          value: '选项1',
          label: '数据搜索'
        },
        {
          value: '选项2',
          label: '地名定位'
        }
      ],
      tools: [
        {
          value: '选项1',
          label: '测量'
        },
        {
          value: '选项2',
          label: '测面'
        },
        {
          value: '选项3',
          label: '标面'
        }
      ],
      tool: '',
      value: '数据',
      input: '',
      area: [],
      areaoptions: [
        {
          value: '1',
          label: '忻州市',
          children: [
            {
              label: '原平市',
              value: [112.682419, 38.753359]
            },
            {
              label: '忻府区',
              value: [112.733641, 38.414629]
            },
            {
              label: '代县',
              value: [112.968278, 39.071607]
            },
            {
              label: '静乐县',
              value: [111.946581, 38.366731]
            },
            {
              label: '繁峙县',
              value: [113.271411, 39.208436]
            },
            {
              label: '定襄县',
              value: [112.958927, 38.482912]
            },
            {
              label: '五台县',
              value: [113.260299, 38.732605]
            },
            {
              label: '神池县',
              value: [112.222558, 39.097547]
            },
            {
              label: '五寨县',
              value: [111.84881, 38.921735]
            },
            {
              label: '岢岚县',
              value: [111.84881, 38.921735]
            },
            {
              label: '偏关县',
              value: [111.515619, 39.441115]
            },
            {
              label: '河曲县',
              value: [111.142148, 39.391373]
            },
            {
              label: '保德县',
              value: [111.15061, 39.049635]
            },
            {
              label: '宁武县',
              value: [112.325828, 39.023222]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'layername'
      },
      //透明度对话框
      opacityVisible: false,
      //透明度值
      opacityValue: 100,
      //矢量图层
      layer_czcdyd: {},
      // 图层名称
      layerName: '',
      layerArry: [],
      //加载状态
      num: 1
    }
  },
  components: {
    treeEle
  },
  computed: {},
  mounted() {
    this.mapFn()
    this.initree()
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
            'esri/layers/support/Sublayer',
            'esri/layers/MapImageLayer',
            'esri/layers/WMSLayer',
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
            Sublayer,
            MapImageLayer,
            WMSLayer
          ]) => {
            urlUtils.addProxyRule({
              urlPrefix: 'http://192.168.5.88:6080',
              proxyUrl: '/Java/proxy.jsp'
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
            // var layer = new MapImageLayer({
            //   url:
            //     'http://192.168.5.88:6080/arcgis/rest/services/land/YJJBNTTB/MapServer',
            //   sublayers: [
            //     {
            //       id: 0,
            //       minScale: 5000000,
            //       maxScale: 24000
            //     },
            //     {
            //       id: 1,
            //       minScale: 24000,
            //       maxScale: 100
            //     }
            //   ]
            // })
            // console.log(layer)
            // this.mapObject.map.add(layer)
          }
        )
    },
    handleChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    //初始化左侧树形结构
    initree() {
      let that = this
      this.$service
        .get('http://192.168.5.88:9080/api/cglayer/findAll')
        .then(function(res) {
          that.treeTab = res.data.data
          console.log(that.treeTab)
          that.activeNames = [that.treeTab[0].id]
        })
    },
    //左侧树形勾选变化
    checkedFn(obj) {
      console.log(obj)

      if (obj.checked) {
        this.layerName = obj.id
        this.draw(obj.wmsUrl)
      } else {
        for (var w = 0; w < this.layerArry.length; w++) {
          if (this.layerArry[w].name == obj.id) {
            this.removedraw(this.layerArry[w])
          }
        }
        // console.log()
      }
    },
    //地图交换
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
    //地图图层不透明度
    opacity(e) {
      console.log('透明度')
      console.log(e.target.dataset.id)

      var opacitys = document.getElementsByClassName('opacitys')[0].children[0]
      opacitys.style.marginTop = e.clientY + 'px'
      opacitys.style.marginLeft = e.clientX + 'px'
      //console.log(opacitys)
      this.opacityVisible = true

      for (var q = 0; q < this.layerArry.length; q++) {
        if (this.layerArry[q].name == e.target.dataset.id) {
          this.layerArry[q].opacity = this.num
        }
      }
    },
    //绘制图层
    draw(url) {
      console.log('我被调用了')
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
            'esri/layers/support/Sublayer',
            'esri/layers/MapImageLayer',
            'esri/layers/WMSLayer',
            'esri/geometry/Extent',
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
            Sublayer,
            MapImageLayer,
            WMSLayer,
            Extent
          ]) => {
            urlUtils.addProxyRule({
              urlPrefix: 'http://192.168.5.88:6080',
              proxyUrl: '/Java/proxy.jsp'
            })
            that.layer = 'layer' + that.layernum
            that.layer_czcdyd = new WMSLayer({
              name: that.layerName,
              url: url
            })
            that.layerArry.push(that.layer_czcdyd)
            console.log(that.layer_czcdyd)
            that.layer_czcdyd.opacity = Number(that.opacityValue / 100)
            that.mapObject.map.add(that.layer_czcdyd)

            that.layer_czcdyd.when(function() {
              that.mapObject.mapview.extent = that.layer_czcdyd.fullExtent
            })
          }
        )
    },
    //清除图层
    removedraw(e) {
      console.log('我被removedraw调用了')
      // console.log(this.layer_czcdyd)
      this.mapObject.map.remove(e)
    },
    //图层透明度控制
    show(e) {
      console.log(this.layer_czcdyd.opacity)
      //this.layer_czcdyd.opacity = Number(this.opacityValue / 100)
      this.num = Number(this.opacityValue / 100)
    },
    //行政区域定位
    location(e) {
      console.log(e)
      if (e.length > 0) {
        this.mapObject.mapview.goTo(e[1], {
          duration: 2000
        })
      }
    },
    //屏幕截取
    screenShot() {
      let that = this
      const mapURL = {
        url: 'http://192.168.5.88:8080/arcgis_js_api/library/4.9/init.js'
      }
      esriLoader
        .loadModules(['esri/WebScene', 'esri/views/SceneView'], mapURL)
        .then(([WebScene, SceneView]) => {
          const webscene = new WebScene({
            portalItem: {
              id: '19dcff93eeb64f208d09d328656dd492'
            }
          })
          // the button that triggers area selection mode
          const screenshotBtn = document.getElementById('screenshotBtn')

          // the orange mask used to select the area
          const maskDiv = document.getElementById('maskDiv')

          // element where we display the print preview
          const screenshotDiv = document.getElementById('screenshotDiv')

          // replace the navigation elements with screenshot area selection button
          that.mapObject.mapview.ui.empty('top-left')
          that.mapObject.mapview.ui.add(screenshotBtn, 'top-right')

          // add an event listener to trigger the area selection mode

          screenshotBtn.classList.add('active')
          that.mapObject.mapview.container.classList.add('screenshotCursor')
          let area = null

          // listen for drag events and compute the selected area
          const dragHandler = that.mapObject.mapview.on('drag', function(
            event
          ) {
            // prevent navigation in the view
            event.stopPropagation()

            // when the user starts dragging or is dragging
            if (event.action !== 'end') {
              // calculate the extent of the area selected by dragging the cursor
              const xmin = clamp(
                Math.min(event.origin.x, event.x),
                0,
                that.mapObject.mapview.width
              )
              const xmax = clamp(
                Math.max(event.origin.x, event.x),
                0,
                that.mapObject.mapview.width
              )
              const ymin = clamp(
                Math.min(event.origin.y, event.y),
                0,
                that.mapObject.mapview.height
              )
              const ymax = clamp(
                Math.max(event.origin.y, event.y),
                0,
                that.mapObject.mapview.height
              )
              area = {
                x: xmin,
                y: ymin,
                width: xmax - xmin,
                height: ymax - ymin
              }
              // set the position of the div element that marks the selected area
              setMaskPosition(area)
            }
            // when the user stops dragging
            else {
              // remove the drag event listener from the SceneView
              dragHandler.remove()
              // the screenshot of the selected area is taken
              that.mapObject.mapview
                .takeScreenshot({ area: area, format: 'png' })
                .then(function(screenshot) {
                  // display a preview of the image
                  showPreview(screenshot)

                  // create the image for download
                  document.getElementById('downloadBtn').onclick = function() {
                    const text = document.getElementById('textInput').value
                    // if a text exists, then add it to the image
                    if (text) {
                      const dataUrl = getImageWithText(screenshot, text)
                      downloadImage(webscene.portalItem.title + '.png', dataUrl)
                    }
                    // otherwise download only the webscene screenshot
                    else {
                      downloadImage(
                        webscene.portalItem.title + '.png',
                        screenshot.dataUrl
                      )
                    }
                  }

                  // the screenshot mode is disabled
                  screenshotBtn.classList.remove('active')
                  that.mapObject.mapview.container.classList.remove(
                    'screenshotCursor'
                  )
                  setMaskPosition(null)
                })
            }
          })

          function setMaskPosition(area) {
            if (area) {
              maskDiv.classList.remove('hide')
              maskDiv.style.left = area.x + 'px'
              maskDiv.style.top = area.y + 'px'
              maskDiv.style.width = area.width + 'px'
              maskDiv.style.height = area.height + 'px'
            } else {
              maskDiv.classList.add('hide')
            }
          }

          function clamp(value, from, to) {
            return value < from ? from : value > to ? to : value
          }

          // creates an image that will be appended to the DOM
          // so that users can have a preview of what they will download
          function showPreview(screenshot) {
            screenshotDiv.classList.remove('hide')
            // add the screenshot dataUrl as the src of an image element
            const screenshotImage = document.getElementsByClassName(
              'js-screenshot-image'
            )[0]
            screenshotImage.width = screenshot.data.width
            screenshotImage.height = screenshot.data.height
            screenshotImage.src = screenshot.dataUrl
          }

          // returns a new image created by adding a custom text to the webscene image
          function getImageWithText(screenshot, text) {
            const imageData = screenshot.data

            // to add the text to the screenshot we create a new canvas element
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            canvas.height = imageData.height
            canvas.width = imageData.width

            // add the screenshot data to the canvas
            context.putImageData(imageData, 0, 0)
            context.font = '20px Arial'
            context.fillStyle = '#000'
            context.fillRect(
              0,
              imageData.height - 40,
              context.measureText(text).width + 20,
              30
            )

            // add the text from the textInput element
            context.fillStyle = '#fff'
            context.fillText(text, 10, imageData.height - 20)

            return canvas.toDataURL()
          }

          function downloadImage(filename, dataUrl) {
            // the download is handled differently in Microsoft browsers
            // because the download attribute for <a> elements is not supported
            if (!window.navigator.msSaveOrOpenBlob) {
              // in browsers that support the download attribute
              // a link is created and a programmatic click will trigger the download
              const element = document.createElement('a')
              element.setAttribute('href', dataUrl)
              element.setAttribute('download', filename)
              element.style.display = 'none'
              document.body.appendChild(element)
              element.click()
              document.body.removeChild(element)
            } else {
              // for MS browsers convert dataUrl to Blob
              const byteString = atob(dataUrl.split(',')[1])
              const mimeString = dataUrl
                .split(',')[0]
                .split(':')[1]
                .split(';')[0]
              const ab = new ArrayBuffer(byteString.length)
              const ia = new Uint8Array(ab)
              for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
              }
              const blob = new Blob([ab], { type: mimeString })

              // download file
              window.navigator.msSaveOrOpenBlob(blob, filename)
            }
          }
          // button to hide the print preview html element
          document
            .getElementById('closeBtn')
            .addEventListener('click', function() {
              screenshotDiv.classList.add('hide')
            })
        })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import url('https://js.arcgis.com/4.9/esri/css/main.css');
.mapIndex {
  margin-top: 10vh;
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
        padding: 8px 20px;
      }
      #SearchBtn {
        margin-left: 4%;
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
.leftbox {
  position: fixed;
  top: 15vh;
  left: 5vh;
  z-index: 9999;
  /deep/.el-collapse-item__header {
    padding-left: 20px;
  }
  .Lbar {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #e5e5e5;
    background: #f7f7f7;
    font-size: 18px;
  }
  .el-collapse-item {
    width: 300px;
  }
}
.middlebox {
  position: fixed;
  top: 15vh;
  left: 20vw;
  z-index: 9999;
  display: flex;
  justify-content: flex-start;
  /deep/.el-input__inner {
    height: 40px;
    line-height: 40px;
  }
}
.rightbox {
  position: fixed;
  top: 15vh;
  right: 20vw;
  z-index: 9999;
  background-color: #fff;
  border-radius: 15px;
  /deep/.el-breadcrumb__item {
    width: 100px;
    text-align: center;
  }
  /deep/.el-breadcrumb {
    height: 40px;
    //line-height: 40px;
    box-sizing: border-box;
  }
  /deep/.el-input__inner {
    height: 40px;
    line-height: 40px;
    border: none;
    border-radius: 15px;
  }
  .work {
    background-color: transparent;
    color: black;
    border: none;
    border-right: 1px solid #ccc;
    &:nth-of-type(3) {
      border: none;
    }
  }
}
.opacityValue {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    &:nth-child(2) {
      display: inline-block;
      background-color: #eee;
      height: 25px;
      width: 50px;
      line-height: 25px;
      text-align: center;
    }
  }
}
#screenshotDiv {
  position: absolute;
  top: 35%;
  left: 35%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.hide {
  display: none;
}

img {
  border: 10px solid white;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
}

#screenshotDiv > * {
  margin: 0.5em;
}

.screenshotCursor {
  cursor: crosshair;
}

.action-button {
  padding: 0.6em;
  border: 1px solid #0079c1;
  text-align: center;
  background-color: white;
  cursor: pointer;
}

.action-button:hover,
.action-button:focus {
  background: #0079c1;
  color: white;
}

#maskDiv {
  position: absolute;
  background: rgba(255, 51, 0, 0.1);
  border: 2px dashed rgb(255, 51, 0);
}
</style>
