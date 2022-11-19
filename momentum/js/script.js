
// change language

let lang = 'en';
const engBtn = document.querySelector('.english');
const belBtn = document.querySelector('.belarusian');

engBtn.addEventListener('click', () => {
    lang = 'en';
    engBtn.classList.add('active-lang');
    belBtn.classList.remove('active-lang'); 
    changeCityWeather();
    myname.placeholder = '[ Enter your name ]';
    getQuotes();
});

belBtn.addEventListener('click', () => {
    lang = 'be';
    belBtn.classList.add('active-lang');
    engBtn.classList.remove('active-lang'); 
    changeCityWeather();
    myname.placeholder = '[ Увядзіце ваша імя ]';
    getQuotes();
});



// clock and calendar

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');

function showTime() {
    const dateNow = new Date();
    const currentTime = dateNow.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    if ( lang === 'en' ) { 
        getTimeOfday()
        greeting.textContent = `Good ${getTimeOfday()}`
    }
    if ( lang === 'be' ) { getTimeOfdayBel() }
    
    setTimeout(showTime, 1000);
}

function showDate() {
    const dateNow = new Date();
    const weekDay = dateNow.getDay();
    let week = [];
    let currentDate;
    const options = {month: 'long', day: 'numeric', timeZone: 'UTC'};

    if ( lang === 'en' ) {
        week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        currentDate = dateNow.toLocaleDateString('en-Br', options);
    }
    if ( lang === 'be' ) {
        week = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];
        currentDate = dateNow.toLocaleDateString('be-by', options);
    }

    const weekText = week[weekDay];

    
    date.textContent = `${weekText}, ${currentDate}`;
}


// greeting time

function getTimeOfday() {
    const dateNow = new Date();
    const hours = dateNow.getHours();
    const i = hours / 6;
    let greetingHour = '';

    if ( i < 1 ) {
        greetingHour = 'night'
    } else if ( i < 2 ) {
        greetingHour = 'morning'
    } else if ( i < 3 ) {
        greetingHour = 'afternoon'
    } else {
        greetingHour = 'evening'
    }

    return greetingHour;
}

function getTimeOfdayBel() {
    let time = getTimeOfday ();
    if ( time === 'night' ) { greeting.textContent = 'Дабранач' }
    if ( time === 'morning' ) { greeting.textContent = 'Добрай раніцы' }
    if ( time === 'afternoon' ) { greeting.textContent = 'Добры дзень' }
    if ( time === 'evening' ) { greeting.textContent = 'Добры вечар' }
}

showTime();


// greeting name

const myname = document.querySelector('.name');

function setLocalStorege() {
    localStorage.setItem('myname', myname.value);
    localStorage.setItem('city', city.value);
    localStorage.setItem('nameCity', nameCity);
}

window.addEventListener('beforeunload', setLocalStorege);

function getLocalStorege() {
    if (localStorage.getItem('myname')) {
        myname.value = localStorage.getItem('myname');
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    nameCity = localStorage.getItem('nameCity');
    getWeather(nameCity)
}

window.addEventListener('load', getLocalStorege);



// backgroung images

const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNum = getRandomNum(1, 20);

function setBg(timeOfDay, bgNum) {
    bgNum = randomNum.toString().padStart(2, '0');
    timeOfDay = getTimeOfday();
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/IrinaIID/momentum-backgrounds/main/${timeOfDay}/${bgNum}.webp`;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
      }
}

setBg()

function getSlideNext() {
    if (randomNum === 20) {
        randomNum = 1
    } else {
       randomNum += 1; 
    }

    setBg()
}

function getSlidePrev() {
    if (randomNum === 1) {
        randomNum = 20
    } else {
       randomNum -= 1; 
    }
    
    setBg()
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);


// weather 

// link https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=e0270e4ccb8b91ef69ac95d6d069ac3b&units=metric

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed')


let linkWeather = `https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=e0270e4ccb8b91ef69ac95d6d069ac3b&units=metric`;


async function getWeather(nameCity) {
  
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&lang=${lang}&appid=e0270e4ccb8b91ef69ac95d6d069ac3b&units=metric`;
    const res = await fetch(url);
    const data = await res.json();


    if ( data.cod !== 200 ) {
        nameCity = 'minsk'
        if ( lang === 'en' ) { city.value = 'Enter right city' }
        if ( lang === 'be' ) { 
            city.value = 'Увядзіце горад';
            city.placeholder = '[ Увядзіце горад ]'
        }
        getWeather(nameCity)
    } 

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = `${data.weather[0].description}`;
    const langHumidity = {
        en: 'Humidity',
        be: 'Вільготнасць'
    }
    const langWindSpeed = {
        en: 'Wind speed',
        be: 'Хуткасць ветру'
    }
    humidity.textContent = `${langHumidity[lang]}: ${Math.round(data.main.humidity)}%`
    windSpeed.textContent  = `${langWindSpeed[lang]}: ${Math.round(data.wind.speed)}m/s`
}

getWeather('Minsk')


const city = document.querySelector('.city');
let nameCity;

function changeCityWeather() {
    nameCity = city.value;
    getWeather(nameCity);
}

city.addEventListener('change', changeCityWeather);

// some code with LOCALsTOREGE in greetin



// quote of the Day

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote'); 

async function getQuotes() { 
    let quotes;
    if ( lang === 'be') { quotes = 'js/dataBel.json' };
    if ( lang ==='en' ) { quotes = 'js/dataEng.json' };
    const res = await fetch(quotes);
    const data = await res.json();
    let max = data.length - 1 
    const randomNum = getRandomNum(0, max)
    quote.innerHTML = data[randomNum].text;
    author.innerHTML = data[randomNum].author;
}

getQuotes();

changeQuote.addEventListener('click', getQuotes)


//  audioplyer

import playList from './playList.js';

const audio = new Audio();
let isPlay = false;
const playBtn = document.querySelector('.play-btn');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');

let playNum = 0;

// array of music for playlist
const playListContainer = document.querySelector('.play-list');

playList.forEach( elem => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = elem.title;
    playListContainer.append(li);
})


