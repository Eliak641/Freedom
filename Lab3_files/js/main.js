/*
var world_map

d3.json("./data/geoData.geojson", function (data) {
    world_map = new worldMap(data);
})
*/

var world_map
var year

//d3.csv("./data/oneYearAgg.csv", function(data) {
d3.json("./data/oneYearAgg.json", function (data) {  

    d3.json("./data/geoData.geojson", function (geo) {
        
       // world_map = new worldMap(geo, data);
      
        world_map = new worldMap(geo, data);
        
        //TESTAR geo
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
        
        //TESTAR data
        
       /* for (var i = 0; i < Object.keys(data).length; i++) {
            //console.log(data[i].Status);
            console.log(data[i].Country);
        }*/
        
    })
    
})

/*
function map(){

    d3.json("data/sweden.json", function(error, sweden) {

        var counties = topojson.feature(sweden, sweden.objects.SWE_adm2).features;
        
        d3.csv("data/socialScienceUTF8.csv", function(error, data) {
			// ❁ visar att CSVn är en js-array, ser ut som en json-fil ❁ 
            //console.dir(data) 
            draw(counties,data);
        });

    });

    function draw(counties,data) {
        ....
    }
}
*/