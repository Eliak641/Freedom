/**
 *
    VI ANVÄNDER INTE DEN HÄR KODEN!
    MEN KAN VARA BRA ATT HA OM VI SKA LÄGGA TILL YTTERLIGARE GRAFER
    LÅT VARA KOMMENTERAD TILLS VIDARE SÅ VI VET ATT DEN INTE ANVÄNDS. 
 *
*/
//var canvas = d3.select("#color-info")
//				.append("svg")
//				.attr("width", 500)
//				.attr("height", 500);
//var circle = canvas.append("circle")
//				.attr("cx", 200)
//				.attr("cy", 200)
//				.attr("r", 50)
//				.attr("fill", "red")

//We first have to create a dataset for the circules with some information
//var circleData = [
//    { "cx": 30, "cy": 30, "radius": 12, "color": "#000000", "text": "No Data available" },
//    { "cx": 30, "cy": 60, "radius": 12, "color": "#fef0d9", "text": "1-2 Deaths" },
//    { "cx": 30, "cy": 90, "radius": 12, "color": "#fdcc8a", "text": "3-11 Deaths" },
//    { "cx": 30, "cy": 120, "radius": 12, "color": "#fc8d59", "text": "12-100 Deaths" }
//];

//https://www.d3-graph-gallery.com/graph/shape.html#myrect
var circleData = [
    { "x": 30, "y": 20, "width": 20, "height": 20, "color": "#000000", "text": "No Data available" },
    { "x": 30, "y": 50, "width": 20, "height": 20, "color": "#fef0d9", "text": "Not free" },
    { "x": 30, "y": 80, "width": 20, "height": 20, "color": "#fdcc8a", "text": "Partially free" },
    { "x": 30, "y": 110, "width": 20, "height": 20, "color": "#fc8d59", "text": "Free" }
];


//Then get width and height of the parent
//hämtar storleken på color information-rutan tror jag
var width =  $("#color-info").parent().width();
var height = $("#color-info").parent().height() ;
console.log(width + " = bredden på rutan");
console.log(height + " = höjden på rutan");

//var height = $("#color-info").parent().height() +140 ;
//Then we create the SVG Viewport
//containern har samma storlek som html-boxen för id color_info
var svgContainer = d3.select("#color-info")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


//After we add circles to the svgContainer
//skapar circle för varje array i circledata, dvs fyra st circle 
//detta skapar en array som heter circles
//selectAll returnerar en array
var circles = svgContainer.selectAll("rect")
    .data(circleData)
    .enter()
    .append("rect");
//console.log(circle);


//And some circle attributes
//d representerar ett index i arrayen circles
//hämtar datan och lägger på varje circle i circles mha attr
//var circleAttributes = circles
//    .attr("cx", function (d) { return d.cx; }) //lägger data på varje circle gällande cx
//    .attr("cy", function (d) { return d.cy; })//lägger data på varje circle gällande cy
//    .attr("r", function (d) { return d.radius; })
//    .style("fill", function (d) { return d.color; });

var circleAttributes = circles
    .attr("x", function (d) { return d.x; }) //lägger data på varje circle gällande cx
    .attr("y", function (d) { return d.y; })//lägger data på varje circle gällande cy
    .attr("width", function (d) { return d.width; })
	.attr("height", function (d) { return d.height; })
    .style("fill", function (d) { return d.color; });


//Also adding some text to the svgContainer
var text = svgContainer.selectAll("text")
    .data(circleData)
    .enter()
    .append("text");

//
//And lastly adding the SVG Text Element Attributes
//var textLabels = text
//    .attr("x", function (d) { return d.cx + 30; })
//    .attr("y", function (d) { return d.cy + 3; })
//    .text(function (d) { return d.text; })
//    .attr("font-family", "sans-serif")
//    .attr("font-size", "14px")
//    .attr("fill", "black");

var textLabels = text
    .attr("x", function (d) { return d.x + 40 })
    .attr("y", function (d) { return d.y + 14 })
    .text(function (d) { return d.text; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("fill", "black");
/*
*/