document.addEventListener("DOMContentLoaded",initialize)

function initialize(){

function fetchTimeWeather(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' +city+ '&appid=c7252a0b6de273d8802cd2ec709ddb9e')  
    .then(response => response.json() )
    .then(function(data) {
      displayWeather(data);
    })
    .catch(function(error){
    alert("Please type a city name!")
    console.log(error)  
    })
    
    fetch('https://api.ipgeolocation.io/timezone?apiKey=3c97c7a89cc840ddab92b0c29815babf&location='+city)
    .then(response => response.json() )
    .then(function(data) {
      displayTime(data);
    })
    .catch(function(error){
    alert("Please type a city name!")
    console.log(error)  
    })

    document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"+city+"')"
    document.querySelector("#cityImage").src='https://source.unsplash.com/1600x900/?'+city
    
};
   
function displayWeather(data){
    console.log(data)
    cityName=data.name;
    countryName=data.sys['country'];
    tempKev=data.main['temp'];
    tempCel=Math.round(parseInt(tempKev)-273.15);
    icon=data.weather['0'].icon;
    descriptionOne=data.weather['0'].main;
    descriptionTwo=data.weather['0'].description;
    humidity=data.main['humidity'];

    document.querySelector("#city").innerText=`Weather in ${cityName}, ${countryName}!`;
    document.querySelector("#temp").innerText= `${tempCel}°C`;
    document.querySelector("#description").innerText=`${descriptionOne} - ${descriptionTwo}`;
    document.querySelector("#humidity").innerText=`Humidity: ${data.main['humidity']} %`;
    document.querySelector("#icon").src='http://openweathermap.org/img/wn/'+icon+'@2x.png';
    document.querySelector(".weather").classList.remove("loading");
}
//
function displayTime(data){
    console.log(data)
    cityTime=data.date_time_txt
    document.querySelector("#time").innerText=cityTime
}
//

const searchInput=document.querySelector(".search-bar")

document.querySelector(".search-button").addEventListener("click",(event)=>{
event.preventDefault();
fetchTimeWeather(searchInput.value);
document.querySelector("#weatherForm").reset();
})

document.querySelector(".search-bar").addEventListener("keyup", (event)=>{
event.preventDefault();
if(event.key=="Enter"){
fetchTimeWeather(searchInput.value)    
}
})

//

const taskInput=document.querySelector("#task-bar")
const taskList=document.querySelector('#tasks')

document.querySelector("#taskForm").addEventListener("submit",(event)=>{
event.preventDefault();
list=document.createElement("li")
list.innerHTML=`${taskInput.value} `
taskList.append(list)
delBtn=document.createElement("button")
delBtn.innerHTML="x"
list.append(delBtn)
document.querySelector("#taskForm").reset()
})


document.querySelector('#tasks').addEventListener("click", event=>{
  alert ("Do you want to delete it?")
  event.target.parentNode.remove()

})

document.querySelector("#savedWeatherTime").addEventListener("click", event=>{
 const savedInfo= document.querySelector(".info")
 let clone = savedInfo.cloneNode(true);
 document.querySelector("#savedcity").appendChild(clone)
 delBtn=document.createElement("button")
 delBtn.innerHTML="x"
 clone.append(delBtn)
})

document.querySelector('#savedcity').addEventListener("click", event=>{
alert ("Do you want to delete it?")
event.target.parentNode.remove()

})

numberArray=[1,2,3,4,5,6,7,8,9,10,11,12,26,28,30,32,24,26,40,28,29,50];

gameForm= document.querySelector("#game-bar");

document.querySelector('#plussButton').addEventListener("click", event=>{
  event.preventDefault();
  value=gameForm.value
  console.log(value)
  if (isNaN(value)){
    alert ("Please type an integer number")
  }
  else{  
  newArrays=numberArray.map((num)=>num=num+parseInt(value))
  console.log(newArrays)
  result=document.querySelector("span")
  result.innerHTML=newArrays
  document.querySelector("#gameForm").reset()
  }

})

document.querySelector('#minusButton').addEventListener("click", event=>{
  event.preventDefault();
  value=gameForm.value
  console.log(value)
  if (isNaN(value)){
    alert ("Please type an integer number")
  }
  else{  
    newArrays=numberArray.map((num)=>num=num-parseInt(value))
    console.log(newArrays)
    result=document.querySelector("span")
    result.innerHTML=newArrays
    document.querySelector("#gameForm").reset()
  }



})



}