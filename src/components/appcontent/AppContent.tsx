import React, { FC, useState } from "react";
import { ITask } from "../../models/ITask";
import TodoForm from "../../components/todoform/TodoForm";
import ShowAll from "../showall/ShowAll";
import TodoList from "../../components/todolist/TodoList";
import "./AppContent.css";
import { NoToDo } from "../noToDo/noToDo";

export const AppContent: FC = () => {


  const [oldValue, setOldValue] = useState<string>();
  const [todoListAll, setTodoListAll] = useState<ITask[]>([]);
  const [todoListFiltered, setTodoListFiltered] = useState<ITask[]>([]);
  const [todoList, setTodoList] = useState<ITask[]>([
    {
      id: 0,
      content: "Car wash",
      importance: 1,
      finished: false,
    },
    {
      id: 1,
      content: "Windows cleaning",
      importance: 2,
      finished: false,
    },
    {
      id: 2,
      content: "Hair Dresser",
      importance: 3,
      finished: true,
    },
    {
      id: 3,
      content: "Hamam time",
      importance: 4,
      finished: false,
    }
  ]);

  const filterTask = (todoName: string): void => {
    {
      if (todoName && oldValue != todoName) {
        if (todoListFiltered.length < TodoList.length) {
          setTodoListFiltered(todoList);
        }
        if (todoListFiltered.length > 0) {
          setTodoList(todoListFiltered.filter(item =>
            (item.content.toLowerCase().startsWith(todoName.toLowerCase()))
          ));
        }
        else {
          setTodoList(todoList.filter(item =>
            (item.content.toLowerCase().startsWith(todoName.toLowerCase()))
          ));
        }
        setOldValue(todoName);
      }
      else if (!todoName && oldValue && oldValue != todoName) {
        setTodoList(todoListFiltered);
        setOldValue(todoName);
      }
    }
  }


  const showAll = (isChecked: boolean): void => {

    if (!isChecked) {
      setTodoListAll(todoList);

      setTodoList(todoList.filter(item =>
        (item.finished === false)
      ));
      if (!oldValue) {
        setTodoListFiltered([]);
      }
    }
    else {
      setTodoList(todoListAll);
      if (!oldValue) {
        setTodoListFiltered([]);
      }
    }
  }

  const addTodo = (todo: string): void => {

    if (!todo) {
      alert("please add todo!");
      return;
    }

    const data: ITask = {
      id: todoListFiltered.length < 1 ? 1 : todoListFiltered[todoListFiltered.length - 1].id + 1,
      content: todo,
      importance: 0,
      finished: false,
    };

    setTodoListFiltered([...todoListFiltered, data]);

  };

  const rateTodo = (id: number, importance: number): void => {

    setTodoList(
      todoList.map(
        (todo: ITask): ITask =>
          todo.id === id
            ? Object.assign(todo, { importance: importance }) && todo
            : todo
      )
    );

    setTodoListAll(
      todoListAll.map(
        (todo: ITask): ITask =>
          todo.id === id
            ? Object.assign(todo, { importance: importance }) && todo
            : todo
      )
    );

    setTodoListFiltered(
      todoListFiltered.map(
        (todo: ITask): ITask =>
          todo.id === id
            ? Object.assign(todo, { importance: importance }) && todo
            : todo
      )
    );
  };

  const completeTodo = (id: number): void => {

    setTodoList(
      todoList.map(
        (todo: ITask): ITask =>
          todo.id === id
            ? Object.assign(todo, { finished: true }) && todo
            : todo
      )
    );

    setTodoListAll(
      todoListAll.map(
        (todo: ITask): ITask =>
          todo.id === id
            ? Object.assign(todo, { finished: true }) && todo
            : todo
      )
    );

    setTodoListFiltered(
      todoListFiltered.map(
        (todo: ITask): ITask =>
          todo.id === id
            ? Object.assign(todo, { finished: true }) && todo
            : todo
      )
    );
  };

  const undoCompleteTodo = (id: number): void => {

    setTodoList(
      todoList.map(
        (todo: ITask): ITask =>
          todo.id === id
            ? Object.assign(todo, { finished: false }) && todo
            : todo
      )
    );

    setTodoListAll(
      todoListAll.map(
        (todo: ITask): ITask =>
          todo.id === id
            ? Object.assign(todo, { finished: false }) && todo
            : todo
      )
    );

    setTodoListFiltered(
      todoListFiltered.map(
        (todo: ITask): ITask =>
          todo.id === id
            ? Object.assign(todo, { finished: false }) && todo
            : todo
      )
    );
  };

  const setChecked = (id: number): boolean => {

    var value = (todoList).find(x => x.id === id);
    if (value?.finished) {
      return true as boolean;
    }
    else {
      return false as boolean;
    }
  };
  
  const deleteTodo = (id: number): void => {
    
    setTodoList(
      todoList.filter((todo: ITask): ITask | null =>
        todo.id !== id ? todo : null
      )
    );


    setTodoListFiltered(
      todoListFiltered.filter((todo: ITask): ITask | null =>
        todo.id !== id ? todo : null
      )
    );

    setTodoListAll(
      todoListAll.filter((todo: ITask): ITask | null =>
        todo.id !== id ? todo : null
      )
    );
    
  };

  return (
    <div className="app">
      <div className="container">
        <TodoForm addTodo={addTodo} searchTodo={filterTask} />
        <ShowAll showAll={showAll} />
        <div className="todoList">
          {todoList.map((todo: ITask, key: number) => (
            <TodoList
              key={key}
              todo={todo}
              setChecked={setChecked}
              rateTodo={rateTodo}
              completeTodo={completeTodo}
              undoCompleteTodo={undoCompleteTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
        <NoToDo lenghtOfArray={todoList.length}/>
      </div>
    </div>
  );
};

export default AppContent;