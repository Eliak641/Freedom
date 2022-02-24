/*
    TODO:
        - Plocka first/last-värden från datasetet
        - Få färgen att upppdateras med baren
        - Visa en liten label vid hover
        - Fler grafer vid sidan av
        - Highlighta vilken punk i andra grafen man är på
        - Visa totala stats för året
*/
/****************************************************************/
/*                      SLIDER BAR-KODEN                        */
/****************************************************************/
//sliderBar = HTML-divven
var sliderBar = document.getElementById('sliderBarContainer');

//skapar ett slider-objekt i divven
noUiSlider.create(sliderBar, {
    start: [1],         //Börjar till vänster när man öppnar sidan
    connect: true,
    range: {
        'min': 2013,    //Vill egentligen plocka dessa värden från datasetet (ej prio tho)
        'max': 2021
    },
    step: 1
});

//Så ritfunktionen kommer åt startvärdet innan vi ändrar bar:en
var sliderYear = parseInt(sliderBar.noUiSlider.get()); 


/****************************************************************/
/*                           MAP-KODEN                          */
/****************************************************************/
//Skickar in geo (geoJSON-filen) och data (JSON-filen med all freedom-data)
function worldMap(geo, master) {
    
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

    function getColor(country, master, sliderYear) {
        for(var i = 0; i < Object.keys(master).length; ++i) {
            if(master[i].YEAR == sliderYear){
                var tempObj = master[i].properties; 

                for(var k = 0; k < Object.keys(tempObj).length; ++k) {
                    if(tempObj[k].Country == country && tempObj[k].Status == 'PF' ){
                        return tempObj[k].Country == country ? '#ffcc99': '#ff9633';
                    }
                    else if(tempObj[k].Country == country && tempObj[k].Status == 'NF' ){
                        return tempObj[k].Country == country ? '#ff4d88': '#ff9633';
                    }
                    else if(tempObj[k].Country == country && tempObj[k].Status == 'F' ){
                        return tempObj[k].Country == country ? '#b3ffb3': '#ff9633';
                    }
                }
            }
        }
    }
    //feature.properties.ADMIN
    //Körs funktionerna när de skapas?? Vad gör argumenten isf??
     function style(feature) {
        return {
            fillColor: getColor(feature.properties.ADMIN, master, sliderYear),
            weight: 2,
            opacity: 0.5,
            color: 'black',
            dashArray: '1',
            fillOpacity: 1
        };
     }
    
    // Using leaflets geoJson API to create polygons from geoJSON file
    var mapData = L.geoJson(geo, {
         style: style,
         onEachFeature: onEachFeature});
    
    map.addLayer(mapData);

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
            mouseout: resetHighlight
        });
    }  
    
    
    
    //DET ÄR DEN HÄR FUNKTIONEN SOM INTE RIKTIGT FUNKAR ÄN!!
    //Uppdaterar year-variabeln när man flyttar
    sliderBar.noUiSlider.on('change', function () {
        sliderYear = parseInt(sliderBar.noUiSlider.get()); //Ger en string

        //LÄGG IN UPPDATERINGSKOD HÄR (FUNKAR EJ ÄN)
        
        map.eachLayer(function(layer){
           if(layer instanceof mapData)
               mapData.resetStyle(layer);
        });
        
    });
    
}

