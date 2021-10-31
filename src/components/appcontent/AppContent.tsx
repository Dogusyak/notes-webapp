import React, { FC, useState } from "react";
import { ITask } from "../../models/ITask";

import TodoForm from "../../components/todoform/TodoForm";

import "./AppContent.css";
import TodoList from "../../components/todolist/TodoList";

export const AppContent: FC = () => {
  const [todoList, setTodoList] = useState<ITask[]>([
    {
      id: 1,
      content: "Car wash",
      importance:0,
      finished: false,
    },
    {
        id: 2,
        content: "Windows cleaning",
        importance:1,
        finished: true,
    },
  ]);

  const addTodo = (todo: string): void => {
    if (!todo) {
      alert("please add todo!");
      return;
    }
    const data: ITask = {
      id: todoList.length < 1 ? 1 : todoList[todoList.length - 1].id + 1,
      importance:0,
      content: todo,
      finished: false,
    };
    setTodoList([...todoList, data]);
    alert("Todo added successfully!");
  };

  const completeTodo = (id: number): void => {
    setTodoList(
      todoList.map(
        (todo: ITask): ITask =>
          todo.id === id
            ? Object.assign(todo, { completed: true }) && todo
            : todo
      )
    );
    alert("Task has been completed!");
  };

  const deleteTodo = (id: number): void => {
    setTodoList(
      todoList.filter((todo: ITask): ITask | null =>
        todo.id !== id ? todo : null
      )
    );
    alert("Task has been deleted successfully!");
  };

  return (
    <div className="app">
      <div className="container">
        <TodoForm addTodo={addTodo} />
        <div className="todoList">
          {todoList.map((todo: ITask, key: number) => (
            <TodoList
              key={key}
              todo={todo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppContent;