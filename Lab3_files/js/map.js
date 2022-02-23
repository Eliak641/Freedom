
//Skickar in geo (geoJSON-filen) och data (JSON-filen med all freedom-data)
function worldMap(geo, data) {

    
    /****************************************************************/
    /*                      SLIDER BAR-KODEN                        */
    /* Behöver vara först pga att den används i kommande funktioner */
    /****************************************************************/
    
    //sliderBar är HTML-divven
    var sliderBar = document.getElementById('sliderBarContainer');
    
    //skapar ett slider-objekt i divven
    noUiSlider.create(sliderBar, {
        start: [1],         //Börjar till vänster när man öppnar sidan
        connect: true,
        range: {
            'min': 2013,    //Vill egentligen plocka dessa värden från datasetet
            'max': 2021
        },
        step: 1
    });
    
    var sliderYear; //Ska användas längre ner för att jämföra med datasetet
    
    sliderBar.noUiSlider.on('change', function () {
        sliderYear = parseInt(sliderBar.noUiSlider.get());
        //Byter text i högerfältet för att se att slidern funkar
        document.getElementById('testText').innerText = sliderYear;
    });

    /****************************************************************/
    /*                           MAP-KODEN                          */
    /****************************************************************/
    
    // Creating map options
    var mapOptions = {
        center: [25, 5],
        zoom: 2
    }

    // Creating a map object. Empty at first
    //L is a leaflet libary, 'mapContainer' är ID:t på HTML-divven som kartan ska ligga i.
    var map = new L.map('mapContainer', mapOptions);

    // Creating a Layer object
    // Lägger till all info som är på kartan från någon öppen karthemsida. Namn på länder osv 
    var layer = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> Contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        
        //Hur mycket man ska kunna zooma. Stod på 18, sänkte till 11
        maxZoom: 11
    });

    // Adding layer to the previous empty map
     map.addLayer(layer);
    
    // Creating a World countries Layer with polygons from the geoJson file 
    // Using leaflets geoJson API
    var mapData = L.geoJson(geo, {
         style: style,
         onEachFeature: onEachFeature});
    

    // Adding polygon layer to map.
    //Doesn't need to be up here (bc js...). But it makes for clearer code
     map.addLayer(mapData);
    
    /* Funktion för att sätta färgerna. Kallas på i funktionen nedanför.
     * country = ADMIN från geoJSON
     * data (array) = datasetet från excelfilen
     * Båda dessa kommer från argumenten i map-funktionen
     */
      function getColor(country, data) {
         for(var i = 0; i < Object.keys(data).length; ++i) {
            if(data[i].Country == country && data[i].Status == 'PF' ){
                 return data[i].Country == country ? '#ffcc99': '#ff9633';
            }
             else if(data[i].Country == country && data[i].Status == 'NF' ){
                 return data[i].Country == country ? '#ff4d88': '#ff9633';
             }
             else if(data[i].Country == country && data[i].Status == 'F' )
                 return data[i].Country == country ? '#b3ffb3': '#ff9633';
         }
          
      }

    //feature.properties.ADMIN
    //Var används style och vad skickar man in?? Första gången feature och style nämns i koden
    
    //Körs funktionerna när de skapas?? Vad gör argumenten isf??
     function style(feature) {
        return {
           fillColor: getColor(feature.properties.ADMIN, data),
           weight: 2,
           opacity: 0.5,
           color: 'black',
           dashArray: '1',
           fillOpacity: 0.7
        };
     }
    
    
    //gets called when you hover. (Built in function?)
    function highlightFeature(e) {
    var layer = e.target;
        layer.setStyle({
            fillColor: 'grey',
            weight: 1,
            color: 'white',
            dashArray: '',
            fillOpacity: 0.5
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }
    
    //when not hovering, remove previous highlight
    function resetHighlight(e) {
        mapData.resetStyle(e.target);
    }
    
    //Verkar använda bådehighlightFeature och resetHighlight, men har inga argument
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    }   
    
    
    //Testar om man får ut året från JSON-filen
    /*
    function getJsonYear(year){
        console.log(year);
        console.log("inne i getJsonYear");
    };*/
}