function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0; 

  if (!isPlay) {
      audio.play();
      isPlay = true;
  } else {
      audio.pause();
      isPlay = false;
  }
  showMusicDurationAndTitle()
}


function toggleBtn() {
    playBtn.classList.toggle('pause');
}

function changeTrak() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    playBtn.classList.add('pause');
    listOfTraks.forEach( (elem) => {
        elem.style.color = '#fff';
    })
    listOfTraks[playNum].style.color = '#DFD577'
    showMusicDurationAndTitle()
}

function playNextTrak() {
    progress.style.width = '0%';

    if ( playNum < playList.length - 1 ) {
        playNum += 1;
    } else {
        playNum = 0;
    }

    changeTrak()
    console.log(playNum)
}

function playPrevtTrak() {
    progress.style.width = '0%';

    if ( playNum > 0 ) {
        playNum -= 1;
    } else {
        playNum = playList.length - 1;
    }

    changeTrak()
    console.log(playNum)
}


playNextBtn.addEventListener('click', playNextTrak);
playPrevBtn.addEventListener('click', playPrevtTrak);

playBtn.addEventListener('click', playAudio);
playBtn.addEventListener('click', toggleBtn);

const listOfTraks = document.querySelectorAll('.play-item');
listOfTraks[playNum].style.color = '#DFD577'


audio.addEventListener('ended', playNextTrak);


// smart player

//click on timeline to skip around
const timeline = document.querySelector('.timeline');
const progress = document.querySelector('.progress');

timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  progress.style.width = e.offsetX + 'px';

  audio.currentTime = timeToSeek;
}, false);



setInterval(() => {
    progress.style.width = audio.currentTime / audio.duration * 100 + "%";
    
    const timePlayingTrack = document.querySelector('.current-music-time');
    timePlayingTrack.textContent = getTimeCodeFromNum(audio.currentTime);
  }, 500);


//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num, 10);
    let minutes = parseInt((seconds / 60), 10);
    seconds -= minutes * 60;
    // const hours = parseInt(minutes / 60);
    // minutes -= hours * 60;
  
    // if (hours === 0) 
    return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    // return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    //   seconds % 60
    // ).padStart(2, 0)}`;
  }


function showMusicDurationAndTitle() {
    const musicLength = document.querySelector('.music-length');
    const musicTitle = document.querySelector('.current-track');
    musicLength.textContent = `${playList[playNum].duration}`;
    musicTitle.textContent = `${playList[playNum].title}`;
}


// sound on/off
const soundIconOn = document.querySelector(".sound-on");
const soundIconOff = document.querySelector(".sound-off");


soundIconOn.addEventListener("click", () => {
    audio.muted = true;
    soundIconOn.style.display = 'none';
    soundIconOff.style.display = 'block';
  });

  soundIconOff.addEventListener("click", () => {
    audio.muted = false;
    soundIconOff.style.display = 'none';
    soundIconOn.style.display = 'block';
  });


// to change volume
const volumeSlider = document.querySelector('.volume-slider');

volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;

  const volumePercentage = document.querySelector('.volume-percentage');
  volumePercentage.style.width = newVolume * 100 + '%';
}, false)



// // to-do-list


// const toDo = document.querySelector('.to-do-list');
// const inputToDo = document.querySelector('.input-to-do');
// const btnAddToDo  = document.querySelector('.add-btn');
// const allTodoList = document.querySelector('.all-to-do');
// // const listTodo = [];

// btnAddToDo.addEventListener('click', addInTodoList);

// function addInTodoList() {
//     if ( inputToDo.value ) {
//         let itemToDo = inputToDo.value;
//         // listTodo.push(itemToDo);

//         const li = document.createElement('li');
//         li.style.marginButton = '10px'
//         li.textContent = inputToDo.value;
//         allTodoList.append(li);
//     }
    
//     inputToDo.value = '';
// }








// background from API

// let linkBG = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=FqyM82WZL5g_y7bx3VD4SsyQSPqvooYxsePgfH5BboQ'

// async function getLinkToImage() {
//     const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=FqyM82WZL5g_y7bx3VD4SsyQSPqvooYxsePgfH5BboQ';
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data.urls.regular);
//    }

// getLinkToImage()



