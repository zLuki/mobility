window.onload = function() {

    //document.getElementById("mainScreen").style.backgroundSize = "110%";
    /*fetchBusApi();
    fetchWeatherApi();
    const weatherThread = setInterval(fetchWeatherApi, 60*1000);*/
    //fetchTrainApi();
    fetchWeatherApi();
    //fetchBusApi();

    /*fetchTrainApi(JSON.parse(
        `[{"id":"00401","num":"401","name":"Bruneck, Busbahnhof","countdown":2},{"id":"02320","num":"320.1","name":"Milland, Zeffer","countdown":2},{"id":"85310","num":"310","name":"Brixen, Bahnhof Brixen","countdown":6},{"id":"02328","num":"328","name":"Brixen, Bahnhof","countdown":8},{"id":"00401","num":"401","name":"Brixen, Bahnhof Brixen","countdown":10},{"id":"02320","num":"320.1","name":"Vahrn, Post","countdown":12},{"id":"02170","num":"170","name":"Kastelruth, Busbahnhof","countdown":16},{"id":"02320","num":"320.1","name":"Albeins, Grundschule","countdown":17},{"id":"00401","num":"401","name":"Brixen, Bahnhof Brixen","countdown":18},{"id":"85310","num":"310","name":"Sterzing, Nordpark","countdown":23},{"id":"02328","num":"328","name":"Natz - Schabs","countdown":25},{"id":"02320","num":"320.1","name":"Vahrn, Post","countdown":27}]`
    ));*/

}

function fetchWeatherApi() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?id=6535887&appid=dc704448494ba8187b5e3cf65aafac7f&cnt=40&units=metric&lang=de", {
        method: "GET"
    })
    .then(res => res.text())
    .then(res => {
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
                key,
                val.minTemp,
                val.maxTemp,
                icon
            );
        }
    });
}

function createWeatherIcon(date, minTemp, maxTemp, weatherInfo) {
    /*const div = document.createElement("div");
    const img = document.createElement("img");
    const day = document.createElement("span");
    const temperature = document.createElement("span");
    const textDiv = document.createElement("div");
    day.innerHTML = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][new Date(date).getDay()] + "&nbsp;&nbsp;";
    temperature.classList.add("temperaturText");
    day.classList.add("dayText");
    console.log("weatherIcons/" + weatherInfo + ".png");
    img.src = "./weatherIcons/" + weatherInfo + ".png";
    img.style.height = "10vh";
    temperature.innerText = `${Math.round(minTemp)}°/ ${Math.round(maxTemp)}°`;
    textDiv.appendChild(day);
    textDiv.appendChild(temperature);
    textDiv.classList.add("weatherDayTextDiv");
    div.appendChild(img);
    div.appendChild(textDiv);
    div.classList.add("glass");
    document.getElementById("weatherDays").appendChild(div);*/
    //weatherInfo = "11";
    switch (weatherInfo) {
      case "01":
      document.getElementById("weatherDays").innerHTML +=
      `<div class="container">
        <div class="background">
          <div class="Circle1"></div>
          <div class="Circle2"></div>
          <div class="Circle3"></div>
          <div class="content">
            <h1 class="Condition"><i class="material-icons sun">wb_sunny</i> Sunny</h1>
            <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
            <h1 class="Time">Muntig</h1>
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
              <h1 class="Condition"><i class="material-icons sun">wb_cloudy</i> Sunny</h1>
              <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
              <h1 class="Time"></h1>
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
              <h1 class="Condition"><i class="material-icons sun">wb_cloudy</i> </h1>
              <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
              <h1 class="Time"></h1>
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
              <h1 class="Condition"><i class="material-icons sun">wb_cloudy</i> </h1>
              <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
              <h1 class="Time"></h1>
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
              <h1 class="Condition"><i class="material-icons sun">wb_cloudy</i> </h1>
              <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
              <h1 class="Time"></h1>
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
              <h1 class="Condition"><i class="material-icons sun">wb_cloudy</i> </h1>
              <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
              <h1 class="Time"></h1>
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
              <h1 class="Condition"><i class="material-icons sun">wb_cloudy</i> </h1>
              <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
              <h1 class="Time"></h1>
              <h1 class="Location"><i class="material-icons locationIcon">place</i> Brixen, IT</h1>
            </div>
          </div>
          </div>`;
          console.log("volle");
          break;
        case "50":
        document.getElementById("weatherDays").innerHTML +=
        `<div class="containerFog">
        <div class="background">
        <div class="Circle1Fog"></div>
        <div class="Circle2Fog"></div>
        <div class="Circle3Fog"></div>
        <div class="content">
        <h1 class="Condition"><i class="material-icons sun">wb_cloudy</i> </h1>
        <h1 class="Temp">${Math.round(minTemp)}° / ${Math.round(maxTemp)}°</h1>
        <h1 class="Time"></h1>
        <h1 class="Location"><i class="material-icons locationIcon">place</i> Brixen, IT</h1>
        </div>
        </div>
        </div>`
        break;
    }
}
