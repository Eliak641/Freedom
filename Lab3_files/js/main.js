/*
    Allt den här filen gör är att: 
        - läsa in data-filerna
        - Använder dem i funktionerna från i map.js för att skapa ett kart-objekt
        - har tester för att kontrollera att datan läses in korrekt
*/

//Skapar en tom variabel world_map
var world_map;

d3.json("./data/oneYearAgg.json", function (data) {  
    d3.json("./data/geoData.geojson", function (geo) {
        d3.json("./data/masterData.json", function (master){

            //createSlider();
            world_map = new worldMap(geo, master); //worldMap är huvudfunktionen i map.js
           
        })
    })

})

