import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import todos from './todos'

const store = createStore({
  plugins:[
    createPersistedState()
  ],
  modules:{
    todos
  }
})

export default store