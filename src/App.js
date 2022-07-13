import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [weatherType, setWeatherType] = useState("C");
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API}`;
  // 'https://source.unsplash.com/1600x900/?'
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  var temparature;
  var ftemp;
  if (!isEmpty(data)) {
    temparature = ((data.main.temp - 32) * (5 / 9)).toFixed();
    ftemp = ((data.main.feels_like - 32) * (5 / 9)).toFixed();
  }

  //Date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  //Time
  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
          />
        </div>

        <div className="top">
          <div className="location">
            <p> {data.name}</p>
          </div>

          <div className="temp">
            {/* {data.main ?<h1>{data.main.temp.toFixed()}°F</h1> :null} */}
            {weatherType === "C" && data.main ? (
              <h1>{temparature}°C</h1>
            ) : weatherType === "F" && data.main ? (
              <h1>{data.main.temp.toFixed()}°F</h1>
            ) : (
              ""
            )}
            {/* {data.main ?<h1>{temparature}°C</h1> :null} */}
          </div>

          <div className="date">
            <p>
              {day},{month}
              {date},{year}{" "}
            </p>
          </div>
          <div className="time">
            <p>{time}</p>
          </div>

          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            {weatherType === "C" && data.main ? (
              <h1 className="bold">{ftemp}°C</h1>
            ) : weatherType === "F" && data.main ? (
              <p className="bold">{data.main.feels_like.toFixed()}°F</p>
            ) : (
              ""
            )}
            {/* {data.main ?<p className="bold">{data.main.feels_like.toFixed()}°F</p> :null} */}
            {/* {data.main ?<h1 className="bold">{ftemp}°C</h1> :null} */}

            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}

            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? (
              <p className="bold">{data.wind.speed.toFixed()}MPH</p>
            ) : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
