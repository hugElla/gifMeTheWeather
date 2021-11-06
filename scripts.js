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
            const gifContainers = document.querySelectorAll(".gifArea");
            app.chosenGifs.push(app.randomizer(obtainedGifs));
        
            
        })
    }  

for (i = 0; i < app.chosenGifs.length; i++){
    for(i = 0; i<)


}

    
app.chosenGifs.forEach((gif) =>{
    // an create image element
    const imgEl = document.createElement("img");
    // console.log(gif)
    // add the content to the img element src & alt text
    imgEl.src = gif.images.original.url;
    imgEl.alt = gif.title;

    console.log(imgEl)
    
})
    
    
app.init = () => {
    app.getWeather();
}

app.init()
