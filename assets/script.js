//GLOBAL WORD ARRAY VARIABLES -- INPUT WORD ARRAYS AND PULLED ARTICLE ARRAYS
var inputNouns = [];
var inputAdjectives = [];
var inputAdverbs = [];
var inputVerbs = [];
var inputPastVerbs = [];
var articleNouns = [];
var articleAdj = [];
var articleAdv = [];
var articleVerbs = [];
var articleRest = [];
var articleRepeats = [];


// INPUT WORD ARRAY FUNCTIONS -- LEFT SIDE OF PAGE FUNCTIONS 
//First function in each section: Adds input words to corresponding array and adds words to list below input field. 
//Second function in each section: deletes word from array/page on click (if you click the word itself)
//Last section: removes all input words from arrays/page

/*-------------------------NOUNS-------------------------*/
$("#noun-input").keyup(function (event) {
    if (event.keyCode === 13 && $('#noun-input').val() != '') {
        inputNouns.push($('#noun-input').val())
        var newNoun = document.createElement('button')
        $(newNoun).attr('class', 'input-item')
        $(newNoun).text($('#noun-input').val())
        $('#noun-list').append(newNoun)
        $('#noun-input').val('')
    }
    localStorage.setItem("nouns", JSON.stringify(inputNouns))

});
$('#noun-list').click(function (event) {
    if ($(event.target).is('button')) {
        var i = inputNouns.indexOf($(event.target).text())
        inputNouns.splice(i, 1)
        localStorage.removeItem('nouns')
        localStorage.setItem("nouns", JSON.stringify(inputNouns))
        $(event.target).remove()
    }
})
/*-------------------------ADJECTIVES-------------------------*/
$("#adjective-input").keyup(function (event) {
    if (event.keyCode === 13 && $('#adjective-input').val() != '') {
        inputAdjectives.push($('#adjective-input').val())
        var newAdjective = document.createElement('button')
        $(newAdjective).attr('class', 'input-item')
        $(newAdjective).text($('#adjective-input').val())
        $('#adjective-list').append(newAdjective)
        $('#adjective-input').val('')
    }
    localStorage.setItem("adj", JSON.stringify(inputAdjectives))
});
$('#adjective-list').click(function (event) {
    if ($(event.target).is('button')) {
        var i = inputAdjectives.indexOf($(event.target).text())
        inputAdjectives.splice(i, 1)
        localStorage.removeItem('adj')
        localStorage.setItem("adj", JSON.stringify(inputAdjectives))
        $(event.target).remove()
    }
})
/*-------------------------ADVERBS-------------------------*/
$("#adverb-input").keyup(function (event) {
    if (event.keyCode === 13 && $('#adverb-input').val() != '') {
        inputAdverbs.push($('#adverb-input').val())
        var newAdverb = document.createElement('button')
        $(newAdverb).attr('class', 'input-item')
        $(newAdverb).text($('#adverb-input').val())
        $('#adverb-list').append(newAdverb)
        $('#adverb-input').val('')
    }
    localStorage.setItem("adv", JSON.stringify(inputAdverbs))
});
$('#adverb-list').click(function (event) {
    if ($(event.target).is('button')) {
        var i = inputAdverbs.indexOf($(event.target).text())
        inputAdverbs.splice(i, 1)
        localStorage.removeItem('adv')
        localStorage.setItem("adv", JSON.stringify(inputAdverbs))
        $(event.target).remove()
    }
})
/*-------------------------VERBS-------------------------*/
$("#verb-input").keyup(function (event) {
    if (event.keyCode === 13 && $('#verb-input').val() != '') {
        inputVerbs.push($('#verb-input').val())
        var newVerb = document.createElement('button')
        $(newVerb).attr('class', 'input-item')
        $(newVerb).text($('#verb-input').val())
        $('#verb-list').append(newVerb)
        $('#verb-input').val('')
    }
    localStorage.setItem("verbs", JSON.stringify(inputVerbs))
});
$('#verb-list').click(function (event) {
    if ($(event.target).is('button')) {
        var i = inputVerbs.indexOf($(event.target).text())
        inputVerbs.splice(i, 1)
        localStorage.removeItem('verbs')
        localStorage.setItem("verbs", JSON.stringify(inputVerbs))
        $(event.target).remove()
    }
})


