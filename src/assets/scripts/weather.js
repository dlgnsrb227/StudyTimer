import axios from "axios";

export function getWeather() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY2;
  const temperature = document.querySelector(".temperature");
  // 오늘 날짜 변수 설정
  let today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  // 20240910 형식으로 날짜표기
  let todayString = "" + year;

  // 한 자릿수의 달일 때 0추가
  if (month < 10) {
    todayString += "0";
  }
  todayString += month;
  // 한 자릿수의 일일 때 0추가
  if (date < 10) {
    todayString += "0";
  }
  todayString += date;

  // 현재 시간 변수 설정
  let hours = today.getHours();
  let minutes = today.getMinutes();

  // 1830 형식으로 시간표기
  let currentTime = "";

  // 한 자릿수의 시간일 때 0추가
  if (hours < 10) {
    currentTime += "0";
  }
  currentTime += hours;
  // 한 자릿수의 분일 때 0추가
  if (minutes < 10) {
    currentTime += "0";
  }
  currentTime += minutes;

  console.log(todayString);
  console.log(currentTime);

  axios
    .get(
      `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst`,
      {
        params: {
          serviceKey: apiKey,
          pageNo: 1,
          numOfRows: 1000,
          dataType: "JSON",
          base_date: todayString,
          base_time: currentTime,
          nx: 58,
          ny: 121,
        },
      }
    )
    .then(function (response) {
      if (response && response.data.response.body) {
        let weatherInfo = response.data.response.body.items.item;

        console.log(weatherInfo);

        temperature.innerHTML = `${weatherInfo[3].obsrValue}℃`;
      }
    });
}
