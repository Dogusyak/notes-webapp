import React, { FC, useState } from "react";
import { ITask } from "../../models/ITask";
import TodoForm from "../../components/todoform/TodoForm";
import ShowAll from "../showall/ShowAll";
import TodoList from "../../components/todolist/TodoList";
import "./AppContent.css";


export const AppContent: FC = () => {

  let [todoListAll, setTodoListAll] = useState<ITask[]>([]);
  let [todoList, setTodoList] = useState<ITask[]>([
    {
      id: 1,
      content: "Car wash",
      importance:1,
      finished: false,
    },
    {
        id: 2,
        content: "Windows cleaning",
        importance:2,
        finished: false,
    },
    {
      id: 3,
      content: "Hair Dresser",
      importance:3,
      finished: true,
  }
  ]);

  const filterTask= (todoName: string): void => {
  {
      const list:ITask[] =[];
      todoList.forEach(element => {
      if(element.content.toLowerCase().includes(todoName.toLowerCase()))
      {
        list.push(element)
      }
      });

      list.forEach(element => {
        setTodoList([...todoList, element]); 
      });
    }
  }

  const showAll =(isChecked:boolean):void=>{
    if(!isChecked)
    {
      setTodoListAll(todoList);

      setTodoList(  todoList.filter(item => 
        (item.finished === false)
       ));
    }
    else
    {
      setTodoList(todoListAll);
    }
  }

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
  };

  const rateTodo = (id: number, importance:number): void => {
    setTodoList(
      todoList.map(
        (todo: ITask): ITask =>
          todo.id === id
            ? Object.assign(todo, { importance : importance }) && todo
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
  };

  const setChecked = (id: number): boolean => {
    var value = (todoList).find(x => x.id === id);
      if(value?.finished)
      {
      return true as boolean;
      }
      else
      {
        return false as boolean;
      }
  };

  const deleteTodo = (id: number): void => {
    setTodoList(
      todoList.filter((todo: ITask): ITask | null =>
        todo.id !== id ? todo : null
      )
    );
  };

  return (
    <div className="app">
      <div className="container">
        <TodoForm addTodo={addTodo} searchTodo={filterTask}/>
        <ShowAll showAll={showAll}/>
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
      </div>
    </div>
  );
};

export default AppContent;