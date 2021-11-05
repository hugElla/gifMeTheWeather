const app = {}

app.randomizer = (array) => {
            const randomIndex = Math.floor(Math.random() * 10);
            return array[randomIndex];
        }

app.getWeather = () => {
    fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/55488?apikey=vGXkpHg0aMsvhNmAxwDASbd4qs7nQ8tQ&language=en-us&details=true&metric=true')
        .then(function (response) {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Error")
            }
        })
        .then((data) => {
            console.log(data.DailyForecasts);
        })
}

app.giphyApiKey = "bT4cKp5t3W32Z0y3nvvnDyW6I3neAsH2"
app.weather = "cloudy"
app.retrieveGif = () => {
    fetch('https://api.giphy.com/v1/gifs/search?q=${app.weather}&api_key=bT4cKp5t3W32Z0y3nvvnDyW6I3neAsH2')
        .then(function (response) {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Error")
            }
        })
        .then((data) => {
            console.log(data.data);
        })
}  

app.init = () => {
app.getWeather();
app.retrieveGif();
}

app.init()
