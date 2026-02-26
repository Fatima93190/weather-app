import {mpsToMph} from "./converters";


/**
 * Convertit la vitesse du vent selon le système d'unités
 */
export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem === "metric" ? windInMps : mpsToMph(windInMps);
