//GLOBAL WORD ARRAY VARIABLES -- INPUT WORD ARRAYS AND PULLED ARTICLE ARRAYS
var inputNouns = []
var inputAdjectives = []
var inputAdverbs = []
var inputVerbs = []
var inputPastVerbs = []
var articleNouns = [];
var articleAdj = [];
var articleAdv = [];
var articleVerbs = [];


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
});
$('#noun-list').click(function (event) {
    if ($(event.target).is('button')) {
        var i = inputNouns.indexOf($(event.target).text())
        inputNouns.splice(i, 1)
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
});
$('#adjective-list').click(function (event) {
    if ($(event.target).is('button')) {
        var i = inputAdjectives.indexOf($(event.target).text())
        inputAdjectives.splice(i, 1)
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
});
$('#adverb-list').click(function (event) {
    if ($(event.target).is('button')) {
        var i = inputAdverbs.indexOf($(event.target).text())
        inputAdverbs.splice(i, 1)
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
});
$('#verb-list').click(function (event) {
    if ($(event.target).is('button')) {
        var i = inputVerbs.indexOf($(event.target).text())
        inputVerbs.splice(i, 1)
        $(event.target).remove()
    }
})
/*-------------------------PAST-TENSE VERBS-------------------------*/
$("#past-tense-verb-input").keyup(function (event) {
    if (event.keyCode === 13 && $('#past-tense-verb-input').val() != '') {
        inputPastVerbs.push($('#past-tense-verb-input').val())
        var newPastTenseVerb = document.createElement('button')
        $(newPastTenseVerb).attr('class', 'input-item')
        $(newPastTenseVerb).text($('#past-tense-verb-input').val())
        $('#past-tense-verb-list').append(newPastTenseVerb)
        $('#past-tense-verb-input').val('')
    }
});
$('#past-tense-verb-list').click(function (event) {
    if ($(event.target).is('button')) {
        var i = inputPastVerbs.indexOf($(event.target).text())
        inputPastVerbs.splice(i, 1)
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
$('#collapse').click(function() {
    if (collapsed == false) {
        $('#left-div').css('width','0')
        $('#left-div').css('min-width','0')
        $('#collapse').text('>>')
        collapsed = true
    } else {
        $('#left-div').css('width','550px')
        $('#left-div').css('min-width','250px')
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
                console.log(data)
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
        articleString = JSON.stringify(extract);

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
    profile: true
});


//call API to pull words from article out of article based on POS
function wordAPI(article) {

    wordpos.getNouns(article)
        .then(res => {
           articleNouns = res; 

            shuffle(articleNouns);
            shuffle(inputNouns);

            var articleArray = articleString.split(" ");

            for (let i = 0; i < inputNouns.length; i++) {
                removedNoun = articleNouns[i]
                newNoun = inputNouns[i];
                for (let j = 0; j < inputNouns.length; j++) {
                    x = articleArray.indexOf(removedNoun);
                    articleArray.splice(x, 1, newNoun)
                }
            }

           var newArticleString = articleArray.join(' ').toString();
           return newArticleString;
        })
        .then(article => {
            wordpos.getAdjectives(article)
            .then(res => {
                articleAdj = res;

                shuffle(articleAdj);
                shuffle(inputAdjectives);

                var articleArray = article.split(" ");

                for (let i = 0; i < inputAdjectives.length; i++) {
                    removedAdj = articleAdj[i]
                    newAdj = inputAdjectives[i];
                    for (let j = 0; j < inputAdjectives.length; j++) {
                        x = articleArray.indexOf(removedAdj);
                        articleArray.splice(x, 1, newAdj)
                    }
                }

                var newArticleString = articleArray.join(' ').toString();

                return newArticleString;

            })

            .then(article => {
                wordpos.getVerbs(article)
                .then(res => {
                    articleVerbs = res;
    
                    shuffle(articleVerbs);
                    shuffle(inputVerbs);
    
                    var articleArray = article.split(" ");
    
                    for (let i = 0; i < inputVerbs.length; i++) {
                        removedVerb = articleVerbs[i]
                        newVerb = inputVerbs[i];
                        for (let j = 0; j < inputVerbs.length; j++) {
                            x = articleArray.indexOf(removedVerb);
                            articleArray.splice(x, 1, newVerb)
                        }
                    }
    
                    var newArticleString = articleArray.join(' ').toString();
    
                    return newArticleString;
                })


                .then(article => {
                    wordpos.getAdverbs(article)
                    .then(res => {
                        articleAdv = res;

                        shuffle(articleAdv);
                        shuffle(inputAdverbs);

                        var articleArray = article.split(" ");

                        for (let i = 0; i < inputAdverbs.length; i++) {
                            removedAdverb = articleAdv[i]
                            newAdverb = inputAdverbs[i];
                            for (let j = 0; j < inputAdverbs.length; j++) {
                                x = articleArray.indexOf(removedAdverb);
                                articleArray.splice(x, 1, newAdverb)
                            }
                        }
        
                        var newArticleString = articleArray.join(' ').toString();
        
                        $("#wacky-content").text(newArticleString)

                    })
                })
            })
        })
}


//shuffle arrays so that a random word is selected every time
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
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
        if ( aname < bname ) return -1;
        else if ( aname == bname ) return 0;
        else return +1;
    });
    var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = '';
    for(i = 0; i < voices.length ; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
        if(voices[i].default) {
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
        for(i = 0; i < voices.length ; i++) {
            if(voices[i].name === selectedOption) {
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


//other TODOs - clean up wackified articles. Remove quotes, backslashes, \n's, etc.
//maybe add sfx? soooo low priority
//phone media queries...gonna be pretty yikes