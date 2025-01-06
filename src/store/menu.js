const localData = localStorage.getItem('pz_v3pz');
const state = localData
  ? localData.menu
  : {
      isCollapse: false,
      selectMenu: [],
      routerList: [],
      menuActive: '1-1',
    };
const mutations = {
  collapseMenu(state) {
    state.isCollapse = !state.isCollapse;
  },

  addMenu(state, payLoad) {
    //对数据进行去重
    if (
      state.selectMenu.findIndex((item) => item.path === payLoad.path) === -1
    ) {
      state.selectMenu.push(payLoad);
    }
  },

  closeMenu(state, payLoad) {
    const index = state.selectMenu.findIndex(
      (val) => val.path === payLoad.path
    );
    //通过索引删除数组指定元素
    state.selectMenu.splice(index, 1);
  },

  dynamicMenu(state, payLoad) {
    const modules = import.meta.glob('../views/**/**/*.vue');
    function routerSet(router) {
      router.forEach((route) => {
        //判断没有子菜单，拼接路由数据
        if (!route.children) {
          const url = `../views${route.meta.path}/index.vue`;
          //拿到获取的vue组件
          route.component = modules[url];
        } else {
          routerSet(route.children);
        }
      });
    }
    routerSet(payLoad);
    //拿到完整的路由数据
    state.routerList = payLoad;
  },
  //保存菜单默认Index值（刷新后打开菜单默认Index）
  updataMenuActive(state, payLoad) {
    state.menuActive = payLoad;
    console.log(state.menuActive, 'state.menuActive');
  },
};
export default {
  state,
  mutations,
};