/*-------------------------ERASE-------------------------*/
$('#erase').click(function () {
    nounArray = []
    adjectiveArray = []
    adverbArray = []
    verbArray = []
    pastTenseVerbArray = []
    $('#article-input').val('')
    $('#noun-input').val('')
    $('#adjective-input').val('')
    $('#adverb-input').val('')
    $('#verb-input').val('')
    $('#past-tense-verb-input').val('')
    $('#noun-list').empty()
    $('#adjective-list').empty()
    $('#adverb-list').empty()
    $('#verb-list').empty()
    $('#past-tense-verb-list').empty()
})
/*-------------------------COLLAPSE-------------------------*/
var collapsed = false
$('#collapse').click(function () {
    if (collapsed == false) {
        $('#left-div').css('width', '0')
        $('#left-div').css('min-width', '0')
        $('#collapse').text('>>')
        collapsed = true
    } else {
        $('#left-div').css('width', '550px')
        $('#left-div').css('min-width', '250px')
        $('#collapse').text('<<')
        collapsed = false
    }
})


// WIKI SEARCH FUNCTION
var inputTitle
var newTitle
var urlKey
var url


//checks for valid article
var isChecked
var checkTimer

$('#article-input').keyup(function(event) {
    if (event.keyCode !== 13) {
        $('#check').text('🤔')
        clearInterval(checkTimer);
        checkTimer = setInterval(check, 1000);
    }
})

function check() {
        inputTitle = $('#article-input').val()
        if (inputTitle !== "") {
            fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + inputTitle + '&utf8=&format=json&origin=*')
            .then(response => response.json())
            .then(data => {
                if (data.query.search.length < 1) {
                    $('#check').text('❌')
                    console.log(inputTitle)
                } else {
                    $('#check').text('✔️')
                }
            })
        } else {
            $('#check').text('')
        }
        clearInterval(checkTimer);
}

// function stopCheck() {

// }

//when you click the "get wacky" button at the bottom, call preSearch function, which leads to wikiSearch function 
$("#submit").on("click", preSearch)


function preSearch() {
    var nounWarning = $("<p>").text("Please Choose Atleast 3 Nouns").attr("style", "color:red;background-color:white;");
    var adjectiveWarning = $("<p>").text("Please Choose Atleast 3 Adjectives").attr("style", "color:red;background-color:white;");
    var adverbWarning = $("<p>").text("Please Choose Atleast 3 Adverbs").attr("style", "color:red;background-color:white;");
    var verbWarning = $("<p>").text("Please Choose Atleast 3 Verbs").attr("style", "color:red;background-color:white;");

    if (inputNouns.length < 3) {
        $("#noun-warning").empty();
        $("#noun-warning").append(nounWarning);
    } else {
        $("#noun-warning").empty();
    };
    if (inputAdjectives.length < 3) {
        $("#adjective-warning").empty();
        $("#adjective-warning").append(adjectiveWarning);
    } else {
        $("#adjective-warning").empty();
    }
    if (inputAdverbs.length < 3) {
        $("#adverb-warning").empty();
        $("#adverb-warning").append(adverbWarning);
    } else {
        $("#adverb-warning").empty();
    }
    if (inputVerbs.length < 3) {
        $("#verb-warning").empty();
        $("#verb-warning").append(verbWarning);
    } else {
        $("#verb-warning").empty();
    }
    if (inputNouns.length >= 3 && inputAdjectives.length >= 3 && inputAdverbs.length >= 3 && inputVerbs.length >= 3) {
        $("#noun-warning").empty();
        $("#adjective-warning").empty();
        $("#adverb-warning").empty();
        $("#verb-warning").empty();


        inputTitle = $('#article-input').val()
        fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + inputTitle + '&utf8=&format=json&origin=*')
            .then(response => response.json())
            .then(data => {
                newTitle = data.query.search[0].title
                var tempArray = newTitle.split(' ')
                urlKey = tempArray.join('_')
                url = ('https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exintro=true&explaintext=true&titles=' + urlKey)
                wikiSearch()
            })
    }
}



//when you click the "get wacky" button at the bottom, call wikiSearch function 

var articleString;
var isWackified

function wikiSearch() {

    //Create a new object to interact with the server
    var xhr = new XMLHttpRequest();

    // Provide 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);

    // Once request has loaded...
    xhr.onload = function () {
        // Parse the request into JSON and set it to the "data" variable 
        var data = JSON.parse(this.response);

        // set the page ID to a variable and use that var to extract the title & text content from the page
        var pageID = Object.keys(data.query.pages)[0];
        var extract = data.query.pages[pageID].extract;
        var title = data.query.pages[pageID].title;

        //convert the text content into a string
        articleString = extract;

        //display the original article content on the page in the Original tab
        $('#article').css('visibility','visible')
        $('#wiki-title').text(title)
        $("#wiki-content").text(extract)

        $('#tts button').css('visibility','visible')

        $('#right-header').css('justify-content','space-between')
        $('#spacer').css('display','block')
        $('#article-buttons').css('display','block')
        $('#wackified-wiki').css('opacity','75%').css('background','rgba(255, 245, 238, 0.25)')
        $('#og-wiki').css('opacity','100%').css('background','transparent')
        $("#wacky-content").css('display','block')
        $("#wiki-content").css('display','none')
        isWackified = true;

        //call function to sort and replace words in wiki article
        wordAPI(articleString)

        //save OG article to local storage
        localStorage.setItem("original", JSON.stringify(articleString));

    }
    // Send request to the server asynchronously
    xhr.send();

}

