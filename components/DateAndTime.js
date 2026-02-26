import { useState, useEffect } from "react";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({unitSystem}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mettre à jour l'heure toutes les 60 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);  // 60 secondes

    return () => clearInterval(interval);
  }, []);

  //jour de la semaine
  const dayName = currentTime.toLocaleDateString('en-US', {weekday: 'long'});

  //format de l'heure selon unitsystem
  let timeString;
  if (unitSystem === "metric") {

    //format 24h
    timeString = currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } else {
    // Format 12h avec AM/PM
    timeString = currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${dayName}, ${timeString}`}
      </h2>
    </div>
  );
};
