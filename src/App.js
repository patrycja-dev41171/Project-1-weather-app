import "./App.css";
import axios from "axios";
import React, { useState } from "react";

const Temp = (props) => {
  const temp = props.value ? (props.value.temp - 275).toFixed() : null;
  return <h1 className="temperature">{temp}°C</h1>;
};

const Describe = (props) => {
  const description = props.value
    ? props.value[0].description[0].toUpperCase() +
      props.value[0].description.substring(1)
    : null;
  return <h3 className="weather_describe">{description}</h3>;
};

const MaxTemp = (props) => {
  const temp = props.value ? (props.value.temp_max - 275).toFixed() : null;
  return (
    <div className="max_temperature">
      <h1 className="max_temperature_element">{temp}°C</h1>
      <p className="max_temperature_element">Maksymalna</p>
    </div>
  );
};

const MinTemp = (props) => {
  const temp = props.value ? (props.value.temp_min - 275).toFixed() : null;
  return (
    <div className="min_temperature">
      <h1 className="min_temperature_element">{temp}°C</h1>
      <p className="min_temperature_element">Minimalna</p>
    </div>
  );
};

const SunriseSunset = (props) => {
  const timezone = props.timezone / 3600;

  const sunriseUnix = props.value ? props.value.sunrise : null;
  const sunsetUnix = props.value ? props.value.sunset : null;

  const sunrise = new Date(sunriseUnix * 1000).getHours();
  const sunset = new Date(sunsetUnix * 1000).getHours();
  const sunriseMin = new Date(sunriseUnix * 1000).getUTCMinutes();
  const sunsetMin = new Date(sunsetUnix * 1000).getUTCMinutes();

  const date = new Date();
  const sunriseHour = new Date(date.setHours(sunrise + timezone)).getUTCHours();
  const sunsetHour = new Date(date.setHours(sunset + timezone)).getUTCHours();

  const sunriseTime = `${sunriseHour}:${
    sunriseMin < 10 ? "0" + sunriseMin : sunriseMin
  }`;
  const sunsetTime = `${sunsetHour}:${
    sunsetMin < 10 ? "0" + sunsetMin : sunsetMin
  }`;

  return (
    <div className="sunrise_sunset">
      <div className="sunrise">
        <span className="iconify" data-icon="bi:sunrise"></span>
        <p>Wschód</p>
        <p>{sunriseTime}</p>
      </div>
      <div className="sunset">
        <span className="iconify" data-icon="bi:sunset"></span>
        <p>Zachód</p>
        <p>{sunsetTime}</p>
      </div>
    </div>
  );
};

const Humidity = (props) => {
  const humidity = props.value ? props.value.humidity : null;
  return (
    <div className="humidity">
      <span className="iconify" data-icon="carbon:humidity"></span>
      <p>Wilgotność</p>
      <p>{humidity} %</p>
    </div>
  );
};

const Wind = (props) => {
  const speed = props.value ? (props.value.speed * 3.6).toFixed() : null;

  const deg = props.value ? props.value.deg : null;

  let direction = "";

  if ((deg >= 0 && deg <= 23) || (deg >= 337 && deg <= 360)) {
    direction = "N";
  } else if (deg >= 24 && deg <= 68) {
    direction = "NE";
  } else if (deg >= 69 && deg <= 113) {
    direction = "E";
  } else if (deg >= 114 && deg <= 158) {
    direction = "SE";
  } else if (deg >= 159 && deg <= 203) {
    direction = "S";
  } else if (deg >= 204 && deg <= 248) {
    direction = "SW";
  } else if (deg >= 249 && deg <= 293) {
    direction = "W";
  } else if (deg >= 294 && deg <= 336) {
    direction = "NW";
  }
  return (
    <div className="wind">
      <p>Wiatr</p>
      <span className="iconify iconify_wind" data-icon="bx:bx-wind"></span>
      <p>{direction}</p>
      <p>{speed} km/h</p>
    </div>
  );
};

const Pressure = (props) => {
  const pressure = props.value ? props.value.pressure : null;
  return (
    <div className="pressure">
      <p>Ciśnienie atmosferyczne</p>
      <span>{pressure} hPa</span>
    </div>
  );
};

const FeelsLike = (props) => {
  let temp = props.value ? (props.value.feels_like - 275).toFixed() : null;
  if (temp === "-0") {
    temp = temp.substring(1);
  }
  return (
    <div className="sensed_temperature">
      <p>Temperatura odczuwalna</p>
      <span>{temp} °C</span>
    </div>
  );
};

