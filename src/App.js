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
        <div className="one"></div>
        <div className="two"></div>
        <div className="three"></div>
        <div className="four"></div>
        <div className="five"></div>
        <div className="six"></div>
      </section>
    </div>
  );
}

export default App;
