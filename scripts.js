// creating a namespace object
const app = {};

// randomizer function for picking a random gif
app.randomizer = (array) => {
  const randomIndex = Math.floor(Math.random() * 1);
  return array[randomIndex];
}

// variables to use for api call: accuweather
app.accuweatherUrl = "https://dataservice.accuweather.com";
app.locationEndPoint = "/locations/v1/cities/search";
app.forecastEndPoint = "/forecasts/v1/daily/5day/";

// EXTRA API KEYS, CALLS LIMITED TO 50 PER DAY. COMMENT IN/OUT AS NEEDED
// app.apiKey = "vGXkpHg0aMsvhNmAxwDASbd4qs7nQ8tQ";
// app.apiKey = "F3qBixSACB4wgorFTTxE3ANdJkzcjhtA";
// app.apiKey = "fwFkFHtNtvIEuQyNesPT4F1Watb33kP3";
app.apiKey = "gMBiAdRmah3cdhTjxeA30r952zsbfKG8";
// app.apiKey = "6TK8aMoezoeYGHIAiTiWck1u7uaxPARF";



// takes user inputted city to pass to the apis
app.locationSubmission = () => {

  // when the button is clicked:
  const locationQ = document.querySelector(".locationForm2");
  locationQ.addEventListener("submit", (event) => {
    // prevents refresh
    event.preventDefault();

    // gets the name of location and passes it to getLocation
    const locationName = document.getElementById("locationInput2");
    app.getLocation(locationName.value);

    // clears the form
    locationName.value = "";

  });
};

// the same as locationSubmission() but for the button on the splash page. shows weather, hides splash page
app.showHide = () => {

  const firstButton = document.querySelector(".locationForm");
  firstButton.addEventListener("submit", (event) => {
    // prevents refresh
    event.preventDefault();

    // gets the name of location and passes it to getLocation
    const locationName = document.getElementById("locationInput");
    app.getLocation(locationName.value);

    // toggles the classes on index and weather
    const indexPage = document.querySelector(".indexBody");
    const weatherPage = document.querySelector(".weatherPage");

    // toggles classes to show and hide the correct pages
    indexPage.classList.toggle("indexShow");
    indexPage.classList.toggle("hide");
    weatherPage.classList.toggle("show");
    weatherPage.classList.toggle("hide");

    // clears the form
    locationName.value = "";
  });
};




// api call to get inputted location
app.getLocation = (locationQuery) => {

  // creating the url
  const url = new URL(`${app.accuweatherUrl}${app.locationEndPoint}`)
  url.search = new URLSearchParams({
    apikey: app.apiKey,
    q: locationQuery,
    language: "en-us",
    details: true
  })

  // fetching data (location id + name + country)
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      // updates the h2 span to display location
      const city = data[0].EnglishName;
      const country = data[0].Country.EnglishName;
      const displayLocation = document.querySelector("h2 span");
      displayLocation.textContent = `${city}, ${country}.`

      // passes location id to getWeather
      app.getWeather(data[0].Key)
    });
};





// api call to get weather for inputted location
app.getWeather = (location) => {

  // creating the url
  const url = new URL(`${app.accuweatherUrl}${app.forecastEndPoint}${location}`)
  url.search = new URLSearchParams({
    apikey: app.apiKey,
    language: "en-us",
    details: true,
    metric: true
  })

  // fetching the data (forecasts)
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      // console.log(data.DailyForecasts);
      // passes the info to displayForecast
      app.displayForecast(data.DailyForecasts);
    })
}

//Weekday name array
  // goes to Wednesday again as it iterates +5 to the array, on Saturday going to array[12]
app.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"]



// Empty arrays for daily objects
app.date = [];
app.dayIconPhraseArray = [];
app.dayHasPrecipitation = [];
app.dayRainArray = [];
app.daySnowArray = [];
app.dayIceArray = [];
app.dayWindArray = [];

app.nightIconPhraseArray = [];
app.nightHasPrecipitation = [];
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


const dateContainers = document.querySelectorAll(".date");
const dateNameContainers = document.querySelectorAll(".dateName");
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



