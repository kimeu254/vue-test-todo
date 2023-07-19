<template>
  <h1 class="header">Todo App</h1>
  <div class="container">
    <div class="todo-title">
      <h3>Todo List</h3>
      <router-link :to="{name:'create'}" class="btn btn-dark">New Todo</router-link>
    </div>
    <div v-if="todos.length">
      <div>
        <h5>#Filter:</h5>
        <div class="filter">
          <div style="padding-right: 10px;">
            <button class="btn btn-success" @click="filterComplete">Complete</button>
          </div>
          <div>
            <button class="btn btn-warning" @click="filterincomplete">Incomplete</button>
          </div>
        </div>
      </div>
      <div>
        <card-component v-for="todo in todos.slice().reverse()" :key="todo.id" card-class="card-class">
          <template #body>
            <div class="todo-list">
              <div>
                <h3>{{ todo.title }}</h3>
                <p style="font-size:x-small">Created on: {{ todo.date_added }}</p>
                <p>{{ todo.description }}</p>
                <p class="white">
                  <span v-if="todo.completed" class="success deadline-box">Completed</span>
                  <span v-else-if="!todo.completed && todo.due_date > today" class="info deadline-box">
                    Due on {{ todo.due_date }}
                  </span>
                  <span v-else-if="!todo.completed && todo.due_date === today" class="warning deadline-box">
                    Due
                  </span>
                  <span v-else-if="!todo.completed && todo.due_date < today" class="danger deadline-box">
                    Overdue
                  </span>
                </p>
              </div>
              <div>
                <div class="todo-actions">
                  <button v-if="!todo.completed" class="btn btn-success" @click="markComplete(todo.id, todo.completed)">Complete</button>
                  <router-link v-if="!todo.completed" :to="{name:'edit', params:{id:todo.id}}" class="btn btn-info">
                    Edit
                  </router-link>
                  <button class="btn btn-danger" @click="deleteTodo(todo.id)">Delete</button>
                </div>
              </div>
            </div>
          </template>
        </card-component>
      </div>
    </div>
    <div v-else class="no-data">
      <p style="background-color: aliceblue; padding: 10px;">Oops! No Tasks found...</p>
    </div>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue';

export default {
    name: "HomeView",
    components: { CardComponent },
    data() {
      return{
        todos: this.$store.state.todos.todos,
        allTodos: this.$store.getters.todos,
        today: new Date().toISOString().slice(0,10),
        completed: false
      }
    },
    mounted(){
      this.$store.dispatch('fetchTodos')
    },
    methods: {
      deleteTodo(id){
        if(confirm("Are you sure?"))
        {
          this.$store.dispatch('removeTodo', id)
        }
      },
      markComplete(id){
        this.$store.dispatch("markComplete", {id, completed : this.completed = !this.completed})
      },
      filterComplete(){
        this.todos = this.allTodos
        this.todos = this.todos.filter(t => {
          return t.completed
        })
      },
      filterincomplete(){
        this.todos = this.allTodos
        this.todos = this.todos.filter(t => {
          return !t.completed
        })
      }
    }
}
</script>

<style scoped>
.header{text-align: center; padding: 20px 0; color: lightgray; font-style: italic;}
.todo-title{display: flex; align-items: center;justify-content: space-between;}
.card-class{margin: 20px 0;}
.todo-list{display: flex; justify-content: space-between; align-items: baseline;}
.filter{display: flex; align-items: center;}
.no-data{text-align: center; color: grey;}
</style>