const state = {
    isCollapse: false,
    selectMenu:[],

}
const mutations = {
    collapseMenu(state){
        state.isCollapse=!state.isCollapse
    },
    addMenu(state,payLoad){
        //对数据进行去重
        if(state.selectMenu.findIndex(item => item.path===payLoad.path)===-1){
            
            state.selectMenu.push(payLoad)
        }
    },
    closeMenu(state,payLoad){
       const index = state.selectMenu.findIndex(val =>val.path===payLoad.path)
       //通过索引删除数组指定元素
       state.selectMenu.splice(index,1)
    }
}
export default{
    state,
    mutations
}