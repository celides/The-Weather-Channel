import React, { useState } from "react"; // <-- El parche exacto: React vuelve a estar en scope
import Form from "./Form";
import Card from "./Card";

const WeatherPanel = () => {
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");

  const getLocation = async (loc) => {
    setLoading(true);
    setLocation(loc);

    // Tu API Key limpia y segura
    const appId = "f58efdd7327be9409047185bcc2073c0";

    // Construcción limpia y dinámica de URLs en cada búsqueda con "lang" bien escrito
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${appId}&lang=es&units=metric&q=${loc}`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?appid=${appId}&lang=es&units=metric&q=${loc}`;

    // 1. Petición Clima Actual (Weather)
    try {
      const responseWeather = await fetch(urlWeather);
      if (!responseWeather.ok) throw new Error("Error en la petición de clima");
      const weatherData = await responseWeather.json();
      
      console.log(weatherData);
      setWeather(weatherData);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShow(false);
      return; // Detiene la ejecución si el clima falla
    }

    // 2. Petición Pronóstico (Forecast)
    try {
      const responseForecast = await fetch(urlForecast);
      if (!responseForecast.ok) throw new Error("Error en la petición de pronóstico");
      const forecastData = await responseForecast.json();
      
      console.log(forecastData);
      setForecast(forecastData);
      
      setLoading(false);
      setShow(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShow(false);
    }
  };

  return (
    <React.Fragment>
      <Form newLocation={getLocation} />

      <Card
        showData={show}
        loadingData={loading}
        weather={weather}
        forecast={forecast}
      />
    </React.Fragment>
  );
};

export default WeatherPanel;
