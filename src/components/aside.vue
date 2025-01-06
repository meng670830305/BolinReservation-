<template>
  <el-menu active-text-color="#ffd04b"
           background-color="#545c64"
           translate="no"
           class="aside-container el-menu--sidebar"
           text-color="#fff"
           @open="handleOpen"
           @close="handleClose"
           :collapse="isCollapse"
           :default-active="active">
    <p class="logo-lg">
      {{ isCollapse ? '予約' : '予約管理' }}
    </p>
    <TreeMenu :index="1"
              :menuList="menuList" />
    <!-- <TreeMenu v-for="item in menuList"
              :item="item"
              :key="item.path" /> -->
  </el-menu>

</template>

<script setup>

import TreeMenu from './treeMenu.vue'
import { useRouter } from 'vue-router'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'

const router = useRouter()
// const menuList = reactive(router.options.routes[0].children)
const store = useStore()
const menuList = reactive(computed(() => store.state.menu.routerList))
const isCollapse = computed(() => store.state.menu.isCollapse)
const active = computed(() => store.state.menu.menuActive)
const handleOpen = () => { }
const handleClose = () => { }


</script>

<style lang="less" scoped>
.aside-container {
  height: 100%;
  .logo-lg {
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
.el-menu--sidebar:not(.el-menu--collapse) {
  width: 230px;
}
</style>