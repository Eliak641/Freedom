/*
    Allt den här filen gör är att: 
        - läsa in data-filerna
        - Använder dem i funktionerna från i map.js för att skapa ett kart-objekt
        - har tester för att kontrollera att datan läses in korrekt
*/

//Skapar en tom variabel world_map
var world_map;

d3.json("./data/oneYearAgg.json", function (data) {  
    d3.json("./data/geoData.geojson", function (geo) 
    {
        world_map = new worldMap(geo, data); //worldMap är huvudfunktionen i map.js
        /********************************/
        /*OLIKA TESTER FÖR geo-VARIABELN*/
        /********************************/
        
        //console.log(geo.features) 
        //console.log(geo.features[0])
        //console.log(geo.features[0].properties.ADMIN) //Rätt!
        //console.log(geo.features[1].properties.ADMIN) //Rätt!
        
        console.log(Object.keys(data).length)
        
        //Funkar ej att skriva ut alla listans ADMINs?
        /*
        for (var i = 0; i < geo.length; i++) {
            console.log(geo.features[i].properties.ADMIN);
        }
        */
        /*******************/
        /* TEST FÖR "data" */
        /*******************/
       
        /* for (var i = 0; i < Object.keys(data).length; i++) {
            //console.log(data[i].Status);
            console.log(data[i].Country);
        }*/  
    })
})

