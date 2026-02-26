import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";
import { getWeatherInfo } from "../services/weatherHelpers";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [configCountry, setConfigCountry] = useState("");
  const [configCity, setConfigCity] = useState("Loading...");
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");

  // useEffect #1 - Fetch
  useEffect(() => {
    const getData = async () => {
      try{
      // 1. Fetch config
      const configRes = await fetch("/config.json");
      const configData = await configRes.json();
      const {country, city, latitude, longitude} = configData;

      // 2. Stocker le nom du pays et le nom de ville
      setConfigCountry(country);
      setConfigCity(city);
    
      // 3. Fetch API météo
      const weatherRes = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude: latitude, longitude: longitude }),
      });

      // 4. Récupérer le JSON
      const weatherData = await weatherRes.json();
      const { weathercode, is_day } = weatherData.current_weather;
      const { description, icon } = getWeatherInfo(weathercode, is_day);

      // 5. Stocker les données météo
      setWeatherData({...weatherData, description : description, iconName:icon});
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        // Créer un weatherData avec message d'erreur
        setWeatherData({ message: "Error loading data" });
      }
    };
    getData();
  }, [triggerFetch]);

  // useEffect #2 - Timer 
  useEffect(() => {

    // Créer un intervalle qui change triggerFetch toutes les heures
    const interval = setInterval(() => {
      // Inverse true/false pour déclencher le fetch
      setTriggerFetch(prev => !prev);
    }, 3600000);// 1 heure en millisecondes

    // Nettoyer l'intervalle quand le composant se démonte
    return () => clearInterval(interval);
  }, []);  // [] = se lance une seule fois au montage

  const changeSystem = () =>
    unitSystem === "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard
        city={configCity}
        country={configCountry}
        description={weatherData.description}
        iconName={weatherData.iconName}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen errorMessage="Unable to load weather data. Please check configuration."/>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
