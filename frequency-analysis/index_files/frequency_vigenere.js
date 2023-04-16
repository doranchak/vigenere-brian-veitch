var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");


var cipherTemp;
function removeSpecialCharacters () {

	cipherTemp = document.getElementById('ciphertext').value.toUpperCase();

	ciphertextTemp = document.getElementById('ciphertext').value.toUpperCase();
	
	var ciphertext = '';
	

	for(var i = 0; i<ciphertextTemp.length; i++){

		if(ciphertextTemp.charCodeAt(i) < 65 || ciphertextTemp.charCodeAt(i) > 90  ) {
			//ciphertextTemp.charAt((num-1)+i*size).charCodeAt((num-1)+i*size)  == ' '){
			specialCharacters[i] = ciphertextTemp.charAt(i);
			

		}
		else {
			ciphertext += ciphertextTemp.charAt(i);
		}
	}

	document.getElementById('ciphertextNoSpecialChars').innerHTML = ciphertext;

	console.log(ciphertext);

	calculuate_frequency(ciphertext);
		
}
	



function calculuate_frequency(ciphertext) {



	var biGraphArray = new Array();
	var triGraphArray = new Array();
	var fourLetterArray = new Array();
	var skipNext;
	var count=0;

	//console.log(ciphertext);

	

	for(var i = 0; i<ciphertext.length-3; i++){
		
		var triGraph = ciphertext.substring(i, i+3);
		if(ciphertext.charAt(i+1) == ' '){
			triGraph = triGraph.replace(' ', ciphertext.charAt(i+3))
			skipNext = true;
		}
		//console.log(biGraph);
		
		

		
		for(var j = i+3; j<ciphertext.length;j++){
			
			if(triGraph == ciphertext.substring(j,j+3)){

				triGraphArray[count] = [triGraph, j-i];
				count++;
			}
		}

		if(skipNext == true){
			i++;
			skipNext = false;
		}	
	}
	//console.log(triGraphArray);


createTable(triGraphArray);

}

function createTable(array) {

	var table = "<h2 style='text-align:center;'>Possible Keysize</h2>";
	table += "<table>";
	table += "<tr>";
	table += "<th>Repeated Sequence</th><th>Spacing</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>";
	table += "<th>11</th><th>12</th><th>13</th></th><th>14</th><th>15</th><th>16</th></th><th>17</th><th>18</th><th>19</th><th>20</th>";
	table += "</tr>";


	// start row
	for(var i = 0; i<array.length; i++){
		table += "<tr><td>"+array[i][0]+"</td><td>"+array[i][1]+"</td>";

		// find factors

		var factorArray = getFactors(array[i][1]);
		var factorFound = false;

		for(var k = 2; k<21; k++){


			for(var j = 0; j<factorArray.length; j++){
				if(factorArray[j] == k){
					table += "<td>x</td>";
					factorFound = true;
				}
					
			}
			if(factorFound == false){
				table += "<td></td>";
			}
			

		factorFound = false;
		}

		table += "</tr>";
	}

	table += "<tr>";
	table += "<th>Repeated Sequence</th><th>Spacing</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>";
	table += "<th>11</th><th>12</th><th>13</th></th><th>14</th><th>15</th><th>16</th></th><th>17</th><th>18</th><th>19</th><th>20</th>";
	table += "</tr>";

	table += "</table>";

	document.getElementById('table').innerHTML = table;

	var explanation = "<p id='explanation'>Choose a keysize.  It's most likely the column that has the most possible keysize marks.</p>";

	for(var k = 2; k<21; k++){
		explanation += "<button class='chooseKeySize' onclick='chooseKeySize("+k+");'>"+k+"</button>";
	}

	document.getElementById('tableExplanation').innerHTML = explanation;



}

function getFactors(number){
	var factors = new Array();
	var quotient = 0;

	for(var i = 1; i <= number; i++){

		quotient = number/i;

		if(quotient === Math.floor(quotient)){
			factors.push(i);
		}
	}
	return factors;
}

function chooseKeySize(size) {

	var explanation = "<p>You believe the keysize is "+size+".  Since we don't know what each letter of the keyword is, we'll call it ";

	for(var i = 1; i<=size; i++){
		if(i != size){
			explanation += "L"+i+" - ";
		}
		else {
			explanation += "L"+i+".</p>";
		}
	}

	explanation += "<p>The first table below shows the normal English letter frequency. Click a letter to see the letter frequency of the ciphertext.  For example, click L1 and you'll see the letter frequency for letters 1";
	for(var i = 1; i<5; i++){
		explanation += ", "+(1+size*i);
	}
	explanation += ", ... Try to align the ciphertext frequency to match the normal English frequency</p><br/><div align='center'>";

	for(var i = 1; i<=size; i++){
		explanation += "<button class='chooseLetter' id='keyLetter_"+i+"' onclick='chooseLetter("+i+","+size+");'>L"+i+"</button>";
	}
	explanation += "</div>";

	document.getElementById('keysizeExplanation').innerHTML = explanation;


	showEnglishFrequency();
	window.scrollTo(0,document.body.scrollHeight);
}


function chooseLetter(num,size){

	var pressedCalculate = 0;
	insertFrequency(num,size);
	window.scrollTo(0,document.body.scrollHeight);

	
}


