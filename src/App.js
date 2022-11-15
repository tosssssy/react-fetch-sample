import "./App.css";
// import { data } from "./weather";
import "./reset.css";
import { useEffect, useState } from "react";

function App() {
  const [cityNames, setCityNames] = useState();
  const [selectedCityNames, setSelectedCityNames] = useState("tokyo");
  const [res, setRes] = useState();

  useEffect(() => {
    async function f() {
      const result1 = await fetch("http://localhost:8000/weather/city_names");
      setCityNames(await result1.json());
    }
    f();
  }, []);

  useEffect(() => {
    async function f() {
      const result2 = await fetch(
        "http://localhost:8000/weather/" + selectedCityNames
      );
      setRes([await result2.json()]);
    }
    f();
  }, [selectedCityNames]);

  return (
    <>
      {/* <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {res?.map((item) => (
          <div
            style={{
              width: 400,
              height: 100,
              background: "green",
              borderRadius: 30,
              padding: 20,
            }}
          >
            <div>id: {item.id}</div>
            <div>title: {item.title}</div>
          </div>
        ))}
      </div> */}
      <select onChange={(e) => setSelectedCityNames(e.target.value)}>
        {cityNames?.map((cityName) => (
          <option value={cityName}>{cityName}</option>
        ))}
      </select>

      {/* <div>{JSON.stringify(cityNames)}</div> */}
      {res?.map((item) => (
        <div key={item.id} className="card">
          <img src="/weather.png" alt="天気の画像" />
          <p>City Name</p>
          <div className="city">
            <div className="date">
              <p>{item.name}</p>
            </div>
          </div>
          <p>Weather Condition</p>
          <div className="date">
            <p>{item.weather[0].main}</p>
          </div>
          <div className="under">
            <div className="Date">
              <p>Data</p>
              <div className="date">
                <p>
                  {new Date(item.dt * 1000)
                    .toLocaleDateString()
                    .split("/")
                    .join("-")}
                </p>
              </div>
            </div>
            <div className="Temp">
              <p>Temprature</p>
              <div className="date">
                <p>{~~(item.main.temp - 273)}℃</p>
              </div>
            </div>
            <div className="Humidity">
              <p>Humidiy</p>
              <div className="date">
                <p>{item.main.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
