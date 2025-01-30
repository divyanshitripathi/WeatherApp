import "./styles.css";
import { useState, useEffect } from "react";
import thunderIcon from "../public/storm.gif";
import RainIcon from "../public/rain.gif";
import FoggyIcon from "../public/foggy.gif";
import SunIcon from "../public/sun.gif";
import WindIcon from "../public/wind.gif";
import SnowIcon from "../public/snow.gif";
import defaultIcon from "../public/default.gif";
import moment from "moment";
import fetchWeatherData from "../src/utils/model";

export default function App() {
  const [city, setCity] = useState("lucknow");
  const [weatherData, setWeatherData] = useState("");
  const currentDate = moment()._d;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = months[currentDate.getMonth()];
  const currentDay = currentDate.getDay();
  const currentYear = currentDate.getFullYear();

  const formattedDate = `${currentMonth} ${currentDay},    ${currentYear}`;

  const handelCitySubmission = (event) => {
    event.preventDefault();
    console.log({ city });
    fetchWeatherData({ city }).then((response) => {
      if (response !== false) {
        setWeatherData(response);
        setCity("");
      }
    });
  };

  console.log({ weatherData });
  useEffect(() => {
    /** Accessing user;s current location */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData({ latitude, longitude }).then((response) => {
          console.log({ response });
          setWeatherData(response);
          setCity("");
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return `${thunderIcon}`;
      case "Rain":
        return `${RainIcon}`;
      case "Mist":
        return `${FoggyIcon}`;
      case "Clear":
        return `${SunIcon}`;
      case "Snow":
        return `${SnowIcon}`;
      default:
        return `${defaultIcon}`;
    }
  };

  const weatherInCelcius = (
    weatherData?.main?.temp < 50
      ? weatherData?.main?.temp
      : weatherData?.main?.temp - 273.15
  ).toFixed(1);

  return (
    <div className="App">
      <div className="container">
        <h1 className="container_date">{formattedDate}</h1>
        {weatherData && (
          <div className="weather_data">
            <h2 className="container_city">{weatherData.name}</h2>
            <img
              className="container_img"
              src={getWeatherIconUrl(weatherData.weather[0].main)}
              width="180px"
              alt="thunderIcon"
            />
            <h2 className="container_degree">{`${weatherInCelcius}°C`}</h2>
            <h2 className="country_per">{weatherData.weather[0].main}</h2>
            <div className="wind_container">
              <img
                src={WindIcon}
                width="50px"
                alt="thunderIcon"
                style={{ margin: "12px 12px 0px 20px" }}
              />
              <h2 className="country_per">{`${weatherData.wind.speed}  m/s`}</h2>
            </div>

            <form className="form" onSubmit={handelCitySubmission}>
              <input
                type="text"
                className="input"
                value={city}
                placeholder="Enter City Name"
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <button className="button" type="submit">
                {" "}
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
