import { useState, useRef } from "react";

function App() {
  const [todos, setTodos] = useState([
    {id: 1, text: "1", done: false},
    {id: 2, text: "2", done: false},
    {id: 3, text: "3", done: false},
  ])
  return (
    <div className="App">
      <h1>ToDo</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <AddTodo setTodos={setTodos}/>
    </div>
  );
}

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updateTodo = todos.map((t) => 
      t.id ===  todo.id
      ? {
        ...t,  done: !t.done
      }
      : t
    )
    setTodos(updateTodo)
  }
  return (
    <ul>
      {
        todos.map((todo) => (
          <li 
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done? "line-through" : ""
          }}
          key={todo.id}>
            {todo.text}
            <DeleteTodo todo={todo} setTodos={setTodos}/>
          </li>
        ))
      }
    </ul>
  )
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Delete?")
    if(confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id )
      })
    }
  }
  return (
    <span 
    onClick={handleDeleteTodo}
    role="button"
    style={{
      color: 'red',
      fontWeight: 'bold',
      marginleft: 10
    }}>
      x
    </span>
  )
}

function AddTodo({ setTodos }) {
  const inputRef = useRef()
  function handleAddTodo(event) {
    event.preventDefault()
    const text = event.target.elements.addtodo.value;
    const todo = {
      id: 4,
      text,
      done: false
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(todo)
    })
    inputRef.current.value = ""
  }
  return (
    <form onSubmit={handleAddTodo}>
      <input name="addtodo" placeholder="Add todo" ref={inputRef}/>
      <button type="submit">Submit</button>
    </form>
  )
}

export default App;
