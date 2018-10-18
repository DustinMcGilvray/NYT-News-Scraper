$(document).ready(function() {

//========================= Semantic UI ===========================//

$('.ui.basic.modal')
  .modal('show')
;

//======================== End Semantic UI =======================//


// ======================= On Click Events =======================//

//======== Save Article Button ========//
$(document).on("click", "#save-article", function(event) {
  console.log("save article button is working");
 //Grab the id associated with the article from the submit button
 var savedArticle = $(this).attr("data-id");
 var saved = $(this).data("saved");

 var savedState = {
     saved: "true"
 };

 //Sending the PUT request.
 $.ajax("/savedarticles" + savedArticle, {
  type: "PUT",
  data: savedState
}).then(
  function () {
      console.log("changed saved to", saved);
      // Reload the page to get the updated list.
      location.reload();
  }
);
 
});




















//========= End Document Ready Function =============
});



//======================Class Activity 20 app.js Code Example====================================================

// // Grab the articles as a json
// $.getJSON("/articles", function(data) {
//     // For each one
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//       $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     }
//   });
  
  
//   // Whenever someone clicks a p tag
//   $(document).on("click", "p", function() {
//     // Empty the notes from the note section
//     $("#notes").empty();
//     // Save the id from the p tag
//     var thisId = $(this).attr("data-id");
  
//     // Now make an ajax call for the Article
//     $.ajax({
//       method: "GET",
//       url: "/articles/" + thisId
//     })
     
//   });
  
//   // When you click the savenote button
//   $(document).on("click", "#save-note", function() {
//     // Grab the id associated with the article from the submit button
//     var thisId = $(this).attr("data-id");
  
//     // Run a POST request to change the note, using what's entered in the inputs
//     $.ajax({
//       method: "POST",
//       url: "/articles/" + thisId,
//       data: {
//         // Value taken from title input
//         title: $("#title-input").val(),
//         // Value taken from author input
//         author: $("#author-input").val(),
//         // Value taken from note textarea
//         body: $("#body-input").val()
//       }
//     })
//       // With that done
//       .then(function(data) {
//         // Log the response
//         console.log(data);
//         // Empty the notes section
//         $("#notes").empty();
//       });
  
//     // Also, remove the values entered in the input and textarea for note entry
   
//   });
  