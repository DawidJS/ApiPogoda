let weather = {
    
    city: '',
    
    showWeatherForCity: function(){
        weather.getCityName();
        if ( weather.city == '' ){
            return false;
        }
        weather.callToApiByCityName();
    },
    
    getCityName: function(){
        let city = $('#cityName').val();
        if ( city.length < 2 ) {
            return alert('Minimalna długość miasta musi mieć dwie litery!');
        }
        weather.setCity(city);
    },
    
    setCity: function(city){
        this.city = city;
    },
    
    callToApiByCityName: function(){
        let url = `https://api.openweathermap.org/data/2.5/weather?appid=07cd0cf047f835412b1000d6d4c02337&q=${this.city}&units=metric&lang=pl`;
        $.ajax({
            url: url,
            method: 'GET',
        })
        .done(function(response){
            console.log(response);

            
            $('#city').text(response.name);
            
            let properties = ['lat', 'lon'];
            let labels = ['Szerokość geograficzna', 'Długość geograficzna'];
            let units = ['°', '°'];
            
            $('#place_info').html('');
            for(let i = 0; i < properties.length; i++){
               $('#place_info').append(`<li>${labels[i]}: ${response.coord[properties[i]]} ${units[i]}</li>`);
            }
            
            properties = ['humidity','pressure','temp','temp_max','temp_min'];
            labels = ['Wilgotność', 'Ciśnienie', 'Temperatura', 'Temperatura maksymalna', 'Temperatura minimanlna'];
            units = ['%', 'hPa','°C','°C','°C'];
            
            $('#weather_info').html('');
            for(let i = 0; i < properties.length; i++){
               $('#weather_info').append(`<li>${labels[i]}: ${response.main[properties[i]]} ${units[i]}</li>`);
            }
            
            properties = ['deg', 'speed'];
            labels = ['Kierunek', 'Prędkość'];
            units = ['°', 'km/h'];
            
            $('#wind').html('');
            for(let i = 0; i < properties.length; i++){
               $('#wind').append(`<li>${labels[i]}: ${response.wind[properties[i]]} ${units[i]}</li>`);
            }
            
            let icon = response.weather[0].icon;
            icon = `http://openweathermap.org/img/w/${icon}.png`;
            
            $('#description').html('');
            $('#description').append(`<li>${response.weather[0].description} <img src="${icon}" /></li>`)
                        
            $('#bottom_content').css('display','block');
            $([document.documentElement, document.body]).animate({
                scrollTop: $('#bottom_content').offset().top
            }, 1500);
            
            
        })
        .fail(function(){
            weather.showFailAlert('Nie odnaleziono miasta o podanej nazwie!');
        })
    },
    
    showFailAlert: function(text){
        $('#errors').text(text).css('display', 'block');
        $('#cityName').attr('disabled', true);
        
        
        setTimeout(function(){
            $('#errors').css('display', 'none');
            $('#cityName').attr('disabled', false);
        }, 3000);
    },
    
    scrollToTop: function(){
        $('#cityName').val('');
        $('html, body').animate({
            scrollTop: 0
        }, 1500, function(){
            $('#bottom_content').hide();
        });
    },
    
}

$(function(){
    $('#searchCity').click(weather.showWeatherForCity);
    $('#scroll_top').click(weather.scrollToTop);
});

