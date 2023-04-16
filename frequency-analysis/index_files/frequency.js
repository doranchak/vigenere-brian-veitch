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

var swapped = new Array();
var size = 0;


function swap() {
	var e = document.getElementById("ciphertextLetter");
	var ciphertextLetter = e.options[e.selectedIndex].value;

	var e = document.getElementById("plaintextLetter");
	var plaintextLetter = e.options[e.selectedIndex].value;

	var ciphertext = document.getElementById('ciphertext').value;
	var plaintext = document.getElementById('plaintext').value;



	var a,b;
	if(swapOccur(ciphertextLetter, plaintextLetter) == true){
		a = plaintextLetter;
		b = ciphertextLetter;	
	//	console.log(a,b);
	}
	else if( canSwap(ciphertextLetter, plaintextLetter) != true ){
		return false;
	}
	else {
		a = ciphertextLetter;
		b = plaintextLetter;
		swapped[size] = [ciphertextLetter, plaintextLetter];
		size++;
		
	}
	
	

	

	var text = plaintext.replace(new RegExp(a,'g'), b);

	document.getElementById('plaintext').innerHTML = text;

	var swapField = '';
	for(var i = 0; i<size; i++){
		swapField += swapped[i][0]+" - " + swapped[i][1] +"\n";
	}

	document.getElementById('swapField').innerHTML = swapField;
}


function canSwap(ciphertextLetter, plaintextLetter){

	for(var i = 0; i < size; i++){
		if( swapped[i][0] == ciphertextLetter || swapped[i][1] == plaintextLetter){
			// user already swapped this cipherletter
			
			return false;
		}
	}
	return true;
}

function swapOccur(ciphertextLetter, plaintextLetter){

	for(var i = 0; i < size; i++){
		if( swapped[i][0] == ciphertextLetter && swapped[i][1] == plaintextLetter){
			
			//unswap

			swapped.splice(i,1);
			size--;
			return true;
		}
	}
	
	return false;

}

function placePlaintext() {
	ciphertext = document.getElementById('ciphertext').value;
	
	document.getElementById('plaintext').innerHTML = ciphertext.toUpperCase();
}

var pressedCalculate = 0;
function insertBars(n){

    if(n == 1){
        pressedCalculate = 1;
    }

	plainLetters = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

	orderedPlainLetters = new Array('E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R', 'D', 'L', 'U', 'C', 'M', 'W', 'F', 'Y', 'G', 'P', 'B', 'V', 'K', 'X', 'J', 'Q', 'Z');

	regularFrequency = new Array(8.2, 1.5, 2.8, 4.3, 12.7, 2.2, 2.0, 6.1, 7.0, 0.2, 0.8,
		4.0, 2.4, 6.7, 7.5, 1.9, 0.1, 6.0, 6.3, 9.1, 2.8, 1.0, 2.4, 0.2, 2.0, 0.1);

	orderedRegFreq = new Array(12.7, 9.1, 7.5, 7.0, 6.7, 6.1, 6.0, 4.3, 4.0, 2.8, 2.8, 2.4, 2.2, 2.0, 2.0, 1.9, 1.0, 0.8, 0.2, 0.2, 0.1, 0.1);
	
	var frequency;
	var alphabet;

	var e = document.getElementById("order");
	var order = e.options[e.selectedIndex].value;

	if(order == 'ordered'){
		 frequency = orderedRegFreq;
		 alphabet = orderedPlainLetters;
	}
	else {
		 frequency = regularFrequency;
		 alphabet = plainLetters;
	}

	var ciphertext;
	var freq = new Array();
	var validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var character;

	ciphertext = document.getElementById('ciphertext').value;

	var test = new Array();

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

    var arr = new Array();
    for(var i = 0; i < 26; i++){
        arr[i] = [String.fromCharCode(i+65), cipherCount[i], Math.round(cipherCount[i]/textCount*100 * 10)/10];
    }

    if(order == 'ordered'){
         arr = arr.sort(cmp);
         var plain = '';
         for(var i = 0; i < 26; i++){
            plain += "<td>"+orderedPlainLetters[i]+"</td>";
         }
         document.getElementById('plainAlphabet').innerHTML = plain;
         document.getElementById('secondRow').style.display = "block";

    }
    else {
        document.getElementById('plainAlphabet').innerHTML = '';
        document.getElementById('secondRow').style.display = "none";
   }

   
    
    //console.log(arr);

    
    // convert cipherAlphabet to percentages
    var scale=0;

    for(var i = 0; i<26; i++){
    	cipherFrequency[i] = Math.round(cipherCount[i]/textCount*100 * 10)/10;

    	if(cipherFrequency[i] > scale){scale=cipherFrequency[i];}
    }
    scale = 80/scale;
    
    if(pressedCalculate == 1){
	for(var i = 0; i<26; i++){

		
		var bar = document.getElementById("graph_"+i);
		var a = document.getElementById("alpha_"+i);
		
        if(arr[i][1] != 0){
		     // bar.innerHTML = cipherCount[i]+"<div id='bar_"+i+"' class ='bar' style='width: 30px; height: "+cipherFrequency[i]*scale+"px'></div>"+cipherFrequency[i]+"%";
             bar.innerHTML = arr[i][1]+"<div id='bar_"+i+"' class ='bar' style='width: 30px; height: "+arr[i][2]*scale+"px'></div>"+arr[i][2]+"%";
        }
        else {
            bar.innerHTML = "";
        }
		a.innerHTML = arr[i][0];
	}
}
}

function sortfunction(a, b){
    return (b-a) //causes an array to be sorted numerically and descending
}

function cmp(a, b){
    if(a[1] > b[1]) return -1;
    if(a[1] < b[1]) return 1;
    return 0;
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
  captures_list: 93.281
  exclusion.robots: 0.078
  exclusion.robots.policy: 0.069
  cdx.remote: 0.061
  esindex: 0.01
  LoadShardBlock: 54.105 (3)
  PetaboxLoader3.datanode: 93.859 (4)
  load_resource: 95.929
  PetaboxLoader3.resolve: 41.129
*/