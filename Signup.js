window.onload = function Val( ) {

}


var CITY = [
    'Adilabad',
    'Anantapur',
    'Chittoor',
    'Kakinada',
    'Guntur',
    'Hyderabad',
    'Karimnagar',
    'Khammam',
    'Krishna',
    'Kurnool',
    'Mahbubnagar',
    'Medak',
    'Nalgonda',
    'Nizamabad',
    'Ongole',
    'Hyderabad',
    'Srikakulam',
    'Nellore',
    'Visakhapatnam',
    'Vizianagaram',
    'Warangal',
    'Eluru',
    'Kadapa'

] ;  // idi kude type=module ani Script lo teeseste ne work avtundi..


let Datalist = document.getElementById('place') ;

for(i in CITY) {

    var Option = document.createElement('option') ;
    Option.value = CITY[i] ;
    Option.text = CITY[i] ;
    Datalist.appendChild(Option) ;
}

function getWeatherData() {

    let CityName = document.getElementById('inPUT').value ;
    let Api_endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&units=metric&APPID=b13d1082f695a0431813214e3b807a66&lang=en` ;
                    //  my api :  api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=b13d1082f695a0431813214e3b807a66
    fetch(Api_endPoint).then((res)=>{

        return res.json();

    }).then((data)=>{

        UploadWeatherData(data) ;
    })
}

function UploadWeatherData(data) {

    
    let location = document.getElementById('Location') ;
    location.innerText = `Weather in ${data.name}` ;

    document.getElementById('temp').innerText = data.main.temp ;
    document.getElementById('humid').innerText = ` Humidity : ${data.main.humidity}%` ;
    document.getElementById('windSpeed').innerText = data.wind.speed ;

    document.getElementById('sunrise').innerText = formatAMPM( new Date( data.sys.sunrise*1000 )) ;
    document.getElementById('sunset').innerText = formatAMPM( new Date( data.sys.sunset * 1000)) ;

    getWeeklyData(data.coord.lat , data.coord.lon) ;
}



function getWeeklyData(lat,lon) {

    let Api_endPoint_2 = ` https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=20a36f8e1152244bbbd9ac296d3640f2 ` ;

    fetch(Api_endPoint_2).then((res)=>{

        return res.json() ;
    }).then((data)=>{

        uploadWeeklyData(data) ;
    })

}

function uploadWeeklyData(data) {

    let MainForWeek = document.getElementById('MainWeek') ;

    MainForWeek.innerHTML = " " ;
   

    data.daily.forEach(( element , index ) =>{

    
        
        dayCard(element,index) ;
        
    })
}

function dayCard(data,i) {

   
    let Array = [ 'Tommorow' , '2nd Day' , '3rd Day' , '4th Day' , '5th Day' , '6th Day' , '7th Day' , '8th Day'] ;
    let MainForWeek = document.getElementById('MainWeek') ;
    
    let WeekData = document.createElement('div') ;
    WeekData.classList = "WeekData" ;

    let Day = document.createElement('div') ;
    Day.innerText = Array[i] ;
    

    let ForImg = document.createElement('div') ;
    
    let Imgtag = document.createElement('img') ;
    Imgtag.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` ;
    

    let MrngTemp = document.createElement('div') ;
    MrngTemp.innerHTML = `Day : ${data.temp.day}&#8451; ` ;

    let NightTemp = document.createElement('div') ;
    NightTemp.innerHTML = `Night : ${data.temp.night}&#8451;` ;

    ForImg.appendChild(Imgtag) ;

    WeekData.appendChild(Day) ;
    WeekData.appendChild(ForImg) ;
    WeekData.appendChild(MrngTemp) ;
    WeekData.appendChild(NightTemp) ;

    MainForWeek.appendChild(WeekData) ;


}


// function getDayOfWeek(date) {
//     const dayOfWeek = new Date(date).getDay();    
//     return isNaN(dayOfWeek) ? null : 
//       ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
//   }






function formatAMPM(date) {

    return date.toLocaleString("en-US",{
        hour : "numeric" ,
        minute : "numeric" 
    }) ;
}








