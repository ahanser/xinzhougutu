<template>
  <section class="app-main">
    <!-- <navbar/> -->
    <transition name="fade-transform" mode="out-in">
      <el-scrollbar :style="{height:'100%',width:'100%'}" wrap-style="height:100%;">
        <router-view/>
      </el-scrollbar>
    </transition>
  </section>
</template>
<script>
import { Navbar } from '@/views/layout/components'
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
  components: {
    Navbar
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 10vh);
  position: relative;
  overflow: hidden;
  background: #fff;
}
</style>
