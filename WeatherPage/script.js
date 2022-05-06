'use strict'

//________________________________________________________DISPLAY CURRENT WEATHER__________________________________________________________
const city = document.getElementById('city');
const weatherIcon = document.querySelector('#weatherIcon img')
const temperature = document.getElementById('temperature');
const currentWeather = document.getElementById('currentWeather');
const currentTime = document.getElementById('currentTime');
//default url set on global
var CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=global&units=metric&appid=36ed4ab8204d7d7dc6ab38b35e9df2cd`;
var FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=global&units=metric&appid=af5bb567265e0b7094fcf16a2d29e542';
const currentDate = new Date();
//creating local Data object, to gather all data we need into one object
//with specific data we need
let WeatherData = 
{
    city: '',
    country: '',
    iconURL: '',
    temperature: '',
    weather: '',
    currentTime: '',
    wind: '',
    cloudiness: '',
    pressure: '',
    humidity: '',
    sunrise:'',
    sunset:'',
    geocoords: {
        lat: '',
        lon: '',
    }
}
// checks if geoocordinates are loaded.
let loaded = false;

//getting the data from geolocation API
function getLocation() {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  alert( "Geolocation is not supported by this browser.");
}
}
//getting lat and lon from user's current location
 function showPosition(position) 
 {
     //if loaded then set to true, because it takes some time depending on the connection
    loaded = true;
    CURRENT_WEATHER_URL =  `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=36ed4ab8204d7d7dc6ab38b35e9df2cd`;
    FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=af5bb567265e0b7094fcf16a2d29e542`;
}

//temer to wait for geoocords to be recieved
const sleep = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(ms);
      }, ms);
    });
  };

  //calling for coordinates from the API, takes time depending on connection or response.
 getLocation();
//assign a name to a month from Date object
function monthsNames(numberOfMonth)
    {
    let months = ['January', 'February','March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October','November','December'];
        return months[numberOfMonth];
    }
//wrapping the call for data in the function that wats for geocoords to be recieved
async function currentWaitForCoords(){
//giving geocoordinates API time to load the lat and lon
 while(!loaded)
 {
     await sleep(100);
 }
 console.log('Current weather coordinates loaded!');
//getting a JSON file from openWeather API
fetch(CURRENT_WEATHER_URL)
.then(response => response.json())
.then((data)=>{
    //saving the data from JSON to a local object to use only specified data
    WeatherData.city = data.name;
    WeatherData.country = data.sys.country;
    WeatherData.iconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    WeatherData.temperature = data.main.temp + "°C";
    WeatherData.weather = data.weather[0].main;
    WeatherData.currentTime = currentDate.getHours() + ':'
     + properMinutes(currentDate.getMinutes()) + " " + monthsNames(currentDate.getMonth())
      + " " + currentDate.getFullYear();
    WeatherData.wind =  'speed ' + data.wind.speed + 'm/s';
    WeatherData.cloudiness = data.weather[0].description;
    WeatherData.pressure = data.main.pressure;
    WeatherData.humidity = data.main.humidity;
    WeatherData.sunrise = unixTimeConvert(data.sys.sunrise);
    WeatherData.sunset = unixTimeConvert(data.sys.sunset);
    WeatherData.geocoords.lat = data.coord.lat;
    WeatherData.geocoords.lon = data.coord.lon;
    FillTheData();
    populateTable();
})
.catch(err => {
    alert('Please Permit geocoords', err)
    location.reload();
});

}

//just to see if object filled
console.log(WeatherData);

function properMinutes(minutes)
{
    return minutes < 10 ? '0' + minutes : minutes;
}

//actually applying saved data to a DOM elements
function FillTheData()
{
    city.innerText = `Weather in ${WeatherData.city}, ${WeatherData.country}`
    temperature.innerText = WeatherData.temperature;
    weatherIcon.src = WeatherData.iconURL;
    currentWeather.innerText = WeatherData.weather;
    currentTime.innerText = WeatherData.currentTime;
}

//converting unix time format to standart time format, thanks, stack overflow.
function unixTimeConvert(unixTime)
{
let unix_timestamp = unixTime;
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();
// Will display time in 00:00:00 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
 return formattedTime;
}

