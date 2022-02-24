/****************************************************************/
/*                      SLIDER BAR-KODEN                        */
/****************************************************************/
/*
createSlider(){
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

    //Uppdaterar year-variabeln när man flyttar
    sliderBar.noUiSlider.on('change', function () {
        sliderYear = parseInt(sliderBar.noUiSlider.get()); //Ger en string

        //Ska kalla på ritfunktionen här?   
    });
    function getSliderYear(){
        return sliderYear;
    }

}
*/