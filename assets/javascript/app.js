$(document).ready(function () {

  var topics = ["cat", "dog", "giraffe", "emu", "elephant", "seal", "goat", "zebra", "lion", "gecko", "puppy", "kitten"]

  var count = 0;
  var howmany = 10;;
  var choice = "";
  var queryurl = "";
  var queryurlBands = "";
  var favresponse = "";
  //create buttons//
  function createButtons() {

    $("#buttons").empty();
    $("#addmore").empty();
    topics.forEach(function (animal) {
      var button = $("<button>");
      button.text(animal);
      button.addClass("btn btn-info original");
      button.attr("id", animal);
      button.css({
        margin: "10px"
      });
      $("#buttons").append(button);

    });
  }
  createButtons();

  $("#add").on("click", function () {
    newAnimal = $("#addAnimal").val();
    topics.push(newAnimal);
    createButtons();
    $('#addAnimal').val('');
    $("#gifs").empty();
    $("#bands").empty();

  });

  function createGifs() {

    $.get(queryurl).then(function (response) {
      console.log(response);
      for (var i = count; i < howmany; i++) {
        var newDiv = $("<div>");
        newDiv.attr("data-value", i);
        newDiv.css({
          float: "left",
          margin: "10px"
        });
        var newImage = $("<img>")
        newImage.attr("src", response.data[i].images.downsized_still.url);
        newImage.css({
          height: "200px",
          width: "200px"
        });
        newImage.attr("data-still", response.data[i].images.downsized_still.url);
        newImage.attr("data-animate", response.data[i].images.downsized.url);
        newImage.attr("data-state", "still");
        newImage.attr("id", "image" + i);
        newDiv.append(newImage);
        newDiv.append("<br> Rating: " + response.data[i].rating);
        //create favorites button//
        var favButton = $("<button>");
        favButton.addClass("btn btn-success favButton");
        favButton.text("Add to favorites");
        favButton.attr("data-value", i);
        favButton.attr("data-animal", choice)
        favButton.css({
          margin: "10px",
          fontSize: "10px"
        });
        newDiv.append(favButton);
        //append to final div//
        $("#gifs").prepend(newDiv);
      };

      //create add more gifs button//
      $("#addmore").empty();
      var more = $("<button>");
      more.text("click for 10 more gifs!");
      more.attr("id", "more");
      more.css({
        margin: "10px"
      });
      more.addClass("btn btn-primary")
      $("#addmore").prepend(more);

      //error catch//
    }).catch(function (e) {
      $("#gifs").html("no such gifs!");
    })

  }

  function clicky() {
    $("#buttons").on("click", ".original", function () {
      $("#gifs").empty();
      count = 0;;
      howmany = 10;
      choice = this.id;
      queryurl = "https://api.giphy.com/v1/gifs/search?api_key=rBK8HGIicVF5VbhGssb2gMp2tTW5Y9OK&q=" + choice + "&limit=100&offset=0&rating=G&lang=en"
      createGifs();
      createBands();
    })
  }
  clicky();


  //images switch on click//
  $("#gifs").on("click", "img", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  //add more gifs//
  $("#all").on("click", "#more", function () {
    count += 10;
    howmany += 10;
    createGifs();
  });

  //create bands//
  function createBands() {
    $("#bands").empty();
    queryurlBands = "https://rest.bandsintown.com/artists/" + choice + "?app_id=hello"
    $.get(queryurlBands).then(function (response) {
      console.log(response);
      $("#bands").append("<h1>" + response.name + "</h1>");
      $("#bands").append("<img src=" + response.image_url + " height=300px width=300px>");
      $("#bands").append('<br><h5>BandsInTown webpage: ' + '<a href="' + response.url + '" target="_blank">' + response.name + '</a></h5>');

    }).catch(function (e) {
      $("#bands").html("no such bands!");
    })
  }




  ////favorites baloney////
  var bigfavList = JSON.parse(localStorage.getItem("favlist")) || [];

  $("#gifs").on("click", "button", function () {
    console.log(bigfavList);
    bigfavList = JSON.parse(localStorage.getItem("favlist")) || [];
    var dataValue = $(this).attr("data-value");
    var dataAnimal = $(this).attr("data-animal");
    var obj = [dataAnimal, dataValue];
    bigfavList.push(obj);
    var stringList = JSON.stringify(bigfavList);
    localStorage.setItem("favlist", stringList);


  });

  $("#favoritesLink").on("click", function () {
    window.open("favorites.html")
  });

  function addToFavs() {
    var favList = localStorage.getItem("favlist");
    var favoritesList = JSON.parse(favList);

    favoritesList.forEach(function (item) {
      $.get("https://api.giphy.com/v1/gifs/search?api_key=rBK8HGIicVF5VbhGssb2gMp2tTW5Y9OK&q=" + item[0] + "&limit=100&offset=0&rating=G&lang=en").then(function (response) {
        var img = $("<img>");
        var newDiv = $("<div>");
        img.attr("src", response.data[item[1]].images.downsized_still.url);
        img.css({
          height: "200px",
          width: "200px"
        });
        img.attr("data-still", response.data[item[1]].images.downsized_still.url);
        img.attr("data-animate", response.data[item[1]].images.downsized.url);
        img.attr("data-state", "still");
        var removebtn = $("<button>")
        removebtn.addClass("btn btn-danger remove");
        removebtn.attr("data-animal", item[0]);
        removebtn.attr("data-number", item[1]);
        removebtn.text("Remove from favorites");
        removebtn.css({
          fontSize: "10px"
        });
        newDiv.append(img);
        newDiv.append(removebtn);
        $("#favoritesHere").append(newDiv);
      })

    })
  }
  addToFavs();
  //fav images on click switch//
  $("#favoritesHere").on("click", "img", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  //delete favorites//
  $("#favoritesHere").on("click", "button", function () {
    $(this).parent().remove();
    var favoList = localStorage.getItem("favlist");
    var favoritesList = JSON.parse(favoList);
    console.log(favoritesList);
    var toSplice = [$(this).attr("data-animal"), $(this).attr("data-number")];
    console.log(toSplice);
    favoritesList.splice(toSplice, 1);
    console.log(favoritesList);
    console.log(bigfavList);
    bigfavList = favoritesList;
    //splices and updates fav list but not working elsewhere//
    var newFavlist = JSON.stringify(favoritesList);
    localStorage.setItem("favlist", newFavlist);


  });


  //on ready closing tab//
});