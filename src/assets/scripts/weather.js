import axios from "axios";
import weatherIcon0 from "../../assets/images/icon/weather_icon0.png";
import weatherIcon0Night from "../../assets/images/icon/weather_icon0_night.png";
import weatherIcon1 from "../../assets/images/icon/weather_icon1.png";
import weatherIcon2 from "../../assets/images/icon/weather_icon2.png";
import weatherIcon3 from "../../assets/images/icon/weather_icon3.png";

export async function getWeather() {
  // 아이콘 이미지
  const weatherIcon = document.querySelector(".weathericonimg");
  // const apiKey1 = process.env.REACT_APP_WEATHER_API_KEY1;
  const apiKey2 = process.env.REACT_APP_WEATHER_API_KEY2;
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

  // 정각 데이터가 매 시 10분에 api 제공이므로 10분 전에는 전 시간 데이터 호출
  if (hours === 0 && minutes < 10) {
    // 00시 10분 전이면 전날 23시 데이터 호출
    hours = 23;
    currentTime += hours;
  } else if (minutes < 10) {
    // 00시를 제외한 나머지 10분 전이면 전 시간의 데이터 호출
    currentTime += hours - 1;
  } else {
    // 매 시 10분 이후에는 현재 시간의 데이터 호출
    currentTime += hours;
  }

  // 한 자릿수의 분일 때 0추가
  if (minutes < 10) {
    currentTime += "0";
  }
  currentTime += minutes;

  // console.log(currentTime);

  try {
    const response = await axios.get(
      `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst`,
      {
        params: {
          serviceKey: apiKey2,
          pageNo: 1,
          numOfRows: 1000,
          dataType: "JSON",
          base_date: todayString,
          base_time: currentTime,
          nx: 58,
          ny: 121,
        },
      }
    );

    // console.log(response);
    // console.log(response.data.response.body);

    if (response && response.data.response.body) {
      const weatherInfo = response.data.response.body.items.item;
      console.log(
        `날짜 : ${todayString} 시간 : ${currentTime}에 대한 날씨 호출 정보입니다.`
      );
      console.log(weatherInfo);

      // 날씨 아이콘 변경
      if (weatherInfo[0].obsrValue === "0") {
        if (hours >= 18 || hours <= 5) {
          weatherIcon.src = weatherIcon0Night;
        } else {
          weatherIcon.src = weatherIcon0;
        }
      } else if (
        weatherInfo[0].obsrValue === "1" ||
        weatherInfo[0].obsrValue === "5"
      ) {
        weatherIcon.src = weatherIcon1;
      } else if (
        weatherInfo[0].obsrValue === "2" ||
        weatherInfo[0].obsrValue === "6"
      ) {
        weatherIcon.src = weatherIcon2;
      } else if (
        weatherInfo[0].obsrValue === "3" ||
        weatherInfo[0].obsrValue === "7"
      ) {
        weatherIcon.src = weatherIcon3;
      }

      temperature.innerHTML = `${weatherInfo[3].obsrValue} ℃`;
      return weatherInfo;
    } else {
      throw new Error("No Weather Data");
    }
  } catch (error) {
    console.error("Error fetching weather data", error);
    throw error;
  }
}
