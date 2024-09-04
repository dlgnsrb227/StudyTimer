"use client";
import React, { useEffect } from "react";
import { TimeStampMemo } from "../../assets/script/timestamp";

const Main = () => {
  useEffect(() => {
    const Clock = document.querySelector(".clock");
    const todayDate = document.querySelector(".date");

    // 페이지 로딩 후에 현재 날짜 & 시간표시
    Clock.innerHTML = `${
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : new Date().getHours()
    } : ${
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : new Date().getMinutes()
    }`;
    todayDate.innerHTML = `${new Date().getFullYear()}.${
      new Date().getMonth() + 1 < 10
        ? `0${new Date().getMonth() + 1}`
        : new Date().getMonth() + 1
    }.${
      new Date().getDate() < 10
        ? `0${new Date().getDate()}`
        : new Date().getDate()
    }`;

    // 시간 업데이트 인터벌함수
    const TimeUpdate = () => {
      const Now = new Date();
      const Hour = Now.getHours() < 10 ? `0${Now.getHours()}` : Now.getHours();
      const Minutes =
        Now.getMinutes() < 10 ? `0${Now.getMinutes()}` : Now.getMinutes();
      const Month =
        Now.getMonth() + 1 < 10 ? `0${Now.getMonth() + 1}` : Now.getMonth() + 1;
      const Day = Now.getDate() < 10 ? `0${Now.getDate()}` : Now.getDate();

      Clock.innerHTML = `${Hour} : ${Minutes}`;
      todayDate.innerHTML = `${Now.getFullYear()}.${Month}.${Day}`;
      console.log(`time check test`);
    };

    const TimeInerval = setInterval(TimeUpdate, 1000);

    // 실험용 alert
    todayDate.addEventListener("click", TimeStampMemo);

    // 언마운트 될 때 인터벌 종료 시키기
    return () => {
      clearInterval(TimeInerval);
      todayDate.removeEventListener("click", TimeStampMemo);
    };
  }, []);
  return (
    <>
      <div className="main">
        <div className="leftside">
          <div className="mainclock whiteff">
            <span className="date"></span>
            <span className="clock"></span>
          </div>
          <div className="timestamp">
            <div className="timestampcont">
              <p className="timestampmemo">
                17 : 24 이 곳에 메모가 추가됩니다.
              </p>
              <p className="timestampmemo">
                17 : 34 이 곳에 메모가 추가됩니다.
              </p>
              <p className="timestampmemo">
                17 : 44 이 곳에 메모가 추가됩니다.
              </p>
            </div>
            <input
              type="text"
              className="timestampinput"
              placeholder="타임스탬프에 추가할 내용을 적어주세요."
            />
          </div>
        </div>
        <div className="rightside">
          <div className="musicplayer"></div>
          <div className="todo">
            <div className="todolist">
              <div className="todolistcont"></div>
            </div>
            <div className="listachieve"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
