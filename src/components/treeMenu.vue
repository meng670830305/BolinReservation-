<!-- <template>
  <template v-if="item.meta && !item.meta.hidden">
    <el-sub-menu v-if="!item.children && item.children.length > 0"
                 :index="item.path"
                 :key="item.path">
      <template #title>
        <el-icon size="20">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </template>
      <treeMenu v-for="child in item.children"
                :item="child"
                :key="child.path" />
    </el-sub-menu>
    <el-menu-item @click="handleClick(item,item.path)"
                  v-else
                  :index="item.path">
      <el-icon size="20">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.name }}</span>
    </el-menu-item>
  </template>
</template> -->
<template>
  <template v-for="(item) in props.menuList">
    <el-menu-item @click="handleClick(item,`${props.index}-${item.meta.id}`)"
                  v-if="!item.children || item.children.length == 0"
                  :index="`${props.index}-${item.meta.id}`"
                  :key="`${props.index}-${item.meta.id}`">
      <el-icon size="20">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item?.meta.name }}</span>
    </el-menu-item>
    <el-sub-menu v-else
                 :index="`${props.index}-sub-${item.meta.id}`"
                 :key="`${props.index}-sub-${item.meta.id}`">
      <template #title>
        <el-icon size="20">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item?.meta.name }}</span>
      </template>
      <tree-menu :index="`${props.index}-${item.meta.id}`"
                 :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { defineProps, computed } from 'vue'

const props = defineProps(['menuList', 'index'])
//创建router实例
const router = useRouter()
const store = useStore()
//点击菜单
const handleClick = (item, active) => {
  store.commit('addMenu', item.meta)
  store.commit('updataMenuActive', active)

  router.push(item.meta.path)
}
</script>
