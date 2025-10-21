// API Configuration
const API_KEY = '1689c0fb0846321ba2d67bd325493afe'; // Get your free API key from https://openweathermap.org/api
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const weatherDisplay = document.getElementById('weatherDisplay');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load default city weather
    getWeatherByCity('London');
    
    // Event listeners
    searchBtn.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    locationBtn.addEventListener('click', handleLocationRequest);
});

// Handle search
function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
    } else {
        showError('Please enter a city name');
    }
}

// Handle location request
function handleLocationRequest() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            (error) => {
                hideLoading();
                showError('Unable to retrieve your location');
            }
        );
    } else {
        showError('Geolocation is not supported by your browser');
    }
}

// Fetch weather by city name
async function getWeatherByCity(city) {
    showLoading();
    hideError();
    
    try {
        const currentWeatherUrl = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const forecastUrl = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
        
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);
        
        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error('City not found');
        }
        
        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        
        displayWeather(currentData, forecastData);
        hideLoading();
    } catch (error) {
        hideLoading();
        showError('City not found. Please try again.');
        console.error('Error fetching weather:', error);
    }
}

// Fetch weather by coordinates
async function getWeatherByCoords(lat, lon) {
    try {
        const currentWeatherUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);
        
        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error('Unable to fetch weather data');
        }
        
        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        
        displayWeather(currentData, forecastData);
        hideLoading();
    } catch (error) {
        hideLoading();
        showError('Unable to fetch weather data');
        console.error('Error fetching weather:', error);
    }
}

// Display weather data
function displayWeather(current, forecast) {
    // Update current weather
    document.getElementById('cityName').textContent = `${current.name}, ${current.sys.country}`;
    document.getElementById('dateTime').textContent = formatDateTime(new Date());
    document.getElementById('temperature').textContent = `${Math.round(current.main.temp)}°C`;
    document.getElementById('weatherDescription').textContent = current.weather[0].description;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`;
    document.getElementById('feelsLike').textContent = `${Math.round(current.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${current.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${current.wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${current.main.pressure} hPa`;
    
    // Update forecast
    displayForecast(forecast);
    
    // Show weather display
    weatherDisplay.classList.remove('hidden');
}

// Display 5-day forecast
function displayForecast(data) {
    const forecastCards = document.getElementById('forecastCards');
    forecastCards.innerHTML = '';
    
    // Get one forecast per day (at 12:00 PM)
    const dailyForecasts = data.list.filter(item => 
        item.dt_txt.includes('12:00:00')
    ).slice(0, 5);
    
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="day">${formatDay(date)}</div>
            <div class="date">${formatDate(date)}</div>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}">
            <div class="temp">${Math.round(day.main.temp)}°C</div>
            <div class="description">${day.weather[0].description}</div>
        `;
        forecastCards.appendChild(card);
    });
}

// Utility functions
function formatDateTime(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

function formatDay(date) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function showLoading() {
    loadingSpinner.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        hideError();
    }, 3000);
}

function hideError() {
    errorMessage.classList.add('hidden');
}
