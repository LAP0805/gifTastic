$( document ).ready(function() {

var topics = ["cat","dog", "giraffe", "emu","elephant", "seal", "goat", "zebra", "lion", "gecko","puppy","kitten"]

var count=10;
var howmany=count +10;


//create buttons//
function createButtons(){
  topics.forEach(function(animal){
  var button = $("<button>");
button.text(animal);
button.addClass("btn btn-info original");
button.attr("id",animal);
button.css({margin:"10px"});
$("#buttons").prepend(button);
  });
}
createButtons();

//create additional animals//
$("#add").on("click",function(){
    var newAnimal = $("<button>");
    newAnimal.addClass("btn btn-success original");
    newAnimal.css({margin:"10px"});
    var inputValue = $("#addAnimal").val();
    newAnimal.text(inputValue);
    newAnimal.attr("id",inputValue);
    $("#buttons").prepend(newAnimal);
    $('#addAnimal').val('');
    clicky();
    });

//on animal button click//// it's a big one!
function clicky(){
$(".original").on("click", function(){
 $("#gifs").empty();
 $("#addmore").empty();
    var choice= this.id;

    ///get gifs////
    $.ajax({
   url:"https://api.giphy.com/v1/gifs/search?api_key=rBK8HGIicVF5VbhGssb2gMp2tTW5Y9OK&q=" +choice+ "&limit=100&offset=0&rating=G&lang=en",
   method: "GET"
    }).then(function(response) {
            console.log(response);
        for (var i = 0; i < 10; i ++){
        var div = $("<div>");
        var biggerDiv= $("<div>");
        div.css({margin:"10px",float:"left"});
        div.attr("id",i);
        div.html("<img src=" + response.data[i].images.downsized_still.url + " height=200px width=200px>");
        div.append("<br>" + "rating: " +response.data[i].rating);
        biggerDiv.append(div);

    //!!!!! removed the download button, as without "content disposition" being set, it only opens the gif in a separate page. This takes either server side manipulation or php, neither of which I know anything about! This seems pointless so I removed the feature, but wanted to keep the code here for future viewing and fiddling.
        //create download button//
        
        var dlButton = $("<button>");
        dlButton.html('<a download href="'+response.data[i].images.downsized.url + '"target ="_blank" >Download</a>');
        dlButton.addClass("" +i + "");
        dlButton.css({margin:"10px", float:"left"});
       
        
// //append final divs to gifs section//
        $("#gifs").append(biggerDiv);
        biggerDiv.append(dlButton);
        //on download button click do///
//         $("."+i+"").on("click", function(){
//             var myClass = $(this).attr("class");
//    console.log(myClass);
//             window.open(""+ response.data[myClass].images.downsized.url + "")
//         });

    //on gif click do:///
       var clicks= 0;
       $("#"+i+"").on("click", function(){
        if (clicks === 0){
            clicks++;
        $(this).html("<img src=" + response.data[this.id].images.downsized.url + " height=200px width=200px>");
        $(this).append("<br>" + "rating: " +response.data[this.id].rating);
        
        }
        else {
            clicks --; 
            $(this).html("<img src=" + response.data[this.id].images.downsized_still.url + " height=200px width=200px>");
            $(this).append("<br>" + "rating: " +response.data[this.id].rating);
        }
       });
    }
    //create more gifs button///
    var more = $("<button>");
    more.text("click for 10 more gifs!");
    more.attr("id","more");
    more.addClass("btn btn-primary")
    $("#addmore").append(more);
    $("#more").on("click", function(){
        count += 10;
        howmany +=10;
        console.log(count);
        console.log(howmany);
        for (var i = count; i < howmany; i ++){
            var div = $("<div>");
        div.css({margin:"10px",float:"left"});
        div.attr("id",i);
        div.html("<img src=" + response.data[i].images.downsized_still.url + " height=200px width=200px>");
        div.append("<br>" + "rating: " +response.data[i].rating);
        $("#gifs").prepend(div);  
        var clicks= 0;
       $("#"+i+"").on("click", function(){
        if (clicks === 0){
            clicks++;
        $(this).html("<img src=" + response.data[this.id].images.downsized.url + " height=200px width=200px>");
        $(this).append("<br>" + "rating: " +response.data[this.id].rating);
        }
        else {
            clicks --; 
            $(this).html("<img src=" + response.data[this.id].images.downsized_still.url + " height=200px width=200px>");
            $(this).append("<br>" + "rating: " +response.data[this.id].rating);
        }
       });      
        }
      });
    
    });    
});
}
///end clicky//

clicky();



//document ready closing tag
});