import React, { FC, useState } from "react";
import { ITask } from "../../models/ITask";
import TodoForm from "../../components/todoform/TodoForm";
import ShowAll from "../showall/ShowAll";
import TodoList from "../../components/todolist/TodoList";
import "./AppContent.css";

export const AppContent: FC = () => {

  //This variable will be used to keep the previous value of todo-value.
  const [oldValue, setOldValue] = useState<string>();
  //Whilst show all process, whole todoList array will be copied in this array to secure todoList array elements.
  const [todoListAll, setTodoListAll] = useState<ITask[]>([]);
  //Before todo list is filtered, whole array will be copied in this array to secure todoList array elements.
  const [todoListFiltered, setTodoListFiltered] = useState<ITask[]>([]);
  //Here we will initialised 4 different Tasks to fill the list on runtime.(These values are for example. They can be changed.)
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

  //This method will be used to filter the list according to a given string. (For example "Cleaning" string text will be searched in the array and be filtered.)
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

  };

  //This method will be used to show complated tasks or all tasks in the list.
  const showAll = (isChecked: boolean): void => {

    if (!isChecked) {
      // Copying todoList-array to todoListAll-array
      setTodoListAll(todoList);

      //After securing the tasks in todoListAll-array, we can filter the required tasks and show the result via todoList.
      setTodoList(todoList.filter(item =>
        (item.finished === false)
      ));

      //If there is no OldValue, then we can empty todoListFiltered-array. We no need to secure any task in this array, because no old value means tasks will be shown without taking into consideration todoListFiltered-array.
      if (!oldValue) {
        setTodoListFiltered([]);
      }
    }
    else {
      // if showAll-checkbox is checked, then we can copy the values which we already secured back to the todoList.
      setTodoList(todoListAll);

      if (!oldValue) {
        setTodoListFiltered([]);
      }
    }
  };

  //This method will be used to add an object into relative arrays.
  const addTodo = (todo: string): void => {

    if (!todo) {
      alert("please add todo!");
      return;
    }

    //Create Task object with the given content.
    const data: ITask = {
      id: todoListFiltered.length < 1 ? 1 : todoListFiltered[todoListFiltered.length - 1].id + 1,
      content: todo,
      importance: 0,
      finished: false,
    };

    //Add object into todoListFiltered array and todoListAll array. We no need to add it in todoList because todoList is used a result array to present last state of objects.
    setTodoListFiltered([...todoListFiltered, data]);
    setTodoListAll([...todoListAll, data]);

  };

  //This method will be used to set the importance of a task.
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
      </div>
    </div>
  );
};

export default AppContent;