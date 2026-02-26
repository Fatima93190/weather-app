//Convertit Celsius en Fahrenheit
export const ctoF = (c) => (c * 9) / 5 + 32;

//Convertit mètres par seconde en miles par heure
export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

//Convertit des degrés en direction de boussole
export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};
