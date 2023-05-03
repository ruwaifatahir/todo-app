"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { ChangeEvent, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Todo {
  id: number;
  is_completed?: boolean;
  task_description: string;
}

export default function Home() {
  let [todos, setTodos] = useState<Todo[]>([]);
  let [enteredTodo, setEnteredTodo] = useState("");

  const handleAddTodoInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredTodo(e.target.value);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const { rows }: { rows: Todo[] } = await (
        await fetch("http://localhost:3000/api/todos")
      )?.json();

      setTodos(rows);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    try {
      const { rows }: { rows: Todo[] } = await (
        await fetch(
          `http://localhost:3000/api/todos?description=${enteredTodo}`,
          {
            method: "POST",
          }
        )
      ).json();

      setTodos(rows);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const { rows }: { rows: Todo[] } = await (
        await fetch(`http://localhost:3000/api/todos?id=${id}`, {
          method: "DELETE",
        })
      ).json();

      setTodos(rows);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteTodo = async (id: number) => {
    try {
      const { rows }: { rows: Todo[] } = await (
        await fetch(`http://localhost:3000/api/todos?id=${id}`, {
          method: "PUT",
        })
      ).json();

      setTodos(rows);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center space-y-5 mt-10">
      <h2 className="text-4xl">Todo App</h2>

      <div className="flex flex-col justify-center items-center bg-gray-500 p-4 space-y-2">
        <div className="flex w-full space-x-2">
          <input type="text" onChange={handleAddTodoInput} />
          <button
            className="bg-black text-white border px-2"
            onClick={handleAddTodo}
          >
            ADD
          </button>
        </div>

        <h1 className="text-2xl">Todos</h1>
        {todos
          .filter((todo) => todo.is_completed === false)
          .map(({ id, task_description }) => (
            <div
              className="flex flex-col justify-center items-center space-x-1 space-y-3 pt-1 pb-4 px-4  bg-gray-950 text-white w-full"
              key={id}
            >
              <p className="p-1 m-1">{task_description}</p>
              <div className="flex justify-between items-center w-full">
                <button
                  className="bg-black text-white border px-2"
                  onClick={() => {
                    handleDeleteTodo(id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="bg-black text-white border px-2"
                  onClick={() => {
                    handleCompleteTodo(id);
                  }}
                >
                  Complete
                </button>
              </div>
            </div>
          ))}

        <h1 className="text-2xl">Completed Todos</h1>
        {todos
          .filter((todo) => todo.is_completed !== false)
          .map(({ id, task_description }) => (
            <div
              className="flex flex-col justify-center items-center space-x-1 space-y-3 pt-1 pb-4 px-4  bg-gray-950 text-white w-full"
              key={id}
            >
              <p className="p-1 m-1">{task_description}</p>
              <div className="flex justify-center items-center w-full">
                <button
                  className="bg-black text-white border px-2"
                  onClick={() => {
                    handleDeleteTodo(id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
