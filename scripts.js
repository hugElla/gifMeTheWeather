const app = {}

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
          console.log(data)
      })
}

app.init = () => {
  app.getWeather()
}

app.init()