
1960 U.S Presidential Election 
Bill Clinton 
Coca-Cola 
Conditional Probability 
Firefly
Florida
Food
Qui-Gon Jinn = Qui-Gon_Jinn
HIV
Magnificat
Manatee
Mickey Mouse = Mickey_Mouse
New York = scrap it
Oregon Trail = Oregon_Trail
Pope
Seattle
Soft Drink = soft_drink
Theocentricism
Undergarmet
Zorro



onclick.target 









$(function () {
    $("#tabs").tabs();
});

$( function() {
    $( "#speed" ).selectmenu();



var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exintro=true&explaintext=true&titles=Coca-Cola";

var constURL = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exintro=true&explaintext=true&titles="

var articleString;



$("#submit").on("click", wikiSearch)

function wikiSearch() {

    //Create a new object to interact with the server
    var xhr = new XMLHttpRequest();

    // Provide 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);

    // Once request has loaded...
    xhr.onload = function () {
        // Parse the request into JSON
        var data = JSON.parse(this.response);

        // Log the data object
        console.log(data);
        // console.log(data.query.pages.keys(data.query.pages)[0])
        console.log(Object.keys(data.query.pages)[0]);
        var pageID = Object.keys(data.query.pages)[0];
        var extract = data.query.pages[pageID].extract;
        var title = data.query.pages[pageID].title;
        articleString = JSON.stringify(extract);

        $("#wiki-content").text(extract)
        $('#wiki-title').text(title)

        console.log(articleString)
        var replaceString = articleString.replaceAll("Coke", "cocaine").replaceAll("Coca-Cola", "Cocaine")
        console.log(replaceString)

        $('#wacky-content').text(replaceString)


    }
    // Send request to the server asynchronously
    xhr.send();



}
