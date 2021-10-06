//Create a new object to interact with the server
const wikiURL = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exintro=true&explaintext=true&"

var pageTitle;

pageTitle = "Coca Cola"

var url = wikiURL+"titles="+pageTitle




var xhr = new XMLHttpRequest();

// Provide 3 arguments (GET/POST, The URL, Async True/False)
xhr.open('GET', url, true);

// Once request has loaded...
xhr.onload = function() {
    // Parse the request into JSON
    var data = JSON.parse(this.response);

    // Log the data object
    console.log(data);
    console.log(data.query.pages.keys())
    console.log(data.query.pages[6690].extract)
    var extract = data.query.pages[6690].extract

    $("#content").text(extract)

}
// Send request to the server asynchronously
xhr.send();



var nounArray = []
var adjectiveArray = []
var adverbArray = []
var verbArray = []
var pastTenseVerbArray = []

/*-------------------------NOUNS-------------------------*/
$("#noun-input").keyup(function(event) {
    if (event.keyCode === 13 && $('#noun-input').val() != '') {
        nounArray.push($('#noun-input').val())
        var newNoun = document.createElement('button')
        $(newNoun).attr('class','input-item')
        $(newNoun).text($('#noun-input').val())///add '• ' before each item except first item in each array
        $('#noun-list').append(newNoun)
        $('#noun-input').val('')
    }
});
$('#noun-list').click(function(event) {
    if ($(event.target).is('button')) {
        var i = nounArray.indexOf($(event.target).text())
        nounArray.splice(i, 1)
        $(event.target).remove()
    }
})
/*-------------------------ADJECTIVES-------------------------*/
$("#adjective-input").keyup(function(event) {
    if (event.keyCode === 13 && $('#adjective-input').val() != '') {
        adjectiveArray.push($('#adjective-input').val())
        var newAdjective = document.createElement('button')
        $(newAdjective).attr('class','input-item')
        $(newAdjective).text($('#adjective-input').val())
        $('#adjective-list').append(newAdjective)
        $('#adjective-input').val('')
    }
});
$('#adjective-list').click(function(event) {
    if ($(event.target).is('button')) {
        var i = adjectiveArray.indexOf($(event.target).text())
        adjectiveArray.splice(i, 1)
        $(event.target).remove()
    }
})
/*-------------------------ADVERBS-------------------------*/
$("#adverb-input").keyup(function(event) {
    if (event.keyCode === 13 && $('#adverb-input').val() != '') {
        adverbArray.push($('#adverb-input').val())
        var newAdverb = document.createElement('button')
        $(newAdverb).attr('class','input-item')
        $(newAdverb).text($('#adverb-input').val())
        $('#adverb-list').append(newAdverb)
        $('#adverb-input').val('')
    }
});
$('#adverb-list').click(function(event) {
    if ($(event.target).is('button')) {
        var i = adverbArray.indexOf($(event.target).text())
        adverbArray.splice(i, 1)
        $(event.target).remove()
    }
})
/*-------------------------VERBS-------------------------*/
$("#verb-input").keyup(function(event) {
    if (event.keyCode === 13 && $('#verb-input').val() != '') {
        verbArray.push($('#verb-input').val())
        var newVerb = document.createElement('button')
        $(newVerb).attr('class','input-item')
        $(newVerb).text($('#verb-input').val())
        $('#verb-list').append(newVerb)
        $('#verb-input').val('')
    }
});
$('#verb-list').click(function(event) {
    if ($(event.target).is('button')) {
        var i = verbArray.indexOf($(event.target).text())
        verbArray.splice(i, 1)
        $(event.target).remove()
    }
})
/*-------------------------PAST-TENSE VERBS-------------------------*/
$("#past-tense-verb-input").keyup(function(event) {
    if (event.keyCode === 13 && $('#past-tense-verb-input').val() != '') {
        pastTenseVerbArray.push($('#past-tense-verb-input').val())
        var newPastTenseVerb = document.createElement('button')
        $(newPastTenseVerb).attr('class','input-item')
        $(newPastTenseVerb).text($('#past-tense-verb-input').val())
        $('#past-tense-verb-list').append(newPastTenseVerb)
        $('#past-tense-verb-input').val('')
    }
});
$('#past-tense-verb-list').click(function(event) {
    if ($(event.target).is('button')) {
        var i = pastTenseVerbArray.indexOf($(event.target).text())
        pastTenseVerbArray.splice(i, 1)
        $(event.target).remove()
    }
})
/*-------------------------ERASE-------------------------*/
$('#erase').click(function() {
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
/*-------------------------GET WACKY-------------------------*/
$('#submit').click(function() {
    console.log('got wacky')
    ///////////////////NOUNS
    for (let i = 0; i < articleArray.length; i++) {
        console.log(articleArray[i])
        var randomNoun = nounArray[Math.floor(Math.random()*nounArray.length)];
        if (nounArray.length > 0 && jQuery.inArray(articleArray[i], nounReference) !== -1) {
            articleArray.splice(i, 1, randomNoun)
        }
    }
    ///////////////////ADJECTIVES
    for (let i = 0; i < articleArray.length; i++) {
        console.log(articleArray[i])
        var randomAdjective = adjectiveArray[Math.floor(Math.random()*adjectiveArray.length)];
        if (adjectiveArray.length > 0 && jQuery.inArray(articleArray[i], adjectiveReference) !== -1) {
            articleArray.splice(i, 1, randomAdjective)
        }
    }
    ///////////////////VERBS
    for (let i = 0; i < articleArray.length; i++) {
        console.log(articleArray[i])
        var randomVerb = verbArray[Math.floor(Math.random()*verbArray.length)];
        if (verbArray.length > 0 && jQuery.inArray(articleArray[i], verbReference) !== -1) {
            articleArray.splice(i, 1, randomVerb)
        }
    }
    var output = document.createElement('p')
    $(output).text(articleArray.join(' '))
    $('#article').append(output)
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




//////////////////////////////////////////////////EYES
// $(".move-area").mousemove(function(event) {
//     var eye = $(".eye");
//     var x = (eye.offset().left) + (eye.width() / 2);
//     var y = (eye.offset().top) + (eye.height() / 2);
//     var rad = Math.atan2(event.pageX - x, event.pageY - y);
//     var rot = (rad * (180 / Math.PI) * -1) + 180;
//     eye.css({
//         '-webkit-transform': 'rotate(' + rot + 'deg)',
//         '-moz-transform': 'rotate(' + rot + 'deg)',
//         '-ms-transform': 'rotate(' + rot + 'deg)',
//         'transform': 'rotate(' + rot + 'deg)'
//     });
// });