// Wackified and OG Wiki tab button settings below //TODO - make them permanently 'active' instead of focused

$('#wackified-wiki').click(function() {
    if (!isWackified) {
        $('#wackified-wiki').css('opacity','75%').css('background','rgba(255, 245, 238, 0.25)')
        $('#og-wiki').css('opacity','100%').css('background','transparent')
        $("#wacky-content").css('display','block')
        $("#wiki-content").css('display','none')
        synth.cancel()
        isWackified = true;
    }
})

$('#og-wiki').click(function() {
    if (isWackified) {
        $('#og-wiki').css('opacity','75%').css('background','rgba(255, 245, 238, 0.25)')
        $('#wackified-wiki').css('opacity','100%').css('background','transparent')
        $("#wiki-content").css('display','block')
        $("#wacky-content").css('display','none')
        synth.cancel()
        isWackified = false;
    }
})

//create API functions from CDN to use in browser
let wordpos = new WordPOS({
    // preload: true,
    dictPath: 'https://cdn.jsdelivr.net/npm/wordpos-web@1.0.2/dict',
    profile: true,
    preload: true,
    stopwords: true,
    debug: true,
});


//call API to pull words from article out of article based on POS
function wordAPI(article) {
    // var posResults = {};
    wordpos.getPOS(article)
        .then(results => { return results})
        .then(data => {
            var posResults = data;

            //split data based on POS
            articleNouns = posResults.nouns;
            articleVerbs = posResults.verbs;
            articleAdj = posResults.adjectives;
            articleAdv = posResults.adverbs;
            articleRest = posResults.rest;

            //split article into an array to replace words 
            //and a holding array to remove replaced words so they are not replaced again 
            var articleArray = articleString.split(" ");
            var holdingArray = articleString.split(" ");

            /*----NOUNS----*/
            shuffle(articleNouns);
            shuffle(inputNouns);

            wordReplace(articleNouns, inputNouns, articleArray, holdingArray);


            /*----VERBS----*/
            shuffle(articleVerbs);
            shuffle(inputVerbs);

            wordReplace(articleVerbs, inputVerbs, articleArray, holdingArray);


            /*----ADJECTIVES----*/
            shuffle(articleAdj);
            shuffle(inputAdjectives);

            wordReplace(articleAdj, inputAdjectives, articleArray, holdingArray);

            /*----ADVERBS----*/
            shuffle(articleAdv);
            shuffle(inputAdverbs)

            wordReplace(articleAdv, inputAdverbs, articleArray, holdingArray);

            /*CONVERT the final article array to a string and display it on the page*/
            newArticleString = articleArray.join(" ").replace('"', '');
            //save wacky wiki article to local storage
            localStorage.setItem("wacky", JSON.stringify(newArticleString));
            //display wacky article on the page 
            $("#wacky-content").html(newArticleString)
        })
}



//function to choose a replacement word from input words, replace in the article array, and remove that word (and any repeats of that word) from the holding array so that it cannot be replaced again 
function wordReplace(articlePOS, inputPOS, articleArray, holdingArray) {
    for (let i = 0; i < inputPOS.length; i++) {
        var removedWord = articlePOS[i]
        var newWord = "<span>" + inputPOS[i] + "</span>";
        for (let j = 0; j < inputPOS.length; j++) {
            x = articleArray.indexOf(removedWord);
            articleArray.splice(x, 1, newWord)
            holdingArray.splice(x, 1)
        }
    }

    //remove all occurances of the removedWord from the holding array 
    for (let i = 0; i < holdingArray.length; i++) {
        if (removedWord === holdingArray[i]) {
            holdingArray.splice(holdingArray[i], 1)
        }
    }

    return holdingArray;
}


//shuffle arrays so that a random word is selected every time
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}


//jquery UI tab function
$(function () {
    $("#tabs").tabs();
});






/*-------------------------TEXT TO SPEECH-------------------------*/
var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var rate = document.querySelector('#rate');

var voices = [];

function populateVoiceList() {
    voices = synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
        if (aname < bname) return -1;
        else if (aname == bname) return 0;
        else return +1;
    });
    var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = '';
    for (i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
        if (voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }
        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
    }
    selectedIndex = 19;//TODO - do index of microsoft david instead, cleaner...low priority
    voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}


var mouthSpeed = 0.6 //note, the higher the value, the slower the movement

rate.onchange = function() {
    mouthSpeed = (0.5 / rate.value)
    console.log(mouthSpeed)
}

