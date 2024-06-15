const countryContainer = document.getElementById('country-cards');
var result = fetch("https://restcountries.com/v2/all");
result.then(response=> {return response.json()})
.then(res=>{
    res.forEach((country) => {
        var col = document.createElement("div");
        col.setAttribute("class","col-md-4 col-sm-12");
        countryContainer.append(col);
        var div = document.createElement("div");
        div.setAttribute("class","card mb-4");
        // div.setAttribute("width","300px");
        div.setAttribute("align-items","center");
        var divHeader = document.createElement("div");
        divHeader.setAttribute("class","card-header");
        var divBody = document.createElement("div");
        divBody.setAttribute("class","card-body card");
        var h1 = document.createElement("h1");
        h1.innerText=country.name;
        divHeader.append(h1);
        div.append(divHeader);
        div.append(divBody);
        col.append(div);
        // console.log(country.flags.png);
        var img = document.createElement("img");
        img.setAttribute("src",country.flag);
        img.setAttribute("class","img-fluid");
        divBody.append(img);
        var capital = document.createElement("p");
        capital.innerText="Capital: "+country.capital;
        divBody.append(capital);
        // console.log(country.capital);
        var region = document.createElement("p");
        region.innerText="Region: "+country.region;
        divBody.append(region);
        //console.log(country.region);
        var countryCode = document.createElement("p");
        countryCode.innerText="Country Codes: "+country.alpha2Code+" "+country.alpha3Code;
        divBody.append(countryCode);
        //console.log(countryCode);
        var latlngElement = document.createElement('p');
        latlngElement.textContent = `Lat/Lng: ${country.latlng ? country.latlng.join(', ') : 'N/A'}`;
        divBody.append(latlngElement);
        var button = document.createElement("button");
        button.setAttribute("class","btn btn-primary");
        button.setAttribute("type","button");
        button.innerHTML="Click for Weather";
        button.addEventListener('click', () => showWeather(country.name, country.latlng));
        divBody.append(button);
    });
})
.catch((error)=>console.log(error));


function showWeather(name, latlng) {
    if (!latlng) {
      alert(`No weather data available for ${name}`);
      return;
    }
  
    const [lat, lng] = latlng;
    const apiKey = 'f195a0c15728863cb6ba7d9eda23cbea'; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
  
    fetch(weatherUrl)
      .then(response => response.json())
      .then(weather => {
        const { main, weather: weatherDetails } = weather;
        alert(`Current weather in ${name}: ${weatherDetails[0].description}, Temperature: ${main.temp}°C`);
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }


