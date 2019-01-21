$("#gifs").on("click","button", function(){
var dataValue = $(this).attr("data-value");
console.log(dataValue);
var newDiv=$("<div>");
newDiv.css({float:"left"});
var imageToAppend = $("#image" + dataValue).clone();
imageToAppend.css({margin:"10px"});
newDiv.append(imageToAppend);
removeButton = $("<button>");
removeButton.addClass("btn btn-danger");
removeButton.text("Remove from favorites");
removeButton.css({margin:"10px", fontSize:"10px"});
newDiv.append(removeButton);
$("#favoritesHere").append(newDiv);
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
$("#favoritesHere").on("click","button", function(){
  var remove=$(this).parent();
  remove.remove();
  });  