function speak(){
    var article
    if (isWackified) {
        article = $('#wacky-content').text()
    } else {
        article = $('#wiki-content').text()
    }
    console.log(article)
    if (synth.speaking) {
        synth.cancel()
        $('.vampi-mouth').css('animation','none')
        $('#play').text("🔊 Let's Hear It!")
        /*$('#tts:hover').css('visibility','visible')/*TODO - permanently stays visible, which we dont want*/
 
    } else if (article.trim() !== '') {
        $('#play').text("🔇 Stop!")
        // $('#tts:hover').css('visibility','hidden')
        var utterThis = new SpeechSynthesisUtterance(article);
        utterThis.onend = function (event) {
            console.log('SpeechSynthesisUtterance.onend');
        }
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
        for (i = 0; i < voices.length; i++) {
            if (voices[i].name === selectedOption) {
                utterThis.voice = voices[i];
                break;
            }
        }
        utterThis.pitch = pitch.value;
        utterThis.rate = rate.value;
        synth.speak(utterThis);
        $('.vampi-mouth').css('animation','speak forwards infinite ' + mouthSpeed + 's ease-in-out')
        setInterval(function(){ 
            if (!synth.speaking) {
                $('.vampi-mouth').css('animation','none')
                $('#play').text("🔊 Let's Hear It!")
                /*$('#tts:hover').css('visibility','visible')*/
            }
        }, 100);
    }
}

$('#play').click(function() {
    speak()
})



/*-------------------------WACKY WILFRED-------------------------*/
let ufo = document.querySelector('body');

ufo.addEventListener('mousemove', (e) => {
  let eyes = document.querySelector('.eyes');
  let mouseX = (eyes.getBoundingClientRect().left); 
  let mouseY = (eyes.getBoundingClientRect().top);
  let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
  let rotationDegrees = (radianDegrees * (180/ Math.PI) * -1) + 180;
  eyes.style.transform = `rotate(${rotationDegrees}deg)`
});


/*-------------------------WELCOME MODAL-------------------------*/
var welcomeMessages = [
    "Welcome to Wacky-Wiki. My name is Wacky Wilfred and I suffer from seasonal depression! Anyways, let's get wacky.",
    "Welcome to Wacky-Wiki. My name is Wacky Wilfred and I can't remember the last time my father looked me in the eye! Anyways, let's get wacky.",
    "Welcome to Wacky-Wiki. My name is Wacky Wilfred and my dog ran away last week! Anyways, let's get wacky.",
    "Welcome to Wacky-Wiki. My name is Wacky Wilfred and I just lost my job! Anyways, let's get wacky."
]

$('#welcome-message').text(welcomeMessages[Math.floor(Math.random()*welcomeMessages.length)])


$('#close-modal').click(function() {
    $('#welcome').removeClass('is-active')
    $('.monster').css('z-index',1)
})


//maybe add sfx? soooo low priority
//phone media queries...gonna be pretty yikes

/*-------------------------LOCAL STORAGE-------------------------*/

//past wacky button to pull original/wacky content from local storage 
//pulls words from local storage when past wacky button is clicked
$("#load").on("click",function(){

    var storedNouns = JSON.parse(localStorage.getItem("nouns"));
    pullStorage(inputNouns,storedNouns,'#noun-list');

    var storedAdj = JSON.parse(localStorage.getItem("adj"));
    pullStorage(inputAdjectives,storedAdj, '#adjective-list');

    var storedAdv = JSON.parse(localStorage.getItem("adv"));
    pullStorage(inputAdverbs,storedAdv, '#adverb-list')

    var storedVerbs = JSON.parse(localStorage.getItem("verbs"))
    pullStorage(inputVerbs,storedVerbs, '#verb-list');

    pastWacky();

})

function pastWacky(){

    var wacky = JSON.parse(localStorage.getItem("wacky"))
    var original = JSON.parse(localStorage.getItem("original"))

    if (wacky != null && original != null){
        $('#wacky-content').html(wacky)
        $('#wiki-content').text(original)
        $('#article').css('visibility','visible')
        $('#tts button').css('visibility','visible')
        $('#right-header').css('justify-content','space-between')
        $('#spacer').css('display','block')
        $('#article-buttons').css('display','block')
        $('#wackified-wiki').css('opacity','75%').css('background','rgba(255, 245, 238, 0.25)')
        $('#og-wiki').css('opacity','100%').css('background','transparent')
        $("#wacky-content").css('display','block')
        $("#wiki-content").css('display','none')
        isWackified = true;
    } 
}

function pullStorage(input,stored,id){
    if (stored === null){
        return;
    }
    else {
        $(id).empty();
        for (let i = 0; i < stored.length; i++){
            input.push(stored[i]);
            newBtn = $("<button>").attr('class','input-item').text(stored[i])
            $(id).append(newBtn)
        }       
    } 
}
