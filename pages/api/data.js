export default async function handler(req, res) {
  try {
    // 1. Vérifier que les paramètres existent
    const { latitude, longitude } = req.body;
      if (!latitude || !longitude) {
        return res.status(400).json({ 
          message: "Missing latitude or longitude" 
        });
      }

    // 2. Appeler Open-Meteo
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    // 3. Vérifier que la requête a réussi
    if (!response.ok) {
      return res.status(response.status).json({ 
        message: "Error from Open-Meteo API" 
      });
    }
  
  // 4. Convertir en JSON
    const data = await response.json();

    // 5. Retourner les données
    res.status(200).json(data);
    
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ 
      message: "Internal server error" 
    });
  }
}