<script>
  import { onMount } from 'svelte';

  import { saveTodo, getTodos, deleteTodo, updateTodo } from '../utils/mint-service-client'

  let inputRef = null;
  let list = []

  onMount(async () => {
    await updateTodoList()
	});

  async function addTodo() {
    const todo = inputRef.value
    if (!todo) {
      return
    }

    await saveTodo(todo)

    await updateTodoList()

    inputRef.value = ''
  }

  async function updateTodoList() {
    const response = await getTodos()

    list = (response && response.data && response.data.todo) || []
  }

  async function handleKeyDown(event) {
    if (event.keyCode === 13) {
      await addTodo()
    }
  }

  async function handleChange(id, state, todo) {
    await updateTodo({
      id,
      state: !state,
      todo
    })

    await updateTodoList()
  }

  async function removeTodo(id) {
    await deleteTodo(id)

    await updateTodoList()
  }
</script>

<style>
  section {
    display: flex;
    flex-direction: column;
  }

  input[type=text] {
    padding: 6px;
    font-size: 30px;
    margin-bottom: 12px;
  }

  input[type=checkbox] {
    height: 40px;
    width: 40px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
  }

  span {
    display: inline-block;
    padding-left: 12px;
    text-transform: capitalize;
    font-size: 30px;
    border-bottom: 1px solid #EEE;
    width: 100%;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: red;
    opacity: .7;
    font-size: 10px;
    padding: 6px 12px;
    border: 1px solid;
  }
</style>

<section>
  <input type="text" name="todo" on:keydown={handleKeyDown} bind:this={inputRef} on:focusout={addTodo} />

  {#if list }
    <ul>
    {#each list as { _id: id, todo, state }}
      <li>
        <input type="checkbox" checked={state} on:change={() => handleChange(id, state)}>
        <span>{todo}</span>
        <a href="/todo" on:click={() => removeTodo(id)}>X</a>
      </li>
    {/each}
    </ul>
  {/if}
</section>
