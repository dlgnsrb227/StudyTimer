"use client";
import React, { useState, useEffect } from "react";

const TodoList = () => {
  // local storage에서 데이터 불러오기
  const getLocalTodo = () => {
    const localTodoList = localStorage.getItem("todoList");
    return localTodoList ? JSON.parse(localTodoList) : [];
  };
  // useEffect(() => {
  //   const localTodoList = localStorage.getItem("todoList");
  //   if (localTodoList) {
  //     setTodoList(JSON.parse(localTodoList));
  //   }
  // }, []);

  // 할 일 목록 & 체크 상태 관리
  const [todoList, setTodoList] = useState(getLocalTodo);
  const [newTodo, setNewTodo] = useState("");

  // todoList 변경 시, local storage에 저장
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleCheckboxChange = (index) => (event) => {
    const updateTodoList = todoList.map((item, i) =>
      i === index ? { ...item, checked: event.target.checked } : item
    );
    setTodoList(updateTodoList);
  };

  // list 추가
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodoList([...todoList, { text: newTodo, checked: false }]);

      setNewTodo("");
    }
  };

  // list 삭제
  const handleDeleteTodo = (index) => {
    const updateTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(updateTodoList);
  };

  return (
    <>
      <div className="todolist">
        <h2 className="listhead">Today's Todo</h2>
        <div className="todolistcont">
          <ul className="todolistbox">
            {todoList.map((item, index) => (
              <li className="todocheck" key={index}>
                <input
                  type="checkbox"
                  name={`todocheck-${index}`}
                  checked={item.checked}
                  onChange={handleCheckboxChange(index)}
                />
                <span
                  className={`listcontents ${item.checked ? "complete" : ""}`}
                >
                  {item.text}
                  <button
                    className="removeTodo"
                    onClick={() => handleDeleteTodo(index)}
                  ></button>
                </span>
              </li>
            ))}
            {/* <li className="todocheck">
              <input type="checkbox" name="todocheck" id="todocheck" />
              <span className="listcontents">
                여기에 할 일 목록이 추가됩니다. 내용이 길어지면 내용이 길어지면
                내용이 길어지면
              </span>
            </li>
            <li className="todocheck">
              <input type="checkbox" name="todocheck" id="todocheck" />
              <span className="listcontents">
                여기에 할 일 목록이 추가됩니다.
              </span>
            </li>
            <li className="todocheck">
              <input type="checkbox" name="todocheck" id="todocheck" />
              <span className="listcontents">
                여기에 할 일 목록이 추가됩니다.
              </span>
            </li>
            <li className="todocheck">
              <input type="checkbox" name="todocheck" id="todocheck" />
              <span className="listcontents complete">
                여기에 할 일 목록이 추가됩니다.
              </span>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="listachieve">
        <span className="achieveper">
          {todoList.filter((item) => item.checked).length}/{todoList.length}
        </span>
        <input
          type="text"
          placeholder="체크리스트 추가내용"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="listadd" onClick={handleAddTodo}>
          추가하기
        </button>
      </div>
    </>
  );
};

export default TodoList;
