<template>
  <panel-head :route="route" />
  <div class="btns"><el-button :icon="Plus"
               type="primary"
               @click="open(null)"
               size="small">開く</el-button></div>

  <el-table :data="tableData.list"
            style="width: 100%">
    <el-table-column prop="id"
                     label="id" />
    <el-table-column prop="name"
                     label="昵称" />
    <el-table-column prop="permissionName"
                     label="菜单权限" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary"
                   @click="open(scope.row)">編集</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination-info">
    <el-pagination v-model:current-page="paginationData.pageNum"
                   :page-size="paginationData.pageSize"
                   :background="false"
                   size="small"
                   layout="total, prev, pager, next"
                   :total="tableData.total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
  </div>
  <el-dialog v-model="dialogFormVisable"
             :before-close="beforeClose"
             title="添加权限"
             width="500">
    <el-form ref="formRef"
             label-width="100px"
             label-position="left"
             :model="form"
             :rules="rules">
      <el-form-item v-show="false"
                    prop="id">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="名称"
                    prop="name">
        <el-input v-model="form.name"
                  placehodler="请填写权限名称"></el-input>
      </el-form-item>
      <el-form-item label="权限"
                    prop="permissions">
        <el-tree ref="treeRef"
                 style="max-width: 600px;"
                 :data="permissionsData"
                 node-key="id"
                 show-checkbox
                 :default-checked-keys="defaultKeys"
                 :default-expanded-keys="[2]"></el-tree>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary"
                   @click="confirm(formRef)">确认</el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from 'vue'
import { userGetMenu, userSetMenu, menuList } from '../../../api'
import { Plus } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(() => {
  //菜单数据
  userGetMenu().then(({ data }) => {
    permissionsData.value = data.data
  })
  getListData()
})
//列表数据
const tableData = reactive({
  list: [],
  total: 0,
})
//打开弹窗
const open = (rowData = {}) => {
  dialogFormVisable.value = true
  //弹窗打开form生成时异步的
  nextTick(() => {
    if (rowData) {
      Object.assign(form, { id: rowData.id, name: rowData.name })
      treeRef.value.setCheckedKeys(rowData.permission)
    }
  })
}
//分页参数
const paginationData = reactive({
  pageNum: 1,
  pageSize: 10,
})

//
const handleSizeChange = (val) => {
  paginationData.pageSize = val
  getListData()
}
const handleCurrentChange = (val) => {
  paginationData.pageNum = val
  getListData()
}
//请求列表数据
const getListData = () => {
  menuList(paginationData).then(({ data }) => {
    const { list, total } = data.data
    tableData.list = list
    tableData.total = total
  })
}
//表单Form实例化
const formRef = ref()
//form的数据
const form = reactive({
  id: '',
  name: '',
  permissions: '',
})

//树形菜单权限数据
const permissionsData = ref([])

//弹窗的显示隐藏
const dialogFormVisable = ref(false)

//关闭弹窗的回调
const beforeClose = () => {
  dialogFormVisable.value = false
  //重置表单
  formRef.value.resetFields()
  //tree选择重置
  treeRef.value.setCheckedKeys(defaultKeys)
}

//选中权限
const defaultKeys = [4, 5]
const treeRef = ref()
//表单校验
const rules = reactive({
  name: [{ required: true, trigger: 'blur', message: '请输入权限名称' }]

})

//表单提交
const confirm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      //チェックされた権限を取得
      const permissions = JSON.stringify(treeRef.value.getCheckedKeys())
      userSetMenu({ name: form.name, permissions, id: form.id }).then(({ data }) => {
        console.log(data, 'data')
        beforeClose()
        getListData()
      })
    } else {
      console.log('error submit!', fields)
    }

  })
}
</script>


<style lang="less" scoped>
.btns {
  padding: 10px 0 10px 10px;
  background-color: #fff;
}
</style>
