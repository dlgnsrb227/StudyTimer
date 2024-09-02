import React from "react";

const Main = () => {
  return (
    <>
      <div className="main">
        <div className="leftside">
          <div className="mainclock whiteff">
            <span className="date">2024.09.02</span>
            <span className="clock">22 : 19</span>
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
        <div className="rightside"></div>
      </div>
    </>
  );
};

export default Main;
