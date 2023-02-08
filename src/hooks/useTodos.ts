import { ref, computed } from 'vue'

export function useTodos() {
  const title = ref('');
  const todos = ref([{title: '学习vue', done: false}]);

  function addTodo() {
    todos.value.push({title: title.value, done: false});
    title.value = '';
  }

  function clear() {
    todos.value = todos.value.filter(v => !v.done)
  }

  let active = computed(() => {
    return todos.value.filter(v => !v.done).length
  });

  let all = computed(() => {
    return todos.value.length
  })

  let allDone = computed({
    get: function() {
      // @ts-ignore
      return this.active === 0
    },
    set: function(val){
      todos.value.forEach(v => {
        v.done = val
      })
    }
  })

  return { title, todos, active, all, allDone, addTodo, clear }
}