// displays the weather to the page
app.displayForecast = (arrayFromWeather) => {
  // empties arrays before adding values in
  app.date = [];
  app.dayIconPhraseArray = [];
  app.dayHasPrecipitation = [];
  app.dayRainArray = [];
  app.daySnowArray = [];
  app.dayIceArray = [];
  app.dayWindArray = [];

  app.nightIconPhraseArray = [];
  app.nightHasPrecipitation = [];
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
    app.dayRainArray.push(dayWeather.Day.Rain.Value + dayWeather.Day.Rain.Unit);
    app.daySnowArray.push(dayWeather.Day.Snow.Value + dayWeather.Day.Snow.Unit);
    app.dayIceArray.push(dayWeather.Day.Ice.Value + dayWeather.Day.Ice.Unit);
    app.dayWindArray.push(dayWeather.Day.Wind.Speed.Value + dayWeather.Day.Wind.Speed.Unit);

    app.nightIconPhraseArray.push(dayWeather.Night.IconPhrase);
    app.nightRainArray.push(dayWeather.Night.Rain.Value + dayWeather.Night.Rain.Unit);
    app.nightSnowArray.push(dayWeather.Night.Snow.Value + dayWeather.Night.Snow.Unit);
    app.nightIceArray.push(dayWeather.Night.Ice.Value + dayWeather.Night.Ice.Unit);

    app.nightWindArray.push(dayWeather.Night.Wind.Speed.Value + dayWeather.Day.Wind.Speed.Unit);

    app.realTempMax.push(Math.round(dayWeather.Temperature.Maximum.Value) + "° " + dayWeather.Temperature.Maximum.Unit);
    app.realTempMin.push(Math.round(dayWeather.Temperature.Minimum.Value) + "° " + dayWeather.Temperature.Minimum.Unit);
    app.feelsLikeMax.push(Math.round(dayWeather.RealFeelTemperature.Maximum.Value) + "° " + dayWeather.RealFeelTemperature.Maximum.Unit);
    app.feelsLikeMin.push(Math.round(dayWeather.RealFeelTemperature.Minimum.Value) + "° " + dayWeather.RealFeelTemperature.Minimum.Unit);
    
    // send the weather forecast for the day to the GIPHY API
    app.retrieveGif(dayPhrase);

  })


  // gets today's weekday as a numerical value
  const date = new Date();
  const today = date.getDay()
  console.log(today)


  for (i = 0; i < 5; i++) {
    dateNameContainers[i].innerText = `${app.weekdays[today + i]}`
    dateContainers[i].innerText = `${app.date[i]}`;
    dayIconPhraseContainers[i].innerText = `Day: ${app.dayIconPhraseArray[i]}`
      
      dayRainContainers[i].innerText = `${app.dayRainArray[i]}`
      daySnowContainers[i].innerText = `${app.daySnowArray[i]}`
      dayIceContainers[i].innerText = `${app.dayIceArray[i]}`
  
    dayWindContainers[i].innerText = `${app.dayWindArray[i]}`
    
    nightIconPhraseContainers[i].innerText = `Night: ${app.nightIconPhraseArray[i]}`
    
    nightRainContainers[i].innerText = `${app.nightRainArray[i]}`
    nightSnowContainers[i].innerText = `${app.nightSnowArray[i]}`
    nightIceContainers[i].innerText = `${app.nightIceArray[i]}`
    nightWindContainers[i].innerText = `${app.nightWindArray[i]}`

    tempMaxContainers[i].innerText = `High: ${app.realTempMax[i]} `
    feelMaxContainers[i].innerText = `/ ${app.feelsLikeMax[i]}`
    tempMinContainers[i].innerText = `Low: ${app.realTempMin[i]} `
    feelMinContainers[i].innerText = `/ ${app.feelsLikeMin[i]}`
  }



  // Hiding the 0 precipitation divs
  dayRainContainers.forEach((day) => {
    if(day.innerText == "0mm"){
      day.classList.add("hideWeather");
      day.setAttribute("aria-hidden", "true");
    }
  })
  daySnowContainers.forEach((day) => {
    if(day.innerText == "0cm"){
      day.classList.add("hideWeather");
      day.setAttribute("aria-hidden", "true");
    }
  })
  dayIceContainers.forEach((day) => {
    if(day.innerText == "0mm"){
      day.classList.add("hideWeather");
      day.setAttribute("aria-hidden", "true");
    }
  })
  nightRainContainers.forEach((day) => {
    if(day.innerText == "0mm"){
      day.classList.add("hideWeather");
      day.setAttribute("aria-hidden", "true");
    }
  })
  nightSnowContainers.forEach((day) => {
    if(day.innerText == "0cm"){
      day.classList.add("hideWeather");
      day.setAttribute("aria-hidden", "true");
    }
  })
  nightIceContainers.forEach((day) => {
    if(day.innerText == "0mm"){
      day.setAttribute("aria-hidden", "true");
      day.classList.add("hideWeather");
    }
  })

}





// variables to use for giphy api call
app.giphyApiKey = "bT4cKp5t3W32Z0y3nvvnDyW6I3neAsH2"
app.giphyUrl = "https://api.giphy.com/v1/gifs/search"


  // giphy api call
app.retrieveGif = (iconPhrase) => {

  console.log(iconPhrase)
  // creating the url
  const url = new URL(`${app.giphyUrl}`);
  url.search = new URLSearchParams({
    q: `weather+sky+nature+${iconPhrase}`,
    api_key: app.giphyApiKey
  });

  // fetching the data (gifs)
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((gifArray) => {
      const obtainedGifs = gifArray.data;

      // obtains ransom gif from gif array
      app.chosenGifs.push(app.randomizer(obtainedGifs));

      // Querying the DOM for the GIF container
      const gifContainers = document.querySelectorAll(".gifArea");

      // displays gifs to the page
      for (i = 0; i < app.chosenGifs.length; i++) {
        gifContainers[i].innerHTML = `<img src="${app.chosenGifs[i].images.original.url}" alt="${app.chosenGifs[i].title}">`;
      };
    });
};

// app.activity = (temperature) => {
//   fetch(`http://www.boredapi.com/api/activity?accessibility`+temperature)
//   .then(function (response) {
//       return response.json();
//   })
//   .then((activity) => {
//       console.log(activity)
//   })
// }


// app.init = () => {
//   num = Math.floor()
//   app.activity(num);
//   console.log(num);
// }


app.init = () => {
  app.locationSubmission();
  app.showHide();
}

app.init(); 