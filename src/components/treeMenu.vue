<template>
    <template v-if="item.meta && !item.meta.hidden">
        <el-sub-menu v-if="item?.children?.length > 0" :index="item.path" :key="item.path" >
            <template #title>
                <el-icon size="20">
                <component :is="item.meta.icon"></component>
                </el-icon>
            <span>{{ item.meta.name }}</span>
            </template>
            <treeMenu v-for="child in item.children" :item="child" :key="child.path" />
        </el-sub-menu>
        <el-menu-item
        @click="handleClick(item,item.path)"
         v-else :index="item.path">
            <el-icon size="20">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.name }}</span>
        </el-menu-item>
    </template>
</template>



<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {defineProps,computed} from 'vue'

const props = defineProps({
    item: {
        type: Object,
        default: () => { },
    },
})
//创建router实例
const router = useRouter()
const store = useStore()
//点击菜单
const handleClick = (item, active) => {
    store.commit('addMenu', item)
    router.push(item.path)
}
</script>
