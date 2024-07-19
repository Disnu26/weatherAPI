function getweather() {
    const apikey = 'eb12cb6c4288e6b876050cc039623882';
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }
    const currentWeatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

    fetch(currentWeatherurl)
        .then(response => response.json())
        .then(data => {
            displayweather(data);
        })
        .catch(error => {
            console.error('Error fetching Current Weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecasturl)
        .then(response => response.json())
        .then(data => {
            displayhourlyforecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });

    function displayweather(data) {
        const tempinfo = document.getElementById('temp');
        const weatherinfo = document.getElementById('weatherinfo');
        const weathericon = document.getElementById('icon');
        const hourlyforecast = document.getElementById('hourlyforecast');

        tempinfo.innerHTML = '';
        weatherinfo.innerHTML = '';
        hourlyforecast.innerHTML = '';

        if (data.cod === '404') {
            weatherinfo.innerHTML = `<p>${data.message}</p>`;
        } else {
            const cityname = data.name;
            const temperature = Math.round(data.main.temp - 273.15);
            const description = data.weather[0].description;
            const iconcode = data.weather[0].icon;
            const iconurl = `https://openweathermap.org/img/wn/${iconcode}@2x.png`; // Ensure correct icon size

            const temperatureHtml = `<p>${temperature}°C</p>`;
            const weatherHtml = `<p>${cityname}</p><p>${description}</p>`;

            tempinfo.innerHTML = temperatureHtml;
            weatherinfo.innerHTML = weatherHtml;
            weathericon.src = iconurl;
            weathericon.alt = description;
            weathericon.classList.remove('d-none');
        }
    }

    function displayhourlyforecast(hourlyData) {
        const hourlyforecastdiv = document.getElementById('hourlyforecast');
        const next24hrs = hourlyData.slice(0, 8);

        next24hrs.forEach(item => {
            const datetime = new Date(item.dt * 1000);
            const hour = datetime.getHours();
            const temperature = Math.round(item.main.temp - 273.15);
            const iconcode = item.weather[0].icon;
            const iconurl = `https://openweathermap.org/img/wn/${iconcode}@2x.png`;

            const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconurl}" alt="Hourly weather icon">
                <span>${temperature}°C</span>
            </div>`;
            hourlyforecastdiv.innerHTML += hourlyItemHtml;
        });
    }
}
