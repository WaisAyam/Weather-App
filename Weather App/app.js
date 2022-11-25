const wrapper = document.querySelector('.wrapper');
const inputField = document.querySelector('input');
const weatherImg = wrapper.querySelector('.first-part img')

inputField.addEventListener('keyup', (e) => {
    //if user pressed entered btn and input value is not empty
    if(e.key == 'Enter' && inputField.value != ""){
        requestApi(inputField.value);
        inputField.value = "";
    }
});

function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=27cd174a3b303dec7b59e42eadf52e77`;
    fetch(api).then(res => res.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    console.log(info);
    //let's get required properties value from the info object
    const city = info.name;
    const country = info.sys.country;
    const {description, id} = info.weather[0];
    const {feels_like, humidity, temp} = info.main;

    //let's pass these values to a particular html element
    wrapper.querySelector('.temp .numb').innerText = Math.floor(temp);
    wrapper.querySelector('.temp .weather').innerText = description;
    wrapper.querySelector('.location span').innerText = `${city} ${country}`;
    wrapper.querySelector('.second-part .temp .numb-2').innerText = Math.floor(feels_like);
    wrapper.querySelector('.column-1 .details span').innerText = `${humidity}`;

    //use custom icon according to the id which api return us 
    if(id == 800){
        weatherImg.src = 'Icons/clear.png';
    }else if(id >= 200 && id <= 232){
        weatherImg.src = 'Icons/strom.png';
    }else if(id >= 600 && id <= 622){
        weatherImg.src = 'Icons/snow.png';
    }else if(id >= 701 && id <= 781){
        weatherImg.src = 'Icons/haze.png';
    }else if(id >= 801 && id <= 804){
        weatherImg.src = 'Icons/cloud.png';
    }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
        weatherImg.src = 'Icons/rain.png';
    }
}