$( document ).ready(function() {

    var topics = ["cat","dog", "giraffe", "emu","elephant", "seal", "goat", "zebra", "lion", "gecko","puppy","kitten"]
    
    var count=0;
    var howmany=10;;
    var choice= "";
    var queryurl = "";
    var clicks = 0;
    var responseGlobal="";
    var queryurlBands="";

    //create buttons//
    function createButtons(){
      $("#buttons").empty();
      $("#addmore").empty();
      topics.forEach(function(animal){
      var button = $("<button>");
    button.text(animal);
    button.addClass("btn btn-info original");
    button.attr("id",animal);
    button.css({margin:"10px"});
    $("#buttons").append(button);
  
      });
    }
    createButtons();

    $("#add").on("click",function(){
      newAnimal= $("#addAnimal").val();
      topics.push(newAnimal);
      createButtons();
      $('#addAnimal').val('');
      $("#gifs").empty();
      $("#bands").empty();
      
    });

    function createGifs(){
      
      $.get(queryurl).then(function(response){
        console.log(response);
         responseGlobal=response;
        for( var i = count; i < howmany; i ++){
        var newDiv = $("<div>");
        newDiv.attr("data-value",i);
        newDiv.css({float: "left", margin:"10px"});
        newDiv.html("<img src=" + response.data[i].images.downsized_still.url + " height=200px width=200px>");
        newDiv.append("<br> Rating: " + response.data[i].rating);
        $("#gifs").prepend(newDiv);
        }
        $("#addmore").empty();
        var more = $("<button>");
        more.text("click for 10 more gifs!");
        more.attr("id","more");
        more.addClass("btn btn-primary")
        $("#addmore").append(more);
      }).catch(function(e){
        $("#gifs").html("no such gifs!");
      })
  
    }
  
function clicky(){
   $("#buttons").on("click",".original", function(){
     $("#gifs").empty();
     count =0;;
    howmany =10;
    choice= this.id;
    queryurl="https://api.giphy.com/v1/gifs/search?api_key=rBK8HGIicVF5VbhGssb2gMp2tTW5Y9OK&q=" +choice+ "&limit=100&offset=0&rating=G&lang=en"
    createGifs();  
    createBands();
   })
  }
  clicky();
  
   $("#gifs").on("click","div", function(){
     var dataVal= ($(this).attr("data-value"));
     if(clicks === 0){
      clicks++;
     $(this).html("<img src=" + responseGlobal.data[dataVal].images.downsized.url + " height=200px width=200px>");
     $(this).append("<br> Rating: " + responseGlobal.data[dataVal].rating);
     }
     else{
       clicks --; 
       $(this).html("<img src=" + responseGlobal.data[dataVal].images.downsized_still.url + " height=200px width=200px>")
       $(this).append("<br> Rating: " + responseGlobal.data[dataVal].rating);
     }
   })

//add more gifs//
$("#all").on("click","#more",function(){
  count += 10;
    howmany +=10;
    createGifs();
  });

  function createBands(){
    $("#bands").empty();
    queryurlBands="https://rest.bandsintown.com/artists/" + choice + "?app_id=hello"
    $.get(queryurlBands).then(function(response){
      console.log(response);
      $("#bands").append("<h1>" + response.name + "</h1>");
      $("#bands").append("<img src=" + response.image_url + " height=300px width=300px>");
      $("#bands").append('<br><h5>BandsInTown webpage: ' + '<a href="'+ response.url+ '" target="_blank">'+ response.name +'</a></h5>');
      
  }).catch(function(e){
    $("#bands").html("no such bands!");
  })
} 
//on ready closing tab//
});