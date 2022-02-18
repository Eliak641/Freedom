
function worldMap(geo, data) {
/* global noUiSlider*/
// Creating map options
     var mapOptions = {
        center: [25, 5],
        zoom: 2
     }

     // Creating a map object
     //L is a leaflet libarie
     
     var map = new L.map('map', mapOptions);

     // Creating a Layer object
    var layer = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> Contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18
     });

     // Adding layer to map
     map.addLayer(layer);
    

   // Get color for string country name
    /* function getColor(country) {
         
          return country == 'Sweden' ? '#ff339c' : 'black';
      }*/
      function getColor(country, data) {
         for(var i = 0; i < Object.keys(data).length; ++i) {
            if(data[i].Country == country && data[i].Status == 'PF' ){
                 return data[i].Country == country ? 'green': '#ff9633';
            }
             else if(data[i].Country == country && data[i].Status == 'NF' ){
                 return data[i].Country == country ? 'purple': '#ff9633';
             }
             else if(data[i].Country == country && data[i].Status == 'F' )
                 return data[i].Country == country ? 'yellow': '#ff9633';
         }
          
      }

    //feature.properties.ADMIN,
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
    
    
    //gets called when you hover
    function highlightFeature(e) {
    var layer = e.target;
        layer.setStyle({
            fillColor: 'grey',
            weight: 1,
            color: 'black',
            dashArray: '',
            fillOpacity: 0.5
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }
    
    //when not hovering, dont who highlight
    function resetHighlight(e) {
        mapData.resetStyle(e.target);
    }
    
    
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    }   
    
    // Creating a World countries Layer 
     //leaflets geoJson API
    //skickar in geo-data till geoJson API
    var mapData = L.geoJson(geo, {
         style: style,
         onEachFeature: onEachFeature});
    

     // Adding layer to map
     map.addLayer(mapData);
    
    function getJsonYear(year){
        console.log(year);
        console.log("inne i getJsonYear");
    };
  
    var sliderBar = document.getElementById('sliderBar');
    noUiSlider.create(sliderBar, {
    start: [1],
    connect: true,
    range: {
        'min': 2013,
        'max': 2021
    },
        step: 1
});
    
    
sliderBar.noUiSlider.on('change', function () {
    getJsonYear(sliderBar.noUiSlider.get());
    // skicka siffran till en funktion som hämtar ut data från json i det året? dvs går igenom hela json filen och kollar varje feature
    console.log(sliderBar.noUiSlider.get());
});
    
}

/*
function worldMap(data) {

var map = new L.Map("mapid", {center: [10, 5], zoom: 2})
    .addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");

  var transform = d3.geo.transform({point: projectPoint}),
      path = d3.geo.path().projection(transform);

  var feature = g.selectAll("path")
      .data(collection.features)
    .enter().append("path");

  map.on("viewreset", reset);
  reset();

  // Reposition the SVG to cover the features.
  function reset() {
    var bounds = path.bounds(collection),
        topLeft = bounds[0],
        bottomRight = bounds[1];

    svg .attr("width", bottomRight[0] - topLeft[0])
        .attr("height", bottomRight[1] - topLeft[1])
        .style("left", topLeft[0] + "px")
        .style("top", topLeft[1] + "px");

    g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

    feature.attr("d", path);
  }

  // Use Leaflet to implement a D3 geometric transformation.
  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }


}
*/