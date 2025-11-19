import {useEffect, useState} from "react";
import Todo from "./Todo";

import { AnimatePresence } from "framer-motion" // animation


export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("medium")

  const [theme, setTheme] = useState(() => { /* creates themes ands saves locally */
    const saved = localStorage.getItem("theme");
    // return saved ? saved : "dark";

    if (saved) return saved; // if already picked uses that theme
    // matches users preference
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"; 
  })

  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos");
      const todos = await res.json();

      setTodos(todos);
    }
    getTodos();
  }, []);

  useEffect(() => {
    const isLight = theme === "light";
    document.body.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("light", isLight); // remove if not necessary
    localStorage.setItem("theme", theme); /* saves */
  }, [theme]);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) { // if too short wont make new todo
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content, priority}), // holds content and priority
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

      setContent("");
      setTodos([...todos, { newTodo, priority }]);
    }
  }

  // For Drag and Drop
  // const reOrderTodo = (from, to) => {
  //   setTodos(prev => {
  //     const next = [...prev];
  //     const [moved] = next.splice(from, 1);
  //     next.splice(to, 0, moved);
  //     return next;
  //   });
  // };
  const moveTodo = (from, to) => {
    setTodos(prev => {
      if(to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    })
  }
  const moveUp = (index) => moveTodo(index, index - 1);
  const moveDown = (index) => moveTodo(index, index + 1);

  return (
    <main className="container"> 
      <h1 className="title">
        Todos
      </h1>
      <form className="form" onSubmit={createNewTodo}>
        <input type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter a new todo..."
        className="form__input"
        required
        />
        <select
          value={ priority }
          onChange={ (e) => setPriority(e.target.value)}
          className="form__select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <button className="form__button" type="submit">Create Todo</button>
      </form>
        <div className="todos">
          <AnimatePresence mode="popLayout">
          {(todos.length > 0) &&
            todos.map((todo, i) => (
              <Todo 
              key={todo._id} 
              todo={todo} 
              setTodos={setTodos}
              moveUp={moveUp}
              moveDown={moveDown}
              index={i}
              total={todos.length}
              />
            ))}
          </AnimatePresence>
        </div>
        <button className="theme-toggle"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
    </main>
  );
}