//add rows and data
//reference of a table
const currentWeatherTable = document.querySelector('.currentWeather__table');
//Function to create a new row element with 2 data elements inside
function createTableElements(tableData1, tableData2)
{
    let newRow = document.createElement('tr');
    let newData1 = document.createElement('td');
    let newData2 = document.createElement('td');
    newRow.classList.add('currentWeather__table--row');
    currentWeatherTable.appendChild(newRow);
    newData1.innerText = tableData1;
    newData2.innerText = tableData2;
    newRow.appendChild(newData1);
    newRow.appendChild(newData2);
}
//populateing the table with elements
function populateTable()
{
    createTableElements('Wind', WeatherData.wind);
    createTableElements('Cloudiness', WeatherData.cloudiness);
    createTableElements('Pressure', WeatherData.pressure + ' hpa');
    createTableElements('Humidity', WeatherData.humidity + '%');
    createTableElements('Sunrise', WeatherData.sunrise);
    createTableElements('Sunset', WeatherData.sunset);
    createTableElements('Geocoords', [WeatherData.geocoords.lat,
         WeatherData.geocoords.lon].join(', '));
}

//________________________________________________________!DISPLAY CURRENT WEATHER END!__________________________________________________________



//________________________________________________________FIVE DAY WEATHER FORECAST___________________________________________________________ 

const fiveDayWeatherBlock = document.getElementsByClassName('fiveDayWeather')

const cityPlaceholder = document.getElementById('forecastCity');
//get weekday by date
function weekDayName(date)
{
    let Ldate = new Date(date);
    let numberOfTheWeekDay = Ldate.getDay();
    const weekDays = ['Mon.','Tue.','Wed.','Thu.','Fri.','Sat.', 'Sun.'];
    return weekDays[numberOfTheWeekDay -1];
}
//get month name by the date
function monthByDate(date)
{
    let Ldate = new Date(date);
    let numberOfMonth = Ldate.getMonth();
    return monthsNames(numberOfMonth);
}
//fetching forecast data
async function forecastAwaitCoords(){
    //giving geocoordinates API time to load the lat and lon
    while(!loaded)
    {
        await sleep(100);
    }
    console.log('5 day forecast coordinates loaded!');

fetch(FORECAST_URL)
.then(response => response.json())
.then(data => {
    cityPlaceholder.innerText = `5 day weather forecast in ${data.city.name}, ${data.city.country}`;
    //showing date, month name, week day name
    //converting numbers into actual names of day in a week and month name
    let counter = 1;
    for(let i = 0; i < data.list.length; i=i+8)
    {
        let headline =  `${weekDayName(data.list[i].dt_txt)} ${monthByDate(data.list[i].dt_txt)} ${data.list[i].dt_txt.slice(8,10)} ${data.list[i].dt_txt.slice(0,4)}`
        //if its the first day it means its today, so we add 'Today' at the end
        counter == 1 ? document.querySelector('#day' + counter).innerText = headline + ' Today' 
        : document.querySelector('#day' + counter).innerText = headline;
        counter++;
    }
    //populating left side of a table dom element
    //looping through all the 40 elements in the list, getting 3 first forecasts in each day
    //every next day is every next 8 elements
    //using counter to loop through all the DOM elements
    counter = 0;
    for(let i=0; i < data.list.length; i=i+8)
    {
        for(let j=i; j < i+3; j++)
        {
            document.querySelectorAll('.fiveDayWeather__table--data1')[counter].innerHTML = '<p>' 
            + data.list[j].dt_txt.slice(10,16) 
            + '</p> <img src="' 
            + 'http://openweathermap.org/img/wn/' 
            + data.list[j].weather[0].icon + '@2x.png' + '">';
            counter++;
        }
    }
    // same here but for seconds table data
    counter=0;
    for(let i=0; i < data.list.length; i=i+8)
    {
        for(let j=i; j < i+3; j++)
        {
            document.querySelectorAll('.fiveDayWeather__table--data2')[counter].innerHTML = ' <div class="table_blocks"> <p class="styledTemp">'
             + data.list[j].main.temp + ' °C' 
            +' </p>'+ data.list[j].weather[0].description
             +' </div> <div class="table_blocks">'+ data.list[j].wind.speed
              + ' m/s ' + data.list[j].weather[0].main
               + ': '+ data.list[j].main.humidity + '% '
                + data.list[j].main.pressure + ' hpa' +'</div>'
            counter++;
        }
    }
   
    
});
}


currentWaitForCoords();
forecastAwaitCoords();
//________________________________________________________!FIVE DAY WEATHER FORECAST END!___________________________________________________________ 