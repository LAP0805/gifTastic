$("#gifs").on("click","button", function(){
var dataValue = $(this).attr("data-value");
console.log(dataValue);
var imageToAppend = $("#image" + dataValue).clone();
$("#favoritesHere").append(imageToAppend);

});

$("#favoritesLink").on("click",function(){
window.location="#favorites";
})
$("#favoritesHere").on("click","img", function(){
    var state= $(this).attr("data-state");
    if (state === "still") {
     $(this).attr("src", $(this).attr("data-animate"));
     $(this).attr("data-state", "animate");
   } else {
     $(this).attr("src", $(this).attr("data-still"));
     $(this).attr("data-state", "still");
   }
  });