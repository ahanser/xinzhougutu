
<template>
  <div class="side-nav" :class="layout">
    <el-menu
      id="navBar"
      ref="navbar"
      :default-active="defActive"
      class="el-menu-demo"
      menu-trigger="hover"
      @select="nav"
      mode="horizontal"
      text-color="#fff"
      active-text-color="pink"
    >
      <nav-bar-item v-for="(item, n) in arr" :item="item" :navIndex="String(n)" :key="n"></nav-bar-item>
    </el-menu>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import NavBarItem from './SidebarItem'
export default {
  data() {
    return {
      navBgShow: false,
      arr: [
        {
          path: '/homePage/index',
          name: '首页'
        },
        {
          path: '/resources/map',
          name: '资源目录'
        },
        {
          path: '/result/resultShow',
          name: '成果展示'
          // icon: 'el-icon-setting',
          // child: [
          //   {
          //     path: '/item002/index',
          //     name: '监督业务管理支撑'
          //   },
          //   {
          //     path: '/item002/child002',
          //     name: '天地一体化'
          //   }
          // ]
        },
        {
          path: '/project/basicFarmland',
          name: '专题应用'
        },
        {
          path: '/service/serviceList',
          name: '服务查询'
        },
        {
          path: '/set/systemSetting',
          name: '系统设置'
        }
      ]
    }
  },
  props: ['layout'],
  computed: {
    defActive() {
      return this.$route.path
    }
    // arr() {
    //   return this.$store.state.user.meunList
    // }
  },
  watch: {},
  mounted() {},
  methods: {
    nav(path) {
      //路由配置
      this.$router.push({ path: path })
      let that = this
      // function getName(arr, path) {
      //   for (var k in arr) {
      //     if (arr[k].navPath == path) {
      //       //路由路径匹配；给子菜单中侧边菜单栏赋值
      //       that.$store.dispatch('getMenuLL', arr[k].arrArry) //给系统菜单变量赋值
      //       that.$store.dispatch('getNewTitle', arr[k].appTitle) //给系统名称变量赋值
      //       var MenuList = JSON.stringify(that.$store.state.user.arrArry)
      //       var MenuTitle = that.$store.state.user.appTitle
      //       window.sessionStorage.setItem('MenuList', MenuList) //将菜单存到缓存
      //       window.sessionStorage.setItem('MenuTitle', MenuTitle) //将菜单名称存到缓存
      //       break
      //     } else {
      //       getName(arr[k].child, path)
      //     }
      //   }
      // }
      // getName(pageInfoArry, path)
    }
    // handleSelect(key) {
    //   //console.log(this.arr)
    // },
    // selectMenu(index, indexPath) {
    //   /**
    //    * 在选择父级菜单时自动关闭其下所有子菜单
    //    * 选择时获取点击菜单的父级index，并计算得到该index在已打开菜单中的索引值，
    //    * 关闭位于当前打开菜单中该索引值之后的全部菜单
    //    */
    //   let openedMenus = this.$refs.navbar.openedMenus
    //   let openMenuList
    //   // 如果点击的是二级菜单，则获取其后已经打开的菜单
    //   if (indexPath.length > 1) {
    //     let parentPath = indexPath[indexPath.length - 2]
    //     openMenuList = openedMenus.slice(openedMenus.indexOf(parentPath) + 1)
    //   } else {
    //     openMenuList = openedMenus
    //   }
    //   // 关闭菜单
    //   openMenuList = openMenuList.reverse()
    //   openMenuList.forEach(ele => {
    //     this.$refs.navbar.closeMenu(ele)
    //   })
    //   if (this.navMode == 'horizontal') {
    //     this.navBgShow = false
    //   }
    // },
    // openMenu() {
    //   if (this.navMode == 'horizontal') {
    //     this.navBgShow = true
    //   }
    // },
    // closeMenu() {
    //   if (this.navMode == 'horizontal') {
    //     this.navBgShow = false
    //   }
    // },
    // closeAll() {
    //   let openMenu = this.$refs.navbar.openedMenus.concat([])
    //   openMenu = openMenu.reverse()
    //   openMenu.forEach(ele => {
    //     this.$refs.navbar.closeMenu(ele)
    //   })
    //   if (this.navMode == 'horizontal') {
    //     this.navBgShow = false
    //   }
    // }
  },
  components: {
    NavBarItem: NavBarItem
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.side-nav {
  #navBar {
    width: 80%;
    height: 10vh;
    margin-left: 10%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    // background: #ffffff;
    .el-submenu {
      width: 12.5%;
      text-align: center;
    }
  }
  /* 开始过渡阶段,动画出去阶段 */
  .fade-enter-active,
  .fade-leave-active {
    transition: all 2s ease-out;
  }
  /* 进入开始 */
  .fade-enter {
    transform: translateY(-500px);
    opacity: 0;
  }
  /* 出去终点 */
  .fade-leave-active {
    transform: translateY(500px);
    opacity: 0;
  }
}
</style>


