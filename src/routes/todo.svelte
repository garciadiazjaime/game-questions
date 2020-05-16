<script>
  import { onMount } from 'svelte';

  import { saveTodos, getTodos, deleteTodo, updateTodo } from '../utils/mint-service-client'

  let selectedId = null
  let inputRef = null;
  let list = []

  onMount(async () => {
    await updateTodoList()
	});

  async function addTodos(data) {
    if (selectedId) {
      await handleChange(selectedId, null, data)
      selectedId = null
    } else {
      const items = data.split('\n').reduce((accu, item) => {
        const value = item.trim()
        if (value && value.length) {
          accu.push(value)
        }

        return accu
      }, [])

      if (!items.length) {
        return
      }
      
      await saveTodos(items)

      await updateTodoList()

      inputRef.value = ''
    }
  }

  async function updateTodoList() {
    const response = await getTodos()

    list = (response && response.data && response.data.todo) || []
  }

  async function handleKeyDown(event) {
    if (event.keyCode === 13) {
      await addTodos(event.target.value)
    }
  }

  async function handleChange(id) {
    const item = list.find(item => item._id === id)

    await updateTodo(item)
  }

  async function removeTodo(id) {
    selectedId = null

    await deleteTodo(id)

    await updateTodoList()
  }

  async function handleClick(id) {
    if (selectedId) {
      handleChange(selectedId)
      selectedId = null
    } else {
      selectedId = id
    }
  }
</script>

<style>
  section {
    display: flex;
    flex-direction: column;
  }

  input[type=text] {
    padding: 4px;
    font-size: 30px;
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
  <input type="text" name="todo" on:keydown={handleKeyDown} bind:this={inputRef} />

  {#if list }
    <ul>
    {#each list as { _id, todo, state }}
      <li>
        {#if _id === selectedId }
          <input type="text" bind:value={todo} on:keydown={handleKeyDown} />
        {:else }
          <input type="checkbox" bind:checked={state} on:change={() => handleChange(_id)}>
          <span on:click={() => handleClick(_id)}>{todo}</span>
          <a href="/todo" on:click={() => removeTodo(_id)}>X</a>
        {/if}
      </li>
    {/each}
    </ul>
  {/if}
</section>