const Visibility = (props) => {
  const visibility = props.value ? props.value / 1000 : null;
  return (
    <div className="visibility_on_the_road">
      <p>Widoczność na drodze</p>
      <span>{visibility} km</span>
    </div>
  );
};

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=pl&appid=8a3462bc877d2dbaae2d6c0678261fbe
  `;

  const weatherID = [
    {
      index: 0,
      id: [800],
      day: true,
      main: "Clear",
      nameClass: "day_clear",
    },
    {
      index: 1,
      id: [800],
      day: false,
      main: "Clear",
      nameClass: "night_clear",
    },
    {
      index: 2,
      id: [801, 802],
      day: true,
      main: "Clouds",
      nameClass: "day_cloudy",
    },
    {
      index: 3,
      id: [801, 802],
      day: false,
      main: "Clouds",
      nameClass: "night_cloudy",
    },
    {
      index: 4,
      id: [741],
      day: true,
      main: "Fog",
      nameClass: "day_fog",
    },
    {
      index: 5,
      id: [741],
      day: false,
      main: "Fog",
      nameClass: "night_fog",
    },
    {
      index: 6,
      id: [
        500, 501, 502, 503, 504, 511, 520, 521, 522, 531, 300, 301, 302, 310,
        311, 312, 313, 314, 321,
      ],
      day: true,
      main: "Rain",
      nameClass: "day_rain",
    },
    {
      index: 7,
      id: [
        500, 501, 502, 503, 504, 511, 520, 521, 522, 531, 300, 301, 302, 310,
        311, 312, 313, 314, 321,
      ],
      day: false,
      main: "Rain",
      nameClass: "night_rain",
    },
    {
      index: 8,
      id: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
      day: true,
      main: "Snow",
      nameClass: "day_snowy",
    },
    {
      index: 9,
      id: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
      day: false,
      main: "Snow",
      nameClass: "night_snowy",
    },
    {
      index: 10,
      id: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
      day: true,
      main: "Storm",
      nameClass: "day_storm",
    },
    {
      index: 11,
      id: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
      day: false,
      main: "Storm",
      nameClass: "night_storm",
    },
    {
      index: 12,
      id: [803, 804],
      day: true,
      main: "Clouds",
      nameClass: "day_very_cloudy",
    },
    {
      index: 13,
      id: [803, 804],
      day: false,
      main: "Clouds",
      nameClass: "night_very_cloudy",
    },
  ];

  const changeBackground = (data) => {
    const timezone = data.timezone / 3600;
    const date = new Date();

    const currentHours = new Date(
      date.setHours(date.getUTCHours() + timezone)
    ).getHours();
    const currentMinutes = new Date().getUTCMinutes();

    const sunriseUnix = data.sys.sunrise;
    const sunsetUnix = data.sys.sunset;

    const sunrise = new Date(sunriseUnix * 1000).getHours();
    const sunriseHours = new Date(
      date.setHours(sunrise + timezone)
    ).getUTCHours();
    const sunriseMinutes = new Date(sunriseUnix * 1000).getUTCMinutes();

    const sunset = new Date(sunsetUnix * 1000).getHours();
    const sunsetHours = new Date(
      date.setHours(sunset + timezone)
    ).getUTCHours();
    const sunsetMinutes = new Date(sunsetUnix * 1000).getUTCMinutes();

    let day;

    if (currentHours >= sunriseHours && currentHours <= sunsetHours) {
      if (currentHours > sunriseHours && currentHours < sunsetHours) {
        day = true;
      } else if (
        currentHours >= sunriseHours &&
        currentMinutes >= sunriseMinutes
      ) {
        if (currentHours <= sunsetHours && currentMinutes < sunsetMinutes) {
          day = true;
        } else {
          day = false;
        }
      } else {
        day = false;
      }
    } else {
      day = false;
    }

    if (day) {
      const indexes = weatherID.filter((e) => e.day === true);
      changeClass(indexes);
    } else {
      const indexes = weatherID.filter((e) => e.day === false);
      changeClass(indexes);
    }

    function changeClass(indexes) {
      const weatherId = data.weather[0].id;
      const indexesIdx = indexes.findIndex(
        (e) => e.id.includes(weatherId),
        [0]
      );
      const index = indexes[indexesIdx].index;
      const app = document.querySelector(".App");
      const list = app.classList;
      app.classList.remove(...list);
      app.classList.add(`App`);
      app.classList.add(`${weatherID[index].nameClass}`);
    }
  };

  if (Object.keys(data).length === 0) {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=warszawa&lang=pl&appid=8a3462bc877d2dbaae2d6c0678261fbe`
      )
      .then((response) => {
        setData(response.data);
        changeBackground(response.data);
        return;
      });
  }

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        changeBackground(response.data);
        return;
      });
      setLocation("");
    }
  };

  return (
    <div className="App">
      <section className="first_section">
        <input
          type="text"
          placeholder="Wpisz nazwę miasta"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
        ></input>
        <h2 className="city_name">{data.name}</h2>
        <Temp value={data.main} />
        <Describe value={data.weather} />
        <MaxTemp value={data.main} />
        <MinTemp value={data.main} />
      </section>

      <section className="second_section">
        <SunriseSunset value={data.sys} timezone={data.timezone} />
        <Humidity value={data.main} />
        <Wind value={data.wind} />
        <Pressure value={data.main} />
        <FeelsLike value={data.main} />
        <Visibility value={data.visibility} />
      </section>
    </div>
  );
}

export default App;
