import { degToCompass } from "../services/converters";
import { getWindSpeed } from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={getWindSpeed(unitSystem, weatherData.current_weather.windspeed)}
        unit={unitSystem === "metric" ? "m/s" : "m/h"}
      />
      <MetricsCard
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(weatherData.current_weather.winddirection)}
      />
    </div>
  );
};
