# Weather Forecast App

A complete Weather Forecast Web Application built using **HTML**, **CSS**, and **JavaScript**, integrated with the **OpenWeatherMap API**.  
This README provides a clean, detailed, point‑to‑point explanation of the entire project — from setup to deployment and GitHub usage.

---

## 📌 Project Overview
The Weather Forecast App allows users to:
- Search weather by entering a city name  
- Fetch weather using **current device location (GPS)**
- View **current weather**, including:
  - Temperature  
  - Humidity  
  - Wind Speed  
  - Pressure  
  - Feels Like temperature  
- View a **5‑day forecast**
- See real‑time data updated via API calls
- Enjoy a fully responsive UI with animations and modern design

---

## 🧩 Features
### ✔ Search weather by city  
### ✔ Weather using current location  
### ✔ Current weather details  
### ✔ 5-Day forecast  
### ✔ Loading animation  
### ✔ Error handling  
### ✔ Responsive UI (mobile-friendly)  

---

## 🛠️ Technologies Used
| Component | Technology |
|----------|------------|
| Frontend | HTML5, CSS3, JavaScript |
| API | OpenWeatherMap API |
| Version Control | Git & GitHub |
| Deployment (optional) | GitHub Pages / Netlify / Vercel |

---

## 📂 Project Structure
```
weather-app/
│── index.html
│── styles.css
│── script.js
│── README.md
```

---

## 🏗️ Implementation — Step by Step

### **1️⃣ HTML Implementation**
The `index.html` contains:
- A search box  
- Button for searching  
- Button for current location  
- Display container for weather data  
- Loading spinner  
- Error message section  
- 5‑day forecast card layout  

The HTML acts as the base structure for dynamic JavaScript updates.

---

### **2️⃣ CSS Implementation**
Key UI features:
- Smooth gradients  
- Glass‑effect container  
- Hover animations  
- Responsive grid for forecast cards  
- Mobile-first layout adjustments  
- Custom spinner animation  

This makes the UI modern, clean, and interactive.

---

### **3️⃣ JavaScript Implementation**

#### 🔹 A) API Configuration
```js
const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
```

#### 🔹 B) Functions Implemented
| Function | Purpose |
|---------|---------|
| `getWeatherByCity(city)` | Fetches weather using city name |
| `getWeatherByCoords(lat, lon)` | Fetches weather using GPS |
| `displayWeather()` | Updates DOM with current weather |
| `displayForecast()` | Generates 5 forecast cards |
| `showLoading()` | Shows loading spinner |
| `showError()` | Displays error message |

#### 🔹 C) Event Listeners
- City search button  
- Enter key press  
- Current location button  

#### 🔹 D) Error Handling
- Invalid city  
- API failure  
- Geolocation blocked  

---

## 🌐 How to Set Up OpenWeatherMap API
1. Visit https://openweathermap.org/api  
2. Create a free account  
3. Generate an API key  
4. Paste it into `script.js`:
```js
const API_KEY = "YOUR_API_KEY";
```

---

## 🔄 How the App Works
1. Default city loads on startup  
2. User searches for another city → API call  
3. Weather and forecast displayed  
4. GPS button fetches location via browser geolocation  
5. Forecast cards updated dynamically  

---

## 🧵 GitHub Process (Complete, Step‑by‑Step)

### **1️⃣ Initialize Git**
```bash
git init
```

### **2️⃣ Add all files**
```bash
git add .
```

### **3️⃣ Commit**
```bash
git commit -m "Initial commit - Weather Forecast App"
```

### **4️⃣ Create GitHub Repository**
- Go to GitHub → New Repository  
- Repo name: **weather-forecast-app**  
- Do NOT add README (you already have one)

### **5️⃣ Connect Local Repo to GitHub**
```bash
git remote add origin https://github.com/USERNAME/weather-forecast-app.git
```

### **6️⃣ Push**
```bash
git push -u origin main
```

---

## 🚀 Deployment (Optional)

### **GitHub Pages**
1. Go to Repository → Settings → Pages  
2. Select `main` branch  
3. Save  
4. Your site will be live

### **Netlify / Vercel**
- Drag & drop folder (Netlify)  
- Or connect GitHub repo  

---

## ✨ Future Improvements
- Add Dark Mode  
- Add Hourly forecast  
- Add Air Quality Index  
- Save last searched location  
- Add animations for weather changes  

---

## 📜 License
This project is free to use. Choose MIT License if publishing publicly.

---

## 🎉 Final Notes
You can customize the UI, add more weather parameters, or integrate additional APIs.  
This project is great for learning **API integration**, **JavaScript DOM manipulation**, and **GitHub workflow**.
