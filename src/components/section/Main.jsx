"use client";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import { getWeather } from "../../assets/scripts/weather";
// import { Todolist } from "../../assets/scripts/todolist";
import LoadingIcon from "../../assets/images/icon/loading.png";

const Main = () => {
  // temperature 상태관리 통해 기온 나타내기
  const [temperature, setTemperature] = useState("Loading...");
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // getWeather함수에서 weatherInfo 반환값으로 받아옴
        const weatherInfo = await getWeather();
        setTemperature(`${weatherInfo[3].obsrValue} ℃`);
      } catch (error) {
        setTemperature(`Error`);
      }
    };

    fetchWeather();
  }, []);

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
      // const Second =
      //   Now.getSeconds() < 10 ? `0${Now.getSeconds()}` : Now.getSeconds();
      const Month =
        Now.getMonth() + 1 < 10 ? `0${Now.getMonth() + 1}` : Now.getMonth() + 1;
      const Day = Now.getDate() < 10 ? `0${Now.getDate()}` : Now.getDate();

      if (Now.getMinutes() === 10 && Now.getSeconds() === 0) {
        console.log("날씨정보가 갱신되었습니다.");

        getWeather();
      }

      Clock.innerHTML = `${Hour} : ${Minutes}`;
      todayDate.innerHTML = `${Now.getFullYear()}.${Month}.${Day}`;
      // console.log(`time check test`);
    };

    const TimeInerval = setInterval(TimeUpdate, 1000);

    // 언마운트 될 때 인터벌 종료 시키기
    return () => {
      clearInterval(TimeInerval);
    };
  }, []);

  // 텍스트 input 입력 상태
  const [inputValue, setInputValue] = useState("");
  // 타임스탬프 메모 저장 배열
  const [timestampMemo, setTimestampMemo] = useState([]);

  // input 변경시 상태 업데이트
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // input내용 타임스탬프 메모 추가
  const addTimestampMemo = () => {
    if (inputValue.trim()) {
      const currentTime = new Date();
      const newMemo = `(${
        currentTime.getHours() < 10
          ? `0${currentTime.getHours()}`
          : currentTime.getHours()
      } : ${
        currentTime.getMinutes() < 10
          ? `0${currentTime.getMinutes()}`
          : currentTime.getMinutes()
      }) 　${inputValue}`;

      setTimestampMemo([...timestampMemo, newMemo]);

      // // test 용 console
      // console.log(document.querySelector(".timestampcont").scrollHeight);
      // console.log(document.querySelector(".timestampcont").scrollTop);
      // console.log(document.querySelector(".timestampcont").scrollHeight - 442);

      document.querySelector(".timestampcont").scrollTop =
        document.querySelector(".timestampcont").scrollHeight - 442;

      // input 초기화
      setInputValue("");
    }
  };

  // 엔터 입력시 추가
  const inputKeydown = (e) => {
    if (e.key === "Enter") {
      addTimestampMemo();
    }
  };
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
              {timestampMemo.map((memo, index) => (
                <p key={index} className="timestampmemo">
                  {memo}
                </p>
              ))}
              {/* <p className="timestampmemo">17 : 24 이 곳에 메모가 추가됩니다.</p> */}
            </div>
            <input
              type="text"
              className="timestampinput"
              placeholder="타임스탬프에 추가할 내용을 적어주세요."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={inputKeydown}
            />
          </div>
        </div>
        <div className="rightside">
          <div className="musicplayer"></div>
          <div className="todo">
            <div className="todolist">
              <div className="todolistcont">
                <ul className="todolistbox">
                  <li className="todocheck">
                    <input type="checkbox" name="todocheck" id="todocheck" />
                    <span className="listcontents">
                      여기에 할 일 목록이 추가됩니다. 내용이 길어지면 내용이
                      길어지면 내용이 길어지면
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
                    <span className="listcontents">
                      여기에 할 일 목록이 추가됩니다.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="listachieve">
              <span className="achieveper">7/10</span>
              <input type="text" placeholder="체크리스트 추가내용" />
            </div>
          </div>
        </div>
        <div className="weatherbox">
          <div className="weathericon">
            <img
              className="weathericonimg"
              src={LoadingIcon}
              alt="날씨아이콘"
            />
          </div>
          <span className="temperature">{temperature}</span>
        </div>
      </div>
    </>
  );
};

export default Main;
