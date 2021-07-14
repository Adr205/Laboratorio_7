$(document).ready(function() {

var addAnimal = $("#add-animal").on("click", addButton);

// Start your code from here
var animals = ["dog", "fox", "wolf", "ferret", "racoon", "guinea pig","hedgehog", "narwhal", "shark"];

function populateButtons(array){
    array.forEach(element => {
        var a = $("<button>");
        a.text(element);
        a.addClass("animal-button");
        a.attr("data-type", element);
        $("#animal-buttons").append(a);
    });
}

$("#animal-buttons").on("click",".animal-button", function(){
    $("#animals").empty();
    // search term
    var type = $(this).attr("data-type");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=fpP69xkKKfRXi40wqqanZZvgGfSDmQDr&limit=25";
    
    $.ajax({
        url:queryURL,
        method:"GET"
    }) //promesa -->
    .then(function(response){
        response.data.forEach(gif =>{
            var animalDiv = $(`<div class = 'animal-item' >`);
            var rating = gif.rating;

            var p = $("<p>").text("Rating:" + rating);

            var animated = gif.images.fixed_height.url;
            var still = gif.images.fixed_height_still.url;        

            var animalImage = $("<img>");
            animalImage.attr("src",still);
            animalImage.attr("data-still",still);
            animalImage.attr("data-animate",animated);
            animalImage.attr("data-state","still");
            animalImage.addClass("animal-image");

            animalDiv.append(p);
            animalDiv.append(animalImage);
            $("#animals").append(animalDiv);

            
        })
    })
})


$("#animals").on("click", ".animal-image", function(){
    var state = $(this).attr("data-state");
    
    if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animated");
        
    }else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})


function addButton(e){
    e.preventDefault();
    var txt = $("#animal-input").val();
    animals.push(txt);
    $("#animal-buttons").empty();
    populateButtons(animals)    
}

populateButtons(animals)


});
