<script>
import CardComponent from '../components/CardComponent.vue';

export default {
    name:'create-view',
    components: { CardComponent },
    data () {
        return {
            todos: this.$store.state.todos.todos,
            todo: {
                id: '',
                title: '',
                description: '',
                due_date: '',
                date_added: new Date().toISOString().slice(0,10),
                completed: false,
            }
        }
    },
    mounted() {
        this.$store.dispatch("fetchTodos")
    },
    methods: {
        onSubmit(){
            if (this.todos.length) {
                let last = this.todos[this.todos.length - 1].id
                this.todo.id = ++last
            }
            else{
                let arrLen = this.todos.length
                this.todo.id = ++arrLen
            }
            this.$store.dispatch("createTodo", this.todo).then(() => {
                this.$refs.form.reset();
                this.$router.push({name:'home'})
            })
        }
    }
}
</script>

<template>
    <div class="center">
        <CardComponent>
            <template #body>
                <h4>Create Todo</h4>
                <form @submit.prevent="onSubmit" ref="form">
                    <div class="form-input">
                        <label class="form-label">Title</label>
                        <br/>
                        <input type="text" class="form-control" v-model="todo.title" required/>
                    </div>
                    <div class="form-input">
                        <label class="form-label">Description</label>
                        <br/>
                        <textarea class="form-control" rows="5" v-model="todo.description"></textarea>
                    </div>
                    <div class="form-input">
                        <label class="form-label">Due Date</label>
                        <br/>
                        <input type="date" class="form-control" v-model="todo.due_date" required/>
                    </div>
                    <div class="form-input">
                        <button class="btn btn-dark" type="submit">Save</button>
                    </div>
                </form>
            </template>
        </CardComponent>
    </div>
</template>