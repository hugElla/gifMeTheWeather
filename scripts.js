// creating a namespace object
const app = {}

// randomizer function for picking a random gif
app.randomizer = (array) => {
  const randomIndex = Math.floor(Math.random() * 8);
  return array[randomIndex];
}

// variables to use for api call: accuweather

// EXTRA API KEYS, CALLS LIMITED TO 50 PER DAY. COMMENT IN/OUT AS NEEDED
// app.apiKey = "vGXkpHg0aMsvhNmAxwDASbd4qs7nQ8tQ";
// app.apiKey = "F3qBixSACB4wgorFTTxE3ANdJkzcjhtA";
// app.apiKey = "fwFkFHtNtvIEuQyNesPT4F1Watb33kP3";
// app.apiKey = "gMBiAdRmah3cdhTjxeA30r952zsbfKG8";
app.apiKey = "6TK8aMoezoeYGHIAiTiWck1u7uaxPARF";



// takes user inputted city to pass to the apis
app.locationSubmission = () => {
  // when the button is clicked:
  const locationQ = document.querySelector('button');
  locationQ.addEventListener('click', (event) => {
    // prevents refresh
    event.preventDefault();

    // gets the name of location and passes it to getLocation
    app.locationName = document.getElementById('locationInput').value;
    app.getLocation(app.locationName);

    // clears the form
    app.form = document.querySelector("form");
    app.form.reset();
  });
};





// api call to get inputted location
app.getLocation = (locationQuery) => {
  fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${app.apiKey}&q=${locationQuery}&language=en-us&details=true`)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      // updates the h2 span to display location
      const city = data[0].EnglishName;
      const country = data[0].Country.EnglishName;
      const displayLocation = document.querySelector('h2 span');
      displayLocation.textContent = `${city}, ${country}.`

      // passes location id to getWeather
      app.getWeather(data[0].Key)
    });
};





// api call to get weather for inputted location
app.getWeather = (location) => {
  fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location}?apikey=${app.apiKey}&language=en-us&details=true&metric=true`)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      // console.log(data.DailyForecasts);
      // passes the info to displayForecast
      app.displayForecast(data.DailyForecasts);
    })
}




// Empty arrays for daily objects
app.date = [];
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
app.realTempMin = [];
app.realTempMax = [];
app.windSpeed = [];

// creating an array for gifs chosen randomly to be pushed into
app.chosenGifs = [];



// displays the weather to the page
app.displayForecast = (arrayFromWeather) => {
  // empties arrays before adding values in
  app.date = [];
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
  app.realTempMin = [];
  app.realTempMax = [];
  app.windSpeed = [];

  app.chosenGifs = [];

  // pushes returned values to the arrays
  arrayFromWeather.forEach((dayWeather) => {
    const dayPhrase = dayWeather.Day.IconPhrase
    app.date.push(dayWeather.Date.slice(0, 10));
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


    const dateContainers = document.querySelectorAll("h3");
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
    for (i = 0; i < 5; i++) {
      dateContainers[i].innerText = `Date: ${app.date[i]}`;
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




// giphy api call
app.giphyApiKey = "bT4cKp5t3W32Z0y3nvvnDyW6I3neAsH2"
app.retrieveGif = (iconPhrase) => {
  fetch(`https://api.giphy.com/v1/gifs/search?q=weather+sky+` + iconPhrase + `&api_key=${app.giphyApiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then((gifArray) => {
      const obtainedGifs = gifArray.data;
      // randomizes returned gifs
      app.chosenGifs.push(app.randomizer(obtainedGifs));
      
      // Querying the DOM for the GIF container
      const gifContainers = document.querySelectorAll(".gifArea");

      // displays gifs to the page
      for (i = 0; i < app.chosenGifs.length; i++) {
        gifContainers[i].innerHTML = `<img src="${app.chosenGifs[i].images.original.url}" alt="${app.chosenGifs[i].title}">`;
      };
    });
};





app.init = () => {
  app.locationSubmission();
}

app.init()
