let kanjiSearch2 = { // Takes character from search1 and looks up more relevant data about the kanji.

    
     readApi2: function(inputFromUser){
    
        fetch("https://kanjialive-api.p.rapidapi.com/api/public/kanji/"+ inputFromUser, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
                "x-rapidapi-key": "f59cea2469msh30b7044e6869bcep183194jsn17c4be26ab34"
            }
        })
        .then(Response => Response.json())
        .then((data) => this.displayKanjiInfo2(data))
    },
    
     displayKanjiInfo2: function(data){
    const grade = data.references.grade;
    const english = data.kanji.meaning.english;
    const onyomiJP = data.kanji.onyomi.katakana;
    const onyomiEN = data.kanji.onyomi.romaji;
    const kuyomiJP = data.kanji.kunyomi.hiragana;
    const kuyomiEN = data.kanji.kunyomi.romaji;
    const strokes = data.kanji.strokes.count;
    
    const mp4 = data.kanji.video.mp4;
    //let mp4 = mp4X.toString();
    var video = document.getElementById('.kanjiVideo');
    var source = document.getElementById('video');
    

    document.querySelector(".meanings").innerText = "Meanings: " + english;
    document.querySelector(".grade").innerText = "Grade: " + grade;
    document.querySelector(".stokeCount").innerText = "Number of strokes: " + strokes;
    document.querySelector(".kunRead").innerText = "Kun'yomi reading: " + kuyomiJP + " ("+kuyomiEN+")";
    document.querySelector(".onRead").innerText = "On'yomi reading: " + onyomiJP + " ("+onyomiEN+")";

   

    source.setAttribute('src', mp4);
    
    var mediaElem = document.querySelector("video");
    
    mediaElem.load();
   

    },
    
};

let kanjiSearch1 = { // Initial input from user. Takes English or Japanese and detects kanji and number of strokes 

    readApi1 : function(inputFromUser)
    {
        fetch("https://kanjialive-api.p.rapidapi.com/api/public/search/" + inputFromUser, {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
		"x-rapidapi-key": "f59cea2469msh30b7044e6869bcep183194jsn17c4be26ab34"}})
        .then(Response => Response.json())
        .then((data) => this.displayKanjiInfo1(data))
    },

    displayKanjiInfo1: function(data){
        const{character} = data[0].kanji;
        document.querySelector(".kanji").innerText = "Kanji: " + character;
        kanjiSearch2.readApi2(character);
    },
};



document.querySelector(".searchBar")
.addEventListener("keyup", function (event) {
    if(event.key == "Enter"){
        kanjiSearch1.readApi1(document.querySelector(".searchBar").value);
    }
    
})

document.querySelector(".search button")
.addEventListener("click", function () {
    kanjiSearch1.readApi1(document.querySelector(".searchBar").value);
})




