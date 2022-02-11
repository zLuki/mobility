function fetchWeatherApi() {
    // Get request
    fetch("https://api.openweathermap.org/data/2.5/forecast?id=6535887&appid=dc704448494ba8187b5e3cf65aafac7f&cnt=40&units=metric&lang=de", {
        method: "GET"
    })
    .then(res => res.text())
    .then(res => {

        /*
          Fasst alle Wetter Datensätze eines Tages zusammen und merkt sich dabei die Min/Max Temperatur
          Zudem wird ein Object mit der Anzahl der verschiedenen Wetterverhältnisse erstellt
          Das Wetter mit der höhsten Anzahl wird dann verwendet
          Bei gelichstand wird das schönere Wetter verwendet, um gute Laune zu erzeugen :))
        */

        document.getElementById("weatherDays").innerHTML = "";
        const upcomingDays = {};
        JSON.parse(res).list.forEach(dataset => {
            const key = dataset.dt_txt.slice(0, 10);
            if (!upcomingDays[key]) {
                upcomingDays[key] = {minTemp: dataset.main.temp_min, maxTemp: dataset.main.temp_max, icons: [dataset.weather[0].icon.slice(0,2)]}
            } else {
                upcomingDays[key].minTemp = Math.min(upcomingDays[key].minTemp, dataset.main.temp_min);
                upcomingDays[key].maxTemp = Math.max(upcomingDays[key].maxTemp, dataset.main.temp_max);
                upcomingDays[key].icons.push(dataset.weather[0].icon.slice(0,2));
            }
        });
        const keys = Object.keys(upcomingDays);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const val = upcomingDays[key];
            let icon = null;
            if (i === 0) {
                icon = val.icons[0];
            } else {
                let iconsCount = {};
                for (let i = 0; i < val.icons.length; i++) {
                    if (iconsCount[val.icons[i]]) iconsCount[val.icons[i]]++;
                    else iconsCount[val.icons[i]] = 1;
                }
                icon = Object.keys(iconsCount)
                    .filter(icon => iconsCount[icon] === Math.max(...Object.values(iconsCount)))
                    .sort()
                    [0];
            }
            createWeatherIcon(
                i,
                key,
                val.minTemp,
                val.maxTemp,
                icon
            );
        }
    });
}

