<template>
  <div class="system">
    <el-row>
      <el-col :span="24">
        <el-container>
          <el-header style="background:#ccc">
            <el-row>
              <el-col :span="6" class="header_left">
                <i class="el-icon-back"></i>
                <i class="el-icon-right"></i>
                <i class="el-icon-top"></i>
              </el-col>
              <el-col :span="6">
                <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
              <el-col :span="6" class="header_left" style="padding-left:30px">
                <i class="el-icon-folder-add" @click="addTreeNode"></i>
                <i class="el-icon-document-copy"></i>
                <i class="el-icon-edit-outline"></i>
                <i class="el-icon-close" style="color:red" @click="deleteNode"></i>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
          </el-header>
          <el-main>
            <el-row>
              <el-col :span="6" class="main_left">
                <el-tree
                  :data="data"
                  :props="defaultProps"
                  accordion
                  highlight-current
                  default-expand-all
                  :indent="16"
                  @node-click="nodeClick"
                ></el-tree>
              </el-col>
              <el-col :span="12" class="main_mid">
                <div class="filestyle">
                  <div style="text-align:center" v-if="show" @click="showfolderinfo(clickObj)">
                    <img :src="imgpath" alt>
                    <p>{{folderName}}</p>
                  </div>
                  <div
                    style="text-align:center"
                    v-for="(item,index) in floderData"
                    :key="index"
                    @click="showfolderinfo(item)"
                  >
                    <img src="../../../../../static/wenjian1.png" alt>
                    <p>{{item.name}}</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="6" class="main_right">
                <section>
                  <el-form :model="formInline">
                    <el-form-item label="名称：">
                      <el-input style="width:80%;border:none" v-model="formInline.name"></el-input>
                    </el-form-item>
                    <el-form-item label="别名：">
                      <el-input style="width:80%;border:none" v-model="formInline.realParent"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间：">
                      <el-input style="width:70%;border:none" v-model="formInline.ctime"></el-input>
                    </el-form-item>
                  </el-form>
                </section>
                <footer>
                  <el-button round @click="updateNode">确定</el-button>
                  <el-button round>取消</el-button>
                </footer>
              </el-col>
            </el-row>
          </el-main>
          <el-footer>
            <ul class="rightClick">
              <li>创建子文件夹</li>
              <li>创建节点</li>
              <li>重命名</li>
              <li>删除文件夹</li>
            </ul>
          </el-footer>
        </el-container>
      </el-col>
    </el-row>
    <el-dialog
      title="添加主节点"
      :visible.sync="addTreeNodeVisible"
      width="30%"
      @close="clearfrominfo"
      ref="from"
    >
      <el-form :model="addformInline" class="demo-form-inline" label-width="100px">
        <el-form-item label="新节点:">
          <el-input v-model="addformInline.user" placeholder="请输入节点名称"></el-input>
        </el-form-item>
        <el-form-item label="目录等级:">
          <el-select v-model="addformInline.level" placeholder="目录等级" style="width:100%">
            <el-option label="一级目录" value="1"></el-option>
            <el-option label="二级目录" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="真实父目录:">
          <el-select
            v-model="addformInline.region"
            placeholder="活动区域"
            style="width:100%"
            @change="changedata"
          >
            <el-option v-for="(menu,index) in formarr" :key="index" :value="menu"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="真实子目录:" v-show="addformInline.level=='2'?true:false">
          <el-select v-model="addformInline.child" placeholder="活动区域" style="width:100%">
            <el-option v-for="(menu,index) in formarrchild" :key="index" :value="menu"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级目录:" v-show="addformInline.level=='2'?true:false">
          <treeselect v-model="addformInline.up" :multiple="false" :options="options"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTreeNodeVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTreeNode()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'jquery'
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'Layout',

  data() {
    return {
      searchContent: '', //上方搜索内容
      //左侧树状结构数据
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      //右侧表格数据
      formInline: {
        name: '',
        ctime: '',
        anmae: ''
      },
      //对话框的显隐
      addTreeNodeVisible: false,
      //添加表格数据表单数据
      addformInline: {
        user: '',
        region: '',
        level: ''
      },
      formarr: [],
      formarrchild: [],
      formarrup: [],
      //表格树形结构数据
      options: [
        {
          id: 'a',
          label: 'a',
          children: [
            {
              id: 'aa',
              label: 'aa'
            },
            {
              id: 'ab',
              label: 'ab'
            }
          ]
        },
        {
          id: 'b',
          label: 'b'
        }
      ],
      floderData: [],
      //中间表格数据
      folderName: '',
      show: false,
      deleteNodeId: '', //删除节点的id
      clickObj: '', //左侧点击对象
      imgpath: ''
    }
  },
  components: { Treeselect },
  computed: {},
  mounted() {
    this.getTreeData()
    this.rightClick()
  },
  watch: {},
  methods: {
    getTreeData() {
      let that = this
      this.$service
        .get('http://192.168.5.61:9080/api/sys/open/catalogs/0')
        .then(function(res) {
          console.log(res.data.result)
          var date = res.data.result
          that.data = res.data.result
          that.options = res.data.result
          // for (var i = 0; i < date.length; i++) {
          //   that.options.id = date[i].name
          //   that.options[i].label = date[i].name
          //   that.options[i].label.children = date[i].children
          //   that.options[i].label.children[i].id =
          //   that.options[i].label.children[i].name
          //   that.options[i].label.children[i].label =
          //   that.options[i].label.children[i].name
          // }
        })
      //下拉框样式
      var scrollbarwrap = document.getElementsByClassName('el-scrollbar__wrap')
      console.log(scrollbarwrap)
      for (var o = 0; o < scrollbarwrap.length; o++) {
        scrollbarwrap[o].style.marginBottom = 0
      }
    }, //获取左侧表格数据
    rightClick() {
      var rightClick = document.getElementsByClassName('rightClick')[0]
      console.log(rightClick)

      //右击清除
      document.onclick = function(ev) {
        ev = ev || window.event
        ev.preventDefault ? ev.preventDefault() : (ev.returnValue = false)
        rightClick.style.display = 'none'
      }
      $('.el-tree').on('contextmenu', '.el-tree-node__content', function(ev) {
        console.log(ev)
        ev = ev || window.event

        //			阻止默认行为，三目，ture是高级版本浏览器，false是ie9以下的浏览器
        ev.preventDefault ? ev.preventDefault() : (ev.returnValue = false)
        rightClick.style.display = 'block'

        //			clientWidth可视宽度
        //			offsetWidth从最顶部到目前点击的位置的宽度（到父级的）
        var gapX = document.documentElement.clientWidth - rightClick.offsetWidth
        var Left = ev.clientX > gapX ? gapX : ev.clientX

        //			scrollTop代表滚动条隐藏的高度
        //			clientHeight可视高度
        //			offsetHeight从最顶部到目前点击的位置的高度
        var gapY =
          document.documentElement.scrollTop +
          document.documentElement.clientHeight -
          rightClick.offsetHeight
        var Top = ev.offsetY > gapY ? gapY : ev.offsetY

        //			调试值
        //			console.log('clientY '+ev.offsetY)
        //			console.log(document.documentElement.scrollTop)
        //			console.log(Left)
        //			console.log(Top)
        var x = ev.screenX
        var Y = ev.clientY
        console.log(ev.target)
        rightClick.style.left = x + 50 + 'px'
        rightClick.style.top = Y + 'px'
      })
    }, //右击时间
    nodeClick(data) {
      console.log(data)
      this.clickObj = data
      this.floderData = data.children
      this.folderName = data.name
      this.show = true
      this.deleteNodeId = data.id
      if (data.children == '') {
        this.imgpath = '../../../../../static/wenjian1.png'
      } else {
        this.imgpath = '../../../../../static/folder.png'
      }
    }, //点击左侧节点时间
    addTreeNode() {
      let that = this
      this.addTreeNodeVisible = true
      this.$service
        .get('http://192.168.5.61:9080/api/sys/open/catalog/real_parent')
        .then(function(res) {
          //console.log(res.data.result)
          that.formarr = res.data.result
        })
    }, //添加树状结构
    saveTreeNode() {
      this.addTreeNodeVisible = false
      let that = this
      if (this.addformInline.level == '1') {
        this.$service
          .post('http://192.168.5.61:9080/api/sys/open/catalog/saveOrUpdate', {
            type: '0',
            name: this.addformInline.user,
            realParent: this.addformInline.region
          })
          .then(function(res) {
            console.log(res)
            that.getTreeData()
          })
      } else {
        this.$service
          .post('http://192.168.5.61:9080/api/sys/open/catalog/saveOrUpdate', {
            type: '0',
            name: this.addformInline.user,
            realParent: this.addformInline.region,
            realChild: this.addformInline.child,
            parentId: this.addformInline.up
          })
          .then(function(res) {
            console.log(res)
            that.getTreeData()
          })
      }
    }, //保存树状结构
    showfolderinfo(data) {
      this.formInline = data
      this.deleteNodeId = data.id
    }, //右侧展示文件信息
    changedata(data) {
      console.log(data)
      let that = this
      this.$service
        .get(
          'http://192.168.5.61:9080/api/sys/open/catalog/real_child?realParent=' +
            data
        )
        .then(function(res) {
          //console.log(res)
          that.formarrchild = res.data.result
        })
    }, //真实父目录选择值变化
    deleteNode() {
      let that = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$service
            .delete(
              'http://192.168.5.61:9080/api/sys/open/catalog/' +
                this.deleteNodeId
            )
            .then(function(res) {
              that.show = false
              that.getTreeData()
              that.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }, //删除节点
    updateNode() {
      let that = this
      this.$service
        .post('http://192.168.5.61:9080/api/sys/open/catalog/saveOrUpdate', {
          type: '0',
          id: that.formInline.id,
          name: that.formInline.name
        })
        .then(function(res) {
          that.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
        })
    }, //更新节点
    clearfrominfo() {
      this.addformInline = {
        user: '',
        region: '',
        level: ''
      }
    } //清除表单信息
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.system {
  margin-top: 12vh;
  height: 90vh;
  width: 80vw;
  margin-left: 15vw;
  border: 1px solid #ccc;
  .el-header {
    height: 60px;
    line-height: 60px;
    .header_left {
      font-size: 25px;
      i {
        margin-left: 10%;
        cursor: pointer;
      }
    }
  }
  .el-main {
    height: 80vh;
    .main_left {
      /deep/.el-tree-node__content {
        height: 50px;
        line-height: 50px;
      }
    }
    .main_mid {
      border: 2px solid #ccc;
      border-top: none;
      border-bottom: none;
      height: 80vh;
    }
    .filestyle {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: nowrap;
    }
  }
  .main_right {
    padding: 30px;
    position: relative;
    height: 80vh;
    /deep/.el-input__inner {
      border: none !important;
    }
    footer {
      position: absolute;
      bottom: 30px;
      left: 30px;
    }
  }
  .el-footer {
    ul {
      list-style: none;
      width: 180px;
      padding: 0;
      text-align: center;
      border: 1px solid #ccc;
      display: none;
      position: fixed;
      border-radius: 10px;
      background-color: #fff;
      li {
        line-height: 50px;
        height: 50px;
        font-size: 18px;
        &:nth-of-type(1) {
          border-bottom: 1px solid #ccc;
        }
        &:hover {
          background-color: #eee;
        }
      }
    }
  }
}
</style>
