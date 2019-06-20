export default {
  namespaced: true,
  state: {
    picId: '', //服务明细对应id

  },
  getters: {
    getterListArr(state) {
      return state.picId
    }

  },
  mutations: {
    CHANGE_LIST_ARR(state, arr) {
      state.picId = arr;
    },

  },
  actions: {
    changeListArr({
      commit
    }, value) {
      commit("CHANGE_LIST_ARR", value)
    },

  }
}