function createWeatherIcon(index, date, minTemp, maxTemp, weatherInfo) {
    
    if (DEBUG) {
      weatherInfo = DEBUG;
    }
    //if (date == new Date().toISOString().split('T')[0]) {
    if (index === 0) {
      switch(weatherInfo) {
        case "01": document.getElementById("mainScreen").style.backgroundImage = "url('./background.jpg')"; break;
        case "02": document.getElementById("mainScreen").style.backgroundImage = "url('./background.jpg')"; break;
        case "03": document.getElementById("mainScreen").style.backgroundImage = "url('./background_cloudy.jpg')"; break;
        case "04": document.getElementById("mainScreen").style.backgroundImage = "url('./background_dark_cloudy.png')"; break;
        case "09" || "10": document.getElementById("mainScreen").style.backgroundImage = "url('./background_rain_gif.gif')"; break;
        case "11": document.getElementById("mainScreen").style.backgroundImage = "url('./background_rain_gif.gif')"; break;
        case "13": document.getElementById("mainScreen").style.backgroundImage = "url('./background_snow_gif.gif')"; break;
        case "50": document.getElementById("mainScreen").style.backgroundImage = "url('./background_fog.png')"; break;
      }
    }

    const weekDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    switch (weatherInfo) {
      case "01":
      document.getElementById("weatherDays").innerHTML +=
      `<div class="container">
        <div class="background">
          <div class="Circle1"></div>
          <div class="Circle2"></div>
          <div class="Circle3"></div>
          <div class="content">
            <h1 class="Condition"><i class="material-icons sun">wb_sunny</i> Sonnig</h1>
            <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
            <h1 class="Time">${weekDays[new Date(date).getDay()]}</h1>
            <h1 class="Location"><i class="material-icons locationIcon">place</i> Brixen, IT</h1>
          </div>
        </div>`;
        break;
      case "02":
        document.getElementById("weatherDays").innerHTML +=
        `<div class="containerSunCloud">
          <div class="background">
            <div class="Circle1SunCloud"></div>
            <div class="Circle2SunCloud"></div>
            <div class="Circle3SunCloud"></div>
            <div class="content">
              <h1 class="Condition"><i class="material-icons sun">wb_cloudy</i> Bewölkt</h1>
              <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
              <h1 class="Time">${weekDays[new Date(date).getDay()]}</h1>
              <h1 class="Location"><i class="material-icons locationIcon">place</i> Brixen, IT</h1>
            </div>
          </div>
        </div>`;
        break;
      case "03":
        document.getElementById("weatherDays").innerHTML +=
        `<div class="containerCloud">
          <div class="background">
            <div class="Circle1Cloud"></div>
            <div class="Circle2Cloud"></div>
            <div class="content">
              <h1 class="Condition"><i class="material-icons sun">wb_cloudy</i> Bewölkt</h1>
              <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
              <h1 class="Time">${weekDays[new Date(date).getDay()]}</h1>
              <h1 class="Location"><i class="material-icons locationIcon">place</i> Brixen, IT</h1>
            </div>
          </div>
        </div>`;
        break;
      case "04":
        document.getElementById("weatherDays").innerHTML +=
        `<div class="containerDarkCloud">
          <div class="background">
            <div class="Circle1DarkCloud"></div>
            <div class="Circle2DarkCloud"></div>
            <div class="Circle3DarkCloud"></div>
            <div class="content">
              <h1 class="Condition"><i class="material-icons sun"> ☁☁</i> Stark bewölkt</h1>
              <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
              <h1 class="Time">${weekDays[new Date(date).getDay()]}</h1>
              <h1 class="Location"><i class="material-icons locationIcon">place</i> Brixen, IT</h1>
            </div>
          </div>
        </div>`;
        break;
      case "09" || "10":
        document.getElementById("weatherDays").innerHTML +=
        `<div class="containerRain">
          <div class="background">
            <div class="Regen"></div>
            <div class="Circle1Rain"></div>
            <div class="Circle2Rain"></div>
            <div class="Circle3Rain"></div>
            <div class="content">
              <h1 class="Condition"><i class="material-icons sun">🌧</i> Regen</h1>
              <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
              <h1 class="Time">${weekDays[new Date(date).getDay()]}</h1>
              <h1 class="Location"><i class="material-icons locationIcon">place</i> Brixen, IT</h1>
            </div>
          </div>
        </div>`;
        break;
      case "11":
        document.getElementById("weatherDays").innerHTML +=
        `<div class="containerStorm">
          <div class="background">
            <div class="Rain"></div>
            <div class="Blitz"></div>
            <div class="Circle1Storm"></div>
            <div class="Circle2Storm"></div>
            <div class="Circle3Storm"></div>
            <div class="content">
              <h1 class="Condition"><i class="material-icons sun">🗲</i> Gewitter</h1>
              <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
              <h1 class="Time">${weekDays[new Date(date).getDay()]}</h1>
              <h1 class="Location"><i class="material-icons locationIcon">place</i> Brixen, IT</h1>
            </div>
          </div>
        </div>`;
        break;
      case "13":
        document.getElementById("weatherDays").innerHTML +=
        `<div class="containerSnow">
          <div class="background">
            <div class="Snow"></div>
            <div class="Circle1Rain"></div>
            <div class="Circle2Rain"></div>
            <div class="Circle3Rain"></div>
            <div class="content">
              <h1 class="Condition"><i class="material-icons sun">❄</i> Schnee</h1>
              <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
              <h1 class="Time">${weekDays[new Date(date).getDay()]}</h1>
              <h1 class="Location"><i class="material-icons locationIcon">place</i> Brixen, IT</h1>
            </div>
          </div>
          </div>`;
          break;
        case "50":
        document.getElementById("weatherDays").innerHTML +=
        `<div class="containerFog">
          <div class="background">
          <div class="Circle1Fog"></div>
          <div class="Circle2Fog"></div>
          <div class="Circle3Fog"></div>
          <div class="content">
            <h1 class="Condition"><i class="material-icons sun">🌫</i> Nebel</h1>
            <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
            <h1 class="Time">${weekDays[new Date(date).getDay()]}</h1>
            <h1 class="Location"><i class="material-icons locationIcon">place</i> Brixen, IT</h1>
          </div>
          </div>
        </div>`
        break;
    }
}
