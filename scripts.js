// creating a namespace object
const app = {}

// randomizer function for picking a random gif
app.randomizer = (array) => {
  const randomIndex = Math.floor(Math.random() * 8);
  return array[randomIndex];
}

// variables to use for api call: accuweather
app.location = 55488;
app.apiKey = "vGXkpHg0aMsvhNmAxwDASbd4qs7nQ8tQ";
// app.apiKey = "F3qBixSACB4wgorFTTxE3ANdJkzcjhtA";
// app.apiKey = "fwFkFHtNtvIEuQyNesPT4F1Watb33kP3";
app.url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${app.location}?apikey=${app.apiKey}&language=en-us&details=true&metric=true`

// api call
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

// creating empty arrays to pass info we will need to display on the page
app.iconPhraseArray = [];
app.rainArray = [];
app.snowArray = [];
app.iceArray = [];

app.feelsLikeMax = [];
app.feelsLikeMin = [];
app.realTempMin = [];
app.realTempMax = [];
app.windSpeed = [];


// getting info we need to pass into arrays
app.displayForecast = (arrayFromWeather) => {
  // query the DOM for the Daytime iconphrase
  const dayIconPhrase = document.querySelector(".dayIconPhrase");
  // query the DOM for the <ul> for daytime forecast
  const dayUl = document.querySelector(".day ul");

  // query the DOM for the Nighttime iconphrase
  const nightIconPhrase = document.querySelector(".nightIconPhrase");
  // query the DOM for the <ul> for nighttime forecast
  const nightUl = document.querySelector(".night ul");

  arrayFromWeather.forEach((dayArray) => {
    // Creating list element for dynamic ul
    const dayListEl = document.createElement("li");
    const dayElements = document.createElement("p")
    const dayRain = dayArray.Day.Rain
    const daySnow = dayArray.Day.Snow
    const dayIce = dayArray.Day.Ice
    const dayPhrase = dayArray.Day.IconPhrase

    dayIconPhrase.innerText = `${dayArray.Day.IconPhrase}`


    dayElements.innerText = `POP: ${dayArray.PrecipitationProbability}%`
    dayListEl.appendChild(dayElements)

    arrayFromWeather.forEach((dayArray) => {
      app.iconPhraseArray.push(dayArray.Day.IconPhrase);
      app.rainArray.push(dayArray.Day.Rain);
      app.snowArray.push(dayArray.Day.Snow);
      app.iceArray.push(dayArray.Day.Ice);

      app.feelsLikeMax.push(Math.round(dayArray.RealFeelTemperature.Maximum.Value) + "°" + dayArray.RealFeelTemperature.Maximum.Unit);
      app.feelsLikeMin.push(Math.round(dayArray.RealFeelTemperature.Minimum.Value) + "°" + dayArray.RealFeelTemperature.Minimum.Unit);
      app.realTempMax.push(Math.round(dayArray.Temperature.Maximum.Value) + "°" + dayArray.Temperature.Maximum.Unit);
      app.realTempMin.push(Math.round(dayArray.Temperature.Minimum.Value) + "°" + dayArray.Temperature.Minimum.Unit);
      app.windSpeed.push(dayArray.Day.Wind.Speed.Value + dayArray.Day.Wind.Speed.Unit);
    })

    if (dayRain.Value > 0 && dayRain.Value !== null) {
      dayElements.innerText = `${dayRain.Value} ${dayRain.Unit}`;
      dayListEl.appendChild(dayElements);
    }

    if (daySnow.Value > 0 && daySnow.Value !== null) {
      dayElements.innerText = `${daySnow.Value} ${daySnow.Unit}`;
      dayListEl.appendChild(dayElements);
    }

    if (dayIce.Value > 0 && dayIce.Value !== null) {
      dayElements.innerText = `${dayIce.Value} ${dayIce.Unit}`;
      dayListEl.appendChild(dayElements);
    }


    // querying the dom for elements to be populated
    const dayIconPhraseContainers = document.querySelectorAll(".dayIconPhrase");
    const tempMaxContainers = document.querySelectorAll(".temperatureMax");
    const tempMinContainers = document.querySelectorAll(".temperatureMin");


    // populating elements
    for (i = 0; i < 5; i++) {
      // gifContainers[i].innerHTML = `<img src="${app.chosenGifs[i].images.original.url}" alt="${app.chosenGifs[i].title}">`
      dayIconPhraseContainers[i].innerText = `${app.iconPhraseArray[i]}`
    }

    // app.iconPhraseArray = [];
    // app.rainArray = [];
    // app.snowArray = [];
    // app.iceArray = [];

    // app.feelsLikeMax = [];
    // app.feelsLikeMin = [];

    console.log(dayArray)


    // send the weather forecast for the day to the GIPHY API
    app.retrieveGif(dayPhrase);

  })
}

// creating an array for gifs chosen randomly to be pushed into
app.chosenGifs = [];

// giphy api call
app.giphyApiKey = "bT4cKp5t3W32Z0y3nvvnDyW6I3neAsH2"
app.retrieveGif = (iconPhrase) => {
  fetch(`https://api.giphy.com/v1/gifs/search?q=weather+sky+` + iconPhrase + `&api_key=${app.giphyApiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then((gifArray) => {
      const obtainedGifs = gifArray.data

      // Querying the DOM for the GIF container
      app.chosenGifs.push(app.randomizer(obtainedGifs));

      const gifContainers = document.querySelectorAll(".gifArea");

      for (i = 0; i < 5; i++) {
        gifContainers[i].innerHTML = `<img src="${app.chosenGifs[i].images.original.url}" alt="${app.chosenGifs[i].title}">`
      }
    })
}





app.init = () => {
  app.getWeather();
}

app.init()
