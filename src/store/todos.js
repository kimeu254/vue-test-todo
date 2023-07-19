
export default {
  state: {
    todos: []
  },
  getters: {
    todos(state) {
      return state.todos
    },
  },
  mutations: {
    GET_TODOS(state)
    {
      return state.todos
    },
    NEW_TODO(state, todo){
      state.todos.push(todo)
    },
    EDIT_TODO(state, todo){
      state.todos.find(t => {
        return t.id === todo.id
      })
    },
    DELETE_TODO(state, id) {
      state.todos = state.todos.filter(t => {
        return t.id != id
      })
      window.location.reload()
    },
    MARK_COMPLETE(state, {id, completed}) {
      state.todos.find(t => t.id == id).completed = completed
    }
  },
  actions: {
    fetchTodos({commit}){
      commit('GET_TODOS')
    },
    createTodo({commit}, todo){
      console.log(todo)
      commit('NEW_TODO',todo)
    },
    updateTodo({commit}, {id}) {
      commit('EDIT_TODO', {id})
    },
    removeTodo({commit}, id) {
      commit('DELETE_TODO', id)
    },
    markComplete({commit}, {id, completed}) {
      commit('MARK_COMPLETE', {id, completed})
    }
  }
}
