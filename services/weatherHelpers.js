export const getWeatherInfo = (weathercode, is_day) => {
    // Validation des paramètres
    if (typeof weathercode !== 'number' || weathercode < 0) {
        console.warn('Invalid weathercode:', weathercode);
        weathercode = 0;  // Fallback sur Clear sky
    }
    
    if (is_day !== 0 && is_day !== 1) {
        console.warn('Invalid is_day:', is_day);
        is_day = 1;  // Fallback sur jour
    }

    const suffix = is_day ? "d" : "n";
    if (weathercode === 0){
        return{
            description: "Clear sky",
            icon: `01${suffix}`
        }
    }
    if (weathercode >= 1 && weathercode <= 3){
        return{
            description: "Partly cloudy",
            icon: `03${suffix}`
        }
    }
    if (weathercode === 45 || weathercode === 48){
        return{
            description: "Fog",
            icon: `50${suffix}`
        }
    }
    if (weathercode >= 51 && weathercode <= 55){
        return{
            description: "Drizzle",
            icon: `09${suffix}`
        }
    }
    if (weathercode >= 61 && weathercode <= 65){
        return{
            description: "Rain",
            icon: `09${suffix}`
        }
    }
    if (weathercode >= 71 && weathercode <= 75){
        return{
            description: "Snow",
            icon: `13${suffix}`
        }
    }
    if (weathercode >= 95 && weathercode <= 99){
        return{
            description: "Thunderstorm",
            icon: `11${suffix}`
        }
    }
    return{
        description: "weather",
        icon: `01${suffix}`
    }
}