function showEnglishFrequency() {

	document.getElementById('regularEnglish').style.display = "block";

	plainLetters = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

	regularFrequency = new Array(8.2, 1.5, 2.8, 4.3, 12.7, 2.2, 2.0, 6.1, 7.0, 0.2, 0.8,
		4.0, 2.4, 6.7, 7.5, 1.9, 0.1, 6.0, 6.3, 9.1, 2.8, 1.0, 2.4, 0.2, 2.0, 0.1);

	scale = barHeight/13;

	for(var i = 0; i<26; i++){

		
		var bar = document.getElementById("graph_"+i);
		var a = document.getElementById("alpha_"+i);
		
     	bar.innerHTML = "<div id='bar_"+i+"' class ='bar' style='width: 30px; height: "+regularFrequency[i]*scale+"px'></div>"+regularFrequency[i]+"%";
        
		a.innerHTML = plainLetters[i];
	

	}

}

function insertFrequency(num,size){

	letter = num;
	shifts = 0;
	var letters = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

	var freq = new Array();

	var ciphertext = ''; 
	var ciphertextTemp;
	var validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var character;
	

	ciphertextTemp = document.getElementById('ciphertextNoSpecialChars').value;
	
	for(var i = 0; i<ciphertextTemp.length; i++){
		
		ciphertext += ciphertextTemp.charAt((num-1)+i*size);
	}

	
	console.log(ciphertext);

	freq['A'] = 0;
    freq['B'] = 0;
    freq['C'] = 0;
    freq['D'] = 0;
    freq['E'] = 0;
    freq['F'] = 0;
    freq['G'] = 0;
    freq['H'] = 0;
    freq['I'] = 0;
    freq['J'] = 0;
    freq['K'] = 0;
    freq['L'] = 0;
    freq['M'] = 0;
    freq['N'] = 0;
    freq['O'] = 0;
    freq['P'] = 0;
    freq['Q'] = 0;
    freq['R'] = 0;
    freq['S'] = 0;
    freq['T'] = 0;
    freq['U'] = 0;
    freq['V'] = 0;
    freq['W'] = 0;
    freq['X'] = 0;
    freq['Y'] = 0;
    freq['Z'] = 0;	

    var cipherFrequency = new Array();
    var cipherCount =  new Array();

    for(var i = 0; i<26; i++){
    	cipherCount[i] = 0;
    }

    // calculate the frequency 
    var location;
    var textCount = 0;
    for(var i = 0; i < ciphertext.length; i++){

    	character = ciphertext.charAt(i).toUpperCase();

    	// is it a valid 
    	if(validChars.indexOf(character) != -1){

    		location = character.charCodeAt()-65;
    		freq[character]++;
            cipherCount[location]++;
            textCount++;

    	}
    }

    arr = new Array();
    for(var i = 0; i < 26; i++){
        arr[i] = [String.fromCharCode(i+65), cipherCount[i], Math.round(cipherCount[i]/textCount*100 * 10)/10];
    }

 
    // convert cipherAlphabet to percentages
    

    for(var i = 0; i<26; i++){
    	cipherFrequency[i] = Math.round(cipherCount[i]/textCount*100 * 10)/10;

    	if(cipherFrequency[i] > scale){scale=cipherFrequency[i];}
    }
    scale = barHeight/scale;
    
    document.getElementById('cipherLanguage').style.display = "block";
    document.getElementById('shift').style.display = "block";
   
	for(var i = 0; i<26; i++){

		
		var bar = document.getElementById("freqGraph_"+i);
		var a = document.getElementById("freqAlpha_"+i);
		
        
		     // bar.innerHTML = cipherCount[i]+"<div id='bar_"+i+"' class ='bar' style='width: 30px; height: "+cipherFrequency[i]*scale+"px'></div>"+cipherFrequency[i]+"%";
             bar.innerHTML = arr[i][1]+"<div id='bar_"+i+"' class ='bar' style='width: 30px; height: "+arr[i][2]*scale+"px'></div>"+arr[i][2]+"%";
       
		a.innerHTML = arr[i][0];
	}

}
var arr = new Array();
var shifts = 0;
var letter = 0;
var scale=0;
var barHeight = 80;
var specialCharacters = new Array();
function shift(shift){

	if(shifts == 26){
		shifts = 0;
	}

	shifts = shifts - shift;


	//var oldArray = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
  	var oldArray = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25);
 	//var myArray =  new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
 	var myArray =  new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25);
 	
 	var arrayLength = myArray.length;
 	var bar;
 	var a;

 	for(j = 0; j<arrayLength; j++){

 	
 		var move = j+shifts;
 		if(shifts == 0){move = j;}

 		if(move < 0){
 			move = (26+move);
 		}
 		else if(move > 25) {
 			move = move-26;
 		}

 		
 		myArray[j] = oldArray[move];

 		bar = document.getElementById("freqGraph_"+j);
 		a 	= document.getElementById("freqAlpha_"+j);

 		bar.innerHTML = arr[move][1]+"<div id='bar_"+j+"' class ='bar' style='width: 30px; height: "+arr[move][2]*scale+"px'></div>"+arr[move][2]+"%";
       	a.innerHTML = arr[move][0];
 	
 	}

 	if(shifts == 0){ move = -1;}
 	document.getElementById('keyLetter_'+letter).innerHTML = arr[move+1][0];



}


}
/*
     FILE ARCHIVED ON 18:36:33 Feb 10, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:27:04 Apr 16, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 169.882
  exclusion.robots: 0.088
  exclusion.robots.policy: 0.079
  cdx.remote: 0.057
  esindex: 0.009
  LoadShardBlock: 44.691 (3)
  PetaboxLoader3.datanode: 89.689 (4)
  load_resource: 116.972
  PetaboxLoader3.resolve: 67.112
*/