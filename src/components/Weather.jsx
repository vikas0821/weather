import React, { useEffect, useState } from 'react';

function Weather() {
    const [city, setCity] = useState('');
    const [cityname, setCityName] = useState('');
    const [weather, setWeather] = useState(null);
    const [placeid, setPlaceid]=useState(' ');
    const [error, setError]=useState(' ');
    const [newCity,setNewCity]=useState('');
    const handleCityChange = (event) => {
        setNewCity(event.target.value)
    };
  
    useEffect(()=>{
      const url1 = `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${city}&language=en`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '279986fc90mshe29106560b68522p10f442jsnda2642b34b94',
          'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
      };
      fetch(url1, options)
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data)
        if(data.length===0){
            setError("data is not present!!!")
        }
        data.map((data)=>{
          if(data.place_id===city){
            setPlaceid(data.place_id)
             setCityName(data.name)
          }else{
                setError("please enter correct city...")
          }
          return data.place_id;
        })
      })
    },[city])
  
    const handleGetWeather = (e) => {
            e.preventDefault();
            setCity(newCity);
      const url = `https://ai-weather-by-meteosource.p.rapidapi.com/current?place_id=${placeid}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '279986fc90mshe29106560b68522p10f442jsnda2642b34b94',
          'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
      };
      fetch(url, options)
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data)
        setWeather(data.current)
        setError('')
      })
  
    };
  
    return (
      <div className="App">
        <nav> <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-cloud Wcloud" viewBox="0 0 16 16">
        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
        </svg>
          <h1 className="logo">Weather</h1>
        </nav>
        <main>
          <div className="container">
            <div className="input-container">
              <div className="img_left">
                <img src="https://plus.unsplash.com/premium_photo-1677593850639-9f1e14e4524b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt=""  width="250px"/>
              </div>
              <input
                type="text"
                placeholder="Enter city name"
                value={newCity}
                onChange={handleCityChange}
              />
              <button onClick={handleGetWeather}>Get Weather Details</button>
            </div>

            <div className="weather-details">
              
              {weather && (
                <div className="w-data">
                  <div>
                    <i className={`bi bi-1-${weather.icon}`}></i>
                  </div>
                <h1> Weather details by city name </h1>
                  <h2>{cityname }</h2>
                  <h4>Temperature: {weather.temperature}</h4>
                  <h4>Humidity: {weather.humidity}</h4>
                  <h4>Description: {weather.summary}</h4>
                </div>
              )}
              {error!==''&&<>
                <div className='w-data'>
                    <h1>{error}</h1>
                </div>
              </>}
            </div>
          </div>
        </main>
        <footer>@Copyright weather app 2023</footer>
      </div>
    );
}

export default Weather
