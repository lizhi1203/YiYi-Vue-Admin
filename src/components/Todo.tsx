import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const title = ref<string>('');
    const todos = ref([{title: '吃饭', done: true}, {title: '学习', done: true}]);

    function addTodo() {
      todos.value.push({
        title: title.value,
        done: false
      })
      title.value = '';
    }

    return () => <div>
      <input type="text" vModel={title.value} />
      <button onClick={addTodo}>添加</button>
      <ul>
        {todos.value.length ? todos.value.map(todo => {
          return <li key={todo.title}>{todo.title}</li>
        }) : <li>no Data</li>}
      </ul>
    </div>
  } 
})