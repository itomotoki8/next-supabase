import { FormEvent, useEffect, useState } from "react";
import TodoList from "./TodoList";
import { addTodo, getAllTodos } from "@/utils/supabasefunctions";

const TodoApp = () => {
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
      console.log(todos);
    };
    getTodos();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "") return;

    //Todoの追加

    await addTodo(title);
    let todos = await getAllTodos();
    setTodos(todos);
    setTitle("");
  };

  return (
    <section className="mr-2 text-center mb-2 text-2xl font-medium">
      <h3>Supabase Todo App</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className=" shadow-lg p-1 outline-none"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button className="shadow-md border02 p-1 rounded-lg bg-green-200">
          Add
        </button>
      </form>
      <TodoList todos={todos} setTodos={setTodos} />
    </section>
  );
};
export default TodoApp;
