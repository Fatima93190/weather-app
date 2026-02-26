# Weather Display for Public Transportation

Application météo conçue pour les écrans d'information dans les transports en commun.

![Alt img](./assets/screenshot.png)

##  Contexte du projet

Ce projet est une adaptation de [weather-app par madzadev](https://github.com/madzadev/weather-app) pour répondre aux besoins spécifiques d'affichage météo dans les transports en commun.

### Modifications principales

-  **Migration API** : OpenWeatherMap → Open-Meteo (gratuit, sans clé API)
-  **Configuration JSON** : Localisation pré-configurée (pas de recherche utilisateur)
-  **Rafraîchissement automatique** : Mise à jour toutes les heures
-  **Simplification** : Interface adaptée aux écrans d'information publics

##  Fonctionnalités

### Affichage en temps réel
- Température actuelle (Celsius/Fahrenheit)
- Description météo avec icônes
- Date et heure locale
- Vitesse et direction du vent

### Configuration flexible
- Fichier JSON pour définir la localisation
- Changement de ville sans modification du code
- Support de plusieurs installations (une config par ville)

### Rafraîchissement automatique
- Mise à jour des données toutes les heures
- Horloge mise à jour toutes les minutes
- Gestion d'erreur robuste

### Système d'unités
- Basculement Métrique <-> Impérial
- Température : °C <-> °F
- Vitesse du vent : m/s <-> mph

##  Installation

### Prérequis
- Node.js (v14 ou supérieur)
- npm


> ⚠️ **Warning:** Ce projet utilise Next.js 11.  
> Si vous utilisez Node 17+ ou 22+, une configuration OpenSSL est nécessaire (déjà incluse dans les scripts).


### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/Fatima93190/weather-app.git
cd weather-app
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer la localisation**

Éditer le fichier `public/config.json` :
```json
{
  "country": "France",
  "city": "Paris",
  "latitude": 48.8566,
  "longitude": 2.3522
}
```

4. **Lancer l'application**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

##  Configuration

### Fichier `public/config.json`

| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `country` | string | Nom du pays (affiché) | "France" |
| `city` | string | Nom de la ville (affiché) | "Paris" |
| `latitude` | number | Latitude GPS | 48.8566 |
| `longitude` | number | Longitude GPS |  2.3522 |

**Note** : Les coordonnées GPS sont utilisées pour récupérer la météo précise via Open-Meteo.


### Décisions techniques

#### Pourquoi Open-Meteo ?
- Gratuit et sans limitation
- Pas de clé API nécessaire
- Données précises et fiables
- Format de données standardisé

#### Pourquoi un fichier JSON ?
- Configuration sans recompilation
- Déploiement multi-villes simplifié
- Modification par personnel non-technique
- Séparation code/configuration

#### Gestion du rafraîchissement
- `useEffect` avec `setInterval` pour le timer automatique
- Mise à jour des données toutes les heures
- Horloge mise à jour toutes les minutes
- Cleanup approprié pour éviter les fuites mémoire

##  Tests

### Tester avec une autre ville

1. Modifier `public/config.json` avec les nouvelles coordonnées
2. Recharger la page
3. Vérifier que les données correspondent à la nouvelle localisation

### Vérifier le rafraîchissement automatique

Les données météo se mettent à jour automatiquement toutes les heures. Vérifier dans la console du navigateur les appels API.

##  Documentation API

### Open-Meteo
- **Documentation** : https://open-meteo.com/en/docs
- **Endpoint utilisé** : `/v1/forecast`
- **Paramètres** : `latitude`, `longitude`, `current_weather=true`

### Codes météo
L'application convertit les weathercodes Open-Meteo en descriptions lisibles :
- 0 : Ciel dégagé
- 1-3 : Partiellement nuageux
- 45-48 : Brouillard
- 51-55 : Bruine
- 61-65 : Pluie
- 71-75 : Neige
- 95-99 : Orage

##  Améliorations futures possibles

- [ ] Support multilingue
- [ ] Prévisions sur plusieurs jours
- [ ] Graphiques de tendance
- [ ] Alertes météo
- [ ] Mode sombre/clair automatique

##  Licence

Basé sur [weather-app](https://github.com/madzadev/weather-app) sous licence MIT.

##  Crédits

- Projet original : [madzadev/weather-app](https://github.com/madzadev/weather-app)
- API météo : [Open-Meteo](https://open-meteo.com/)
- Icônes : Fournies avec le projet original