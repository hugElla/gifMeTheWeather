const app = {}

app.randomizer = (array) => {
            const randomIndex = Math.floor(Math.random() * 8);
            return array[randomIndex];
        }

app.location = 55488;
app.apiKey = "vGXkpHg0aMsvhNmAxwDASbd4qs7nQ8tQ";
// app.apiKey = "F3qBixSACB4wgorFTTxE3ANdJkzcjhtA";
// app.apiKey = "fwFkFHtNtvIEuQyNesPT4F1Watb33kP3";
app.url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${app.location}?apikey=${app.apiKey}&language=en-us&details=true&metric=true`

app.getWeather = () => {
    fetch(app.url)
        .then(function (response) {
            return response.json();                
        })
        .then((data) => {
            // console.log(data.DailyForecasts);
            app.displayForecast(data.DailyForecasts);
        })
}

// Empty arrays for daily objects
app.dayIconPhraseArray = [];
app.dayRainArray = [];
app.daySnowArray = [];
app.dayIceArray = [];
app.dayWindArray = [];

app.nightIconPhraseArray = [];
app.nightRainArray = [];
app.nightSnowArray = [];
app.nightIceArray = [];
app.nightWindArray = [];

app.realTempMax = [];
app.realTempMin = [];
app.feelsLikeMax = [];
app.feelsLikeMin = [];

app.displayForecast = (arrayFromWeather) => {

    arrayFromWeather.forEach((dayWeather) => {
        const dayPhrase = dayWeather.Day.IconPhrase
        
        arrayFromWeather.forEach((dayWeather) => {  
            app.dayIconPhraseArray.push(dayWeather.Day.IconPhrase);
            app.dayRainArray.push(dayWeather.Day.Rain);
            app.daySnowArray.push(dayWeather.Day.Snow);
            app.dayIceArray.push(dayWeather.Day.Ice);
            app.dayWindArray.push(dayWeather.Day.Wind.Speed.Value + dayWeather.Day.Wind.Speed.Unit);

            app.nightIconPhraseArray.push(dayWeather.Night.IconPhrase);
            app.nightRainArray.push(dayWeather.Night.Rain);
            app.nightSnowArray.push(dayWeather.Night.Snow);
            app.nightIceArray.push(dayWeather.Night.Ice);
            app.nightWindArray.push(dayWeather.Night.Wind.Speed.Value + dayWeather.Day.Wind.Speed.Unit);

            app.realTempMax.push(Math.round(dayWeather.Temperature.Maximum.Value) + "°" + dayWeather.Temperature.Maximum.Unit);
            app.realTempMin.push(Math.round(dayWeather.Temperature.Minimum.Value) + "°" + dayWeather.Temperature.Minimum.Unit);
            app.feelsLikeMax.push(Math.round(dayWeather.RealFeelTemperature.Maximum.Value) + "°" + dayWeather.RealFeelTemperature.Maximum.Unit);
            app.feelsLikeMin.push(Math.round(dayWeather.RealFeelTemperature.Minimum.Value) + "°" + dayWeather.RealFeelTemperature.Minimum.Unit);
        })

        
        
        const dayIconPhraseContainers = document.querySelectorAll(".dayIconPhrase");
        const dayRainContainers = document.querySelectorAll(".dayRain");
        const daySnowContainers = document.querySelectorAll(".daySnow");
        const dayIceContainers = document.querySelectorAll(".dayIce");
        const dayWindContainers = document.querySelectorAll(".dayWind");
        
        const nightIconPhraseContainers = document.querySelectorAll(".nightIconPhrase");
        const nightRainContainers = document.querySelectorAll(".nightRain");
        const nightSnowContainers = document.querySelectorAll(".nightSnow");
        const nightIceContainers = document.querySelectorAll(".nightIce");
        const nightWindContainers = document.querySelectorAll(".nightWind");
        
        const tempMaxContainers = document.querySelectorAll(".temperatureMax");
        const tempMinContainers = document.querySelectorAll(".temperatureMin");
        const feelMaxContainers = document.querySelectorAll(".feelsMax");
        const feelMinContainers = document.querySelectorAll(".feelsMin");
        
        // need to add conditional statements to only show if there's precipitation
            // if (dayRain.Value > 0 && dayRain.Value !== null) {
            // } 

            // if (daySnow.Value > 0 && daySnow.Value !== null) {
            // } 

            // if (dayIce.Value > 0 && dayIce.Value !== null) {
            // } 
        for(i = 0; i < 5; i++){
            dayIconPhraseContainers[i].innerText = `Day: ${app.dayIconPhraseArray[i]}`
            // dayRainContainers[i].innerText = `${app.dayRainArray[i]}`
            // daySnowContainers[i].innerText = `${app.daySnowArray[i]}`
            // dayIceContainers[i].innerText = `${app.dayIceArray[i]}`
            dayWindContainers[i].innerText = `Wind: ${app.dayWindArray[i]}`

            nightIconPhraseContainers[i].innerText = `Night: ${app.nightIconPhraseArray[i]}`
            // nightRainContainers[i].innerText = `${app.nightRainArray[i]}`
            // nightSnowContainers[i].innerText = `${app.nightSnowArray[i]}`
            // nightIceContainers[i].innerText = `${app.nightIceArray[i]}`
            nightWindContainers[i].innerText = `Wind: ${app.nightWindArray[i]}`

            tempMaxContainers[i].innerText = `High: ${app.realTempMax[i]}`
            tempMinContainers[i].innerText = `Low: ${app.realTempMin[i]}`
            feelMaxContainers[i].innerText = `Feels like high: ${app.feelsLikeMax[i]}`
            feelMinContainers[i].innerText = `Feels like low: ${app.feelsLikeMin[i]}`
        }


        console.log(dayWeather)

    
        // send the weather forecast for the day to the GIPHY API
        app.retrieveGif(dayPhrase);
        
    })    
}

app.chosenGifs = [];

app.giphyApiKey = "bT4cKp5t3W32Z0y3nvvnDyW6I3neAsH2"
app.retrieveGif = (iconPhrase) => {
    fetch(`https://api.giphy.com/v1/gifs/search?q=weather+sky+`+iconPhrase+`&api_key=${app.giphyApiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then((gifArray) => {
            const obtainedGifs = gifArray.data

            // Querying the DOM for the GIF container
            app.chosenGifs.push(app.randomizer(obtainedGifs));
            
            const gifContainers = document.querySelectorAll(".gifArea");
            
            // for(i = 0; i < 5; i++){
            //     gifContainers[i].innerHTML = `<img src="${app.chosenGifs[i].images.original.url}" alt="${app.chosenGifs[i].title}">`
            // }
        })
    }  
    

    
    
    
app.init = () => {
    app.getWeather();
}

app.init()
