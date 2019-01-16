$( document ).ready(function() {

var myArray = ["cat","dog", "giraffe", "emu","elephant", "seal", "goat", "zebra", "lion", "gecko","puppy","kitten"]
function createButtons(){
  myArray.forEach(function(animal){
  var button = $("<button>");
button.text(animal);
button.addClass("btn btn-info original");
button.attr("id",animal);
button.css({margin:"10px"});

$("#buttons").prepend(button);

  });
}
createButtons();
$("#add").on("click",function(){
    var newAnimal = $("<button>");
    newAnimal.addClass("btn btn-info original");
    newAnimal.css({margin:"10px"});
    var inputValue = $("#addAnimal").val();
    newAnimal.text(inputValue);
    newAnimal.attr("id",inputValue);
    $("#buttons").append(newAnimal);
    $('#addAnimal').val('');
    clicky();
    });


function clicky(){
$(".original").on("click", function(){
 $("#gifs").empty();
    var choice= this.id;
    $.ajax({
   url:"https://api.giphy.com/v1/gifs/search?api_key=rBK8HGIicVF5VbhGssb2gMp2tTW5Y9OK&q=" +choice+ "&limit=25&offset=0&rating=G&lang=en",
   method: "GET"
    }).then(function(response) {
            console.log(response);
        for (var i = 0; i < 10; i ++){
        var div = $("<div>");
        div.css({margin:"10px",float:"left"});
        div.attr("id",i);
        div.html("<img src=" + response.data[i].images.downsized_still.url + " height=200px width=200px>");
        $("#gifs").append(div);
       var clicks= 0;
       $("#"+i+"").on("click", function(){
           console.log(this.id);
        if (clicks === 0){
            clicks++;
        $(this).html("<img src=" + response.data[this.id].images.downsized.url + " height=200px width=200px>");
        }
        else {
            clicks --; 
            $(this).html("<img src=" + response.data[this.id].images.downsized_still.url + " height=200px width=200px>");
        }
       });
    }
    });
});
}
clicky();
//document ready closing tag
});