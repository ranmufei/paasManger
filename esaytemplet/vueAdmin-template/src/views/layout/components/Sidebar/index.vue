<template>
  <scroll-bar>
    <h4 class="avator"><img src="src/assets/avator.jpg"></h4>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped>

  .avator{
    width:80px;
    height: 80px;
    margin: 40px auto;
    z-index: -1;
  }
  .avator img{
    border-radius:50%;
    width:80px;
    height: 80px;
  }
</style>
