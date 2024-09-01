/**
 * Creamos un hook personaizado para encapsular la parte lógica
 * Este hook depende de la url y de la ciudad
 */

import { useState } from "react";
import { API_KEY } from "../../config";

export const useWeather = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const [dataClima, setDataClima] = useState(null);
  const [error, setError] = useState(null);

  const fetchClima = async (ciudad) => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      if (data.cod === 200) {
        setDataClima(data); // si los datos entran correctamente, se cambia la data
        setError(null);
      } else {
        setDataClima(null);
        setError("No city was found with that name, please try again");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error has ocurred");
    }
  };

  return { dataClima, error, fetchClima };
};
