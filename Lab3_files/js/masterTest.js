/************************************************************************/
/*                TEST-KOD TILL STORA JSON-FILEN                        */
/* Läser in datan och printar åren i testText2-divven                   */
/* Printar sedan ut alla länderna från första året i testText3-divven   */
/************************************************************************/

/*function printYears(data){
    
    //Printar år
    var myText = '';
    for(var i = 0; i < Object.keys(data).length; ++i) {
        myText = myText + ' ' + String(data[i].YEAR);   
    }
    
    var textDiv = document.getElementById('testText2');
    textDiv.innerText = myText;
    
    //Printar länder
    var myText2 = '';
    var tempObj = data[1].properties;
    for(var j = 0; j < Object.keys(tempObj).length; ++j){
        myText2 = myText2 + ' ' + String(tempObj[j].Country);
    }
    var textDiv2 = document.getElementById('testText3');
    textDiv2.innerText = myText2;
}
*/