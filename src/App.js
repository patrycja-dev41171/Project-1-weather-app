import "./App.css";

function App() {
  return (
    <div className="App">

      <section className="first_section">
        <input type="text" placeholder="Wyszukaj miasto"></input>
        <h2 className="city_name">Kraków</h2>
        <h1 className="temperature">27°C</h1>
        <h3 className="weather_describe">Bezchmurnie</h3>
        <div className="max_temperature">
          <h1 className="max_temperature_element">29°C</h1>
          <p className="max_temperature_element">Maksymalnie</p>
        </div>
        <div className="min_temperature">
          <h1 className="max_temperature_element">24°C</h1>
          <p className="max_temperature_element">Minimalnie</p>
        </div>
      </section>

      <section className="second_section">
        <div className="sunrise_sunset">
          <div className="sunrise">
            <span className="iconify" data-icon="bi:sunrise"></span>
            <p>Wschód</p>
            <p>04:21</p>
          </div>

          <div className="sunset">
            <span className="iconify" data-icon="bi:sunset"></span>
            <p>Zachód</p>
            <p>21:21</p>
          </div>
        </div>

        <div className="humidity">
          <span className="iconify" data-icon="carbon:humidity"></span>
          <p>Wilgotność</p>
          <p>46%</p>
        </div>

        <div className="wind">
          <p>Wiatr</p>
          <span className="iconify iconify_wind" data-icon="bx:bx-wind"></span>
          <p>SE</p>
          <p>14km/H</p>
        </div>

        <div className="pressure">
          <p>Ciśnienie atmosferyczne</p>
          <span>1011hPa</span>
        </div>
        <div className="sensed_temperature">
          <p>Temperatura odczuwalna</p>
          <span>30°C</span>
        </div>
        <div className="visibility_on_the_road">
          <p>Widoczność na drodze</p>
          <span>10km</span>
        </div>
      </section>
      
    </div>
  );
}

export default App;
