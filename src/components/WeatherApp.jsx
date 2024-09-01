import React, { useState } from "react";
import { useWeather } from "../hooks/useFetch";

export const WeatherApp = () => {
  //const urlBase = "https://api.openweathermap.org/data/2.5/weather";

  const [ciudad, setCiudad] = useState("");
  /*const [dataClima, setDataClima] = useState(null);
  const [error, setError] = useState(null);*/

  const { dataClima, error, fetchClima } = useWeather();

  // Manejar el cambio en el campo de entrada de la ciudad
  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.trim().length > 0) {
      // Validar que la ciudad no esté vacía o solo con espacios
      fetchClima(ciudad);
    }
  };

  // Realizar la solicitud para obtener el clima de la ciudad ingresada

  return (
    <div className="container">
      <h1>Aplicación del Clima</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ciudad}
          onChange={handleCambioCiudad}
          placeholder="Please, enter a city name"
        />
        <button type="submit">Find</button>
      </form>

      {/* Mostrar el mensaje de error si existe */}
      {error && <h3 style={{ color: "black" }}>{error}</h3>}

      {/* Mostrar los datos del clima si existen */}
      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>Temperature: {parseInt(dataClima.main.temp - 273.15)}ºC</p>
          <p>Feeling like: {parseInt(dataClima.main.feels_like - 273.15)}ºC</p>
          <p>Weather Condition: {dataClima.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
            alt={dataClima.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};
